"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ============================================
          1. "About" HEADER BANNER
          ============================================ */}
      <section
        style={{
          background: "var(--light-bg)",
          padding: "3rem 2rem 2rem",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1
            style={{
              fontFamily: "'Red Rose', 'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "#e0d8d0",
              lineHeight: 1,
              letterSpacing: "-2px",
              fontStyle: "italic",
            }}
          >
            About
          </h1>
        </div>
      </section>

      {/* ============================================
          2. HERO — Same as homepage
          ============================================ */}
      <section className="hero-section" style={{ minHeight: "60vh" }}>
        <div
          className="hero-bg-image"
          style={{ backgroundImage: "url(/images/hero/hero-bg.jpg)" }}
        />
        <div className="hero-overlay" />
        <div className="hero-content w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-6 animate-fade-in-up">
            {/* Ship Icon */}
            <svg
              className="hero-ship-icon"
              viewBox="0 0 120 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="white">
                <path d="M10 75 L20 90 L100 90 L110 75 Z" />
                <rect x="30" y="55" width="60" height="20" rx="2" />
                <rect x="50" y="35" width="20" height="20" rx="1" />
                <rect x="56" y="22" width="8" height="13" />
                <circle cx="60" cy="18" r="4" opacity="0.7" />
                <circle cx="55" cy="13" r="3" opacity="0.5" />
                <rect x="35" y="30" width="4" height="25" />
                <rect x="25" y="28" width="18" height="4" />
                <line x1="25" y1="28" x2="25" y2="38" stroke="white" strokeWidth="2" />
                <path
                  d="M5 92 Q15 88 25 92 Q35 96 45 92 Q55 88 65 92 Q75 96 85 92 Q95 88 105 92 Q115 96 120 92"
                  stroke="white" strokeWidth="2.5" fill="none"
                />
                <path
                  d="M0 97 Q10 93 20 97 Q30 101 40 97 Q50 93 60 97 Q70 101 80 97 Q90 93 100 97 Q110 101 120 97"
                  stroke="white" strokeWidth="2" fill="none" opacity="0.6"
                />
              </g>
            </svg>

            <h2 className="hero-brand-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              SPEED EXPRESS
              <br />
              FORWARDING
            </h2>
            <p className="hero-brand-subtitle">SHIP SMART, SHIP EXPRESS</p>
          </div>
        </div>
      </section>

      {/* ============================================
          3. ABOUT DESCRIPTION — Tan background
          ============================================ */}
      <section
        style={{
          background: "var(--tan-primary)",
          padding: "5rem 2rem",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Big heading */}
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--white)",
                lineHeight: 1.2,
              }}
            >
              Shipping
              <br />
              solutions
              <br />
              with fast &
              <br />
              easy
            </h2>
          </div>

          {/* Right — Description */}
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
              }}
            >
              At our company, we hold a strong and unwavering commitment to delivering
              transportation services that are not only swift and efficient but also exhibit
              the highest levels of sophistication and reliability. We believe that our customers
              deserve transportation solutions that are not only functional but also sleek and
              modern, and that is precisely what we strive to deliver with every service we offer.
              Our skilled team of professionals work tirelessly to ensure that we are continuously
              innovating and pushing the boundaries of what is possible in the transportation
              industry. We are always searching for the latest and most cutting-edge technologies,
              as well as developing new and creative strategies to enhance our transportation
              services and make every customer experience as enjoyable and seamless as possible.
              At the end of the day, our vision is simple: to exceed our customers&apos; expectations
              and provide them with a level of service that is unmatched anywhere else.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          4. OUR VISION / OUR MISSION
          ============================================ */}
      <section style={{ padding: "5rem 0", background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div>
              <div
                style={{
                  width: "100%",
                  height: "320px",
                  overflow: "hidden",
                  marginBottom: "1.5rem",
                }}
              >
                <Image
                  src="/images/about/vision.jpg"
                  alt="Our Vision"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "var(--dark-heading)",
                  marginBottom: "1rem",
                }}
              >
                Our Vision
              </h3>
              <p
                style={{
                  color: "var(--gray-600)",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                At Speed Express Forwarding, we are dedicated to providing our valued clients
                with the most reliable and efficient shipping services available. Our team of
                experts is committed to delivering unparalleled quality and support to ensure
                that your products reach their destination quickly and safely. We understand
                that time is of the essence, which is why we offer fast and easy shipping
                solutions that are specifically tailored to meet your unique needs.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  color: "var(--tan-primary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderBottom: "2px solid var(--tan-primary)",
                  paddingBottom: "2px",
                }}
              >
                Read More
              </Link>
            </div>

            {/* Mission */}
            <div>
              <div
                style={{
                  width: "100%",
                  height: "320px",
                  overflow: "hidden",
                  marginBottom: "1.5rem",
                }}
              >
                <Image
                  src="/images/about/mission.jpg"
                  alt="Our Mission"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "var(--dark-heading)",
                  marginBottom: "1rem",
                }}
              >
                Our Mission
              </h3>
              <p
                style={{
                  color: "var(--gray-600)",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                Whether you are shipping small packages or large freight loads, you can trust
                Speed Express Forwarding to provide you with a seamless and hassle-free experience.
                We are constantly striving to improve our processes and exceed your expectations,
                so you can rest assured that your satisfaction is our top priority. Contact us
                today to learn more about our services and how we can help you streamline your
                shipping operations.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  color: "var(--tan-primary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderBottom: "2px solid var(--tan-primary)",
                  paddingBottom: "2px",
                }}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          5. LOCAL DELIVERY SERVICES — 4 Cards
          ============================================ */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title-teal text-center">
            Our Local
            <br />
            Delivery Services
          </h2>

          <div className="service-cards-grid">
            {/* Same Day Express */}
            <div className="service-card-overlay">
              <div className="card-bg" style={{ backgroundImage: "url(/images/services/sameday-express.jpg)" }} />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_sameday_title").toUpperCase()}</h3>
                  <p>{t("svc_sameday_desc")}</p>
                </div>
                <Link href="/contact" className="learn-more-btn">{t("svc_sameday_btn")}</Link>
              </div>
            </div>

            {/* Next Day Express */}
            <div className="service-card-overlay">
              <div className="card-bg" style={{ backgroundImage: "url(/images/services/nextday-express.jpg)" }} />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_nextday_title").toUpperCase()}</h3>
                  <p>{t("svc_nextday_desc")}</p>
                </div>
                <Link href="/contact" className="learn-more-btn">{t("svc_nextday_btn")}</Link>
              </div>
            </div>

            {/* Regular Express */}
            <div className="service-card-overlay">
              <div className="card-bg" style={{ backgroundImage: "url(/images/services/regular-express.jpg)" }} />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_regular_title").toUpperCase()}</h3>
                  <p>{t("svc_regular_desc")}</p>
                </div>
                <Link href="/contact" className="learn-more-btn">{t("svc_regular_btn")}</Link>
              </div>
            </div>

            {/* Cargo Express */}
            <div className="service-card-overlay">
              <div className="card-bg" style={{ backgroundImage: "url(/images/services/cargo-express.jpg)" }} />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_cargo_title").toUpperCase()}</h3>
                  <p>{t("svc_cargo_desc")}</p>
                </div>
                <Link href="/contact" className="learn-more-btn">{t("svc_cargo_btn")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          6. FEATURES SECTION
          ============================================ */}
      <section className="features-section">
        <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="features-title">FEATURES</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <span className="feature-label">{t("feat_coverage_title")}</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span className="feature-label">{t("feat_tracking_title")}</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span className="feature-label">{t("feat_support_title")}</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <span className="feature-label">{t("feat_pricing_title")}</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </div>
              <span className="feature-label">{t("feat_cod_title")}<br/>(Cash On Delivery)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          7. TESTIMONIAL — CEO Quote
          ============================================ */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "var(--white)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Large Quote Mark */}
          <div
            style={{
              fontSize: "5rem",
              lineHeight: 1,
              color: "var(--tan-primary)",
              fontFamily: "Georgia, serif",
              marginBottom: "1rem",
            }}
          >
            &ldquo;
          </div>

          {/* Quote Text */}
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "var(--gray-600)",
              fontStyle: "italic",
              maxWidth: "700px",
              margin: "0 auto 2rem",
            }}
          >
            Using your transportation services has been our best decision yet. From day one,
            our experience has been amazing thanks to your professional team. Your attention
            to detail, timely delivery and impeccable service quality is appreciated. We are
            grateful to have made a partnership with you and will continue utilizing your
            services. Thank you for being an exceptional transportation service provider.
          </p>

          {/* Star Rating */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "4px",
              marginBottom: "1.5rem",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#F5A623"
                stroke="#F5A623"
                strokeWidth="1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>

          {/* Author */}
          <div>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--dark-heading)",
                marginBottom: "0.25rem",
              }}
            >
              Angelina
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--tan-primary)",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              CEO
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
