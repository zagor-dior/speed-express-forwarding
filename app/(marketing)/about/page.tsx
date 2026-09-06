"use client";

import React from "react";
import { Award, Handshake, Globe as GlobeIcon, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#F4F6FA] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="section-label">{t("about_label")}</span>
          <h1 className="font-syne text-4xl font-extrabold text-[#0A1628]">
            {t("about_title")}
          </h1>
          <p className="text-[#5A637A] text-base leading-relaxed">
            {t("about_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="font-syne text-3xl font-extrabold text-[#0A1628]">{t("about_label")}</h2>
            <p className="text-[#5A637A] text-sm leading-relaxed">{t("about_mission_p1")}</p>
            <p className="text-[#5A637A] text-sm leading-relaxed">{t("about_mission_p2")}</p>
            <div className="mt-4">
              <h3 className="font-syne text-xl font-bold text-[#0A1628] mb-2">{t("about_mission_title")}</h3>
              <p className="text-[#5A637A] text-sm leading-relaxed">{t("about_subtitle")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
              <Award className="w-8 h-8 text-[#C8962A] mx-auto" />
              <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("about_feature1_title")}</h3>
              <p className="text-xs text-[#5A637A]">{t("about_feature1_desc")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
              <Handshake className="w-8 h-8 text-[#1A3A6B] mx-auto" />
              <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("about_feature2_title")}</h3>
              <p className="text-xs text-[#5A637A]">{t("about_feature2_desc")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
              <GlobeIcon className="w-8 h-8 text-[#2A5298] mx-auto" />
              <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("about_feature3_title")}</h3>
              <p className="text-xs text-[#5A637A]">{t("about_feature3_desc")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
              <Zap className="w-8 h-8 text-[#C8962A] mx-auto" />
              <h3 className="font-syne text-lg font-bold text-[#0A1628]">{t("about_feature4_title")}</h3>
              <p className="text-xs text-[#5A637A]">{t("about_feature4_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
