"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Globe,
  MapPin,
  Clock,
  Headphones,
  BadgeDollarSign,
  Banknote,
  Truck,
  Search,
  RefreshCw,
  User,
  Phone,
  Mail,
  Package,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { Shipment, ShipmentUpdate } from "@/types";
import { formatDate } from "@/lib/utils";
import { TrackingMapCard } from "@/components/tracking/tracking-map-card";
import { TrackingTimeline } from "@/components/tracking/tracking-timeline";

export default function MarketingHomePage() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<Shipment | null>(null);
  const [trackingUpdates, setTrackingUpdates] = useState<ShipmentUpdate[]>([]);
  const [trackingError, setTrackingError] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const { t } = useLanguage();

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = trackingNumber.trim().toUpperCase();

    if (!cleaned) {
      setTrackingResult(null);
      setTrackingError("Entrez un numéro de tracking.");
      return;
    }

    setTrackingLoading(true);
    setTrackingResult(null);
    setTrackingUpdates([]);
    setTrackingError("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("tracking_number", cleaned)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setTrackingError(`Aucune expédition ne correspond au numéro ${cleaned}.`);
        return;
      }

      setTrackingResult(data as Shipment);
      const { data: updates, error: updatesError } = await supabase
        .from("shipment_updates")
        .select("*")
        .eq("shipment_id", data.id)
        .order("timestamp", { ascending: false });

      if (!updatesError) {
        setTrackingUpdates((updates as ShipmentUpdate[]) || []);
      }
    } catch (error) {
      console.error("Erreur de recherche tracking:", error);
      setTrackingError("Impossible de récupérer ce tracking. Vérifiez la connexion à Supabase.");
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ============================================
          1. HERO SECTION — Full-screen with BG image
          ============================================ */}
      <section className="hero-section">
        {/* Background Image */}
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: "url(/images/hero/hero-bg.jpg)",
          }}
        />
        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-6 animate-fade-in-up">
            {/* Ship Icon SVG */}
            <svg
              className="hero-ship-icon"
              viewBox="0 0 120 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Container crane / ship icon */}
              <g fill="white">
                {/* Ship hull */}
                <path d="M10 75 L20 90 L100 90 L110 75 Z" />
                {/* Ship body */}
                <rect x="30" y="55" width="60" height="20" rx="2" />
                {/* Bridge */}
                <rect x="50" y="35" width="20" height="20" rx="1" />
                {/* Funnel */}
                <rect x="56" y="22" width="8" height="13" />
                {/* Smoke */}
                <circle cx="60" cy="18" r="4" opacity="0.7" />
                <circle cx="55" cy="13" r="3" opacity="0.5" />
                {/* Crane arm */}
                <rect x="35" y="30" width="4" height="25" />
                <rect x="25" y="28" width="18" height="4" />
                <line x1="25" y1="28" x2="25" y2="38" stroke="white" strokeWidth="2" />
                {/* Waves */}
                <path
                  d="M5 92 Q15 88 25 92 Q35 96 45 92 Q55 88 65 92 Q75 96 85 92 Q95 88 105 92 Q115 96 120 92"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M0 97 Q10 93 20 97 Q30 101 40 97 Q50 93 60 97 Q70 101 80 97 Q90 93 100 97 Q110 101 120 97"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
              </g>
            </svg>

            {/* Brand Title */}
            <h1 className="hero-brand-title">
              SPEED EXPRESS
              <br />
              FORWARDING
            </h1>

            {/* Subtitle */}
            <p className="hero-brand-subtitle">
              SHIP SMART, SHIP EXPRESS
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          2. TRACKING SECTION
          ============================================ */}
      <section className="tracking-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tracking-box">
            <h4>{t("hero_track_card_title")}</h4>
            <form onSubmit={handleTrackSubmit}>
              <div className="track-input-row">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Example:SEF123"
                  required
                />
                <button type="submit" className="track-btn" disabled={trackingLoading}>
                  {trackingLoading ? <RefreshCw className="tracking-loading-icon" size={15} /> : <Search size={15} />}
                  TRACK RESULT
                </button>
              </div>
            </form>
            {trackingError && <p className="home-tracking-error">{trackingError}</p>}
            {trackingResult && (
              <div className="home-tracking-result" aria-live="polite">
                <div className="home-tracking-result-header">
                  <div>
                    <span className="home-tracking-label">Tracking result</span>
                    <strong>{trackingResult.tracking_number}</strong>
                  </div>
                  <span className="home-tracking-status">{trackingResult.status}</span>
                </div>
                <div className="home-tracking-grid">
                  <div><b>Origin</b><span>{trackingResult.origin_country}</span></div>
                  <div><b>Destination</b><span>{trackingResult.destination_country}</span></div>
                  <div><b>Service</b><span>{trackingResult.service_type}</span></div>
                  <div><b>Quantity</b><span>{trackingResult.product_quantity ?? "-"}</span></div>
                  <div><b>Weight</b><span>{trackingResult.weight_kg ?? "-"} kg</span></div>
                  <div><b>Total freight</b><span>{trackingResult.total_freight != null ? `${Number(trackingResult.total_freight).toFixed(2)} USD` : "-"}</span></div>
                  <div><b>Shipment date</b><span>{formatDate(trackingResult.shipped_at)}</span></div>
                  <div><b>Expected delivery</b><span>{formatDate(trackingResult.estimated_delivery)}</span></div>
                  <div><b>Created</b><span>{formatDate(trackingResult.created_at)}</span></div>
                </div>
                <button type="button" className="home-tracking-details" onClick={() => router.push(`/track/${trackingResult.tracking_number}`)}>
                  View complete tracking details
                </button>
              </div>
            )}
            {trackingResult && (
              <div className="home-full-tracking" aria-live="polite">
                <div className="home-full-tracking-parties">
                  <div><h3><User size={17} /> Shipper Information</h3><strong>{trackingResult.sender_name}</strong><span>{trackingResult.sender_address}</span>{trackingResult.sender_phone && <span><Phone size={13} /> {trackingResult.sender_phone}</span>}{trackingResult.sender_email && <span><Mail size={13} /> {trackingResult.sender_email}</span>}</div>
                  <div><h3><MapPin size={17} /> Receiver Information</h3><strong>{trackingResult.recipient_name}</strong><span>{trackingResult.recipient_address}</span>{trackingResult.recipient_phone && <span><Phone size={13} /> {trackingResult.recipient_phone}</span>}{trackingResult.recipient_email && <span><Mail size={13} /> {trackingResult.recipient_email}</span>}</div>
                </div>
                <div className="home-full-tracking-section"><h3><Package size={17} /> Shipment Information</h3><div className="home-full-tracking-info"><div><b>Origin</b><span>{trackingResult.origin_country}</span></div><div><b>Destination</b><span>{trackingResult.destination_country}</span></div><div><b>Product</b><span>{trackingResult.dimensions_cm || "-"}</span></div><div><b>Quantity</b><span>{trackingResult.product_quantity ?? "-"}</span></div><div><b>Weight</b><span>{trackingResult.weight_kg ?? "-"} kg</span></div><div><b>Total freight</b><span>{trackingResult.total_freight != null ? `${Number(trackingResult.total_freight).toFixed(2)} USD` : "-"}</span></div><div><b>Service</b><span>{trackingResult.service_type}</span></div><div><b>Shipment date</b><span>{formatDate(trackingResult.shipped_at)}</span></div><div><b>Expected delivery</b><span>{formatDate(trackingResult.estimated_delivery)}</span></div></div></div>
                <TrackingMapCard shipment={trackingResult} />
                <div className="home-full-tracking-section"><div className="home-history-title"><h3>Shipment History</h3><span>{trackingUpdates.length} event(s)</span></div><TrackingTimeline updates={trackingUpdates} /></div>
              </div>
            )}
          </div>
          <p className="tracking-hint">
            {t("hero_track_card_subtitle")}
          </p>
        </div>
      </section>

      {/* ============================================
          3. SPACER
          ============================================ */}
      <div style={{ height: "2rem" }} />

      {/* ============================================
          4. LOCAL DELIVERY SERVICES — 4 Cards
          ============================================ */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title-teal text-center">
            {t("services_label").split(" ").slice(0, 2).join(" ")}
            <br />
            {t("services_label").split(" ").slice(2).join(" ")}
          </h2>

          <div className="service-cards-grid">
            {/* Same Day Express */}
            <div className="service-card-overlay">
              <div
                className="card-bg"
                style={{
                  backgroundImage: "url(/images/services/sameday-express.jpg)",
                }}
              />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_sameday_title").toUpperCase()}</h3>
                  <p>{t("svc_sameday_desc")}</p>
                </div>
                <Link href="/about" className="learn-more-btn">
                  {t("svc_sameday_btn")}
                </Link>
              </div>
            </div>

            {/* Next Day Express */}
            <div className="service-card-overlay">
              <div
                className="card-bg"
                style={{
                  backgroundImage: "url(/images/services/nextday-express.jpg)",
                }}
              />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_nextday_title").toUpperCase()}</h3>
                  <p>{t("svc_nextday_desc")}</p>
                </div>
                <Link href="/about" className="learn-more-btn">
                  {t("svc_nextday_btn")}
                </Link>
              </div>
            </div>

            {/* Regular Express */}
            <div className="service-card-overlay">
              <div
                className="card-bg"
                style={{
                  backgroundImage: "url(/images/services/regular-express.jpg)",
                }}
              />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_regular_title").toUpperCase()}</h3>
                  <p>{t("svc_regular_desc")}</p>
                </div>
                <Link href="/about" className="learn-more-btn">
                  {t("svc_regular_btn")}
                </Link>
              </div>
            </div>

            {/* Cargo Express */}
            <div className="service-card-overlay">
              <div
                className="card-bg"
                style={{
                  backgroundImage: "url(/images/services/cargo-express.jpg)",
                }}
              />
              <div className="card-overlay" />
              <div className="card-content">
                <div>
                  <h3>{t("svc_cargo_title").toUpperCase()}</h3>
                  <p>{t("svc_cargo_desc")}</p>
                </div>
                <Link href="/about" className="learn-more-btn">
                  {t("svc_cargo_btn")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          5. INTERNATIONAL DELIVERY SERVICES BANNER
          ============================================ */}
      <section className="intl-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2>
            {t("intl_label").split(" ").slice(0, 1).join(" ")}
            <br />
            {t("intl_label").split(" ").slice(1).join(" ")}
          </h2>
        </div>
      </section>

      {/* ============================================
          6. DIVIDER
          ============================================ */}
      <div className="section-divider" />

      {/* ============================================
          7. FEATURES SECTION — Icons with world map bg
          ============================================ */}
      <section className="features-section">
        <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="features-title">FEATURES</h2>

          <div className="features-grid">
            {/* Feature 1: International Coverage */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Globe strokeWidth={1.5} />
              </div>
              <span className="feature-label">
                {t("feat_coverage_title")}
              </span>
            </div>

            {/* Feature 2: Real-Time Tracking */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <MapPin strokeWidth={1.5} />
              </div>
              <span className="feature-label">
                {t("feat_tracking_title")}
              </span>
            </div>

            {/* Feature 3: 24/7 Customer Service */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Clock strokeWidth={1.5} />
              </div>
              <span className="feature-label">
                {t("feat_support_title")}
                <br />& Complaint Management
              </span>
            </div>

            {/* Feature 4: Premium Pricing */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Truck strokeWidth={1.5} />
              </div>
              <span className="feature-label">
                {t("feat_pricing_title")}
              </span>
            </div>

            {/* Feature 5: COD Express */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Banknote strokeWidth={1.5} />
              </div>
              <span className="feature-label">
                {t("feat_cod_title")}
                <br />
                (Cash On Delivery)
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
