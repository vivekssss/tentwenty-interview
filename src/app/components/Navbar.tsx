"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  "About Us",
  "Our Team",
  "Our Portfolio",
  "Sustainability",
  "Darna Loyalty Programme",
  "Latest News",
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="section mt-6">
        <nav className="glass flex items-center justify-between rounded-full px-6 py-3 shadow-sm shadow-black/5 ring-1 ring-black/5">
          <div className="flex items-center gap-3">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=120&q=60"
              alt="Tentwenty emblem"
              width={42}
              height={42}
              className="rounded-full object-cover"
            />
            <span className="text-lg font-semibold tracking-tight">TenTwenty</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {links.map((item) => (
              <Link
                key={item}
                href="#"
                className="transition-colors hover:text-ocean"
                prefetch={false}
              >
                {item}
              </Link>
            ))}
          </div>
          <Link
            href="#contact"
            className="hidden rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-ocean hover:text-ocean md:block"
            prefetch={false}
          >
            Contact Us
          </Link>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
          >
            <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-4 glass rounded-2xl p-6 shadow-lg shadow-black/10 ring-1 ring-black/5 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-lg font-medium transition-colors hover:text-ocean"
                  prefetch={false}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="#contact"
                className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-ocean hover:text-ocean inline-block w-fit"
                prefetch={false}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
