"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Package,
  Calendar,
  MapPin,
  Printer,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Share2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Truck,
  Scale,
} from "lucide-react";
import { TrackingTimeline } from "@/components/tracking/tracking-timeline";
import { TrackingMapCard } from "@/components/tracking/tracking-map-card";
import { TrackingSearchBar } from "@/components/tracking/tracking-search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Shipment, ShipmentUpdate } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function PublicTrackingResultPage() {
  const params = useParams();
  const rawTrackingNumber = (params?.trackingNumber as string) || "";
  const trackingNumber = rawTrackingNumber.toUpperCase();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [updates, setUpdates] = useState<ShipmentUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchTrackingData() {
      setLoading(true);
      try {
        const supabase = createClient();

        // 1. Try querying Supabase
        const { data: dbShipment, error: shipErr } = await supabase
          .from("shipments")
          .select("*")
          .eq("tracking_number", trackingNumber)
          .single();

        if (dbShipment && !shipErr) {
          setShipment(dbShipment as Shipment);

          const { data: dbUpdates } = await supabase
            .from("shipment_updates")
            .select("*")
            .eq("shipment_id", dbShipment.id)
            .order("timestamp", { ascending: false });

          setUpdates((dbUpdates as ShipmentUpdate[]) || []);
        } else {
          console.error("Tracking lookup failed:", shipErr);
          setShipment(null);
          setUpdates([]);
        }
      } catch (err) {
        console.error("Tracking fetch error:", err);
        setShipment(null);
        setUpdates([]);
      } finally {
        setLoading(false);
      }
    }

    if (trackingNumber) {
      fetchTrackingData();
    }
  }, [trackingNumber]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const barcodePattern = trackingNumber
    .split("")
    .map((character) => character.charCodeAt(0).toString(2).padStart(7, "0"))
    .join("0");

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-10 h-10 text-[#00B4D8] animate-spin" />
        <p className="text-slate-300 font-semibold text-sm">
          Recherche des informations de suivi pour <span className="font-mono text-[#00B4D8]">{trackingNumber}</span>...
        </p>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-center">
        <div className="glass-card p-10 rounded-3xl border border-rose-500/20 max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Numéro de Suivi Introuvable</h2>
          <p className="text-slate-300 text-sm">
            Aucune expédition ne correspond au numéro <span className="font-mono font-bold text-[#00B4D8]">{trackingNumber}</span>.
            Vérifiez la saisie ou contactez l’administrateur pour confirmer le numéro.
          </p>

          <TrackingSearchBar />
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-result-page">
      <div className="tracking-actions print:hidden">
        <Link href="/" className="tracking-back"><ArrowLeft className="w-4 h-4" /> Retour à l'accueil</Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleShare} className="tracking-action-button"><Share2 className="w-4 h-4" />{copied ? "Lien copié" : "Partager"}</Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="tracking-action-button"><Printer className="w-4 h-4" /> Imprimer</Button>
        </div>
      </div>

      <main className="consignment-sheet">
        <header className="consignment-header">
          <div>
            <p className="eyebrow">Premium Freight Solution</p>
            <h1>Consignment Tracking</h1>
            <p className="sheet-muted">Official shipment status and delivery record</p>
          </div>
          <div className="tracking-code-block">
            <span>Tracking / Consignment No.</span>
            <strong>{shipment.tracking_number}</strong>
            <div className="barcode" aria-label={`Code-barres ${shipment.tracking_number}`}>
              {barcodePattern.split("").map((bar, index) => <i key={index} style={{ width: bar === "1" ? "3px" : "1px" }} />)}
            </div>
            <small>{shipment.tracking_number}</small>
          </div>
        </header>

        <div className="shipment-status-banner">SHIPMENT STATUS: <strong>{shipment.status.toUpperCase()}</strong></div>

        <section className="consignment-section party-grid">
          <div>
            <h2>Shipper Information</h2>
            <p className="party-name">{shipment.sender_name}</p>
            <p>{shipment.sender_address}</p>
            {shipment.sender_phone && <p>{shipment.sender_phone}</p>}
            {shipment.sender_email && <p>{shipment.sender_email}</p>}
          </div>
          <div>
            <h2>Receiver Information</h2>
            <p className="party-name">{shipment.recipient_name}</p>
            <p>{shipment.recipient_address}</p>
            {shipment.recipient_phone && <p>{shipment.recipient_phone}</p>}
            {shipment.recipient_email && <p>{shipment.recipient_email}</p>}
          </div>
        </section>

        <section className="consignment-section">
          <h2>Shipment Information</h2>
          <div className="shipment-info-grid">
            <div><b>Origin:</b><span>{shipment.origin_country}</span></div>
            <div><b>Destination:</b><span>{shipment.destination_country}</span></div>
            <div><b>Status:</b><span>{shipment.status}</span></div>
            <div><b>Weight:</b><span>{shipment.weight_kg ?? "-"} kg</span></div>
            <div><b>Shipment Mode:</b><span>{shipment.service_type}</span></div>
            <div><b>Payment Mode:</b><span>{shipment.payment_method || "-"}</span></div>
            <div><b>Product / Package:</b><span>{shipment.dimensions_cm || "-"}</span></div>
            <div><b>Expected Delivery Date:</b><span>{formatDate(shipment.estimated_delivery)}</span></div>
          </div>
        </section>

        <section className="consignment-section">
          <h2>Packages</h2>
          <table className="shipment-table"><thead><tr><th>Qty.</th><th>Piece Type</th><th>Description</th><th>Weight</th></tr></thead><tbody><tr><td>1</td><td>Package</td><td>{shipment.dimensions_cm || "Standard shipment"}</td><td>{shipment.weight_kg ?? "-"} kg</td></tr></tbody></table>
        </section>

        <TrackingMapCard shipment={shipment} />

        <section className="consignment-section history-section">
          <div className="section-heading-row"><h2>Shipment History</h2><span>{updates.length} event(s)</span></div>
          <TrackingTimeline updates={updates} />
        </section>
      </main>
    </div>
  );
}
