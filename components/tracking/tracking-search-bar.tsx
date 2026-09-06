"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function TrackingSearchBar({ className }: { className?: string }) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError(t("hero_track_input_placeholder"));
      return;
    }
    setError("");
    const cleaned = trackingNumber.trim().toUpperCase();
    router.push(`/track/${cleaned}`);
  };

  const handleQuickSelect = (num: string) => {
    setTrackingNumber(num);
    router.push(`/track/${num}`);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-lg space-y-3"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-[#C8962A] pointer-events-none" />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => {
                setTrackingNumber(e.target.value);
                if (error) setError("");
              }}
              placeholder={t("hero_track_input_placeholder")}
              className="w-full pl-12 pr-4 py-3.5 rounded-lg text-sm text-[#2D3448] bg-[#F4F6FA] border border-slate-300 focus:outline-none focus:border-[#C8962A] focus:ring-2 focus:ring-[#C8962A]/20 font-mono uppercase tracking-wider transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-[#C8962A] hover:bg-[#E8B84B] text-[#0A1628] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
          >
            <Search className="w-4 h-4" />
            {t("hero_track_btn")}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium pl-1">{error}</p>
        )}

        {/* Demo suggestions */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-[#5A637A] gap-2">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C8962A]" />
            {t("hero_track_try")}
          </span>
          <div className="flex flex-wrap gap-2">
            {["SEF-2026-001234", "SEF-2026-005678", "SEF-2026-990123"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleQuickSelect(code)}
                className="px-2.5 py-1 rounded bg-[#F4F6FA] hover:bg-slate-200 text-[#5A637A] border border-slate-200 font-mono text-xs transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
