"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NewsPage() {
  const { t } = useLanguage();

  const articles = [
    {
      id: "expansion-10-markets",
      title: t("news1_title"),
      date: "Mar 30, 2026",
      excerpt: t("news1_desc"),
      category: "Expansion",
      color: "bg-[#1A3A6B]",
      image: "/images/news/bg1.jpeg",
      fallbackImage: "/images/news/bg-news-1.svg",
    },
    {
      id: "express-delivery-launched",
      title: t("news2_title"),
      date: "Mar 30, 2026",
      excerpt: t("news2_desc"),
      category: "Service Update",
      color: "bg-[#0F2040]",
      image: "/images/news/bg2.jpeg",
      fallbackImage: "/images/news/bg-news-2.svg",
    },
    {
      id: "real-time-gps-tracking",
      title: t("news3_title"),
      date: "Mar 30, 2026",
      excerpt: t("news3_desc"),
      category: "Technology",
      color: "bg-[#2A5298]",
      image: "/images/news/bg3.jpeg",
      fallbackImage: "/images/news/bg-news-3.svg",
    },
  ];

  return (
    <div className="bg-[#F4F6FA] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="section-label">{t("news_label")}</span>
          <h1 className="font-syne text-4xl font-extrabold text-[#0A1628]">
            {t("news_title")}
          </h1>
          <p className="text-[#5A637A] text-sm">
            {t("news1_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`h-48 flex items-center justify-center text-white font-syne text-xl font-bold p-6 text-center ${art.color}`}
                  style={
                    art.image
                      ? {
                          backgroundImage: `url(${art.image}), url(${art.fallbackImage ?? ""})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : art.fallbackImage
                      ? { backgroundImage: `url(${art.fallbackImage})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : undefined
                  }
                >
                  <div className="bg-black/30 px-4 py-2 rounded">
                    {art.title}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5A637A]">
                    <span>{art.date}</span>
                    <span className="bg-[#F4F6FA] px-2 py-0.5 rounded font-semibold text-[#1A3A6B]">
                      {art.category}
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-lg text-[#0A1628] hover:text-[#C8962A] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#5A637A] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="#"
                  className="text-xs font-semibold text-[#2A5298] hover:text-[#C8962A] inline-flex items-center gap-1 transition-colors"
                >
                  {t("service_learn_more")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
