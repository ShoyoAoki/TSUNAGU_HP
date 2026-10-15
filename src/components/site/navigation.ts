export const employerContact = "/contact";
export const candidateSignup = "https://owlmatch.ai/signup";

export const serviceLinks = [
  { href: "/service/physical-ai", label: "フィジカルAI・ロボティクス・AI人材" },
  { href: "/service/bilingual", label: "バイリンガル人材・新卒バイリンガル人材" },
  { href: "/service/internship", label: "インターン採用" },
  { href: "/service/process", label: "採用の進め方・よくある質問" },
];
const translatedPaths = new Set(["/", "/service", "/company", "/contact", "/philosophy", "/mission", "/vision", "/value", "/origin", "/features", "/privacy", "/terms"]);
export function languageDestination(pathname: string) {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  if (translatedPaths.has(pathname)) return pathname === "/" ? "/zh" : `/zh${pathname}`;
  return pathname.startsWith("/service/") ? "/zh/service" : "/zh";
}
