"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const text = textRef.current;
    const line = lineRef.current;

    if (!root || !topPanel || !bottomPanel || !text || !line) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.set(root, { display: "none" });

        window.dispatchEvent(new Event("introComplete"));
      },
    });

    tl.fromTo(
      text,
      { y: 24, opacity: 0, letterSpacing: "0.2em" },
      {
        y: 0,
        opacity: 1,
        letterSpacing: "0.35em",
        duration: 0.8,
      },
    )
      .fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          transformOrigin: "center",
        },
        "-=0.35",
      )
      .to(text, {
        y: -18,
        opacity: 0,
        duration: 0.45,
        delay: 0.25,
      })
      .to(
        line,
        {
          scaleX: 0,
          duration: 0.45,
          transformOrigin: "center",
        },
        "<",
      )
      .to(
        topPanel,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.05",
      )
      .to(
        bottomPanel,
        {
          yPercent: 100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "<",
      );
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        fixed inset-0 z-[99999]
        pointer-events-none
      "
    >
      <div
        ref={topPanelRef}
        className="
          absolute left-0 top-0
          h-1/2 w-full
          bg-black
        "
      />

      <div
        ref={bottomPanelRef}
        className="
          absolute bottom-0 left-0
          h-1/2 w-full
          bg-black
        "
      />

      <div
        className="
          absolute inset-0
          flex flex-col items-center justify-center
          text-white
        "
      >
        <div
          ref={textRef}
          className="
            text-center
            text-xs md:text-sm
            font-mono uppercase
            tracking-[0.35em]
            text-white/75
          "
        >
          JOANITA / FROM LOGIC TO MOTION
        </div>

        <div
          ref={lineRef}
          className="
            mt-5 h-px w-40
            bg-white/40
          "
        />
      </div>
    </div>
  );
}
