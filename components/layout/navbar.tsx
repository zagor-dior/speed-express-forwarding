"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Truck, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — Left */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="Speed Express Forwarding"
              width={200}
              height={54}
              className="h-12 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("span");
                  fallback.className = "text-xl font-extrabold tracking-tight";
                  fallback.style.fontFamily = "'Red Rose', 'Poppins', sans-serif";
                  fallback.innerHTML =
                    '<span style="color:#9D8870">Speed Express</span> <span style="color:#2d3448">Forwarding</span>';
                  parent.appendChild(fallback);
                }
              }}
            />
          </Link>

          {/* Navigation — Center */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="nav-link px-5 py-2 text-sm font-semibold text-[#2d3448] hover:text-[#9D8870] transition-colors relative group"
            >
              {t("nav_home")}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9D8870] transition-all group-hover:w-3/4" />
            </Link>
            <Link
              href="/about"
              className="nav-link px-5 py-2 text-sm font-semibold text-[#2d3448] hover:text-[#9D8870] transition-colors relative group"
            >
              {t("nav_about")}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9D8870] transition-all group-hover:w-3/4" />
            </Link>
            <Link
              href="/contact"
              className="nav-link px-5 py-2 text-sm font-semibold text-[#2d3448] hover:text-[#9D8870] transition-colors relative group"
            >
              {t("nav_contact")}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9D8870] transition-all group-hover:w-3/4" />
            </Link>
          </nav>

          {/* Track Now + Language — Right */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center border border-slate-200 rounded-full p-0.5 text-[11px] font-bold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === "en"
                    ? "bg-[#9D8870] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#9D8870]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === "fr"
                    ? "bg-[#9D8870] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#9D8870]"
                }`}
              >
                FR
              </button>
            </div>

            <Link
              href="/track"
              className="inline-flex items-center gap-2 bg-[#9D8870] hover:bg-[#8a7660] text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all hover:shadow-md"
            >
              <Truck className="w-4 h-4" />
              {t("nav_track_btn")}
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-full p-0.5 text-[10px] font-bold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded-full ${
                  language === "en"
                    ? "bg-[#9D8870] text-white"
                    : "text-slate-500"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2 py-0.5 rounded-full ${
                  language === "fr"
                    ? "bg-[#9D8870] text-white"
                    : "text-slate-500"
                }`}
              >
                FR
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2d3448] hover:text-[#9D8870]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-base font-semibold text-[#2d3448] hover:bg-slate-50 hover:text-[#9D8870]"
          >
            {t("nav_home")}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-base font-semibold text-[#2d3448] hover:bg-slate-50 hover:text-[#9D8870]"
          >
            {t("nav_about")}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-base font-semibold text-[#2d3448] hover:bg-slate-50 hover:text-[#9D8870]"
          >
            {t("nav_contact")}
          </Link>
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#9D8870] text-white font-bold text-sm px-6 py-3 rounded-full w-full"
            >
              <Truck className="w-4 h-4" />
              {t("nav_track_btn")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
