"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-orange-600 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-wide no-underline">
          Charis Quality Construction
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          <li><Link href="/" className="hover:text-orange-200 transition no-underline">Home</Link></li>
          <li><Link href="#services" scroll={true} className="hover:text-orange-200 transition no-underline">Services</Link></li>
          <li><Link href="#projects" scroll={true} className="hover:text-orange-200 transition no-underline">Projects</Link></li>
          <li><Link href="#contact" scroll={true} className="hover:text-orange-200 transition no-underline">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <span className="text-2xl">✖</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </nav>

      {/* Mobile Menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white text-orange-600 shadow-md">
          <ul className="flex flex-col gap-4 px-4 py-4 text-sm font-semibold">
            <li><Link href="/" className="hover:text-orange-700 no-underline" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="#services" scroll={true} className="hover:text-orange-700 no-underline" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link href="#projects" scroll={true} className="hover:text-orange-700 no-underline" onClick={() => setIsOpen(false)}>Projects</Link></li>
            <li><Link href="#contact" scroll={true} className="hover:text-orange-700 no-underline" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
