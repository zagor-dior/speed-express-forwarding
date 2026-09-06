"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo/logo.png"
                alt="Speed Express Forwarding"
                width={180}
                height={50}
                className="h-14 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.style.fontFamily = "'Red Rose', 'Poppins', sans-serif";
                    fallback.style.fontWeight = "800";
                    fallback.style.fontSize = "1.1rem";
                    fallback.style.color = "#2D3448";
                    fallback.innerHTML =
                      '<span style="color:#9D8870">SPEED EXPRESS</span><br/>FORWARDING';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </Link>
            <p
              style={{
                fontFamily: "'Red Rose', sans-serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "0.8rem",
                color: "#9D8870",
                letterSpacing: "0.5px",
              }}
            >
              SHIP SMART, SHIP EXPRESS
            </p>
          </div>

          {/* Information Column */}
          <div>
            <h6>{t("footer_information")}</h6>
            <ul>
              <li>
                <Link href="/about">{t("footer_faq")}</Link>
              </li>
              <li>
                <Link href="/about">{t("footer_terms")}</Link>
              </li>
              <li>
                <Link href="/about">{t("footer_privacy")}</Link>
              </li>
              <li>
                <Link href="/about">{t("footer_additional")}</Link>
              </li>
              <li>
                <Link href="/about">{t("footer_accessibility")}</Link>
              </li>
            </ul>
          </div>

          {/* Product Column */}
          <div>
            <h6>{t("footer_product")}</h6>
            <ul>
              <li>
                <Link href="/">{t("svc_sameday_title")}</Link>
              </li>
              <li>
                <Link href="/">{t("svc_nextday_title")}</Link>
              </li>
              <li>
                <Link href="/">{t("svc_regular_title")}</Link>
              </li>
              <li>
                <Link href="/">{t("svc_cargo_title")}</Link>
              </li>
              <li>
                <Link href="/">eCommerce Solutions</Link>
              </li>
            </ul>
          </div>

          {/* Email Us Column */}
          <div>
            <h6>{t("footer_email_us")}</h6>
            <div className="flex items-center gap-3 mt-2">
              <Mail
                className="w-5 h-5 shrink-0"
                style={{ color: "#9D8870" }}
              />
              <a
                href={`mailto:${t("topbar_email")}`}
                style={{
                  fontSize: "0.9rem",
                  color: "#2D3448",
                  fontWeight: 500,
                }}
              >
                {t("topbar_email")}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            © {new Date().getFullYear()} speedexpressforwarding.com
          </p>
        </div>
      </div>
    </footer>
  );
}
