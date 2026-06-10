// 各ページ共通のグリッド背景（罫線パターン）
export default function GridBackground({
  size = 60,
  opacity = 0.05,
  position = "fixed",
}: {
  size?: number;
  opacity?: number;
  position?: "fixed" | "absolute";
}) {
  return (
    <div
      aria-hidden="true"
      className={`${position} inset-0 pointer-events-none z-0`}
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
