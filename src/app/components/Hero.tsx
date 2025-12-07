"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    title: "Tentwenty",
    subtitle: "Welcome to Tentwenty",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80",
    title: "Designing Experiences",
    subtitle: "From our farms to your hands",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    title: "Sustainable Journeys",
    subtitle: "Crafted with care & precision",
  },
];

export function Hero() {
  const DURATION = 4;
  const [index, setIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<SVGRectElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    timelineRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setIndex((prev) => (prev + 1) % slides.length),
    });

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { y: 80, opacity: 0, scale: 1.05 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 },
        "start",
      );
      tl.to(
        imageRef.current,
        { y: -80, opacity: 0.85, duration: 0.9, ease: "power2.in" },
        `start+=${DURATION - 0.8}`,
      );
    }
    if (nextImageRef.current) {
      tl.fromTo(
        nextImageRef.current,
        { y: 80, opacity: 0, scale: 1.05 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 },
        "start",
      );
    }

    if (textRef.current) {
      tl.fromTo(
        textRef.current.querySelectorAll(".line"),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        "start+=0.05",
      );
    }

    if (borderRef.current) {
      const perimeter = 2 * (102 + 102);
      gsap.set(borderRef.current, {
        strokeDasharray: perimeter,
        strokeDashoffset: perimeter,
      });
      tl.to(
        borderRef.current,
        { strokeDashoffset: 0, duration: DURATION, ease: "linear" },
        "start",
      );
    }

    if (thumbRef.current) {
      tl.fromTo(
        thumbRef.current,
        { y: 10, opacity: 0.6, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        "start",
      );
      tl.to(
        thumbRef.current,
        { y: -8, opacity: 0.9, duration: 0.4, ease: "power2.in" },
        `start+=${DURATION - 0.6}`,
      );
    }

    timelineRef.current = tl;
  }, [index]);

  const current = useMemo(() => slides[index], [index]);
  const next = useMemo(() => slides[(index + 1) % slides.length], [index]);

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div
          key={current.id}
          ref={imageRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${current.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          key={next.id}
          ref={nextImageRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${next.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="section relative flex h-screen items-center">
        <div className="max-w-2xl text-shell" ref={textRef}>
          <p className="line text-sm uppercase tracking-[0.3em] text-mist">
            {current.subtitle}
          </p>
          <h1 className="line mt-3 text-5xl font-semibold sm:text-6xl">
            {current.title}
          </h1>
          <p className="line mt-4 max-w-xl text-lg text-mist/90">
            Crafted experiences that bridge luxury hospitality and authentic
            stories. We design, build, and animate brands that live beautifully
            across every touchpoint.
          </p>
          <div className="line mt-8 flex items-center gap-4">
            <button className="rounded-full bg-shell px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl">
              Explore
            </button>
            <button className="rounded-full border border-shell/40 px-5 py-2.5 text-sm font-semibold text-shell transition hover:-translate-y-0.5 hover:border-shell hover:bg-shell/10">
              Our Portfolio
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0">
        <div className="section flex items-end justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
              className="relative h-[90px] w-[90px] overflow-hidden rounded-sm bg-white/5 p-1 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <div className="absolute inset-0 rounded-sm border border-white/30" />
              <div className="absolute inset-[10px] overflow-hidden rounded-sm">
                <Image
                  src={next.image}
                  alt={next.title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">
                  Next
                </div>
              </div>
              <svg className="absolute inset-0" viewBox="0 0 108 108">
                <rect
                  ref={borderRef}
                  x="3"
                  y="3"
                  width="102"
                  height="102"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div ref={thumbRef} className="absolute inset-0" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-3 text-xs font-semibold text-white">
              <span className="opacity-90">0{index + 1}</span>
              <div className="h-[1px] w-16 bg-white/70" />
              <span className="opacity-70">0{slides.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
