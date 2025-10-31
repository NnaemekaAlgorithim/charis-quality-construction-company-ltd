"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  image: string; // path in /public
};

const PROJECTS: Project[] = [
  { id: "p1", title: "Modern Family Home", subtitle: "Full build with energy-efficient systems", image: "/optimized/modern-family-home-1920.webp" },
  { id: "p2", title: "Commercial Office Fitout", subtitle: "Office refurbishment to improve layout", image: "/optimized/commercial-office-fitout-1920.webp" },
  { id: "p3", title: "Riverside Renovation", subtitle: "Structural and aesthetic renovation", image: "/optimized/riverside-renovation-1920.webp" },
  // add more: { id: "p4", title: "Another Project", subtitle: "Short desc", image: "/project-4.jpg" }
];

export default function ProjectsCarousel({
  autoplayMs = 5000,
}: {
  autoplayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);

  // autoplay effect
  useEffect(() => {
    if (!isPlaying) return;
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % PROJECTS.length);
    }, autoplayMs);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [isPlaying, autoplayMs]);

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prev = () => {
    setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  };
  const next = () => {
    setIndex((i) => (i + 1) % PROJECTS.length);
  };

  // touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="py-16 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
        <p className="text-center text-gray-600 mt-2">A few recent projects that show our capabilities.</p>

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onFocus={() => setIsPlaying(false)}
          onBlur={() => setIsPlaying(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="mt-8 relative"
        >
          {/* Slides */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="relative h-[320px] md:h-[420px] flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)`, width: `${PROJECTS.length * 100}%` }}
            >
              {PROJECTS.map((p, i) => (
                <div key={p.id} className="relative w-full flex-shrink-0">
                  <div className="absolute inset-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                      quality={90}
                      priority={i === index} // prioritize currently visible slide
                    />
                  </div>

                  <div className="relative h-full flex items-end">
                    <div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                      <h3 className="text-xl font-semibold">{p.title}</h3>
                      {p.subtitle && <p className="text-sm mt-1">{p.subtitle}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            aria-label="Previous project"
            onClick={() => { prev(); setIsPlaying(false); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 rounded-full p-2 shadow hover:bg-white focus:outline-none"
          >
            ‹
          </button>
          <button
            aria-label="Next project"
            onClick={() => { next(); setIsPlaying(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 rounded-full p-2 shadow hover:bg-white focus:outline-none"
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full ${i === index ? "bg-orange-600" : "bg-gray-300"} focus:outline-none`}
                onClick={() => { setIndex(i); setIsPlaying(false); }}
              />
            ))}
          </div>

          {/* Thumbnails (small, optional) */}
          <div className="mt-4 hidden sm:flex items-center gap-3 overflow-x-auto py-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setIndex(i); setIsPlaying(false); }}
                aria-label={`Show ${p.title}`}
                className={`flex-none rounded-md overflow-hidden border ${i === index ? "ring-2 ring-orange-400" : "border-gray-200"} focus:outline-none`}
                style={{ width: 120, height: 70 }}
              >
                <div className="relative w-[120px] h-[70px]">
                  <Image
                    src={p.image.replace('-1920.webp', '-640.webp')}
                    alt={p.title}
                    fill
                    className="object-cover object-center"
                    sizes="120px"
                    quality={70}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
