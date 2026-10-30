import type { ReactNode } from "react";
import css from "@/app/guide/guide.module.css";

/**
 * 図解（線画インラインSVG）の登録先。本文の [[figure:ID|キャプション]] と専用ページの figure.id から参照する。
 *
 * 描き方の決まり
 *   - 線は本文色（currentColor）と青（--guide-accent）の2色。塗りは白か淡色（--guide-pale）のみ
 *   - 要素と矢印だけで構成し、顔は描かない。グラデーション・グロー・影は使わない
 *   - 横長の図は wide（720幅）と narrow（340幅・縦積み）の2枚を持ち、700px以下で narrow に切り替える
 *   - figure の aria-label にはキャプションが入る（GuideFigure が付与）。SVG 自体は aria-hidden
 *
 * 未登録の ID は「図解枠（作成待ち）」として点線の枠が表示される。
 */

const INK = "currentColor";
const ACC = "var(--guide-accent, #087caf)";
const PALE = "var(--guide-pale, #f0f7fa)";
const MUTED = "var(--guide-muted, #536675)";

type TextProps = { x: number; y: number; children: string; size?: number; weight?: number; anchor?: "start" | "middle" | "end"; fill?: string };
/** 改行（\n）対応のテキスト。y は行の束の中心 */
function T({ x, y, children, size = 14, weight = 500, anchor = "middle", fill = INK }: TextProps) {
  const lines = children.split("\n");
  const lh = size * 1.4;
  const first = y - ((lines.length - 1) * lh) / 2 + size * 0.36;
  return <text x={x} y={first} fontSize={size} fontWeight={weight} textAnchor={anchor} fill={fill}>
    {lines.map((line, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>{line}</tspan>)}
  </text>;
}

type BoxProps = { x: number; y: number; w: number; h: number; label: string; fill?: string; stroke?: string; size?: number; weight?: number };
function Box({ x, y, w, h, label, fill = "#fff", stroke = INK, size = 14, weight = 600 }: BoxProps) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} stroke={stroke} strokeWidth={1.5} />
    <T x={x + w / 2} y={y + h / 2} size={size} weight={weight}>{label}</T>
  </g>;
}

function Arrow({ x1, y1, x2, y2, color = ACC }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const len = 9, half = 4.5;
  const bx = x2 - len * Math.cos(a), by = y2 - len * Math.sin(a);
  const lx = bx + half * Math.sin(a), ly = by - half * Math.cos(a);
  const rx = bx - half * Math.sin(a), ry = by + half * Math.cos(a);
  return <g>
    <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={1.6} />
    <path d={`M${x2} ${y2}L${lx} ${ly}L${rx} ${ry}Z`} fill={color} />
  </g>;
}

function Svg({ w, h, max, children }: { w: number; h: number; max?: number; children: ReactNode }) {
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: max ?? w * 1.15, fontFamily: "inherit" }} aria-hidden="true" focusable="false">{children}</svg>;
}

/** 700px 超は wide、以下は narrow を表示する */
function Responsive({ wide, narrow }: { wide: ReactNode; narrow: ReactNode }) {
  return <><div className={css.figWide}>{wide}</div><div className={css.figNarrow}>{narrow}</div></>;
}

