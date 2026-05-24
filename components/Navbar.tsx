"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#builds" },
  { label: "Future", href: "#future" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

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
          href="#hero"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-black"
        >
          J.
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
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

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
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

      {/* Mobile menu */}
      <div
        className={`
          md:hidden overflow-hidden bg-white border-t border-black/10
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.label}>
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