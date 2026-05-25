"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "@/data/content";
import InteractivePortrait from "@/components/ui/InteractivePortrait";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
  const badgeRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          imageRef.current,
          labelRef.current,
          headlineRef.current,
          ...paragraphRefs.current,
          ...badgeRefs.current,
        ],
        {
          y: 40,
          opacity: 0,
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(imageRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
      })
        .to(
          labelRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          "-=0.45",
        )
        .to(
          headlineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
          },
          "-=0.25",
        )
        .to(
          paragraphRefs.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.25",
        )
        .to(
          badgeRefs.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.2",
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
          <div ref={imageRef} className="flex flex-col gap-4">
            <InteractivePortrait
              src={aboutContent.photo.src}
              alt={aboutContent.photo.alt}
            />

            <div>
              <p className="text-xs font-mono text-black/40 tracking-widest uppercase">
                {aboutContent.photo.label}
              </p>
              <p className="text-sm font-medium text-black">
                {aboutContent.photo.caption}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p
              ref={labelRef}
              className="
                text-xs font-mono font-medium
                tracking-widest uppercase text-black/40
              "
            >
              {aboutContent.label}
            </p>

            <h2
              ref={headlineRef}
              className="
                text-3xl md:text-4xl lg:text-5xl
                font-bold tracking-tight text-black
                leading-tight
              "
            >
              {aboutContent.headline}
            </h2>

            <div className="flex flex-col gap-4">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  ref={(el) => {
                    if (el) paragraphRefs.current[index] = el;
                  }}
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
              {aboutContent.badges.map((badge, index) => (
                <span
                  key={badge}
                  ref={(el) => {
                    if (el) badgeRefs.current[index] = el;
                  }}
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