"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Builds", href: "#builds" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const desktopLinksRef = useRef<HTMLLIElement[]>([]);
  const mobileLinksRef = useRef<HTMLLIElement[]>([]);

  const setDesktopLinkRef = (el: HTMLLIElement | null, index: number) => {
    if (el) desktopLinksRef.current[index] = el;
  };

  const setMobileLinkRef = (el: HTMLLIElement | null, index: number) => {
    if (el) mobileLinksRef.current[index] = el;
  };

  const closeMenu = () => setMenuOpen(false);

 useEffect(() => {
  let hasPlayed = false;

  const playNavbarIntro = () => {
    if (hasPlayed) return;
    hasPlayed = true;

    gsap.fromTo(
      logoRef.current,
      {
        y: -34,
        opacity: 0,
        rotate: -10,
        scale: 0.7,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.9,
        ease: "bounce.out",
      },
    );

    gsap.fromTo(
      [...desktopLinksRef.current, hamburgerRef.current].filter(Boolean),
      {
        y: -28,
        opacity: 0,
        rotate: -4,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.75,
        ease: "bounce.out",
        stagger: 0.08,
        delay: 0.12,
      },
    );
  };

  window.addEventListener("introComplete", playNavbarIntro);

  const fallback = window.setTimeout(playNavbarIntro, 2500);

  return () => {
    window.removeEventListener("introComplete", playNavbarIntro);
    window.clearTimeout(fallback);
  };
}, []);

  useEffect(() => {
    let hasPlayed = false;

    const playNavbarIntro = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      const items = [
        logoRef.current,
        ...desktopLinksRef.current,
        hamburgerRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        items,
        {
          y: -28,
          opacity: 0,
          rotate: -4,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.75,
          ease: "bounce.out",
          stagger: 0.08,
        },
      );
    };

    window.addEventListener("introComplete", playNavbarIntro);

    const fallback = window.setTimeout(playNavbarIntro, 2500);

    return () => {
      window.removeEventListener("introComplete", playNavbarIntro);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    gsap.fromTo(
      mobileLinksRef.current,
      {
        y: -18,
        opacity: 0,
        scale: 0.96,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "bounce.out",
        stagger: 0.07,
      },
    );
  }, [menuOpen]);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${
          scrolled || menuOpen
            ? "bg-white border-b border-black/10 py-4"
            : "bg-transparent py-6"
        }
      `}
    >
      <nav className="w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <a
          ref={logoRef}
          href="#hero"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-black"
        >
          J.
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <li
              key={link.label}
              ref={(el) => setDesktopLinkRef(el, index)}
            >
              <a
                href={link.href}
                className="
                  text-sm font-medium text-black/60
                  hover:text-black
                  transition-colors duration-200
                "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="
              flex h-10 w-10 flex-col items-center justify-center gap-1.5
              border border-black/15
              bg-white/70
              backdrop-blur
            "
          >
            <span
              className={`
                h-px w-5 bg-black transition-all duration-300
                ${menuOpen ? "translate-y-2 rotate-45" : ""}
              `}
            />
            <span
              className={`
                h-px w-5 bg-black transition-all duration-300
                ${menuOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`
                h-px w-5 bg-black transition-all duration-300
                ${menuOpen ? "-translate-y-2 -rotate-45" : ""}
              `}
            />
          </button>
        </div>
      </nav>

      <div
        className={`
          md:hidden overflow-hidden bg-white border-t border-black/10
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col px-6 py-4">
          {navLinks.map((link, index) => (
            <li
              key={link.label}
              ref={(el) => setMobileLinkRef(el, index)}
            >
              <a
                href={link.href}
                onClick={closeMenu}
                className="
                  block py-4
                  text-sm font-medium text-black/70
                  border-b border-black/10 last:border-b-0
                  hover:text-black
                  transition-colors duration-200
                "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}