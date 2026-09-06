"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  Search,
  MapPin,
  Package,
  QrCode,
  Truck,
  CheckCircle2,
  ArrowRight,
  Plane,
  Ship,
  Warehouse,
  FileCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MarketingHomePage() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");
  const { t } = useLanguage();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      router.push(`/track?number=${encodeURIComponent(trackingNumber.trim())}`);
    } else {
      router.push("/track");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="hero-section py-16 lg:py-24 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="hero-badge inline-flex items-center gap-2 border border-[#C8962A]/40 bg-[#C8962A]/15 text-[#E8B84B] rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-[#E8B84B]" />
                {t("hero_badge")}
              </span>

              <h1 className="hero-title font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                {t("hero_title")}
              </h1>

              <p className="hero-subtitle text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                {t("hero_subtitle")}
              </p>

              {/* Hero Buttons */}
              <div className="hero-actions flex flex-wrap gap-4 pt-2">
                <Link href="/track" className="btn-hero-primary">
                  <Search className="w-4 h-4" />
                  {t("hero_btn_track")}
                </Link>
                <Link href="/services" className="btn-hero-secondary">
                  {t("hero_btn_services")}
                </Link>
              </div>

              {/* Hero Stats Glass Cards (3 Cards) */}
              <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="font-syne text-2xl sm:text-3xl font-extrabold text-[#C8962A]">
                    180
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">{t("hero_stat_countries")}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="font-syne text-2xl sm:text-3xl font-extrabold text-[#C8962A]">
                    2M+
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">{t("hero_stat_deliveries")}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="font-syne text-2xl sm:text-3xl font-extrabold text-[#C8962A]">
                    15
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">{t("hero_stat_exp")}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Tracking Card */}
            <div className="lg:col-span-5">
              <div className="hero-track-card bg-white rounded-2xl p-7 shadow-2xl border border-slate-100">
                <h4 className="font-syne text-xl font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C8962A]" />
                  {t("hero_track_card_title")}
                </h4>

                <form onSubmit={handleTrackSubmit} className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder={t("hero_track_input_placeholder")}
                      className="w-full bg-[#F4F6FA] border border-slate-300 rounded-l-lg px-4 py-3.5 text-sm text-[#2D3448] placeholder-slate-400 focus:outline-none focus:border-[#1A3A6B] transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-[#1A3A6B] hover:bg-[#0A1628] text-white font-bold text-sm px-6 py-3.5 rounded-r-lg flex items-center gap-2 shrink-0 transition-colors shadow-sm"
                    >
                      <Search className="w-4 h-4" />
                      {t("hero_track_btn")}
                    </button>
                  </div>
                </form>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-slate-500 font-medium">{t("hero_track_try")}</span>
                  <button
                    onClick={() => setTrackingNumber("SEF-2026-001234")}
                    className="bg-[#F4F6FA] hover:bg-slate-200 text-[#5A637A] border border-slate-200 px-2.5 py-1 rounded font-mono text-xs transition-colors"
                  >
                    SEF-2026-001234
                  </button>
                  <button
                    onClick={() => setTrackingNumber("SEF-2026-005678")}
                    className="bg-[#F4F6FA] hover:bg-slate-200 text-[#5A637A] border border-slate-200 px-2.5 py-1 rounded font-mono text-xs transition-colors"
                  >
                    SEF-2026-005678
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR SECTION */}
      <section className="bg-[#0F2040] py-10 border-y border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#C8962A]">
                180
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t("stat_countries_served")}
              </div>
            </div>
            <div>
              <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#C8962A]">
                2,000,000+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t("stat_packages_delivered")}
              </div>
            </div>
            <div>
              <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#C8962A]">
                98%
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t("stat_on_time_rate")}
              </div>
            </div>
            <div>
              <div className="font-syne text-3xl sm:text-4xl font-extrabold text-[#C8962A]">
                15
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {t("stat_years_excellence")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION ("What We Offer") */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label block text-center mb-2 font-bold text-xs uppercase tracking-widest text-[#C8962A]">
              {t("offer_label")}
            </span>
            <h2 className="section-title text-[#0A1628] font-syne font-extrabold text-3xl sm:text-4xl text-center">
              {t("offer_title")}
            </h2>
            <p className="section-subtitle mx-auto text-center text-[#5A637A] mt-2 max-w-xl">
              {t("offer_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Air Freight */}
            <div className="service-card bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-[#1A3A6B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
                  <Plane className="w-7 h-7" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                  {t("air_title")}
                </h3>
                <p className="text-sm text-[#5A637A] mb-4 leading-relaxed">
                  {t("air_desc")}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#1A3A6B] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors pt-2"
              >
                {t("service_learn_more")}
              </Link>
            </div>

            {/* 2. Ocean Freight */}
            <div className="service-card bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-[#1A3A6B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
                  <Ship className="w-7 h-7" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                  {t("ocean_title")}
                </h3>
                <p className="text-sm text-[#5A637A] mb-4 leading-relaxed">
                  {t("ocean_desc")}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#1A3A6B] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors pt-2"
              >
                {t("service_learn_more")}
              </Link>
            </div>

            {/* 3. Road Freight */}
            <div className="service-card bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-[#1A3A6B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
                  <Truck className="w-7 h-7" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                  {t("road_title")}
                </h3>
                <p className="text-sm text-[#5A637A] mb-4 leading-relaxed">
                  {t("road_desc")}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#1A3A6B] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors pt-2"
              >
                {t("service_learn_more")}
              </Link>
            </div>

            {/* 4. Express Delivery */}
            <div className="service-card bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-[#1A3A6B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                  {t("express_title")}
                </h3>
                <p className="text-sm text-[#5A637A] mb-4 leading-relaxed">
                  {t("express_desc")}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#1A3A6B] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors pt-2"
              >
                {t("service_learn_more")}
              </Link>
            </div>

            {/* 5. Warehousing */}
            <div className="service-card bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-[#1A3A6B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
                  <Warehouse className="w-7 h-7" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                  {t("warehouse_title")}
                </h3>
                <p className="text-sm text-[#5A637A] mb-4 leading-relaxed">
                  {t("warehouse_desc")}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#1A3A6B] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors pt-2"
              >
                {t("service_learn_more")}
              </Link>
            </div>

            {/* 6. Customs Clearance */}
            <div className="service-card bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-[#1A3A6B] rounded-xl flex items-center justify-center text-white mb-5 shadow-sm">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0A1628] mb-2 group-hover:text-[#C8962A] transition-colors">
                  {t("customs_title")}
                </h3>
                <p className="text-sm text-[#5A637A] mb-4 leading-relaxed">
                  {t("customs_desc")}
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#1A3A6B] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors pt-2"
              >
                {t("service_learn_more")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="section-pad bg-[#F4F6FA] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label block text-center mb-2 font-bold text-xs uppercase tracking-widest text-[#C8962A]">
              {t("how_label")}
            </span>
            <h2 className="section-title text-[#0A1628] font-syne font-extrabold text-3xl sm:text-4xl text-center">
              {t("how_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center mb-4 shadow-sm relative">
                <Package className="w-8 h-8" />
              </div>
              <span className="inline-block bg-[#C8962A] text-[#0A1628] font-bold text-[11px] px-3 py-0.5 rounded-full mb-2">
                {t("step1_badge")}
              </span>
              <h5 className="font-syne font-bold text-lg text-[#0A1628] mb-2">
                {t("step1_title")}
              </h5>
              <p className="text-xs text-[#5A637A] leading-relaxed max-w-xs">
                {t("step1_desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center mb-4 shadow-sm relative">
                <QrCode className="w-8 h-8" />
              </div>
              <span className="inline-block bg-[#C8962A] text-[#0A1628] font-bold text-[11px] px-3 py-0.5 rounded-full mb-2">
                {t("step2_badge")}
              </span>
              <h5 className="font-syne font-bold text-lg text-[#0A1628] mb-2">
                {t("step2_title")}
              </h5>
              <p className="text-xs text-[#5A637A] leading-relaxed max-w-xs">
                {t("step2_desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center mb-4 shadow-sm relative">
                <Truck className="w-8 h-8" />
              </div>
              <span className="inline-block bg-[#C8962A] text-[#0A1628] font-bold text-[11px] px-3 py-0.5 rounded-full mb-2">
                {t("step3_badge")}
              </span>
              <h5 className="font-syne font-bold text-lg text-[#0A1628] mb-2">
                {t("step3_title")}
              </h5>
              <p className="text-xs text-[#5A637A] leading-relaxed max-w-xs">
                {t("step3_desc")}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center mb-4 shadow-sm relative">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="inline-block bg-[#C8962A] text-[#0A1628] font-bold text-[11px] px-3 py-0.5 rounded-full mb-2">
                {t("step4_badge")}
              </span>
              <h5 className="font-syne font-bold text-lg text-[#0A1628] mb-2">
                {t("step4_title")}
              </h5>
              <p className="text-xs text-[#5A637A] leading-relaxed max-w-xs">
                {t("step4_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENT NEWS SECTION */}
      <section className="section-pad bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="section-label block mb-2 font-bold text-xs uppercase tracking-widest text-[#C8962A]">
                {t("news_label")}
              </span>
              <h2 className="section-title text-[#0A1628] font-syne font-extrabold text-3xl sm:text-4xl mb-0">
                {t("news_title")}
              </h2>
            </div>
            <Link
              href="/news"
              className="bg-[#1A3A6B] hover:bg-[#2A5298] text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              {t("news_view_all")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div
                className="h-44 flex items-center justify-center text-white font-syne text-lg font-bold p-4 text-center"
                style={{
                  backgroundImage: `url(/images/news/bg1.jpeg), url(/images/news/bg-news-1.svg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black/30 px-4 py-2 rounded">Speed Express Forwarding</div>
              </div>
              <div className="p-6 space-y-2">
                <div className="text-xs text-[#5A637A]">Mar 30, 2026</div>
                <h4 className="font-syne font-bold text-base text-[#0A1628] hover:text-[#C8962A] transition-colors line-clamp-2">
                  {t("news1_title")}
                </h4>
                <p className="text-xs text-[#5A637A] line-clamp-2 leading-relaxed">
                  {t("news1_desc")}
                </p>
              </div>
            </div>

            {/* News 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div
                className="h-44 flex items-center justify-center text-white font-syne text-lg font-bold p-4 text-center"
                style={{
                  backgroundImage: `url(/images/news/bg2.jpeg), url(/images/news/bg-news-2.svg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black/30 px-4 py-2 rounded">Speed Express Forwarding</div>
              </div>
              <div className="p-6 space-y-2">
                <div className="text-xs text-[#5A637A]">Mar 30, 2026</div>
                <h4 className="font-syne font-bold text-base text-[#0A1628] hover:text-[#C8962A] transition-colors line-clamp-2">
                  {t("news2_title")}
                </h4>
                <p className="text-xs text-[#5A637A] line-clamp-2 leading-relaxed">
                  {t("news2_desc")}
                </p>
              </div>
            </div>

            {/* News 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div
                className="h-44 flex items-center justify-center text-white font-syne text-lg font-bold p-4 text-center"
                style={{
                  backgroundImage: `url(/images/news/bg3.jpeg), url(/images/news/bg-news-3.svg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black/30 px-4 py-2 rounded">Speed Express Forwarding</div>
              </div>
              <div className="p-5 space-y-2">
                <div className="text-xs text-[#5A637A]">Mar 30, 2026</div>
                <h4 className="font-syne font-bold text-base text-[#0A1628] hover:text-[#C8962A] transition-colors line-clamp-2">
                  {t("news3_title")}
                </h4>
                <p className="text-xs text-[#5A637A] line-clamp-2 leading-relaxed">
                  {t("news3_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WELCOME INTRO SECTION */}
      <section className="py-12 bg-[#F4F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-[#5A637A] font-medium">
            {t("welcome_text")}
          </p>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="section-pad bg-[#0A1628] text-white text-center py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold">
            {t("cta_title")}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t("cta_subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/contact" className="btn-hero-primary">
              {t("cta_get_quote")}
            </Link>
            <Link href="/track" className="btn-hero-secondary">
              {t("cta_track_shipment")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
