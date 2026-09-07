"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="footer-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              {logoError ? (
                <div
                  style={{
                    fontFamily: "'Red Rose', 'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#2D3448",
                  }}
                >
                  <span style={{ color: "#9D8870" }}>SPEED EXPRESS</span>
                  <br />
                  FORWARDING
                </div>
              ) : (
                <Image
                  src="/images/logo/logo.png"
                  alt="Speed Express Forwarding"
                  width={180}
                  height={50}
                  className="h-14 w-auto"
                  onError={() => setLogoError(true)}
                />
              )}
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

          {/* Email Us / Contact Column */}
          <div>
            <h6>{t("footer_email_us")}</h6>
            <div
              className="space-y-4 mt-2"
              style={{
                fontSize: "0.85rem",
                color: "#5A637A",
                lineHeight: 1.6,
              }}
            >
              {/* China Address */}
              <div>
                <p
                  style={{
                    fontWeight: 500,
                    color: "#2D3448",
                    marginBottom: "2px",
                  }}
                >
                  🇨🇳 China
                </p>
                <p>No. 88, Baiyun Avenue</p>
                <p>Baiyun District, Guangzhou, Guangdong</p>
                <p>Postal Code: 510000</p>
              </div>

              {/* Abu Dhabi Address */}
              <div>
                <p
                  style={{
                    fontWeight: 500,
                    color: "#2D3448",
                    marginBottom: "2px",
                  }}
                >
                  🇦🇪 Abu Dhabi
                </p>
                <p>Electra Street</p>
                <p>Abu Dhabi, United Arab Emirates</p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href="mailto:speedexpressforwading@gmail.com"
                  style={{ color: "#9D8870", fontWeight: 500 }}
                >
                  speedexpressforwading@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href="tel:+85295487155"
                  style={{ color: "#9D8870", fontWeight: 500 }}
                >
                  +852 9548 7155
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} speedexpressforwarding.com</p>
        </div>
      </div>
    </footer>
  );
}
