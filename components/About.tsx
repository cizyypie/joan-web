"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        imageRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        w-full bg-white
        py-24 md:py-32
        border-t border-black/10
      "
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div
          className="
            grid grid-cols-1 md:grid-cols-2
            gap-12 md:gap-16
            items-center
          "
        >
          {/* LEFT IMAGE */}
          <div ref={imageRef} className="flex flex-col gap-4">
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
                src={aboutContent.photo.src}
                alt={aboutContent.photo.alt}
                fill
                className="object-cover object-center"
              />
            </div>

            <div>
              <p className="text-xs font-mono text-black/40 tracking-widest uppercase">
                {aboutContent.photo.label}
              </p>
              <p className="text-sm font-medium text-black">
                {aboutContent.photo.caption}
              </p>
              <p className="text-xs text-black/50">{aboutContent.photo.sub}</p>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div ref={textRef} className="flex flex-col gap-6">
            <p
              className="
                text-xs font-mono font-medium
                tracking-widest uppercase text-black/40
              "
            >
              {aboutContent.label}
            </p>

            <h2
              className="
                text-3xl md:text-4xl lg:text-5xl
                font-bold tracking-tight text-black
                leading-tight
              "
            >
              {aboutContent.headline}
            </h2>

            <div className="flex flex-col gap-4">
              {aboutContent.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="
                    text-base md:text-lg
                    text-black/60
                    leading-relaxed
                    max-w-xl
                  "
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {aboutContent.badges.map((badge) => (
                <span
                  key={badge}
                  className="
                    px-3 py-1.5
                    border border-black/15
                    text-xs font-medium text-black/55
                  "
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
