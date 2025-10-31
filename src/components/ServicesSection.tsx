"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  id: string;
  emoji: string;
  title: string;
  short: string;
  details: string;
};

const SERVICES: Service[] = [
  {
    id: "project-management",
    emoji: "📐",
    title: "Project Management",
    short: "We supervise, track progress, and ensure timely delivery of your project.",
    details:
      "We handle procurement, scheduling, subcontractor coordination, quality control, and cost management. You always stay informed with progress updates.",
  },
  {
    id: "design-planning",
    emoji: "🧠",
    title: "Design & Planning",
    short: "We convert your ideas into realistic architectural plans.",
    details:
      "We work closely with architects and engineers to create building plans, 3D renders, BOQs, feasibility studies, and permit documentation.",
  },
  {
    id: "renovation",
    emoji: "🔧",
    title: "Renovation Services",
    short: "Updating an existing space with modern standards and aesthetics.",
    details:
      "From interior layout adjustments to full structural remodel, we improve functionality, aesthetics, and property value using quality materials.",
  },
  {
    id: "maintenance",
    emoji: "🛠️",
    title: "Maintenance Services",
    short: "Routine and preventive maintenance to ensure long-term durability.",
    details:
      "We provide property maintenance, repairs, plumbing jobs, electrical checks, and general servicing to keep residential and commercial buildings in top condition.",
  },
  {
    id: "consultation",
    emoji: "💬",
    title: "Consultation Services",
    short: "Professional guidance before and during your construction project.",
    details:
      "We offer expert consulting for budgeting, feasibility evaluation, material choices, contractor selection, and project execution strategies.",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(prefersReducedMotion);

    if (prefersReducedMotion) {
      const els = containerRef.current?.querySelectorAll(".js-animate-card");
      els?.forEach((el) => el.classList.add("opacity-100", "translate-y-0"));
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>(".js-animate-card"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 120}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const cardBase =
    "border rounded-lg p-6 shadow transform transition-all duration-700 ease-out opacity-0 translate-y-6 bg-white";

  return (
    <>
      <section id="services" ref={containerRef} className="py-16 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-orange-600">Our Services</h2>
          <p className="text-center text-gray-600 mt-2">High-quality and reliable construction services.</p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                className={`${cardBase} js-animate-card hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg`}
                tabIndex={0}
                role="button"
                onClick={() => setModalIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setModalIndex(i);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 rounded-md bg-orange-50 text-orange-600 text-2xl inline-flex items-center justify-center">
                    {s.emoji}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{s.short}</p>

                    <div
                      className={`mt-3 overflow-hidden transition-all duration-300 ${
                        expandedIndex === i ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-gray-700">{s.details}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setExpandedIndex((prev) => (prev === i ? null : i));
                        }}
                        className="text-sm font-semibold text-orange-600 underline-offset-2 hover:underline"
                      >
                        {expandedIndex === i ? "Show less" : "Learn more"}
                      </button>

                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setModalIndex(i);
                        }}
                        className="ml-auto px-3 py-1 rounded-md bg-orange-600 text-white text-sm font-semibold"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setModalIndex(null)} />
          <div
            className={`relative z-10 max-w-2xl w-full p-6 rounded-lg bg-white shadow-lg ${
              reduceMotion ? "" : "animate-zoomIn"
            }`}
          >
            <header className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-orange-50 text-orange-600 text-2xl flex items-center justify-center">
                {SERVICES[modalIndex].emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{SERVICES[modalIndex].title}</h3>
                <p className="mt-2 text-sm text-gray-600">{SERVICES[modalIndex].short}</p>
              </div>
              <button className="text-gray-500 hover:text-gray-900" onClick={() => setModalIndex(null)}>
                ✖
              </button>
            </header>

            <p className="mt-4 text-sm text-gray-700">{SERVICES[modalIndex].details}</p>

            <div className="mt-6 flex gap-3">
              <a href="#contact" className="px-4 py-2 rounded-md bg-orange-600 text-white font-semibold">
                Contact Us
              </a>
              <button className="px-4 py-2 rounded-md border" onClick={() => setModalIndex(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes zoomIn {
          from {
            transform: translateY(-6px) scale(0.98);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-zoomIn {
          animation: zoomIn 220ms ease-out;
        }
      `}</style>
    </>
  );
}
