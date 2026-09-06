"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Search, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      {/* TOP BAR (scrolls naturally off-screen when scrolling down) */}
      <div className="bg-[#0A1628] text-[#9AA3B8] text-xs py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#C8962A]" />
              {t("topbar_phone")}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#C8962A]" />
              {t("topbar_email")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* LANGUAGE SWITCHER */}
            <div className="flex items-center bg-[#0F2040] border border-slate-700/80 rounded-full p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                  language === "en"
                    ? "bg-[#C8962A] text-[#0A1628] shadow-sm font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🇬🇧</span> EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                  language === "fr"
                    ? "bg-[#C8962A] text-[#0A1628] shadow-sm font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🇫🇷</span> FR
              </button>
            </div>

            <div className="h-3 w-px bg-slate-700 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="hover:text-[#C8962A] transition-colors font-medium"
              >
                {t("topbar_login")}
              </Link>
              <span className="text-slate-700">|</span>
              <Link
                href="/register"
                className="hover:text-[#C8962A] transition-colors font-medium"
              >
                {t("topbar_register")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR HEADER (Sticky at top-0 across the ENTIRE body height) */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="font-syne text-2xl font-extrabold tracking-tight text-[#0A1628]">
              <span className="text-[#C8962A]">Speed Express</span> Forwarding
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#5A637A] hover:text-[#1A3A6B] hover:bg-slate-100 transition-colors"
            >
              {t("nav_home")}
            </Link>
            <Link
              href="/track"
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#5A637A] hover:text-[#1A3A6B] hover:bg-slate-100 transition-colors"
            >
              {t("nav_track")}
            </Link>
            <Link
              href="/services"
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#5A637A] hover:text-[#1A3A6B] hover:bg-slate-100 transition-colors"
            >
              {t("nav_services")}
            </Link>
            <Link
              href="/about"
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#5A637A] hover:text-[#1A3A6B] hover:bg-slate-100 transition-colors"
            >
              {t("nav_about")}
            </Link>
            <Link
              href="/news"
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#5A637A] hover:text-[#1A3A6B] hover:bg-slate-100 transition-colors"
            >
              {t("nav_news")}
            </Link>
            <Link
              href="/contact"
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[#5A637A] hover:text-[#1A3A6B] hover:bg-slate-100 transition-colors"
            >
              {t("nav_contact")}
            </Link>
          </div>

          {/* Track CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/track" className="btn-track">
              <Search className="w-4 h-4" />
              {t("nav_track_btn")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center bg-[#0F2040] border border-slate-700/80 rounded-full p-0.5 text-[10px] font-semibold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-1.5 py-0.5 rounded-full ${
                  language === "en" ? "bg-[#C8962A] text-[#0A1628] font-bold" : "text-slate-400"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-1.5 py-0.5 rounded-full ${
                  language === "fr" ? "bg-[#C8962A] text-[#0A1628] font-bold" : "text-slate-400"
                }`}
              >
                FR
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5A637A] hover:text-[#0A1628] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#2D3448] hover:bg-slate-50"
            >
              {t("nav_home")}
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#2D3448] hover:bg-slate-50"
            >
              {t("nav_track")}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#2D3448] hover:bg-slate-50"
            >
              {t("nav_services")}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#2D3448] hover:bg-slate-50"
            >
              {t("nav_about")}
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#2D3448] hover:bg-slate-50"
            >
              {t("nav_news")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#2D3448] hover:bg-slate-50"
            >
              {t("nav_contact")}
            </Link>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-track justify-center w-full"
              >
                <Search className="w-4 h-4" />
                {t("nav_track_btn")}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
