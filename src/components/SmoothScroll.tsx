"use client";

import dynamic from "next/dynamic";
import { ReactNode, useState, useEffect } from "react";

const ReactLenis = dynamic(() => import("@studio-freight/react-lenis"), {
  ssr: false,
});

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <>{children}</>;
  }
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}

