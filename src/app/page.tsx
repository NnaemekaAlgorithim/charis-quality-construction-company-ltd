// src/app/page.tsx
import ServicesSection from "@/components/ServicesSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        id="home"
        className="relative flex items-center justify-center min-h-[80vh] text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/charis-home-image.jpg')" }}
      >
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative px-6 py-24 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Charis Quality Construction Company Ltd
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            Built on Trust. Driven by Excellence.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-md bg-white text-orange-600 font-semibold shadow hover:scale-[1.02] transition"
            >
              Get a Quote
            </a>
            <a
              href="#services"
              className="inline-block px-6 py-3 rounded-md border border-white/30 text-white hover:bg-white/10 transition"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES (animated component) */}
      <ServicesSection />

      {/* PROJECTS CAROUSEL */}
      <ProjectsCarousel />

      {/* CONTACT (show phone number) */}
      <section id="contact" className="py-16 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600">Contact Us</h2>
          <p className="mt-3 text-sm text-gray-600">
            Tell us about your project — we’ll get back within 48 hours.
          </p>

          <div className="mt-6">
            <a
              href="tel:+237654217995"
              className="inline-block px-6 py-3 rounded-md bg-orange-600 text-white font-semibold shadow hover:scale-[1.03] transition"
            >
              +237 654 217 995
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
