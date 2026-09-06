"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F4F6FA] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="section-label">{t("contact_label")}</span>
          <h1 className="font-syne text-4xl font-extrabold text-[#0A1628]">
            {t("contact_title")}
          </h1>
          <p className="text-[#5A637A] text-sm">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-[#0A1628]">{t("contact_headquarters")}</h4>
                <p className="text-xs text-[#5A637A] mt-0.5">{t("contact_hq_address")}</p>
                <p className="text-xs text-[#5A637A] mt-1">{t("contact_office_abudhabi")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <a
                href={`https://wa.me/${String(t("topbar_phone")).replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                  <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.373 0 .001 5.373 0 12c0 2.112.552 4.183 1.6 6.02L0 24l6.175-1.592A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.96-.49-3.8-1.48-5.44zM12 21.5c-1.77 0-3.5-.47-4.98-1.35l-.36-.21-3.66.94.98-3.57-.23-.37A9.497 9.497 0 0 1 2.5 12c0-5.25 4.25-9.5 9.5-9.5 5.25 0 9.5 4.25 9.5 9.5S17.25 21.5 12 21.5z" />
                  <path d="M17.56 14.37c-.3-.15-1.77-.87-2.04-.97-.27-.11-.47-.16-.67.16-.2.32-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.28.3-.47.1-.18.05-.34-.02-.49-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.34-.27.27-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.4 5.09 4.77 3 1.37 3.87 1.12 4.57 1.05.7-.07 2.28-.93 2.6-1.83.32-.9.32-1.67.22-1.83-.1-.16-.36-.26-.66-.41z" />
                </svg>
              </a>
              <div>
                <h4 className="font-syne font-bold text-sm text-[#0A1628]">{t("contact_phone")}</h4>
                <p className="text-xs text-[#5A637A] mt-0.5">{t("topbar_phone")}</p>
                <div className="mt-4">
                  <a
                    href={`tel:${String(t("topbar_phone")).replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C8962A] text-[#0A1628] flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm text-[#5A637A]">{t("contact_phone")}</span>
                      <span className="block text-lg font-bold text-[#0A1628]">{t("topbar_phone")}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2A5298] text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-[#0A1628]">{t("contact_email")}</h4>
                <p className="text-xs text-[#5A637A] mt-0.5">{t("topbar_email")}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#C8962A] text-[#0A1628] flex items-center justify-center mx-auto">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-[#0A1628]">{t("contact_success_title")}</h3>
                  <p className="text-sm text-[#5A637A]">
                    {t("contact_success_desc")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-syne text-xl font-bold text-[#0A1628] mb-2">{t("contact_form_title")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#5A637A] mb-1 block">{t("contact_name_label")}</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full bg-[#F4F6FA] border border-slate-300 rounded-lg p-3 text-sm text-[#2D3448] focus:outline-none focus:border-[#C8962A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#5A637A] mb-1 block">{t("contact_email_label")}</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="w-full bg-[#F4F6FA] border border-slate-300 rounded-lg p-3 text-sm text-[#2D3448] focus:outline-none focus:border-[#C8962A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5A637A] mb-1 block">{t("contact_subject_label")}</label>
                    <input
                      type="text"
                      placeholder="Freight Inquiry / Quote"
                      className="w-full bg-[#F4F6FA] border border-slate-300 rounded-lg p-3 text-sm text-[#2D3448] focus:outline-none focus:border-[#C8962A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5A637A] mb-1 block">{t("contact_message_label")}</label>
                    <textarea
                      rows={4}
                      placeholder="..."
                      required
                      className="w-full bg-[#F4F6FA] border border-slate-300 rounded-lg p-3 text-sm text-[#2D3448] focus:outline-none focus:border-[#C8962A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C8962A] hover:bg-[#E8B84B] text-[#0A1628] font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" /> {t("contact_submit_btn")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
