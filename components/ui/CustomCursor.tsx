"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursorX = gsap.quickTo(cursor, "x", {
      duration: 0.15,
      ease: "power3.out",
    });

    const moveCursorY = gsap.quickTo(cursor, "y", {
      duration: 0.15,
      ease: "power3.out",
    });

    const moveFollowerX = gsap.quickTo(follower, "x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const moveFollowerY = gsap.quickTo(follower, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      moveCursorX(e.clientX);
      moveCursorY(e.clientY);
      moveFollowerX(e.clientX);
      moveFollowerY(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(follower, {
        scale: 1.8,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [data-cursor='hover']"
    );

    window.addEventListener("mousemove", handleMouseMove);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        className="
          pointer-events-none fixed left-0 top-0 z-[9998]
          hidden md:block
          h-10 w-10 -translate-x-1/2 -translate-y-1/2
          rounded-full border border-black/25
          mix-blend-difference
        "
      />

      <div
        ref={cursorRef}
        className="
          pointer-events-none fixed left-0 top-0 z-[9999]
          hidden md:block
          h-2 w-2 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-white
          mix-blend-difference
        "
      />
    </>
  );
}