import type { GuideBlock } from "./types";

/**
 * 採用ガイド本文用の最小 Markdown パーサー（依存パッケージなし・ビルド時に実行）。
 *
 * 対応する記法
 *   ## 見出し            → h2（目次に自動で載る）
 *   ### 見出し           → h3
 *   空行区切りの文       → 段落（段落内の改行は詰めて1段落にする）
 *   - 項目 / * 項目      → 箇条書き
 *   1. 項目              → 番号付きリスト
 *   | 見出し | 見出し |   → 表（2行目は |---|---| の区切り行。表の直前に「表：キャプション」行を置くとキャプションになる）
 *   > 文                 → 注記ボックス（複数行可）
 *   [[figure:ID|キャプション]] → 図解枠（ID は figures.tsx に登録した線画SVG）
 *   :::faq               → FAQ ブロック開始。「Q. 質問」「A. 回答」を交互に書き、::: で閉じる
 *
 * 行内記法：**強調** と [リンク文字](/path または https://...)
 */
export function parseGuideMarkdown(source: string): GuideBlock[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: GuideBlock[] = [];
  let h2Count = 0;
  let i = 0;

  const isBlockStart = (line: string) =>
    /^#{2,3}\s/.test(line) || /^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line) || line.startsWith("|") || line.startsWith(">") || /^\[\[figure:/.test(line) || line.startsWith(":::") || /^表[:：]/.test(line);

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    let m: RegExpMatchArray | null;
    if ((m = line.match(/^##\s+(.+)$/))) {
      h2Count++;
      blocks.push({ type: "h2", id: `section-${h2Count}`, text: m[1].trim() });
      i++; continue;
    }
    if ((m = line.match(/^###\s+(.+)$/))) {
      blocks.push({ type: "h3", text: m[1].trim() });
      i++; continue;
    }
    if ((m = line.match(/^\[\[figure:([^|\]]+)\|?([^\]]*)\]\]$/))) {
      blocks.push({ type: "figure", id: m[1].trim(), caption: m[2].trim() });
      i++; continue;
    }
    if (line === ":::faq") {
      const items: { q: string; a: string }[] = [];
      i++;
      let current: { q: string; a: string } | null = null;
      let mode: "q" | "a" | null = null;
      while (i < lines.length && lines[i].trim() !== ":::") {
        const l = lines[i].trim();
        let qa: RegExpMatchArray | null;
        if ((qa = l.match(/^Q[.．:：]\s*(.+)$/))) {
          if (current) items.push(current);
          current = { q: qa[1].trim(), a: "" };
          mode = "q";
        } else if ((qa = l.match(/^A[.．:：]\s*(.+)$/)) && current) {
          current.a = qa[1].trim();
          mode = "a";
        } else if (l && current && mode) {
          current[mode] += l;
        }
        i++;
      }
      if (current) items.push(current);
      blocks.push({ type: "faq", items });
      i++; continue;
    }
    let caption: string | undefined;
    if ((m = line.match(/^表[:：]\s*(.+)$/)) && lines[i + 1]?.trim().startsWith("|")) {
      caption = m[1].trim();
      i++;
    }
    if (lines[i].trim().startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head = [], ...body] = rows;
      blocks.push({ type: "table", head, rows: body, caption });
      continue;
    }
    if (line.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "note", text: parts.join("") });
      continue;
    }
    if (/^[-*]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
      const ordered = /^\d+[.)]\s+/.test(line);
      const pattern = ordered ? /^\d+[.)]\s+/ : /^[-*]\s+/;
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (pattern.test(l)) { items.push(l.replace(pattern, "")); i++; continue; }
        // 前の項目の折り返し行
        if (l && !isBlockStart(l) && items.length) { items[items.length - 1] += l; i++; continue; }
        break;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }
    // 先頭行は必ず消費する（「表：」で始まる通常の文などで無限ループしないように）
    const para: string[] = [lines[i].trim()];
    i++;
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: para.join("") });
  }
  return blocks;
}
