"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white py-10 mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">Charis Quality Construction</h3>
          <p className="text-sm leading-relaxed text-orange-100">
            We provide top-tier construction services with quality, integrity,
            and attention to detail.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#home" className="hover:text-orange-200">Home</Link></li>
            <li><Link href="#services" className="hover:text-orange-200">Services</Link></li>
            <li><Link href="#projects" className="hover:text-orange-200">Projects</Link></li>
            <li><Link href="#contact" className="hover:text-orange-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-orange-100">
            <li>📞 +237 654 217 995</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm mt-10 text-orange-200">
        © {new Date().getFullYear()} Charis Quality Construction Company Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
