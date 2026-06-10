import type { CSSProperties } from "react";

// 砂時計（∞）ループ動画。装飾用途なのでスクリーンリーダーからは隠す
export default function SandglassVideo({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <video
      src="/videos/sandglass.mp4"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className={className}
      style={style}
    />
  );
}
