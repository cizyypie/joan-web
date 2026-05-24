"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { heroContent } from "@/data/content";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        charRefs.current,
        {
          y: 100,
          opacity: 0,
          rotateX: -80,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: "power3.out",
        },
      )

        .fromTo(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.55",
        )

        .fromTo(
          bodyRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.45",
        )

        .fromTo(
          microcopyRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.4",
        )

        .fromTo(
          buttonsRef.current?.children ?? [],
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.5,
          },
          "-=0.35",
        )

        .fromTo(
          imageRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            scale: 1.15,
            opacity: 0,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            opacity: 1,
            duration: 1.4,
          },
          "-=1",
        )

        .fromTo(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: -10,
          },
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
        );

      const startHeroAnimation = () => {
        tl.play();
      };

      window.addEventListener("introComplete", startHeroAnimation);

      return () => {
        window.removeEventListener("introComplete", startHeroAnimation);
        ctx.revert();
      };
    });
  }, []);

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
          {/*LEFT: Text Content*/}
          <div className="flex flex-col gap-2">
            {/* Headline */}
            <h1
              ref={titleRef}
              className="
                text-7xl md:text-8xl lg:text-9xl
                font-bold tracking-tighter
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
                  {char}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              ref={subtitleRef}
              className="
                text-2xl md:text-3xl
                font-light text-black
                tracking-tight
              "
            >
              {heroContent.subheadline}
            </p>

            {/* Body */}
            <p
              ref={bodyRef}
              className="
                text-base md:text-lg
                text-black/70
                max-w-md leading-relaxed
              "
            >
              {heroContent.body}
            </p>

            {/* Microcopy */}
            <p
              ref={microcopyRef}
              className="
                text-sm text-black/40
                max-w-sm leading-relaxed
                border-l-2 border-black/20
                pl-3
              "
            >
              {heroContent.microcopy}
            </p>

            {/* Buttons */}
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
                        ? // Primary button: filled black
                          "bg-black text-white hover:bg-black/80"
                        : // Secondary button: outlined
                          "border border-black text-black hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {btn.label}
                  {/* Arrow icon */}
                  <span className="text-base leading-none">→</span>
                </a>
              ))}
            </div>
          </div>

          {/*RIGHT: Photo*/}
          <div
            ref={imageRef}
            className="relative flex flex-col items-center md:items-end"
          >
            {/* Photo label — top right of image */}
            <div
              className="
              self-end mb-3
              text-right
            "
            >
              <p className="text-xs font-mono text-black/40 tracking-widest uppercase">
                {heroContent.photo.label}
              </p>
              <p className="text-sm font-medium text-black">
                {heroContent.photo.caption}
              </p>
              <p className="text-xs text-black/50">
                {/* {heroContent.photo.sub} */}
              </p>
            </div>

            {/* Portrait image */}
            <div
              className="
            relative w-full
            max-w-sm md:max-w-md
            aspect-[9/16]
            overflow-hidden
            border border-black/10
          "
            >
              <Image
                src={heroContent.photo.src}
                alt={heroContent.photo.alt}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/*Scroll Indicator*/}
        <div
          ref={scrollIndicatorRef}
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2
            text-black/30
          "
        >
          {/* Mouse icon */}
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
