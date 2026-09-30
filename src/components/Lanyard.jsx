"use client";
import { useEffect, useRef } from "react";


// ---- Tuning: ubah angka ini untuk mengatur "rasa" fisikanya ----
const SEGMENTS = 8;      // jumlah ruas tali
const ROPE_LEN = 210;    // panjang tali (px)
const CARD_W = 210;
const CARD_H = 300;
const GRAVITY = 0.55;    // makin besar makin berat
const DAMPING = 0.992;   // makin kecil makin cepat berhenti berayun
const STIFFNESS = 0.85;  // 1 = tali kaku, <1 = tali agak melar (efek membal)
const ITERATIONS = 12;
const STEP = 1000 / 60;  // fisika berjalan di 60 fps tetap

export default function Lanyard({
  photo = "/projects/Jiwoo1.jpeg",
  alt = "Foto profil",
  accent = "#00d4f5",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const cardEl = cardRef.current;
    const ctx = cv.getContext("2d");

    let w = 0, h = 0, raf, last = performance.now(), acc = 0;
    let drag = null; // { ox, oy } offset pointer -> pusat kartu
    let target = { x: 0, y: 0 };

    // titik 0 = jangkar, 1..SEGMENTS = tali (SEGMENTS = titik gantung kartu), SEGMENTS+1 = pusat kartu
    const N = SEGMENTS + 2;
    const P = Array.from({ length: N }, () => ({ x: 0, y: 0, px: 0, py: 0, im: 1 }));
    P[0].im = 0;
    P[N - 1].im = 0.5; // kartu lebih berat dari tali
    const A = P[SEGMENTS], B = P[N - 1];

    const links = [];
    for (let i = 0; i < SEGMENTS; i++) links.push([i, i + 1, ROPE_LEN / SEGMENTS, STIFFNESS]);
    links.push([SEGMENTS, N - 1, CARD_H / 2, 1]);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const ax = w / 2, ay = -16;
      P.forEach((p, i) => {
        const t = i <= SEGMENTS ? (i / SEGMENTS) * ROPE_LEN : ROPE_LEN + CARD_H / 2;
        p.x = p.px = ax;
        p.y = p.py = ay + t;
      });
      B.px -= 14; // dorongan awal supaya kartu berayun saat pertama muncul
    };

    resize();
    init();
    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(wrap);

    const step = () => {
      P[0].x = P[0].px = w / 2;
      P[0].y = P[0].py = -16;

      for (let i = 1; i < N; i++) {
        const p = P[i];
        if (p === B && drag) {
          p.px = p.x; // simpan kecepatan terakhir supaya bisa "dilempar"
          p.x = target.x;
          p.y = target.y;
          continue;
        }
        let vx = (p.x - p.px) * DAMPING;
        let vy = (p.y - p.py) * DAMPING;
        const v = Math.hypot(vx, vy);
        if (v > 60) { vx *= 60 / v; vy *= 60 / v; }
        p.px = p.x; p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }

      for (let it = 0; it < ITERATIONS; it++) {
        for (const [i, j, rest, k] of links) {
          const a = P[i], b = P[j];
          const ia = a === B && drag ? 0 : a.im;
          const ib = b === B && drag ? 0 : b.im;
          const wsum = ia + ib;
          if (!wsum) continue;
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const c = ((d - rest) / d) * k;
          a.x += dx * c * (ia / wsum);
          a.y += dy * c * (ia / wsum);
          b.x -= dx * c * (ib / wsum);
          b.y -= dy * c * (ib / wsum);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(P[0].x, P[0].y);
      for (let i = 1; i < SEGMENTS; i++) {
        const mx = (P[i].x + P[i + 1].x) / 2, my = (P[i].y + P[i + 1].y) / 2;
        ctx.quadraticCurveTo(P[i].x, P[i].y, mx, my);
      }
      ctx.lineTo(A.x, A.y);
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 17;
      ctx.stroke();
      ctx.strokeStyle = "#050505";
      ctx.lineWidth = 15;
      ctx.stroke();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // kartu menggantung dari titik A: sudut mengikuti arah A dari pusat kartu
      const ang = Math.atan2(A.x - B.x, -(A.y - B.y));
      cardEl.style.transform =
        `translate(${B.x - CARD_W / 2}px, ${B.y - CARD_H / 2}px) rotate(${ang}rad)`;
    };

    const loop = (now) => {
      acc += Math.min(now - last, 100);
      last = now;
      while (acc >= STEP) { step(); acc -= STEP; }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const toLocal = (e) => {
      const r = wrap.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e) => {
      const m = toLocal(e);
      drag = { ox: m.x - B.x, oy: m.y - B.y };
      target = { x: B.x, y: B.y };
      cardEl.setPointerCapture(e.pointerId);
      cardEl.style.cursor = "grabbing";
    };
    const move = (e) => {
      if (!drag) return;
      const m = toLocal(e);
      target = { x: m.x - drag.ox, y: m.y - drag.oy };
    };
    const up = () => {
      drag = null;
      cardEl.style.cursor = "grab";
    };

    cardEl.addEventListener("pointerdown", down);
    cardEl.addEventListener("pointermove", move);
    cardEl.addEventListener("pointerup", up);
    cardEl.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cardEl.removeEventListener("pointerdown", down);
      cardEl.removeEventListener("pointermove", move);
      cardEl.removeEventListener("pointerup", up);
      cardEl.removeEventListener("pointercancel", up);
    };
  }, [accent]);

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 640, overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: CARD_W,
          height: CARD_H,
          cursor: "grab",
          userSelect: "none",
          touchAction: "none",
          willChange: "transform",
        }}
      >
        {/* klip logam tempat tali terpasang */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            width: 26,
            height: 22,
            marginLeft: -13,
            borderRadius: 0,
            background: "linear-gradient(#d9d9d9, #7a7a7a)",
            zIndex: 1,
          }}
        />
        {/* hanya foto */}
        <img
          src={photo}
          alt={alt}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 0,
            display: "block",
            boxShadow: "0 24px 48px rgba(0,0,0,0.55)",
          }}
        />
      </div>
    </div>
  );
}