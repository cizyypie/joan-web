"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

type InteractivePortraitProps = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
  className?:string;
};

export default function InteractivePortrait({
  src,
  alt,
  priority = false,
  objectPosition = "object-center",
}: InteractivePortraitProps) {
  const portraitRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;

    gsap.to(portraitRef.current, {
      rotateX,
      rotateY,
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleLeave = () => {
    gsap.to(portraitRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={portraitRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="
        relative w-full
        max-w-sm md:max-w-md
        aspect-[9/16]
        overflow-hidden
        border border-black/10
        will-change-transform
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover ${objectPosition}`}
      />
    </div>
  );
}