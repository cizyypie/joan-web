  "use client";

  import { useEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { finalCTAContent } from "@/data/content";

  gsap.registerPlugin(ScrollTrigger);

  export default function FinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {

        // Headline fades up
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
          }
        );

        gsap.fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        
        //button
        gsap.fromTo(
          buttonsRef.current?.children ?? [],
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // Social icons stagger in
        gsap.fromTo(
          socialRef.current?.children ?? [],
          { y: 16, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
            stagger: 0.08,
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Footer line fades up
        gsap.fromTo(
          footerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );

      }, sectionRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        id="contact"
        ref={sectionRef}
        className="
          w-full bg-white
          pt-24 md:pt-32
          border-t border-black/10
        "
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          {/* Main CTA Block */}
          <div className="
            grid grid-cols-1 md:grid-cols-2
            gap-12 md:gap-16
            items-start
            pb-20 md:pb-28
          ">

            {/* LEFT: Headline + Paragraph */}
            <div className="flex flex-col gap-6">

              <h2
                ref={headlineRef}
                className="
                  text-4xl md:text-5xl lg:text-6xl
                  font-bold tracking-tight text-black
                  leading-tight
                "
              >
                {finalCTAContent.headline}
              </h2>

              <p
                ref={paragraphRef}
                className="
                  text-base md:text-lg
                  text-black/55
                  max-w-sm leading-relaxed
                "
              >
                {finalCTAContent.paragraph}
              </p>

              {/* Action Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-wrap gap-4 mt-2"
              >
                {finalCTAContent.buttons.map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-2
                      px-6 py-3
                      text-sm font-medium
                      transition-all duration-200
                      group
                      ${btn.primary
                        ? "bg-black text-white hover:bg-black/80"
                        : "border border-black text-black hover:bg-black hover:text-white"
                      }
                    `}
                  >
                    {btn.label}
                    <span className="
                      inline-block
                      transition-transform duration-200
                      group-hover:translate-x-1
                    ">
                      →
                    </span>
                  </a>
                ))}
              </div>

            </div>

            {/* RIGHT: Social Links + Contact Info */}
            <div className="flex flex-col gap-8">

              {/* LET'S CONNECT label */}
              <p className="
                text-xs font-mono font-medium
                tracking-widest uppercase text-black/40
              ">
                LET`S CONNECT
              </p>

              {/* Social links grid */}
              <div
                ref={socialRef}
                className="grid grid-cols-2 gap-4"
              >
                {finalCTAContent.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex flex-col gap-1.5
                      border border-black/15
                      p-4
                      hover:border-black
                      hover:-translate-y-0.5
                      hover:shadow-sm
                      transition-all duration-200
                      group
                    "
                  >
                    {/* Social icon */}
                    <span className="
                      text-base text-black/40
                      group-hover:text-black
                      transition-colors duration-200
                    ">
                      {social.icon}
                    </span>

                    {/* Label + handle */}
                    <span className="
                      text-sm font-medium text-black
                    ">
                      {social.label}
                    </span>
                    <span className="
                      text-xs text-black/40 font-mono
                      truncate
                    ">
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>

            </div>

          </div>

          {/* Footer Line */}
          <div
            ref={footerRef}
            className="
              border-t border-black/10
              py-8
              flex flex-col md:flex-row
              items-start md:items-center
              justify-between
              gap-4
            "
          >
            {/* Left: built with note */}
            <p className="text-xs text-black/30 leading-relaxed">
              {finalCTAContent.footer.builtWith}
            </p>

            {/* Right: copyright */}
            <p className="text-xs text-black/25 font-mono">
              {finalCTAContent.footer.copyright}
            </p>
          </div>

        </div>
      </section>
    );
  }