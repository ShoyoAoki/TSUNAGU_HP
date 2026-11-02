import Link from "next/link";
import type { ReactNode } from "react";
import type { GuideBlock } from "@/content/guide/types";
import { guideFigures } from "@/content/guide/figures";
import g from "@/app/guide/guide.module.css";

/** 行内記法（**強調** と [文字](URL)）を React 要素にする。HTML は解釈しない */
export function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = pattern.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      const href = m[3];
      nodes.push(/^https?:\/\//.test(href)
        ? <a key={key++} href={href} target="_blank" rel="noopener noreferrer">{m[2]}</a>
        : <Link key={key++} href={href}>{m[2]}</Link>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export function GuideFigure({ id, caption }: { id: string; caption: string }) {
  const Figure = guideFigures[id];
  return <figure className={`${g.figure}${Figure ? "" : ` ${g.figurePending}`}`}>
    {Figure
      ? <div className={g.figureArt} role="img" aria-label={caption}>{Figure()}</div>
      : <div className={g.figureArt} aria-hidden="true"><span>図解枠（作成待ち）</span><code>{id}</code></div>}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

export default function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  return <div className={g.body}>{blocks.map((block, i) => {
    switch (block.type) {
      case "h2": return <h2 key={i} id={block.id}><Inline text={block.text} /></h2>;
      case "h3": return <h3 key={i}><Inline text={block.text} /></h3>;
      case "p": return <p key={i}><Inline text={block.text} /></p>;
      case "ul": return <ul key={i}>{block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ul>;
      case "ol": return <ol key={i}>{block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ol>;
      case "note": return <aside key={i} className={g.note}><p><Inline text={block.text} /></p></aside>;
      case "figure": return <GuideFigure key={i} id={block.id} caption={block.caption} />;
      case "table": return <div key={i} className={g.tableWrap} role="region" aria-label={block.caption ?? "表"} tabIndex={0}>
        <table>
          {block.caption && <caption>{block.caption}</caption>}
          <thead><tr>{block.head.map((cell, j) => <th key={j} scope="col"><Inline text={cell} /></th>)}</tr></thead>
          <tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => k === 0
            ? <th key={k} scope="row"><Inline text={cell} /></th>
            : <td key={k}><Inline text={cell} /></td>)}</tr>)}</tbody>
        </table>
      </div>;
      case "faq": return <dl key={i} className={g.faq}>{block.items.map((item, j) => <div key={j}>
        <dt><span aria-hidden="true">Q</span><Inline text={item.q} /></dt>
        <dd><span aria-hidden="true">A</span><span><Inline text={item.a} /></span></dd>
      </div>)}</dl>;
    }
  })}</div>;
}
