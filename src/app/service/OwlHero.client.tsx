"use client";

/**
 * OwlMatch シネマティック3Dヒーロー（vanilla Three.js + GSAP ScrollTrigger）
 * 地球儀(アジア) → ダイブ → 人材の点 → ワープ急上昇 → 日本(街フライスルー) → ∞形成/循環 → フクロウ → ロゴ → 白フィナーレ
 * R3F不使用（React19非互換の轍を踏まないため vanilla で実装）。
 * sticky 100vh のキャンバスを 1500vh(モバイル1000vh) のラッパーでスクロール駆動。終端は白背景＋ロゴ＝下のLP本文へシームレス接続。
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const A = "/owlmatch-hero";

export default function OwlHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const owlbigRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const logoWRef = useRef<HTMLImageElement>(null);
  const logoDRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const wrap = wrapRef.current!;
    const whitebgEl = whiteRef.current!;
    const owlbigEl = owlbigRef.current!;
    const brandEl = brandRef.current!;
    const logoWEl = logoWRef.current!;
    const logoDEl = logoDRef.current!;
    if (!host || !wrap) return;

    const MOB = innerWidth < 768;
    wrap.style.height = MOB ? "1000vh" : "1500vh";
    // create the canvas per-mount (survives React StrictMode double-invoke without WebGL context conflicts)
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0";
    host.insertBefore(canvas, host.firstChild);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !MOB });
    renderer.setPixelRatio(Math.min(devicePixelRatio, MOB ? 1.5 : 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x02040a, 1);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.0062);
    const camera = new THREE.PerspectiveCamera(innerWidth < innerHeight ? 64 : 50, innerWidth / innerHeight, 0.1, 400);

    const eo = (x: number) => 1 - Math.pow(1 - x, 3);
    const cl = (a: number, b: number, x: number) => Math.min(Math.max((x - a) / (b - a), 0), 1);
    const lp = (a: number, b: number, t: number) => a + (b - a) * t;

    function dot() {
      const s = 64, c = document.createElement("canvas"); c.width = c.height = s;
      const x = c.getContext("2d")!; const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#dff4ff"); g.addColorStop(0.55, "rgba(140,200,255,.7)"); g.addColorStop(1, "rgba(120,180,255,0)");
      x.fillStyle = g; x.fillRect(0, 0, s, s); return new THREE.CanvasTexture(c);
    }
    const dt = dot(); const R = 2.5;
    const sph = (lat: number, lon: number, r = R) => { const a = lat * Math.PI / 180, b = -lon * Math.PI / 180; return new THREE.Vector3(r * Math.cos(a) * Math.cos(b), r * Math.sin(a), r * Math.cos(a) * Math.sin(b)); };
    const WHITE = new THREE.Color(0xffffff);

    type Beam = { line: THREE.Line; g: THREE.BufferGeometry; m: THREE.LineBasicMaterial; maxH: number; SEG: number; x: number; z: number; baseY: number; base: THREE.Color; ph: number; };
    function makeBeam(x: number, z: number, maxH: number, baseHex: number, baseY = 0): Beam {
      const SEG = 12; const P = new Float32Array((SEG + 1) * 3), C = new Float32Array((SEG + 1) * 3);
      for (let i = 0; i <= SEG; i++) { P[i * 3] = x; P[i * 3 + 1] = baseY; P[i * 3 + 2] = z; }
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(P, 3)); g.setAttribute("color", new THREE.BufferAttribute(C, 3));
      const m = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      return { line: new THREE.Line(g, m), g, m, maxH, SEG, x, z, baseY, base: new THREE.Color(baseHex), ph: Math.random() * 6.28 };
    }
    function updateBeam(b: Beam, prog: number, op: number, time: number) {
      const { g, m, maxH, SEG, x, z, baseY, base, ph } = b; m.opacity = op;
      const a = g.attributes.position.array as Float32Array, c = g.attributes.color.array as Float32Array; const topH = maxH * prog;
      const pulse = (time * 0.55 + ph) % 1.0;
      for (let i = 0; i <= SEG; i++) {
        const t = i / SEG;
        a[i * 3] = x + Math.sin(time * 1.3 + ph) * 0.16 * t * t; a[i * 3 + 1] = baseY + topH * t; a[i * 3 + 2] = z;
        const rise = Math.pow(t, 0.55) * (1 - Math.pow(t, 3.2)); const pg = Math.max(0, 1 - Math.abs(t - pulse) * 5);
        const br = Math.min(1.5, rise * 0.85 + pg * 1.0); const col = base.clone().lerp(WHITE, Math.min(1, br * 0.7));
        c[i * 3] = col.r * br; c[i * 3 + 1] = col.g * br; c[i * 3 + 2] = col.b * br;
      }
      g.attributes.position.needsUpdate = true; g.attributes.color.needsUpdate = true;
    }

    let ready = false, ASIA_YAW = 0, ASIA_PITCH = 0, JFIT = 22;
    const globe = new THREE.Group(); scene.add(globe); let gMat: THREE.PointsMaterial, tMat: THREE.PointsMaterial;
    const aplane = new THREE.Group(); aplane.visible = false; scene.add(aplane); let aBmat: THREE.PointsMaterial, aDmat: THREE.PointsMaterial; const aBeams: { bm: Beam; h: number; delay: number }[] = [];
    const jp = new THREE.Group(); jp.visible = false; scene.add(jp); let jMapMat: THREE.PointsMaterial; const jComp: { bld: THREE.LineSegments; jb: Beam; hb: number; bl: number; delay: number }[] = [];
    const fin = new THREE.Group(); fin.visible = false; scene.add(fin); let finTrails: any = null;

    let dust: THREE.Points, dustMat: THREE.PointsMaterial;
    { const N = MOB ? 900 : 2400, a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const r = 11 + Math.random() * 48, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1); a[i * 3] = r * Math.sin(ph) * Math.cos(th); a[i * 3 + 1] = r * Math.cos(ph) * 0.62; a[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th); }
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(a, 3));
      dustMat = new THREE.PointsMaterial({ map: dt, size: 0.16, color: 0x46719c, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
      dust = new THREE.Points(g, dustMat); scene.add(dust); }

    let warp: THREE.LineSegments, warpMat: THREE.LineBasicMaterial, warpData: any;
    { const N = MOB ? 380 : 850, P = new Float32Array(N * 6), C = new Float32Array(N * 6), data: any[] = [];
      const core = new THREE.Color(0x9fe0ff), tail = new THREE.Color(0x2f8fe0);
      for (let i = 0; i < N; i++) { data.push({ x: (Math.random() - 0.5) * 34, z: (Math.random() - 0.5) * 34, y: -25 + Math.random() * 80, len: 2 + Math.random() * 4, sp: 0.55 + Math.random() * 0.95 });
        const b = 0.6 + Math.random() * 0.6; C[i * 6] = tail.r * b; C[i * 6 + 1] = tail.g * b; C[i * 6 + 2] = tail.b * b; C[i * 6 + 3] = core.r * b; C[i * 6 + 4] = core.g * b; C[i * 6 + 5] = core.b * b; }
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(P, 3)); g.setAttribute("color", new THREE.BufferAttribute(C, 3));
      warpMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      warp = new THREE.LineSegments(g, warpMat); warp.frustumCulled = false; scene.add(warp); warpData = { N, P, data }; }
    function updateWarp(intensity: number, d: number, camY: number) { const { N, P, data } = warpData; const spd = 95 * intensity, yTop = camY + 48, yBot = camY - 28;
      for (let i = 0; i < N; i++) { const dd = data[i]; dd.y -= spd * dd.sp * d; if (dd.y < yBot) { dd.y = yTop + Math.random() * 12; dd.x = (Math.random() - 0.5) * 34; dd.z = (Math.random() - 0.5) * 34; }
        const len = dd.len * (1 + intensity * 3.5); P[i * 6] = dd.x; P[i * 6 + 1] = dd.y; P[i * 6 + 2] = dd.z; P[i * 6 + 3] = dd.x; P[i * 6 + 4] = dd.y + len; P[i * 6 + 5] = dd.z; }
      (warp.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true; }

    const mask = new Image(); mask.crossOrigin = "anonymous"; mask.src = `${A}/landmask.png`;
    const owlImg = new Image(); owlImg.crossOrigin = "anonymous"; owlImg.src = `${A}/owl.png`;
    let masksDone = 0;
    mask.onload = () => { buildGlobe(); buildJapan(); if (++masksDone === 2) ready = true; };
    mask.onerror = () => { if (++masksDone === 2) ready = true; };
    owlImg.onload = () => { buildAsiaPlane(); buildFinale(); if (++masksDone === 2) ready = true; };
    owlImg.onerror = () => { if (++masksDone === 2) ready = true; };

    function sampleMask(img: HTMLImageElement, W: number, H: number) { const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const cx = cv.getContext("2d")!; cx.drawImage(img, 0, 0, W, H); return cx.getImageData(0, 0, W, H).data; }

    function buildGlobe() { const W = 1024, H = 512, D = sampleMask(mask, W, H); const land: THREE.Vector3[] = [], asia: THREE.Vector3[] = [], asiaF: number[] = [];
      const ss = (a: number, b: number, x: number) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
      for (let lat = -78; lat <= 82; lat += 1.0) { for (let lon = -180; lon < 180; lon += 1.0) { const u = ((lon + 180) / 360 * W) | 0, v = ((90 - lat) / 180 * H) | 0, i = (v * W + u) * 4; if ((D[i] + D[i + 1] + D[i + 2]) / 3 < 128) { const p = sph(lat, lon); land.push(p);
        if (lon > 48 && lon < 152 && lat > -12 && lat < 62) { const f = Math.min(ss(48, 66, lon), 1 - ss(48, 62, lat)); if (f > 0.03) { asia.push(p); asiaF.push(f); } } } } }
      const a1 = new Float32Array(land.length * 3); land.forEach((p, i) => { a1[i * 3] = p.x; a1[i * 3 + 1] = p.y; a1[i * 3 + 2] = p.z; });
      const g1 = new THREE.BufferGeometry(); g1.setAttribute("position", new THREE.BufferAttribute(a1, 3));
      gMat = new THREE.PointsMaterial({ map: dt, size: 0.05, color: 0x2e5470, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }); globe.add(new THREE.Points(g1, gMat));
      const a2 = new Float32Array(asia.length * 3), c2 = new Float32Array(asia.length * 3), base = new THREE.Color(0x8fe0ff);
      asia.forEach((p, i) => { a2[i * 3] = p.x; a2[i * 3 + 1] = p.y; a2[i * 3 + 2] = p.z; const f = asiaF[i]; c2[i * 3] = base.r * f; c2[i * 3 + 1] = base.g * f; c2[i * 3 + 2] = base.b * f; });
      const g2 = new THREE.BufferGeometry(); g2.setAttribute("position", new THREE.BufferAttribute(a2, 3)); g2.setAttribute("color", new THREE.BufferAttribute(c2, 3));
      tMat = new THREE.PointsMaterial({ map: dt, size: 0.07, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }); globe.add(new THREE.Points(g2, tMat));
      const c = new THREE.Vector3(); asia.forEach((p, i) => c.add(p.clone().multiplyScalar(asiaF[i]))); c.normalize(); ASIA_YAW = -Math.atan2(c.x, c.z); ASIA_PITCH = Math.atan2(c.y, Math.hypot(c.x, c.z)); }

    function buildAsiaPlane() { const BN = MOB ? 600 : 1100, bp = new Float32Array(BN * 3); for (let i = 0; i < BN; i++) { bp[i * 3] = (Math.random() - 0.5) * 46; bp[i * 3 + 1] = 0; bp[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4; }
      const bg = new THREE.BufferGeometry(); bg.setAttribute("position", new THREE.BufferAttribute(bp, 3));
      aBmat = new THREE.PointsMaterial({ map: dt, size: 0.12, color: 0x2f6088, transparent: true, opacity: 0, depthWrite: false }); aplane.add(new THREE.Points(bg, aBmat));
      const T = MOB ? 120 : 240, dp = new Float32Array(T * 3); for (let i = 0; i < T; i++) { const x = (Math.random() - 0.5) * 24, z = (Math.random() - 0.5) * 22 - 2; dp[i * 3] = x; dp[i * 3 + 1] = 0.02; dp[i * 3 + 2] = z;
        const h = 22 + Math.random() * 26; const bm = makeBeam(x, z, h, 0x37b6ff, 0); aplane.add(bm.line); aBeams.push({ bm, h, delay: Math.random() }); }
      const dg = new THREE.BufferGeometry(); dg.setAttribute("position", new THREE.BufferAttribute(dp, 3)); aDmat = new THREE.PointsMaterial({ map: dt, size: 0, color: 0x6fd0ff, transparent: true, opacity: 0, depthWrite: false }); aplane.add(new THREE.Points(dg, aDmat)); }

    function buildJapan() { const W = 1600, H = 800, D = sampleMask(mask, W, H); const step = 0.12, L0 = 128, T0 = 30, COLS = Math.round((147 - 128) / step), ROWS = Math.round((46 - 30) / step);
      const toP = (lon: number, lat: number) => new THREE.Vector3((lon - 139) * 2.4, 0, -(lat - 38) * 2.4);
      const isLand = (c: number, r: number) => { const lon = L0 + c * step, lat = T0 + r * step, u = ((lon + 180) / 360 * W) | 0, v = ((90 - lat) / 180 * H) | 0, i = (v * W + u) * 4; return (D[i] + D[i + 1] + D[i + 2]) / 3 < 128; };
      const key = (c: number, r: number) => c + "_" + r, vis = new Set<string>(); const find = (c0: number, r0: number): [number, number] | null => { for (let rad = 0; rad < 8; rad++) for (let dc = -rad; dc <= rad; dc++) for (let dr = -rad; dr <= rad; dr++) { const c = c0 + dc, r = r0 + dr; if (c >= 0 && c < COLS && r >= 0 && r < ROWS && isLand(c, r)) return [c, r]; } return null; };
      const seeds = ([[139.7, 35.7], [141.35, 43.06], [130.4, 33.6], [133.5, 33.7]] as [number, number][]).map(([lon, lat]) => [Math.round((lon - L0) / step), Math.round((lat - T0) / step)] as [number, number]);
      const q: [number, number][] = []; seeds.forEach((s) => { const f = find(s[0], s[1]); if (f && !vis.has(key(f[0], f[1]))) { vis.add(key(f[0], f[1])); q.push(f); } });
      while (q.length) { const [c, r] = q.pop()!; for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) { const nc = c + dc, nr = r + dr; if (nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS && !vis.has(key(nc, nr)) && isLand(nc, nr)) { vis.add(key(nc, nr)); q.push([nc, nr]); } } }
      let dots: THREE.Vector3[] = []; vis.forEach((k) => { const [c, r] = k.split("_").map(Number); dots.push(toP(L0 + c * step, T0 + r * step)); });
      const cen = new THREE.Vector3(); dots.forEach((p) => cen.add(p)); cen.multiplyScalar(1 / Math.max(dots.length, 1)); cen.y = 0; dots = dots.map((p) => p.clone().sub(cen));
      let ext = 1; dots.forEach((p) => (ext = Math.max(ext, Math.hypot(p.x, p.z)))); JFIT = ext / Math.tan(50 * Math.PI / 360) * 1.15;
      const lpf = new Float32Array(dots.length * 3); dots.forEach((p, i) => { lpf[i * 3] = p.x; lpf[i * 3 + 1] = 0.02; lpf[i * 3 + 2] = p.z; });
      const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.BufferAttribute(lpf, 3)); jMapMat = new THREE.PointsMaterial({ map: dt, size: 0.2, color: 0x9fd8ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }); jp.add(new THREE.Points(lg, jMapMat));
      dots.filter(() => Math.random() < 0.05).forEach((p) => { const w = 0.26 + Math.random() * 0.3, hb = 1.0 + Math.random() * 3.0, d = 0.26 + Math.random() * 0.3;
        const bld = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, hb, d)), new THREE.LineBasicMaterial({ color: 0xffc266, transparent: true, opacity: 0, blending: THREE.AdditiveBlending })); bld.position.set(p.x, 0, p.z); bld.scale.y = 0.001; jp.add(bld);
        const bl = 5 + Math.random() * 6; const jb = makeBeam(p.x, p.z, bl, 0xffb24d, hb); jp.add(jb.line); jComp.push({ bld, jb, hb, bl, delay: Math.random() }); });
    }

    function makeLemniscate(a: number, num = 280) { const pts: THREE.Vector3[] = []; for (let i = 0; i <= num; i++) { const t = (i / num) * Math.PI * 2, d = 1 + Math.sin(t) * Math.sin(t); pts.push(new THREE.Vector3(a * Math.cos(t) / d, a * Math.sin(t) * Math.cos(t) / d * 1.7, 0)); } return new THREE.CatmullRomCurve3(pts, true); }
    function buildFinale() { const curve = makeLemniscate(7.6); const M = 720; const PTS = curve.getPoints(M);
      const Rn = MOB ? 12 : 20, LPn = MOB ? 12 : 18, N = Rn * LPn, K = 24, SEG = K - 1, L = 0.1;
      const RF: THREE.Vector3[] = [], RC: THREE.Vector3[] = [], RE: THREE.Vector3[] = [], RET = new Float32Array(Rn);
      for (let r = 0; r < Rn; r++) { const aa = Math.random() * 6.28, ee = (Math.random() - 0.5) * Math.PI, rad = 26 + Math.random() * 14;
        const Fp = new THREE.Vector3(Math.cos(aa) * Math.cos(ee) * rad, Math.sin(ee) * rad, Math.sin(aa) * Math.cos(ee) * rad);
        const et = Math.random(); RET[r] = et; const ei = Math.floor(et * M) % M, ni = (ei + 1) % M; const Ep = PTS[ei].clone();
        const Tn = PTS[ni].clone().sub(PTS[ei]).normalize(); const perpIn = new THREE.Vector3(-Tn.y, Tn.x, 0);
        const back = 7 + Math.random() * 5;
        const Cp = Ep.clone().sub(Tn.multiplyScalar(back)).add(perpIn.multiplyScalar((Math.random() - 0.5) * 5)).add(new THREE.Vector3(0, 0, (Math.random() - 0.5) * 7));
        RF.push(Fp); RC.push(Cp); RE.push(Ep); }
      const RIV = new Int16Array(N), ET = new Float32Array(N), DLY = new Float32Array(N), OFF = new Float32Array(N * 3);
      const VN = N * SEG * 2, P = new Float32Array(VN * 3), C = new Float32Array(VN * 3);
      const turq = new THREE.Color(0x2fe0ff), blue = new THREE.Color(0x4ab4ff), amber = new THREE.Color(0xffc266); let vi = 0;
      for (let i = 0; i < N; i++) { const r = (i / LPn) | 0, inr = i % LPn; RIV[i] = r; ET[i] = RET[r] + ((inr / LPn) - 0.5) * 0.06; DLY[i] = Math.random() * 0.12 + (inr / LPn) * 0.03;
        OFF[i * 3] = (Math.random() - 0.5) * 1.0; OFF[i * 3 + 1] = (Math.random() - 0.5) * 1.0; OFF[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
        const c = (r % 3 === 0 ? amber : (r % 3 === 1 ? blue : turq));
        for (let k = 0; k < SEG; k++) { const f0 = 0.55 + 0.45 * (k / SEG), f1 = 0.55 + 0.45 * ((k + 1) / SEG); C[vi * 3] = c.r * f0; C[vi * 3 + 1] = c.g * f0; C[vi * 3 + 2] = c.b * f0; vi++; C[vi * 3] = c.r * f1; C[vi * 3 + 1] = c.g * f1; C[vi * 3 + 2] = c.b * f1; vi++; } }
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(P, 3)); g.setAttribute("color", new THREE.BufferAttribute(C, 3));
      const m = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }); fin.add(new THREE.LineSegments(g, m));
      finTrails = { M, PTS, N, K, SEG, L, RF, RC, RE, RIV, ET, DLY, OFF, g, m, P, tx: new Float32Array(K), ty: new Float32Array(K), tz: new Float32Array(K) }; }
    function updateTrails(p: number, fAlpha: number) { if (!finTrails) return; const F = finTrails, P = F.P, K = F.K, L = F.L, tx = F.tx, ty = F.ty, tz = F.tz;
      const samp = (t: number) => F.PTS[Math.min(F.M, Math.max(0, Math.floor((((t % 1) + 1) % 1) * F.M)))]; let vi = 0;
      const fm = eo(cl(0.88, 0.93, p)); const circ = circAcc; const ARC = 0.22;
      for (let i = 0; i < F.N; i++) { const r = F.RIV[i], Fp = F.RF[r], Cp = F.RC[r], Ep = F.RE[r], et = F.ET[i], ox = F.OFF[i * 3], oy = F.OFF[i * 3 + 1], oz = F.OFF[i * 3 + 2];
        const headW = eo(cl(0.72 + F.DLY[i], 0.91, p)) * (1 + L); const phase = et + circ;
        for (let k = 0; k < K; k++) { const kf = k / (K - 1);
          let fx, fy, fz; { let w = headW - L + kf * L; if (w < 0) w = 0;
            if (w <= 1) { const u = w, iu = 1 - u, ww = 0.35 + 0.65 * u; fx = iu * iu * Fp.x + 2 * iu * u * Cp.x + u * u * Ep.x + ox * ww; fy = iu * iu * Fp.y + 2 * iu * u * Cp.y + u * u * Ep.y + oy * ww; fz = iu * iu * Fp.z + 2 * iu * u * Cp.z + u * u * Ep.z + oz * ww; }
            else { const cp = samp(et + (w - 1)); fx = cp.x + ox; fy = cp.y + oy; fz = cp.z + oz; } }
          if (fm <= 0.001) { tx[k] = fx; ty[k] = fy; tz[k] = fz; continue; }
          const cp = samp(phase + (kf - 0.5) * ARC); const cx = cp.x + ox * 0.9, cy = cp.y + oy * 0.9, cz = cp.z + oz * 0.9;
          tx[k] = fx + (cx - fx) * fm; ty[k] = fy + (cy - fy) * fm; tz[k] = fz + (cz - fz) * fm; }
        for (let k = 0; k < F.SEG; k++) { P[vi * 3] = tx[k]; P[vi * 3 + 1] = ty[k]; P[vi * 3 + 2] = tz[k]; vi++; P[vi * 3] = tx[k + 1]; P[vi * 3 + 1] = ty[k + 1]; P[vi * 3 + 2] = tz[k + 1]; vi++; } }
      F.g.attributes.position.needsUpdate = true; F.m.opacity = fAlpha; }

    const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight).multiplyScalar(MOB ? 0.5 : 1), 0.95, 0.55, 0.2); composer.addPass(bloom);
    const GradeShader = { uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uAb: { value: 0.0022 }, uVig: { value: 1.12 }, uGrain: { value: 0.045 } },
      vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "uniform sampler2D tDiffuse;uniform float uTime,uAb,uVig,uGrain;varying vec2 vUv;float rnd(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}void main(){vec2 d=vUv-0.5;float r=length(d);vec2 ab=d*uAb*(0.4+r);vec4 c;c.r=texture2D(tDiffuse,vUv+ab).r;c.g=texture2D(tDiffuse,vUv).g;c.b=texture2D(tDiffuse,vUv-ab).b;c.a=1.0;float l=dot(c.rgb,vec3(0.299,0.587,0.114));c.rgb=mix(vec3(l),c.rgb,1.16);c.rgb=(c.rgb-0.5)*1.045+0.5;float vig=smoothstep(0.95,0.30,r*uVig);c.rgb*=mix(0.5,1.0,vig);float g=(rnd(vUv+fract(uTime*0.6))-0.5)*uGrain;c.rgb+=g;gl_FragColor=c;}" };
    const grade = new ShaderPass(GradeShader); composer.addPass(grade);
    composer.addPass(new SMAAPass(innerWidth, innerHeight));

    const ob = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
    let sVel = 0, prevP = 0, lastTT = 0, circAcc = 0;
    let pmx = 0, pmy = 0, tmx = 0, tmy = 0;
    const onMove = (e: PointerEvent) => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; };
    addEventListener("pointermove", onMove);

    gsap.registerPlugin(ScrollTrigger);
    const gprox = { v: 0 };
    const st = gsap.to(gprox, { v: 1, ease: "none", scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: 0.6 } });

    const t0 = performance.now();
    let raf = 0;
    function tick() {
      const p = gprox.v, tt = (performance.now() - t0) / 1000;
      const d = Math.min(tt - lastTT, 0.05); lastTT = tt; sVel = lp(sVel, Math.min(Math.abs(p - prevP) * 90, 1), 0.12); prevP = p; circAcc += (0.4 + sVel * 1.3) * d;
      if (ready) {
        const inP = cl(0.1, 0.2, p); bloom.strength = lp(1.05, 0.78, inP); bloom.radius = lp(0.6, 0.45, inP);
        globe.visible = p < 0.16;
        if (globe.visible) { const gf = 1 - eo(cl(0.07, 0.13, p)); gMat.opacity = eo(cl(0, 0.06, p)) * 0.55 * gf; tMat.opacity = eo(cl(0.03, 0.09, p)) * 1.0 * gf; globe.rotation.y = ASIA_YAW + (1 - eo(cl(0, 0.1, p))) * 0.7 + tt * 0.012; globe.rotation.x = ASIA_PITCH; }
        const aAlpha = eo(cl(0.13, 0.16, p)) * (1 - eo(cl(0.325, 0.36, p))); aplane.visible = aAlpha > 0.001;
        if (aplane.visible) { aBmat.opacity = eo(cl(0.13, 0.18, p)) * 0.7 * aAlpha; const dop = eo(cl(0.14, 0.19, p)); aDmat.opacity = dop * aAlpha; aDmat.size = dop * 0.5;
          aBeams.forEach((b) => { const r = eo(cl(0.21 + b.delay * 0.04, 0.28, p)); updateBeam(b.bm, r, r * 0.95 * aAlpha, tt + b.delay * 3); }); }
        const jAlpha = eo(cl(0.33, 0.38, p)) * (1 - eo(cl(0.66, 0.72, p))); jp.visible = jAlpha > 0.001;
        if (jp.visible) { jMapMat.opacity = eo(cl(0.33, 0.42, p)) * 0.95 * jAlpha;
          jComp.forEach((c) => { let rb = ob(cl(0.4 + c.delay * 0.06, 0.5, p)); if (rb < 0.001) rb = 0.001; const idle = 1 + Math.sin(tt * 1.3 + c.delay * 6.28) * 0.014 * eo(cl(0.5, 0.56, p)); rb *= idle; c.bld.scale.y = rb; c.bld.position.y = c.hb * rb / 2; (c.bld.material as THREE.LineBasicMaterial).opacity = eo(cl(0.38, 0.46, p)) * 0.9 * jAlpha;
            const rl = eo(cl(0.545 + c.delay * 0.1, 0.65, p)); updateBeam(c.jb, rl, rl * 0.95 * jAlpha, tt + c.delay * 2); }); }
        const fAlpha = eo(cl(0.7, 0.74, p)) * (1 - eo(cl(0.966, 0.979, p))); fin.visible = fAlpha > 0.001;
        if (fin.visible) { updateTrails(p, fAlpha); fin.rotation.y = Math.sin(tt * 0.12) * 0.022; }
        dustMat.opacity = eo(cl(0.02, 0.12, p)) * 0.5 * (1 - eo(cl(0.95, 0.99, p))); dust.rotation.y = tt * 0.018; dust.rotation.x = Math.sin(tt * 0.05) * 0.08;
        camera.up.set(Math.sin(tt * 0.17) * 0.04, 1, 0);
        let _fov = innerWidth < innerHeight ? 64 : 50;
        if (p < 0.13) { camera.position.set(0, 0, lp(7, 2.0, eo(cl(0.07, 0.13, p)))); camera.lookAt(0, 0, 0); }
        else if (p < 0.33) {
          if (p < 0.21) { const a = eo(cl(0.13, 0.21, p)); camera.position.set(0, lp(12, 2.2, a), lp(22, 14, a)); camera.lookAt(0, lp(0.6, 3, a), -4); }
          else if (p < 0.26) { const a = eo(cl(0.21, 0.26, p)); camera.position.set(0, lp(2.2, 2.8, a), lp(14, 5, a)); camera.lookAt(0, lp(3.5, 6, a), -6); }
          else { const a = eo(cl(0.26, 0.33, p)); camera.position.set(0, lp(2.8, 5, a), 6); camera.lookAt(0, lp(8, 18, a), -3); _fov = lp(_fov, 74, a); }
        } else if (p < 0.72) {
          if (p < 0.4) { const a = eo(cl(0.33, 0.4, p)); camera.position.set(0, JFIT, lp(0.1, JFIT * 0.16, a)); camera.lookAt(0, 0, 0); }
          else if (p < 0.48) { const a = eo(cl(0.4, 0.48, p)); camera.position.set(lp(0, -18, a), lp(JFIT, 3.5, a), lp(JFIT * 0.16, 18, a)); camera.lookAt(lp(0, -12, a), lp(0, 2.6, a), lp(0, 12, a)); }
          else if (p < 0.58) { const a = eo(cl(0.48, 0.58, p)); const cx = lp(-18, 2, a) + Math.sin(a * Math.PI * 3) * 3, cy = lp(3.5, 2.6, a), cz = lp(16, -4, a); camera.position.set(cx, cy, cz); camera.lookAt(cx + 5, 2.6, cz - 6); }
          else { const a = eo(cl(0.58, 0.66, p)); camera.position.set(lp(2, 0, a), lp(2.6, 5, a), lp(-4, 24, a)); camera.lookAt(0, lp(2.6, 6, a), lp(-6, -2, a)); }
        } else { const a = eo(cl(0.72, 0.84, p)); camera.position.set(lp(camera.position.x, 0, 0.1), lp(camera.position.y, 0, 0.1), lp(18, 17, a)); camera.lookAt(0, 0, 0); }
        if (Math.abs(camera.fov - _fov) > 0.01) { camera.fov = _fov; camera.updateProjectionMatrix(); }
        const warpI = eo(cl(0.205, 0.27, p)) * (1 - eo(cl(0.33, 0.37, p))); warpMat.opacity = warpI * 0.95;
        if (warpI > 0.002) { updateWarp(0.35 + warpI * 0.9, d, camera.position.y); warp.visible = true; } else warp.visible = false;
        const fdrift = 1 - eo(cl(0.88, 0.96, p)); camera.position.x += Math.sin(tt * 0.16) * 0.55 * fdrift; camera.position.y += Math.cos(tt * 0.12) * 0.32 * fdrift;
        pmx += (tmx - pmx) * (1 - Math.pow(0.0001, d)); pmy += (tmy - pmy) * (1 - Math.pow(0.0001, d)); camera.position.x += pmx * 1.1 * fdrift; camera.position.y += -pmy * 0.7 * fdrift;
        const emrg = eo(cl(0.95, 0.965, p)), mrg = eo(cl(0.979, 0.99, p)), wht = eo(cl(0.99, 1.0, p));
        const sc = lp(0.82, 1.0, emrg) * lp(1, 0.127, mrg), dx = lp(0, -24, mrg);
        owlbigEl.style.opacity = (emrg * (1 - mrg)).toFixed(3);
        owlbigEl.style.transform = "translate(calc(-50% + " + dx.toFixed(1) + "px),-50%) scale(" + sc.toFixed(3) + ")";
        brandEl.style.opacity = mrg.toFixed(3);
        logoWEl.style.opacity = (1 - wht).toFixed(3);
        logoDEl.style.opacity = wht.toFixed(3);
        whitebgEl.style.opacity = wht.toFixed(3);
      }
      grade.uniforms.uTime.value = tt;
      composer.render(); raf = requestAnimationFrame(tick);
    }
    tick();

    const onResize = () => { renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); bloom.resolution.set(innerWidth * (MOB ? 0.5 : 1), innerHeight * (MOB ? 0.5 : 1)); camera.aspect = innerWidth / innerHeight; camera.fov = innerWidth < innerHeight ? 64 : 50; camera.updateProjectionMatrix(); };
    addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", onResize);
      st.scrollTrigger?.kill(); st.kill();
      scene.traverse((o: any) => { o.geometry?.dispose?.(); const m = o.material; if (Array.isArray(m)) m.forEach((x) => x.dispose?.()); else m?.dispose?.(); });
      dt.dispose(); composer.dispose?.(); renderer.dispose(); renderer.forceContextLoss?.();
      canvas.remove();
    };
  }, []);

  return (
    <section ref={wrapRef} style={{ position: "relative", background: "#02040A" }} aria-label="OwlMatch シネマティックヒーロー">
      <div ref={hostRef} style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(120% 100% at 50% 46%, rgba(2,4,10,0) 50%, rgba(2,4,10,.9) 100%)" }} />
        <div ref={whiteRef} style={{ position: "absolute", inset: 0, zIndex: 2, background: "#ffffff", opacity: 0, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
          <img ref={owlbigRef} src={`${A}/owl.png`} alt="" style={{ position: "absolute", top: "50%", left: "50%", width: 780, transform: "translate(-50%,-50%) scale(0.8)", opacity: 0, willChange: "transform,opacity", filter: "drop-shadow(0 0 36px rgba(24,210,240,.75)) drop-shadow(0 0 96px rgba(24,210,240,.45))" }} />
          <div ref={brandRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0 }}>
            <img ref={logoWRef} src={`${A}/logo.png`} alt="" style={{ width: 380, display: "block", filter: "brightness(0) invert(1)" }} />
            <img ref={logoDRef} src={`${A}/logo.png`} alt="OwlMatch" style={{ width: 380, display: "block", position: "absolute", inset: 0, opacity: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
