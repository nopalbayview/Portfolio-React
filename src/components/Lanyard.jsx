"use client";
import { useEffect, useRef } from "react";

// ---- Tuning Fisika Tali ----
const SEGMENTS = 8;      
const ROPE_LEN = 210;    
const CARD_W = 210;
const CARD_H = 300;
const GRAVITY = 0.55;    
const DAMPING = 0.992;   
const STIFFNESS = 0.85;  
const ITERATIONS = 12;
const STEP = 1000 / 60;  

export default function Lanyard({
  photo = "/about/Jiwoo1.jpeg",
  backPhoto = null,
  alt = "Foto profil",
  accent = "#000000", // Tali dibuat dominan hitam
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  const rearImage = backPhoto || photo;

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const cardEl = cardRef.current;
    const ctx = cv.getContext("2d");

    let w = 0, h = 0, raf, last = performance.now(), acc = 0;
    let drag = null; 
    let target = { x: 0, y: 0 };
    let flipAngle = 0; 
    let lastX = 0;

    const N = SEGMENTS + 2;
    const P = Array.from({ length: N }, () => ({ x: 0, y: 0, px: 0, py: 0, im: 1 }));
    P[0].im = 0;
    P[N - 1].im = 0.5; 
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
      B.px -= 14; 
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
          p.px = p.x; 
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
        const [i, j, rest, k] = links[links.length - 1];
        const a = P[i], b = P[j];
        const ia = a === B && drag ? 0 : a.im;
        const ib = b === B && drag ? 0 : b.im;
        const wsum = ia + ib;
        if (wsum) {
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const c = ((d - rest) / d) * k;
          a.x += dx * c * (ia / wsum);
          a.y += dy * c * (ia / wsum);
          b.x -= dx * c * (ib / wsum);
          b.y -= dy * c * (ib / wsum);
        }

        for (let idx = 0; idx < links.length - 1; idx++) {
          const [li, lj, lrest, lk] = links[idx];
          const la = P[li], lb = P[lj];
          const lia = la === B && drag ? 0 : la.im;
          const lib = lb === B && drag ? 0 : lb.im;
          const lwsum = lia + lib;
          if (!lwsum) continue;
          const ldx = lb.x - la.x, ldy = lb.y - la.y;
          const ld = Math.hypot(ldx, ldy) || 0.0001;
          const lc = ((ld - lrest) / ld) * lk;
          la.x += ldx * lc * (lia / lwsum);
          la.y += ldy * lc * (lia / lwsum);
          lb.x -= ldx * lc * (lib / lwsum);
          lb.y -= ldy * lc * (lib / lwsum);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = ctx.lineCap = "round";
      
      // Gambar Tali Utama (Hitam Pekat)
      ctx.beginPath();
      ctx.moveTo(P[0].x - 4, P[0].y);
      for (let i = 1; i < SEGMENTS; i++) {
        const mx = (P[i].x + P[i + 1].x) / 2 - 4, my = (P[i].y + P[i + 1].y) / 2;
        ctx.quadraticCurveTo(P[i].x - 4, P[i].y, mx, my);
      }
      ctx.lineTo(A.x - 4, A.y);
      ctx.strokeStyle = "#1a1a1a"; // Hitam kain lanyard
      ctx.lineWidth = 10;
      ctx.stroke();

      // Garis tengah / tekstur tipis pada tali agar terlihat realistis
      ctx.beginPath();
      ctx.moveTo(P[0].x, P[0].y);
      for (let i = 1; i < SEGMENTS; i++) {
        const mx = (P[i].x + P[i + 1].x) / 2, my = (P[i].y + P[i + 1].y) / 2;
        ctx.quadraticCurveTo(P[i].x, P[i].y, mx, my);
      }
      ctx.lineTo(A.x, A.y);
      ctx.strokeStyle = "#333333"; 
      ctx.lineWidth = 2;
      ctx.stroke();

      // Fisika Putaran 3D Kartu
      const vx = B.x - lastX;
      lastX = B.x;
      flipAngle += vx * 0.03;
      flipAngle *= 0.95;

      const ang = Math.atan2(A.x - B.x, -(A.y - B.y));
      const scaleX = Math.cos(flipAngle);
      
      cardEl.style.transform = `translate(${B.x - CARD_W / 2}px, ${B.y - CARD_H / 2}px) rotate(${ang}rad) scaleX(${scaleX})`;
      
      const frontSide = cardEl.querySelector('.card-front');
      const backSide = cardEl.querySelector('.card-back');
      if (frontSide && backSide) {
        if (scaleX < 0) {
          frontSide.style.display = "none";
          backSide.style.display = "block";
        } else {
          frontSide.style.display = "block";
          backSide.style.display = "none";
        }
      }
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
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 640, overflow: "hidden", perspective: 1000 }}
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
          transformStyle: "preserve-3d",
        }}
      >
        {/* --- KANCING PENGATUR / KULIT PENGIKAT TALI MERAH/HITAM --- */}
        <div
          style={{
            position: "absolute",
            top: -24,
            left: "50%",
            width: 24,
            height: 22,
            marginLeft: -12,
            background: "#111111",
            borderRadius: 4,
            zIndex: 11,
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {/* Kancing Besi Kecil di Tengah Pengikat */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 6,
              height: 6,
              marginTop: -3,
              marginLeft: -3,
              borderRadius: "50%",
              background: "#c0c0c0",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
            }}
          />
        </div>

        {/* --- KELOMPOK PENGAIT BESI (LOBSTER / SWIVEL HOOK) --- */}
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            width: 18,
            height: 24,
            marginLeft: -9,
            zIndex: 10,
          }}
        >
          {/* Cincin Besi Atas */}
          <div style={{ width: 12, height: 10, border: "2px solid #d4d4d4", borderRadius: "50%", margin: "0 auto", background: "#e5e5e5" }} />
          {/* Badan Kait Besi */}
          <div style={{ width: 14, height: 14, background: "linear-gradient(135deg, #f5f5f5, #737373)", margin: "-2px auto 0", borderRadius: 3, boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
        </div>

        {/* --- CASE PLASTIK TRANSPARAN (LAMINASI / CARD HOLDER) --- */}
        <div
          style={{
            position: "absolute",
            inset: -8, // Membuat case plastik sedikit lebih besar dari kartu di dalamnya
            border: "2px solid rgba(255, 255, 255, 0.35)",
            borderRadius: 6,
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(0.5px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.45), inset 0 0 15px rgba(255,255,255,0.15)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          {/* Lubang Otoklek / Punch Hole di atas Case Plastik */}
          <div
            style={{
              position: "absolute",
              top: 4,
              left: "50%",
              width: 20,
              height: 6,
              marginLeft: -10,
              borderRadius: 3,
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
        </div>

        {/* SISI DEPAN KARTU */}
        <div className="card-front" style={{ width: "100%", height: "100%", position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
          <img
            src={photo}
            alt={alt}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
              display: "block",
            }}
          />
        </div>

        {/* SISI BELAKANG KARTU */}
        <div className="card-back" style={{ width: "100%", height: "100%", position: "absolute", inset: 0, backfaceVisibility: "hidden", display: "none", transform: "rotateY(180deg)" }}>
          <img
            src={rearImage}
            alt={`${alt} (Belakang)`}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
              display: "block",
              filter: "brightness(0.9) contrast(1.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}