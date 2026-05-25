"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildLogsContent, projects } from "@/data/content";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BuildLogs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const assignCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardRefs.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtextRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        cardRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardRefs.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    const cleanups = cardRefs.current.map((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.015,
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.35,
          ease: "power3.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="builds"
      ref={sectionRef}
      className="
        w-full bg-white
        py-24 md:py-32
        border-t border-black/10
      "
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/*Section Header*/}
        <div className="mb-16 md:mb-24">
          <h2
            ref={headlineRef}
            className="
              text-3xl md:text-4xl lg:text-5xl
              font-bold tracking-tight text-black
              mb-4
            "
          >
            {buildLogsContent.headline}
          </h2>
          <p
            ref={subtextRef}
            className="
              text-base md:text-lg
              text-black/50
              max-w-xl
            "
          >
            {buildLogsContent.subtext}
          </p>
        </div>
        <div
          className="
            flex gap-6
            overflow-x-auto
            pb-4
            snap-x snap-mandatory
          "
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => assignCardRef(el, index)}
              className="
                group
                min-w-[280px] md:min-w-[360px]
                flex flex-col gap-5
                border border-black/15
                p-6
                hover:border-black
                transition-all duration-500
                cursor-default
                snap-start
              "
            >
              {/*Card Top: title + type label*/}
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="
                  text-lg font-bold text-black
                  tracking-tight leading-snug
                "
                >
                  {project.title}
                </h3>

                {/* Type label — top right corner */}
                <span
                  className="
                  shrink-0
                  text-xs font-mono text-black/40
                  border border-black/15
                  px-2 py-1
                  whitespace-nowrap
                "
                >
                  {project.type}
                </span>
              </div>
              <div
                className="
                relative w-full
                aspect-video
                overflow-hidden
                border border-black/10
                bg-black
              "
              >
                <div
                  className="
                  absolute inset-0
                  flex items-center justify-center
                  text-white/20 text-xs tracking-[0.3em]
                "
                >
                  <div
                  className="
                    relative w-full
                    aspect-video
                    overflow-hidden
                    border border-black/10
                    bg-black
                  "
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="
                        object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div
                      className="
                        absolute inset-0
                        flex items-center justify-center
                        text-white/20 text-xs tracking-[0.3em]
                      "
                    >
                      PROJECT PREVIEW
                    </div>
                  )}
                </div>
                </div>
              </div>

              {/*Description*/}
              <p className="text-sm text-black/60 leading-relaxed flex-1">
                {project.description}
              </p>

              {/*Tech Tags*/}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-xs font-medium
                      text-black/60
                      border border-black/15
                      px-2.5 py-1
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/*Links: GitHub + Live*/}
              <div className="flex items-center gap-5 pt-1 border-t border-black/10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1.5
                      text-xs font-medium text-black/50
                      hover:text-black
                      transition-colors duration-200
                      group/link
                    "
                  >
                    GitHub
                    <span
                      className="
                      inline-block
                      transition-transform duration-200
                      group-hover/link:translate-x-1
                    "
                    >
                      →
                    </span>
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1.5
                      text-xs font-medium text-black/50
                      hover:text-black
                      transition-colors duration-200
                      group/live
                    "
                  >
                    Live Site
                    <span
                      className="
                      inline-block
                      transition-transform duration-200
                      group-hover/live:translate-x-1
                    "
                    >
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
