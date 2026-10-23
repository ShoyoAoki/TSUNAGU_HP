"use client";
import { usePathname } from "next/navigation";
import CorporateSiteHeader from "./CorporateSiteHeader";

export default function Header() {
  const pathname = usePathname();
  return <CorporateSiteHeader key={pathname} alwaysVisible={pathname !== "/"} />;
}
