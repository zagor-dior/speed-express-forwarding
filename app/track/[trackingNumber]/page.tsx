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
} from "lucide-react";
import { TrackingTimeline } from "@/components/tracking/tracking-timeline";
import { TrackingMapCard } from "@/components/tracking/tracking-map-card";
import { TrackingSearchBar } from "@/components/tracking/tracking-search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMockShipment } from "@/lib/mock-data";
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
          // 2. Fallback to mock data engine if not found in database
          const mock = getMockShipment(trackingNumber);
          if (mock) {
            setShipment(mock);
            setUpdates(mock.updates);
          } else {
            setShipment(null);
            setUpdates([]);
          }
        }
      } catch (err) {
        console.error("Tracking fetch error:", err);
        const mock = getMockShipment(trackingNumber);
        if (mock) {
          setShipment(mock);
          setUpdates(mock.updates);
        }
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
            Vérifiez la saisie ou utilisez l'un des numéros de démonstration ci-dessous.
          </p>

          <TrackingSearchBar />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:p-0">
      {/* Header Back & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 text-[#00B4D8]" /> Retour à l'accueil
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4 text-[#00B4D8]" />
            {copied ? "Lien copié !" : "Partager"}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" /> Imprimer le reçu
          </Button>
        </div>
      </div>

      {/* Main Shipment Status Overview Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-wide">
                {shipment.tracking_number}
              </h1>
              <Badge status={shipment.status} />
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Expédition créée le {formatDate(shipment.created_at)}
            </p>
          </div>

          {/* Delivery estimation highlight */}
          <div className="p-4 rounded-2xl bg-[#0B132B] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Livraison Estimée</span>
              <span className="text-base font-extrabold text-white font-mono">
                {formatDate(shipment.estimated_delivery)}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Route Map Card */}
        <div className="pt-6">
          <TrackingMapCard shipment={shipment} />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00B4D8]" /> Historique d'Acheminement
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {updates.length} Étape(s) enregistrée(s)
            </span>
          </div>

          <TrackingTimeline updates={updates} />
        </div>

        {/* Sidebar info card */}
        <div className="space-y-6">
          <Card hover={false} className="border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#00B4D8]" /> Informations de Sécurité
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Type de Service :</span>
                <span className="font-bold text-white">{shipment.service_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Origine :</span>
                <span className="font-bold text-white">{shipment.origin_country}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Destination :</span>
                <span className="font-bold text-white">{shipment.destination_country}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Statut RLS :</span>
                <span className="font-bold text-emerald-400">Vérifié Public</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
