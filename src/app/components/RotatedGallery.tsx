"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    alt: "Terraced farms",
    rotate: "-6deg",
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    alt: "Team harvesting",
    rotate: "0deg",
  },
  {
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    alt: "Sunlit garden",
    rotate: "8deg",
  },
];

export function RotatedGallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rot-card",
        { y: 30, opacity: 0, rotate: 0 },
        {
          y: 0,
          opacity: 1,
          rotate: (i) => parseFloat(gallery[i].rotate),
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section py-16 sm:py-24">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          Motion & Play
        </p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
          Dragable Rotations
        </h2>
        <p className="mt-2 text-ink/70">
          Inspired by the rotating frames in the references — tactile and lively.
        </p>
      </div>

      <div
        ref={ref}
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
      >
        {gallery.map((item) => (
          <div
            key={item.src}
            className="rot-card relative h-72 w-52 overflow-hidden rounded-[var(--radius-card)] bg-shell shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:rotate-0"
            style={{ rotate: item.rotate, touchAction: "none" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="260px"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-30" />
          </div>
        ))}
      </div>
    </section>
  );
}
