import { NextResponse } from "next/server";

// 入力上限（スパム・巨大ペイロード対策）
const MAX_LENGTHS = {
  company: 200,
  name: 100,
  email: 254,
  phone: 50,
  message: 5000,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 簡易レートリミット（インスタンス単位のメモリ保持。1IPあたり10分で5回まで）
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  // 古いIPエントリの掃除
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap) {
      if (value.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

function validate(body: Record<string, unknown>): string | null {
  const { company, name, email, phone, message } = body;

  for (const [field, value] of Object.entries({ company, name, email, phone, message })) {
    if (value != null && typeof value !== "string") {
      return "入力形式が正しくありません。";
    }
  }

  if (!name || !email || !message) {
    return "名前、メールアドレス、メッセージは必須です。";
  }

  if (!(name as string).trim() || !(message as string).trim()) {
    return "名前、メールアドレス、メッセージは必須です。";
  }

  if (!EMAIL_REGEX.test(email as string)) {
    return "有効なメールアドレスを入力してください。";
  }

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = body[field];
    if (typeof value === "string" && value.length > max) {
      return `入力が長すぎます（${field === "message" ? "メッセージは5000文字" : "各項目の上限"}以内でご入力ください）。`;
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "送信回数が多すぎます。しばらく時間をおいて再度お試しください。" },
        { status: 429 }
      );
    }

    const body = await request.json();

    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { company, name, email, phone, message } = body as Record<string, string>;

    // Send email notification to TSUNAGU
    const mailBody = `
【お問い合わせ通知】

会社名: ${company?.trim() || "未記入"}
お名前: ${name.trim()}
メールアドレス: ${email.trim()}
電話番号: ${phone?.trim() || "未記入"}

メッセージ:
${message.trim()}

---
送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
送信元: tsunaguinc.co.jp お問い合わせフォーム
`.trim();

    // Use Resend API if available, otherwise log and succeed
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "TSUNAGU HP <noreply@tsunaguinc.co.jp>",
          to: ["contact@tsunaguinc.co.jp"],
          reply_to: email.trim(),
          subject: `【HP問い合わせ】${(company?.trim() || name.trim()).slice(0, 80)}様より`,
          text: mailBody,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error("Resend API error:", errorData);
        return NextResponse.json(
          { error: "メール送信に失敗しました。" },
          { status: 500 }
        );
      }
    } else {
      // Fallback: log to console (for development)
      console.log("=== Contact Form Submission ===");
      console.log(mailBody);
      console.log("===============================");
      console.log("NOTE: Set RESEND_API_KEY env var to enable email delivery.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
