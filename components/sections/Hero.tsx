"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroContent } from "@/data/content";
import InteractivePortrait from "@/components/ui/InteractivePortrait";

export default function Hero() {
  const [introDone, setIntroDone] = useState(false);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(charRefs.current, {
        y: 100,
        opacity: 0,
        rotateX: -80,
      });

      gsap.set(
        [
          subtitleRef.current,
          portraitWrapRef.current,
          scrollIndicatorRef.current,
        ],
        {
          opacity: 0,
        },
      );

      gsap.set(buttonsRef.current?.children ?? [], {
        y: 20,
        opacity: 0,
      });

      gsap.set(portraitWrapRef.current, {
        clipPath: "inset(0 0 100% 0)",
        scale: 1.15,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleIntroComplete = () => {
      setIntroDone(true);
    };

    window.addEventListener("introComplete", handleIntroComplete);

    return () => {
      window.removeEventListener("introComplete", handleIntroComplete);
    };
  }, []);

  useEffect(() => {
    if (!introDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(charRefs.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.09,
      })
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.45",
        )
        .to(
          buttonsRef.current?.children ?? [],
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.5,
          },
          "-=0.25",
        )
        .to(
          portraitWrapRef.current,
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            opacity: 1,
            duration: 1.2,
          },
          "-=0.8",
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.to(scrollIndicatorRef.current, {
                y: 6,
                repeat: -1,
                yoyo: true,
                duration: 0.9,
                ease: "sine.inOut",
              });
            },
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, [introDone]);

  return (
    <section
      id="hero"
      className="
        relative min-h-screen w-full
        flex items-center
        bg-white overflow-hidden
        pt-24 pb-16
      "
    >
      <div className="w-full px-6 md:px-12 lg:px-24">
        <div
          className="
            grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]
            gap-8 md:gap-10 lg:gap-14
            items-center
          "
        >
          <div className="flex flex-col gap-2">
            <h1
              className="
                text-7xl md:text-8xl lg:text-7xl
                font-bold font-sans tracking-tighter
                text-black leading-none
                [perspective:900px]
              "
            >
            {heroContent.headline.split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  ref={(el) => {
                    if (el) charRefs.current[index] = el;
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </span>

              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="
                text-2xl md:text-4xl
                font-light text-black
                tracking-tight
              "
            >
              {heroContent.subheadline}
            </p>

           
            <div ref={buttonsRef} className="flex flex-wrap gap-4 mt-2">
              {heroContent.buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={`
                    inline-flex items-center gap-2
                    px-6 py-3 text-sm font-medium
                    transition-all duration-200
                    ${
                      btn.label === "Enter Site"
                        ? "bg-black text-white hover:bg-black/80"
                        : "border border-black text-black hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {btn.label}
                  <span className="text-base leading-none">→</span>
                </a>
              ))}
            </div>
          </div>

          <div
            ref={portraitWrapRef}
            className="relative flex flex-col items-center md:items-end"
          >
            <div className="self-end mb-3 text-right">
              <p className="text-xs font-mono text-black/40 tracking-widest uppercase">
                {heroContent.photo.label}
              </p>
              <p className="text-xs text-black/50">{heroContent.photo.sub}</p>
            </div>

            <InteractivePortrait
              src={heroContent.photo.src}
              alt={heroContent.photo.alt}
              priority
              objectPosition="object-top"
            />
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2
            text-black/30
          "
        >
          <div
            className="
              w-5 h-8 rounded-full
              border-2 border-black/20
              flex items-start justify-center
              pt-1.5
            "
          >
            <div className="w-0.5 h-1.5 bg-black/30 rounded-full" />
          </div>

          <span className="text-xs tracking-widest font-mono uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}