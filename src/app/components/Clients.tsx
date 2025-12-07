"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const clients = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
];

export function Clients() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".client-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section py-16 sm:py-24" id="clients">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          Clients
        </p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Client 1</h2>
        <p className="text-ink/70">Dubai, United Arab Emirates</p>
      </div>

      <div
        ref={ref}
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
      >
        {clients.map((src, idx) => (
          <div
            key={src}
            className="client-card relative h-72 w-52 overflow-hidden rounded-[var(--radius-card)] bg-shell shadow-[var(--shadow-soft)] transition hover:-translate-y-1"
            style={{
              rotate: idx === 0 ? "-5deg" : idx === 2 ? "6deg" : "0deg",
              touchAction: "none",
            }}
          >
            <Image
              src={src}
              alt={`Client visual ${idx + 1}`}
              fill
              className="object-cover"
              sizes="260px"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-shell shadow-lg shadow-black/15 transition hover:-translate-y-1 hover:bg-ocean">
          ↑
        </button>
      </div>
    </section>
  );
}