/** 横一列（wide）／縦一列（narrow）の手順図 */
function Steps({ steps, circle = false, notes = {} }: { steps: string[]; circle?: boolean; notes?: Record<number, string> }) {
  const n = steps.length;
  const hasNotes = Object.keys(notes).length > 0;
  // wide
  const W = 720, gap = 30, bw = (W - 40 - gap * (n - 1)) / n;
  const h = circle ? Math.min(bw, 104) : 72;
  const top = 16;
  const H = top + h + (hasNotes ? 46 : 16);
  const wide = <Svg w={W} h={H}>
    {steps.map((step, i) => {
      const x = 20 + i * (bw + gap);
      const cx = x + bw / 2, cy = top + h / 2;
      return <g key={i}>
        {circle
          ? <g><circle cx={cx} cy={cy} r={h / 2} fill={i === n - 1 ? PALE : "#fff"} stroke={INK} strokeWidth={1.5} /><T x={cx} y={cy} size={14} weight={600}>{step}</T></g>
          : <Box x={x} y={top} w={bw} h={h} label={step} size={13} fill={i === n - 1 ? PALE : "#fff"} />}
        {i < n - 1 && <Arrow x1={circle ? cx + h / 2 + 4 : x + bw + 4} y1={cy} x2={circle ? x + bw + gap + (bw - h) / 2 - 4 : x + bw + gap - 4} y2={cy} />}
        {notes[i] && <T x={cx} y={top + h + 24} size={12} fill={MUTED}>{notes[i]}</T>}
      </g>;
    })}
  </Svg>;
  // narrow
  // 注記つきの箱は左寄せにして、右側に注記の余白を取る
  const sideNote = hasNotes && !circle;
  const NW = 340, nbw = sideNote ? 200 : 230, nx = sideNote ? 14 : (NW - nbw) / 2, nh = circle ? 76 : 52, step = nh + 34;
  const NH = 10 + n * step - 34 + 10;
  const narrow = <Svg w={NW} h={NH}>
    {steps.map((label, i) => {
      const y = 10 + i * step;
      const cx = circle ? NW / 2 : nx + nbw / 2;
      return <g key={i}>
        {circle
          ? <g><circle cx={cx} cy={y + nh / 2} r={nh / 2} fill={i === n - 1 ? PALE : "#fff"} stroke={INK} strokeWidth={1.5} /><T x={cx} y={y + nh / 2} size={13} weight={600}>{label}</T></g>
          : <Box x={nx} y={y} w={nbw} h={nh} label={label.replace(/\n/g, "")} size={14} fill={i === n - 1 ? PALE : "#fff"} />}
        {i < n - 1 && <Arrow x1={cx} y1={y + nh + 4} x2={cx} y2={y + step - 4} />}
        {notes[i] && <T x={cx + (circle ? nh / 2 + 10 : nbw / 2 + 8)} y={y + nh / 2} size={11} anchor="start" fill={MUTED}>{notes[i].replace(/\n/g, "")}</T>}
      </g>;
    })}
  </Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

/** 1つの起点から複数の箱へ分かれる図。via=true なら分岐点を経由する */
function Branch({ root, rootNote, leaves, via = false }: { root: string; rootNote: string; leaves: string[]; via?: boolean }) {
  const W = 720, H = 320, lx = 450, lw = 250, lh = 64, gapY = (H - 40 - leaves.length * lh) / (leaves.length - 1);
  const rootBox = { x: 20, y: H / 2 - 40, w: 170, h: 80 };
  const sx = rootBox.x + rootBox.w, sy = H / 2, px = 320;
  const wide = <Svg w={W} h={H}>
    <Box {...rootBox} label={root} size={16} weight={700} fill={PALE} />
    <T x={rootBox.x + rootBox.w / 2} y={rootBox.y + rootBox.h + 22} size={12} fill={ACC} weight={700}>{rootNote}</T>
    {via && <><line x1={sx} y1={sy} x2={px} y2={sy} stroke={ACC} strokeWidth={1.6} /><circle cx={px} cy={sy} r={5} fill={ACC} /></>}
    {leaves.map((leaf, i) => {
      const y = 20 + i * (lh + gapY);
      return <g key={leaf}>
        <Box x={lx} y={y} w={lw} h={lh} label={leaf} size={14} />
        <Arrow x1={via ? px : sx + 6} y1={sy} x2={lx - 6} y2={y + lh / 2} />
      </g>;
    })}
  </Svg>;
  const NW = 340, nbw = 250, nlh = 52, top = 120, step = nlh + 22;
  const NH = top + leaves.length * step;
  const tx = 36;
  const narrow = <Svg w={NW} h={NH}>
    <Box x={(NW - 200) / 2} y={10} w={200} h={60} label={root.replace(/\n/g, "")} size={15} weight={700} fill={PALE} />
    <T x={NW / 2} y={88} size={12} fill={ACC} weight={700}>{rootNote}</T>
    <line x1={tx} y1={40} x2={(NW - 200) / 2} y2={40} stroke={ACC} strokeWidth={1.6} />
    <line x1={tx} y1={40} x2={tx} y2={top + (leaves.length - 1) * step + nlh / 2} stroke={ACC} strokeWidth={1.6} />
    {leaves.map((leaf, i) => {
      const y = top + i * step;
      return <g key={leaf}>
        <Box x={NW - 20 - nbw} y={y} w={nbw} h={nlh} label={leaf.replace(/\n/g, "")} size={14} />
        <Arrow x1={tx} y1={y + nlh / 2} x2={NW - 20 - nbw - 4} y2={y + nlh / 2} />
      </g>;
    })}
  </Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

/* ---------- 各図 ---------- */

function MeritNumbers() {
  const items = [
    { label: "在留者", value: "94万1,031人", date: "2026年6月末", source: "出入国在留管理庁" },
    { label: "労働者", value: "43万1,949人", date: "2025年10月末", source: "厚生労働省" },
    { label: "高度専門職", value: "2万2,169人", date: "2025年12月末", source: "出入国在留管理庁" },
  ];
  const wide = <Svg w={720} h={200}>
    <line x1={60} y1={86} x2={660} y2={86} stroke={INK} strokeWidth={1} />
    {items.map((item, i) => {
      const x = 20 + i * 240, cx = x + 100;
      return <g key={item.label}>
        <rect x={x} y={16} width={200} height={140} rx={4} fill="#fff" stroke={INK} strokeWidth={1.5} />
        <rect x={x} y={16} width={200} height={4} fill={ACC} />
        <T x={cx} y={46} size={14} weight={700} fill={ACC}>{item.label}</T>
        <T x={cx} y={86} size={26} weight={800}>{item.value}</T>
        <T x={cx} y={124} size={13} fill={MUTED}>{item.date}</T>
        <T x={cx} y={180} size={12} fill={MUTED}>{item.source}</T>
      </g>;
    })}
  </Svg>;
  const narrow = <Svg w={340} h={420}>
    <line x1={170} y1={20} x2={170} y2={400} stroke={INK} strokeWidth={1} />
    {items.map((item, i) => {
      const y = 10 + i * 140;
      return <g key={item.label}>
        <rect x={30} y={y} width={280} height={104} rx={4} fill="#fff" stroke={INK} strokeWidth={1.5} />
        <rect x={30} y={y} width={4} height={104} fill={ACC} />
        <T x={170} y={y + 24} size={13} weight={700} fill={ACC}>{item.label}</T>
        <T x={170} y={y + 56} size={24} weight={800}>{item.value}</T>
        <T x={170} y={y + 86} size={12} fill={MUTED}>{`${item.date}／${item.source}`}</T>
      </g>;
    })}
  </Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

function MeritChecklist() {
  const steps = ["仕事内容を決める", "在留資格の確認", "報酬の設定", "選考（国籍を条件にしない）", "入社後の定着"];
  const bx = 120, bw = 260, bh = 44, step = 66, top = 10;
  const bracket = (from: number, to: number, label: string) => {
    const y1 = top + from * step, y2 = top + to * step + bh;
    return <g>
      <path d={`M104 ${y1}H96V${y2}H104`} fill="none" stroke={ACC} strokeWidth={1.6} />
      <T x={52} y={(y1 + y2) / 2} size={13} weight={700} fill={ACC}>{label}</T>
    </g>;
  };
  return <Svg w={400} h={top * 2 + 4 * step + bh} max={480}>
    {bracket(0, 2, "採用前")}
    {bracket(3, 4, "採用時・\n入社後")}
    {steps.map((label, i) => <g key={label}>
      <Box x={bx} y={top + i * step} w={bw} h={bh} label={label} size={14} fill={i === 3 ? PALE : "#fff"} />
      {i < steps.length - 1 && <Arrow x1={bx + bw / 2} y1={top + i * step + bh + 3} x2={bx + bw / 2} y2={top + (i + 1) * step - 3} />}
    </g>)}
  </Svg>;
}

function VisaWeek() {
  const days = ["月", "火", "水", "木", "金", "土", "日"];
  const wide = <Svg w={720} h={210}>
    <path d="M40 58V48H460V58" fill="none" stroke={ACC} strokeWidth={1.6} />
    <T x={250} y={28} size={15} weight={700} fill={ACC}>1週28時間以内</T>
    {days.map((d, i) => <g key={d}><rect x={40 + i * 60} y={70} width={60} height={56} fill="#fff" stroke={INK} strokeWidth={1.5} /><T x={70 + i * 60} y={98} size={14}>{d}</T></g>)}
    <T x={600} y={48} size={13} weight={700}>長期休業期間</T>
    <rect x={530} y={70} width={140} height={56} fill={PALE} stroke={INK} strokeWidth={1.5} />
    <T x={600} y={98} size={14} weight={600}>1日8時間以内</T>
    <T x={360} y={176} size={13} fill={MUTED}>資格外活動の包括許可が必要</T>
  </Svg>;
  const narrow = <Svg w={340} h={290}>
    <path d="M30 56V46H310V56" fill="none" stroke={ACC} strokeWidth={1.6} />
    <T x={170} y={26} size={14} weight={700} fill={ACC}>1週28時間以内</T>
    {days.map((d, i) => <g key={d}><rect x={30 + i * 40} y={64} width={40} height={48} fill="#fff" stroke={INK} strokeWidth={1.5} /><T x={50 + i * 40} y={88} size={13}>{d}</T></g>)}
    <T x={170} y={150} size={13} weight={700}>長期休業期間</T>
    <rect x={90} y={166} width={160} height={48} fill={PALE} stroke={INK} strokeWidth={1.5} />
    <T x={170} y={190} size={14} weight={600}>1日8時間以内</T>
    <T x={170} y={260} size={12} fill={MUTED}>資格外活動の包括許可が必要</T>
  </Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

function MethodsMatrix() {
  // 手間：少=0 中=1 多=2 ／ 速さ：ゆっくり=0 中=1 早い=2
  // below=true のラベルは点の下に置く（近接する点のラベル重なりを避ける）
  const points: { label: string; effort: number; speed: number; dx?: number; below?: boolean }[] = [
    { label: "人材紹介", effort: 0, speed: 2 },
    { label: "リファラル", effort: 0, speed: 1 },
    { label: "学校経由", effort: 1, speed: 0, dx: -0.2, below: true },
    { label: "インターン経由", effort: 1, speed: 0, dx: 0.2 },
    { label: "求人媒体", effort: 2, speed: 1 },
    { label: "ダイレクト・SNS", effort: 2, speed: 0, below: true },
  ];
  const chart = (W: number, H: number, s: number) => {
    const ox = 64 * s, oy = H - 70 * s, ex = W - 24 * s, ey = 28 * s;
    const px = (v: number) => ox + (ex - ox) * (0.2 + v * 0.3);
    const py = (v: number) => oy - (oy - ey) * (0.18 + v * 0.36);
    const fs = Math.max(12, 13 * s);
    return <Svg w={W} h={H}>
      <Arrow x1={ox} y1={oy} x2={ex} y2={oy} color={INK} />
      <Arrow x1={ox} y1={oy} x2={ox} y2={ey} color={INK} />
      <T x={(ox + ex) / 2} y={oy + 22 * s} size={fs} weight={700}>採用までの速さ</T>
      <T x={ox + 6} y={oy + 22 * s} size={fs - 1} anchor="start" fill={MUTED}>ゆっくり</T>
      <T x={ex} y={oy + 22 * s} size={fs - 1} anchor="end" fill={MUTED}>早い</T>
      <T x={ox - 10} y={ey + 8} size={fs - 1} anchor="end" fill={MUTED}>多い</T>
      <T x={ox - 10} y={oy - 10} size={fs - 1} anchor="end" fill={MUTED}>少ない</T>
      <T x={ox - 10} y={(oy + ey) / 2} size={fs} weight={700} anchor="end">{"企業側\nの手間"}</T>
      {points.map((p) => {
        const x = px(p.speed + (p.dx ?? 0)), y = py(p.effort);
        return <g key={p.label}>
          <circle cx={x} cy={y} r={7} fill={PALE} stroke={ACC} strokeWidth={2} />
          <T x={x} y={p.below ? y + 20 : y - 18} size={fs} weight={600}>{p.label}</T>
        </g>;
      })}
      <T x={W / 2} y={H - 16} size={Math.max(11, 12 * s)} fill={MUTED}>一般的な傾向。職種・時期によって変わる</T>
    </Svg>;
  };
  return <Responsive wide={chart(720, 380, 1)} narrow={chart(340, 340, 0.9)} />;
}

function CostStages() {
  const stages = [
    { title: "採用前", items: ["紹介手数料", "媒体掲載料", "選考の人件費"] },
    { title: "入社時", items: ["在留手続き", "渡航・住居"] },
    { title: "入社後", items: ["給与", "研修・定着", "在留期間の更新"] },
  ];
  const wide = <Svg w={720} h={250}>
    {stages.map((stage, i) => {
      const x = 20 + i * 240;
      return <g key={stage.title}>
        <rect x={x} y={10} width={200} height={190} rx={4} fill="#fff" stroke={INK} strokeWidth={1.5} />
        <rect x={x} y={10} width={200} height={46} rx={4} fill={PALE} stroke={INK} strokeWidth={1.5} />
        <T x={x + 100} y={33} size={16} weight={800}>{stage.title}</T>
        {stage.items.map((item, j) => <T key={item} x={x + 100} y={84 + j * 36} size={14}>{item}</T>)}
        {i < stages.length - 1 && <Arrow x1={x + 204} y1={105} x2={x + 236} y2={105} />}
      </g>;
    })}
    <T x={360} y={228} size={13} fill={MUTED}>方法・在住地で変わる</T>
  </Svg>;
  let y = 10;
  const blocks = stages.map((stage) => { const h = 46 + stage.items.length * 30 + 10; const b = { ...stage, y, h }; y += h + 34; return b; });
  const NH = y - 34 + 44;
  const narrow = <Svg w={340} h={NH}>
    {blocks.map((b, i) => <g key={b.title}>
      <rect x={30} y={b.y} width={280} height={b.h} rx={4} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <rect x={30} y={b.y} width={280} height={42} rx={4} fill={PALE} stroke={INK} strokeWidth={1.5} />
      <T x={170} y={b.y + 21} size={15} weight={800}>{b.title}</T>
      {b.items.map((item, j) => <T key={item} x={170} y={b.y + 62 + j * 30} size={14}>{item}</T>)}
      {i < blocks.length - 1 && <Arrow x1={170} y1={b.y + b.h + 4} x2={170} y2={b.y + b.h + 30} />}
    </g>)}
    <T x={170} y={NH - 18} size={12} fill={MUTED}>方法・在住地で変わる</T>
  </Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

function NewGradLanes() {
  const upper = { title: "日本の大学で学ぶ留学生", steps: ["在学中\n（留学）", "内定", "在留資格の\n変更", null, "入社"] };
  const lower = { title: "中国の大学で学んだ人材", steps: ["卒業\n（中国在住）", "内定", "在留資格\n認定証明書", "査証取得・\n来日", "入社"] };
  // wide
  const bw = 104, gap = 36, x0 = 28;
  const lane = (lane: typeof upper, top: number) => {
    const idx = lane.steps.map((s, i) => (s ? i : -1)).filter((i) => i >= 0);
    return <g>
      <T x={x0} y={top - 16} size={14} weight={700} anchor="start" fill={ACC}>{lane.title}</T>
      {idx.map((i, k) => {
        const x = x0 + i * (bw + gap);
        const next = idx[k + 1];
        return <g key={i}>
          <Box x={x} y={top} w={bw} h={60} label={lane.steps[i] as string} size={13} fill={i === 4 ? PALE : "#fff"} />
          {next !== undefined && <Arrow x1={x + bw + 4} y1={top + 30} x2={x0 + next * (bw + gap) - 4} y2={top + 30} />}
        </g>;
      })}
    </g>;
  };
  const wide = <Svg w={720} h={250}>{lane(upper, 40)}{lane(lower, 170)}</Svg>;
  // narrow: 2列の縦レーン
  const nbw = 140, nbh = 52, step = 74, top = 56;
  const col = (lane: typeof upper, x: number) => {
    const idx = lane.steps.map((s, i) => (s ? i : -1)).filter((i) => i >= 0);
    return <g>
      <T x={x + nbw / 2} y={22} size={12} weight={700} fill={ACC}>{lane.title.replace("で学", "で\n学")}</T>
      {idx.map((i, k) => {
        const y = top + i * step;
        const next = idx[k + 1];
        return <g key={i}>
          <Box x={x} y={y} w={nbw} h={nbh} label={lane.steps[i] as string} size={12} fill={i === 4 ? PALE : "#fff"} />
          {next !== undefined && <Arrow x1={x + nbw / 2} y1={y + nbh + 3} x2={x + nbw / 2} y2={top + next * step - 3} />}
        </g>;
      })}
    </g>;
  };
  const narrow = <Svg w={340} h={top + 4 * step + nbh + 10}>{col(upper, 20)}{col(lower, 180)}</Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

function NewGradTimeline() {
  const wide = <Svg w={720} h={230}>
    <rect x={100} y={40} width={250} height={44} rx={4} fill="#fff" stroke={ACC} strokeWidth={1.8} />
    <T x={225} y={62} size={14} weight={600}>在留資格の変更（1〜2か月）</T>
    <Arrow x1={100} y1={118} x2={680} y2={118} color={INK} />
    <T x={88} y={118} size={14} weight={700} anchor="end">内定</T>
    <T x={680} y={144} size={14} weight={700} anchor="end">入社</T>
    <rect x={100} y={152} width={520} height={44} rx={4} fill={PALE} stroke={INK} strokeWidth={1.5} />
    <T x={360} y={174} size={14} weight={600}>在留資格認定証明書（1〜3か月）＋査証・来日準備</T>
  </Svg>;
  const narrow = <Svg w={340} h={290}>
    <T x={20} y={20} size={13} weight={600} anchor="start">在留資格の変更（1〜2か月）</T>
    <rect x={20} y={36} width={140} height={30} rx={4} fill="#fff" stroke={ACC} strokeWidth={1.8} />
    <T x={20} y={104} size={13} weight={600} anchor="start">{"在留資格認定証明書（1〜3か月）\n＋査証・来日準備"}</T>
    <rect x={20} y={136} width={290} height={30} rx={4} fill={PALE} stroke={INK} strokeWidth={1.5} />
    <Arrow x1={20} y1={214} x2={320} y2={214} color={INK} />
    <T x={20} y={240} size={13} weight={700} anchor="start">内定</T>
    <T x={320} y={240} size={13} weight={700} anchor="end">入社</T>
  </Svg>;
  return <Responsive wide={wide} narrow={narrow} />;
}

export const guideFigures: Partial<Record<string, () => ReactNode>> = {
  // 専用ページ /service/china-talent
  "china-talent-fields": () => <Branch root="仕事内容" rootNote="必要な専門性を整理" leaves={["フィジカルAI・ロボティクス", "IT・AI", "日中バイリンガル"]} />,
  "china-talent-flow": () => <Steps circle steps={["相談", "条件確認", "紹介", "選考", "入社・\n定着"]} notes={{ 4: "入社後も相談可" }} />,
  // 記事1 メリットと注意点
  "merit-caution-1": () => <MeritNumbers />,
  "merit-caution-2": () => <MeritChecklist />,
  // 記事2 在留資格
  "visa-1": () => <Branch via root="任せる仕事" rootNote="学歴・経験との関係を確認" leaves={["技術・人文知識・国際業務", "高度専門職", "その他の在留資格"]} />,
  "visa-2": () => <VisaWeek />,
  // 記事3 採用方法
  "methods-1": () => <MethodsMatrix />,
  "methods-2": () => <Steps steps={["インターン\n受け入れ", "仕事内容・\n相性の確認", "選考", "内定", "在留資格の\n変更", "入社"]} notes={{ 0: "1週28時間以内" }} />,
  // 記事4 費用
  "cost-1": () => <CostStages />,
  "cost-2": () => <Steps steps={["費目を\n書き出す", "時期を\n決める", "確認先に\n問い合わせる", "見積もり"]} />,
  // 記事5 新卒
  "new-graduates-1": () => <NewGradLanes />,
  "new-graduates-2": () => <NewGradTimeline />,
};
