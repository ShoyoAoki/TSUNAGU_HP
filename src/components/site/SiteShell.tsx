"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import PageMotion from "./PageMotion";
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const integrated = pathname === "/" || pathname === "/service" || pathname.startsWith("/service/") || pathname === "/zh" || pathname === "/zh/service" || pathname.startsWith("/zh/service/");
  return <div className={`site-content${integrated ? "" : " site-content-legacy"}`} id="site-content" tabIndex={-1}>{children}{integrated && <PageMotion />}<Footer /></div>;
}
