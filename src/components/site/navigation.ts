export const employerContact = "/contact";
export const candidateSignup = "https://owlmatch.ai/signup";

export const serviceLinks = [
  { href: "/service/physical-ai", label: "フィジカルAI・ロボティクス・AI人材" },
  { href: "/service/bilingual", label: "バイリンガル人材・新卒バイリンガル人材" },
  { href: "/service/internship", label: "インターン採用" },
  { href: "/service/process", label: "採用の進め方・よくある質問" },
];
const translatedPaths = new Set(["/", "/service", "/service/physical-ai", "/service/bilingual", "/service/internship", "/service/process", "/company", "/contact", "/philosophy", "/mission", "/vision", "/value", "/origin", "/features", "/privacy", "/terms"]);
export function languageDestination(pathname: string) {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  if (translatedPaths.has(pathname)) return pathname === "/" ? "/zh" : `/zh${pathname}`;
  // Pages without a Chinese counterpart (e.g. /service/it-ai, /news) fall back to the nearest index.
  return pathname.startsWith("/service/") ? "/zh/service" : "/zh";
}
