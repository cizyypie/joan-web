"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillSplitContent } from "@/data/content";
import InteractivePortrait from "./ui/InteractivePortrait";

gsap.registerPlugin(ScrollTrigger);

export default function SkillSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const chipContainerRefs = useRef<HTMLDivElement[]>([]);
  const portraitRef = useRef<HTMLDivElement>(null);

  const assignRef = (
    refArray: React.MutableRefObject<HTMLDivElement[]>,
    el: HTMLDivElement | null,
    index: number,
  ) => {
    if (el) refArray.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline: fades up
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      cardRefs.current.forEach((card, index) => {
        const direction = index === 0 ? -60 : 60;

        gsap.fromTo(
          card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      chipContainerRefs.current.forEach((container) => {
        gsap.fromTo(
          container.children,
          { y: 12, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
            // back.out: gives the "pop" feel
            stagger: 0.07,
            scrollTrigger: {
              trigger: container,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.fromTo(
        portraitRef.current,
        { y: 24, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
  <section
    id="skills"
    ref={sectionRef}
    className="
      w-full bg-white
      py-24 md:py-32
      border-t border-black/10
    "
  >
    <div className="w-full px-6 md:px-12 lg:px-20">
      {/* Section Headline */}
      <h2
        ref={headlineRef}
        className="
          text-3xl md:text-4xl lg:text-5xl
          font-bold tracking-tight text-black
          mb-20 md:mb-24 lg:mb-32
        "
      >
        {skillSplitContent.headline}
      </h2>
      {/* Cards + Portrait */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-[1fr_360px]
          gap-12 md:gap-16
          items-start
        "
      >
        {/* Cards Column */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {skillSplitContent.sides.map((side, index) => (
            <div
              key={side.id}
              ref={(el) => assignRef(cardRefs, el, index)}
              className="
                flex flex-col gap-6
                border border-black/15
                p-8
                hover:border-black/40
                transition-all duration-300
                group
              "
            >
              {/* Card Header: icon + title */}
              <div className="flex items-center gap-3">
                <span
                  className="
                    text-lg font-mono text-black/50
                    group-hover:text-black
                    transition-colors duration-300
                  "
                >
                  {side.icon}
                </span>

                <h3 className="text-xl font-bold text-black tracking-tight">
                  {side.title}
                </h3>
              </div>

              {/* Card Description */}
              <p className="text-sm text-black/55 leading-relaxed">
                {side.description}
              </p>

              {/* Skill Chips */}
              <div
                ref={(el) => assignRef(chipContainerRefs, el, index)}
                className="flex flex-wrap gap-2"
              >
                {side.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      px-3 py-1.5
                      border border-black/20
                      text-xs font-medium text-black/70
                      hover:border-black
                      hover:text-black
                      hover:-translate-y-0.5
                      hover:shadow-sm
                      transition-all duration-200
                      cursor-default
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Portrait Column */}
        <div ref={portraitRef} className="flex flex-col gap-4">
          <InteractivePortrait
            src={skillSplitContent.photo.src}
            alt={skillSplitContent.photo.alt}
            objectPosition="object-center"
            className="
              w-full
              aspect-[9/16]
              object-cover
              max-w-none
            "
          />

          <div>
            <p className="text-xs font-mono text-black/40 tracking-widest uppercase">
              {skillSplitContent.photo.label}
            </p>

            <p className="text-sm font-medium text-black">
              {skillSplitContent.photo.caption}
            </p>

            <p className="text-xs text-black/50">
              {skillSplitContent.photo.sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}