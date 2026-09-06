"use client";

import React from "react";
import { ServicesGrid } from "@/components/services-grid";
import { ShieldCheck, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#F4F6FA] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="section-label">{t("offer_label")}</span>
          <h1 className="font-syne text-4xl sm:text-5xl font-extrabold text-[#0A1628]">
            {t("offer_title")}
          </h1>
          <p className="text-[#5A637A] text-base leading-relaxed">
            {t("offer_subtitle")}
          </p>
        </div>

        <ServicesGrid />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <Zap className="w-8 h-8 text-[#C8962A]" />
            <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("air_f1")}</h3>
            <p className="text-xs text-[#5A637A] leading-relaxed">
              {t("air_desc")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#1A3A6B]" />
            <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("express_f3")}</h3>
            <p className="text-xs text-[#5A637A] leading-relaxed">
              {t("express_desc")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <Globe className="w-8 h-8 text-[#2A5298]" />
            <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("customs_f1")}</h3>
            <p className="text-xs text-[#5A637A] leading-relaxed">
              {t("customs_desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
