import { useEffect, useRef, useState } from "react";
import "./../styles/LoadingScreen.css";

/* ═══════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════ */

const ORANGE = "#FF6A00";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SNAP = "cubic-bezier(0.34, 1.4, 0.64, 1)";

const FONT = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(48px, 9vw, 140px)",
  lineHeight: 1,
  letterSpacing: "-0.02em",
};

/*
 * TRUE diagonal from top-left (0,0) to bottom-right (100,100).
 * Orange = bottom-left triangle.  White = top-right triangle.
 * Subtle organic S-curve (max ≈ 1 % deviation).
 */
const CLIP = {
  orange:
    "polygon(0% 0%, 11% 10.5%, 23% 22%, 35% 34.2%, 48% 47.5%, 60% 60.3%, 73% 73.5%, 86% 87%, 100% 100%, 0% 100%)",
  white:
    "polygon(0% 0%, 100% 0%, 100% 100%, 86% 87%, 73% 73.5%, 60% 60.3%, 48% 47.5%, 35% 34.2%, 23% 22%, 11% 10.5%)",
  start:
    "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%)",
};

/* Timeline */
const TL = {
  bgDelay: 0.1,
  bgDur: 0.38,
  letterStart: 0.5,
  letterGap: 0.12,
};

/* ═══════════════════════════════════════════════════════════
   Paper Plane SVG (nose → right)
   ═══════════════════════════════════════════════════════════ */

function PaperPlane({ style }) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="M58 28L8 6L20 28L8 50Z" fill="currentColor" />
      <path
        d="M20 28L58 28"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 28L8 6"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   Letter Piece Definitions
   ═══════════════════════════════════════════════════════════ */

