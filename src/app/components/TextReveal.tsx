"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const lines = [
  "From our farms",
  "to your hands",
  "crafted with care.",
];

export function TextReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-word",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean">
            <span className="h-1.5 w-1.5 rounded-full bg-ocean" />
            Craft & Movement
          </div>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
            From Our Farms
            <br />
            To Your Hands
          </h2>
          <p className="max-w-xl text-lg text-ink/70">
            Animation-led storytelling that feels tactile, warm, and intentional.
            We choreograph visuals so every frame lands with purpose.
          </p>
        </div>

        <div ref={ref} className="space-y-4 rounded-2xl bg-shell p-8 shadow-[var(--shadow-soft)]">
          {lines.map((line, idx) => (
            <div key={idx} className="overflow-hidden text-2xl font-semibold sm:text-3xl">
              {line.split(" ").map((word, i) => (
                <span key={i} className="reveal-word inline-block pr-2">
                  {word}
                </span>
              ))}
            </div>
          ))}
          <div className="mt-4 flex items-center gap-3 text-sm text-ink/60">
            <div className="h-px flex-1 bg-ink/10" />
            Inspired by kinetic type from kca-int.com
            <div className="h-px flex-1 bg-ink/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
