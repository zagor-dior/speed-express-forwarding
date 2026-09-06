"use client";

import React from "react";
import { TrackingSearchBar } from "@/components/tracking/tracking-search-bar";
import { Package, Shield, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TrackMainPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#F4F6FA] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center mx-auto shadow-md">
            <Package className="w-8 h-8" />
          </div>
          <span className="section-label">{t("track_label")}</span>
          <h1 className="font-syne text-4xl font-extrabold text-[#0A1628]">
            {t("track_title")}
          </h1>
          <p className="text-[#5A637A] text-sm">
            {t("track_subtitle")}
          </p>
        </div>

        <TrackingSearchBar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <Globe className="w-6 h-6 text-[#1A3A6B]" />
            <h4 className="font-syne font-bold text-[#0A1628] text-base">{t("track_card1_title")}</h4>
            <p className="text-xs text-[#5A637A]">{t("track_card1_desc")}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <Shield className="w-6 h-6 text-[#C8962A]" />
            <h4 className="font-syne font-bold text-[#0A1628] text-base">{t("track_card2_title")}</h4>
            <p className="text-xs text-[#5A637A]">{t("track_card2_desc")}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <Package className="w-6 h-6 text-[#2A5298]" />
            <h4 className="font-syne font-bold text-[#0A1628] text-base">{t("track_card3_title")}</h4>
            <p className="text-xs text-[#5A637A]">{t("track_card3_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