const LETTERS = [
  {
    char: "T",
    pieces: [
      {
        clip: "polygon(0% 0%, 100% 0%, 100% 26%, 0% 26%)",
        anim: "slideFromLeft",
        dur: 0.48,
        off: 0,
      },
      {
        clip: "polygon(28% 0%, 72% 0%, 72% 100%, 28% 100%)",
        anim: "growUp",
        dur: 0.5,
        off: 0.08,
        origin: "center bottom",
      },
    ],
  },
  {
    char: "o",
    pieces: [
      {
        clip: "polygon(0% 0%, 52% 0%, 52% 100%, 0% 100%)",
        anim: "slideFromLeft",
        dur: 0.44,
        off: 0,
      },
      {
        clip: "polygon(48% 0%, 100% 0%, 100% 100%, 48% 100%)",
        anim: "slideFromRight",
        dur: 0.44,
        off: 0.06,
      },
    ],
  },
  {
    char: "d",
    pieces: [
      {
        clip: "polygon(56% 0%, 100% 0%, 100% 100%, 56% 100%)",
        anim: "growUp",
        dur: 0.46,
        off: 0,
        origin: "center bottom",
      },
      {
        clip: "polygon(0% 0%, 66% 0%, 66% 100%, 0% 100%)",
        anim: "scaleIn",
        dur: 0.5,
        off: 0.1,
        origin: "33% 55%",
      },
    ],
  },
  {
    char: "a",
    pieces: [
      {
        clip: "polygon(0% 0%, 66% 0%, 66% 100%, 0% 100%)",
        anim: "scaleIn",
        dur: 0.46,
        off: 0,
        origin: "33% 55%",
      },
      {
        clip: "polygon(56% 0%, 100% 0%, 100% 100%, 56% 100%)",
        anim: "growUp",
        dur: 0.46,
        off: 0.08,
        origin: "center bottom",
      },
    ],
  },
  {
    char: "y",
    pieces: [
      {
        clip: "polygon(0% 0%, 58% 0%, 58% 100%, 0% 100%)",
        anim: "rotateInLeft",
        dur: 0.5,
        off: 0,
        origin: "50% 38%",
      },
      {
        clip: "polygon(42% 0%, 100% 0%, 100% 100%, 42% 100%)",
        anim: "rotateInRight",
        dur: 0.5,
        off: 0.06,
        origin: "50% 38%",
      },
    ],
  },
  { char: "f", isSpecialF: true },
  {
    char: "i",
    pieces: [
      {
        clip: "polygon(0% 34%, 100% 34%, 100% 100%, 0% 100%)",
        anim: "growUp",
        dur: 0.44,
        off: 0,
        origin: "center bottom",
      },
      {
        clip: "polygon(0% 0%, 100% 0%, 100% 32%, 0% 32%)",
        anim: "dropBounce",
        dur: 0.52,
        off: 0.14,
      },
    ],
  },
  {
    char: "x",
    pieces: [
      {
        clip: "polygon(0% 0%, 56% 0%, 56% 100%, 0% 100%)",
        anim: "slideTopLeft",
        dur: 0.5,
        off: 0,
      },
      {
        clip: "polygon(44% 0%, 100% 0%, 100% 100%, 44% 100%)",
        anim: "slideTopRight",
        dur: 0.5,
        off: 0.06,
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   AnimatedLetter — standard clip-path assembly
   ═══════════════════════════════════════════════════════════ */

function AnimatedLetter({ char, pieces, baseDelay }) {
  return (
    <span className="ltr-wrap">
      <span className="ltr-spacer" style={FONT}>
        {char}
      </span>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="ltr-piece"
          style={{
            ...FONT,
            clipPath: p.clip,
            WebkitClipPath: p.clip,
            transformOrigin: p.origin || "center center",
            animation: `${p.anim} ${p.dur}s ${SNAP} ${baseDelay + p.off}s both`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   AnimatedF — SVG stroke-draw that STAYS as final form

   The SVG-drawn "f" with the curved bottom stays permanently.
   No crossfade to font glyph — the hand-drawn look IS the logo.
   ═══════════════════════════════════════════════════════════ */

function AnimatedF({ baseDelay }) {
  const mainRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const bar = barRef.current;
    if (!main || !bar) return;

    const mainLen = main.getTotalLength();
    const barLen = bar.getTotalLength();

    main.style.strokeDasharray = mainLen;
    main.style.strokeDashoffset = mainLen;
    bar.style.strokeDasharray = barLen;
    bar.style.strokeDashoffset = barLen;

    const d = baseDelay * 1000;
    const mainDur = 440;
    const barDur = 200;

    /* Draw main stroke: horizontal → bend up → stem → hook */
    main.animate([{ strokeDashoffset: mainLen }, { strokeDashoffset: 0 }], {
      duration: mainDur,
      delay: d,
      easing: EASE,
      fill: "forwards",
    });

    /* Crossbar slides in from left */
    bar.animate([{ strokeDashoffset: barLen }, { strokeDashoffset: 0 }], {
      duration: barDur,
      delay: d + mainDur * 0.68,
      easing: EASE,
      fill: "forwards",
    });
  }, [baseDelay]);

  return (
    <span className="ltr-wrap">
      <span className="ltr-spacer" style={FONT}>
        f
      </span>

      {/* SVG stroke — this IS the final rendered "f" */}
      <span className="f-svg-wrap">
        <svg viewBox="0 0 44 78" fill="none" className="f-svg">
          {/* Main path: bottom horizontal → smooth bend up → stem → hook */}
          <path
            ref={mainRef}
            d="M 2 68 L 14 68 C 19 68, 20 64, 20 56 L 20 14 Q 20 3, 30 3 L 38 5"
            stroke="currentColor"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Crossbar */}
          <path
            ref={barRef}
            d="M 3 40 L 36 40"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   LogoAssembly — renders all 8 letters in a flex row
   ═══════════════════════════════════════════════════════════ */

function LogoAssembly() {
  return (
    <div className="logo-row">
      {LETTERS.map((letter, i) => {
        const delay = TL.letterStart + i * TL.letterGap;

        if (letter.isSpecialF) {
          return (
            <span key={i} className="f-host">
              <AnimatedF baseDelay={delay} />
            </span>
          );
        }

        return <AnimatedLetter key={i} {...letter} baseDelay={delay} />;
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LoadingScreen — main export
   ═══════════════════════════════════════════════════════════ */

export default function LoadingScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);

  if (!ready) {
    return <div className="ls" />;
  }

  return (
    <div className="ls">
      {/* ─── Background: white base ─── */}
      <div className="ls-bg" />

      {/* ─── Background: orange diagonal (expands from bottom-left) ─── */}
      <div
        className="ls-bg ls-bg-orange"
        style={{
          background: ORANGE,
          clipPath: CLIP.start,
          animation: `expandDiag ${TL.bgDur}s ${EASE} ${TL.bgDelay}s forwards`,
        }}
      />

      {/* ─── Text mask: WHITE text/plane on orange background (bottom-left) ─── */}
      <div
        className="ls-text"
        style={{ clipPath: CLIP.orange, color: "#FFFFFF" }}
      >
        <div className="ls-plane">
          <PaperPlane style={{ width: "100%", height: "100%" }} />
        </div>
        <LogoAssembly />
      </div>

      {/* ─── Text mask: ORANGE text/plane on white background (top-right) ─── */}
      <div className="ls-text" style={{ clipPath: CLIP.white, color: ORANGE }}>
        <div className="ls-plane">
          <PaperPlane style={{ width: "100%", height: "100%" }} />
        </div>
        <LogoAssembly />
      </div>
    </div>
  );
}
