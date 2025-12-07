"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const showcaseItems = [
  {
    title: "Quality Products",
    copy: "Curated visuals that highlight provenance, craft, and the journey behind every experience.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Immersive Spaces",
    copy: "We choreograph spatial stories through filmic motion, ensuring every moment feels alive.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Purposeful Luxury",
    copy: "Design systems that balance elegance with warmth, creating trust at every touchpoint.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Showcase() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!railRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
        },
      );
    }, railRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section py-16 sm:py-24">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
            Showcase
          </p>
          <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">
            Quality Products
          </h2>
        </div>
        <p className="max-w-xl text-ink/70">
          Inspired by the farm-to-table references, we balance crisp grids with
          animated motion, ensuring a tactile, editorial feel.
        </p>
      </div>

      <div
        ref={railRef}
        className="grid gap-6 md:grid-cols-3"
        style={{ perspective: "1400px" }}
      >
        {showcaseItems.map((item, idx) => (
          <article
            key={item.title}
            className="showcase-card group relative overflow-hidden rounded-[var(--radius-card)] bg-shell shadow-[var(--shadow-soft)]"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
            <div className="space-y-2 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ocean/70">
                <span>0{idx + 1}</span>
                <div className="h-px w-10 bg-ink/10" />
              </div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-sm text-ink/70">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
