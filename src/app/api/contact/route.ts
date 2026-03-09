import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "名前、メールアドレス、メッセージは必須です。" },
        { status: 400 }
      );
    }

    // Send email notification to TSUNAGU
    const mailBody = `
【お問い合わせ通知】

会社名: ${company || "未記入"}
お名前: ${name}
メールアドレス: ${email}

メッセージ:
${message}

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
          to: ["contact@tsunagu.co.jp"],
          reply_to: email,
          subject: `【HP問い合わせ】${company || name}様より`,
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
