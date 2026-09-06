"use client";

import React from "react";
import Link from "next/link";
import { Search, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0A1628] text-[#9AA3B8] pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="font-syne text-2xl font-extrabold tracking-tight text-white">
                <span className="text-[#C8962A]">Speed Express</span> Forwarding
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#9AA3B8] max-w-sm">
              {t("footer_about")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0F2040] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#C8962A] hover:border-[#C8962A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0F2040] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#C8962A] hover:border-[#C8962A] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0F2040] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#C8962A] hover:border-[#C8962A] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#0F2040] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#C8962A] hover:border-[#C8962A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h6 className="font-syne text-white font-bold text-base mb-4">{t("footer_company")}</h6>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#E8B84B] transition-colors">
                  {t("nav_about")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E8B84B] transition-colors">
                  {t("nav_services")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#E8B84B] transition-colors">
                  {t("nav_news")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E8B84B] transition-colors">
                  {t("nav_contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h6 className="font-syne text-white font-bold text-base mb-4">{t("footer_services")}</h6>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-[#E8B84B] transition-colors">
                  {t("express_title")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E8B84B] transition-colors">
                  {t("air_title")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E8B84B] transition-colors">
                  {t("ocean_title")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E8B84B] transition-colors">
                  {t("warehouse_title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h6 className="font-syne text-white font-bold text-base mb-4">{t("footer_contact")}</h6>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8962A] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="block">{t("contact_hq_address")}</span>
                  <span className="block">{t("contact_office_abudhabi")}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8962A] shrink-0" />
                <span>{t("topbar_phone")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8962A] shrink-0" />
                <span>{t("topbar_email")}</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 border-2 border-[#C8962A] text-[#C8962A] hover:bg-[#C8962A] hover:text-[#0A1628] font-semibold text-xs px-4 py-2 rounded-full transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                {t("nav_track_btn")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Speed Express Forwarding. {t("footer_rights")}</p>
          <p className="flex items-center gap-1.5">
            {t("footer_crafted")} <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {t("footer_for_reliability")}
          </p>
        </div>
      </div>
    </footer>
  );
}
