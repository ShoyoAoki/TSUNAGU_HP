import type { ReactNode } from "react";

/**
 * 図解（線画インラインSVG）の登録先。本文の [[figure:ID|キャプション]] と専用ページの figureId から参照する。
 *
 * 描き方の決まり
 *   - viewBox は横長（例：0 0 720 360）。幅は親要素に合わせて伸縮する
 *   - 線は stroke="currentColor"（本文色）と var(--guide-accent)（青）の2色まで。塗りは白か淡色のみ
 *   - 要素と矢印だけで構成し、顔は描かない。グラデーション・グロー・影は使わない
 *   - 図中の文字は <text> で書き、本文と同じ用語を使う
 *   - 登録したら、figure の aria-label にキャプションが入る（GuideFigure が自動で付与）
 *
 * 未登録の ID は「図解枠（作成待ち）」として点線の枠が表示される。
 */
export const guideFigures: Partial<Record<string, () => ReactNode>> = {
  // 例：
  // "merit-structure": () => <svg viewBox="0 0 720 360" role="presentation">…</svg>,
};
