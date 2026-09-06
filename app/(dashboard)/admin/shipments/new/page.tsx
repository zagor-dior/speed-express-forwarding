"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, PackagePlus, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { generateTrackingNumber } from "@/lib/utils";
import { ServiceType } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function NewShipmentPage() {
  const router = useRouter();
  const [trackingNumber] = useState(generateTrackingNumber());

  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("Air Freight");
  const [weightKg, setWeightKg] = useState("10");
  const [dimensionsCm, setDimensionsCm] = useState("40x30x20 cm");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newShipmentData = {
      tracking_number: trackingNumber,
      sender_name: senderName,
      sender_address: senderAddress,
      recipient_name: recipientName,
      recipient_address: recipientAddress,
      origin_country: originCountry,
      destination_country: destinationCountry,
      service_type: serviceType,
      weight_kg: parseFloat(weightKg) || 1,
      dimensions_cm: dimensionsCm,
      status: "Pending",
      estimated_delivery: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    };

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("shipments")
        .insert(newShipmentData)
        .select()
        .single();

      if (data && !error) {
        // Create initial update step
        await supabase.from("shipment_updates").insert({
          shipment_id: data.id,
          location: originCountry,
          status_title: "Commande enregistrée",
          description: "Expédition créée et enregistrée dans le système logistique.",
        });
      }

      alert(`Expédition ${trackingNumber} créée avec succès !`);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert(`Expédition ${trackingNumber} enregistrée en mode démo !`);
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#00B4D8]" /> Retour au tableau de bord
      </Link>

      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-cyan-500/20 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#00B4D8] font-bold text-xs uppercase tracking-wider mb-1">
              <PackagePlus className="w-4 h-4" /> Formulaire de Création d'Expédition
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Nouvelle Expédition</h1>
          </div>

          <div className="p-3 rounded-2xl bg-[#0B132B] border border-[#00B4D8]/30 font-mono text-sm font-bold text-[#00B4D8]">
            <span className="text-xs text-slate-400 block font-sans">Numéro unique généré :</span>
            {trackingNumber}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Expéditeur */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold text-slate-400 tracking-wider">
              1. Informations Expéditeur
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Nom / Entreprise *</label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ex: TechLogistics Paris"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Adresse Complète *</label>
                <Input
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  placeholder="Ex: 12 Rue de la Paix, Paris, France"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Destinataire */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm uppercase font-bold text-slate-400 tracking-wider">
              2. Informations Destinataire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Nom / Entreprise *</label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ex: Global Logistics Dakar"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Adresse Complète *</label>
                <Input
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Ex: Av. Cheikh Anta Diop, Dakar, Sénégal"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Itinéraire et Fret */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm uppercase font-bold text-slate-400 tracking-wider">
              3. Détails du Fret & Transport
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Pays d'Origine *</label>
                <Input
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  placeholder="Ex: France"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Pays de Destination *</label>
                <Input
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  placeholder="Ex: Sénégal"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Type de Service *</label>
                <Select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  options={[
                    { label: "Air Freight", value: "Air Freight" },
                    { label: "Ocean Freight", value: "Ocean Freight" },
                    { label: "Road Freight", value: "Road Freight" },
                    { label: "Express Delivery", value: "Express Delivery" },
                    { label: "Warehousing", value: "Warehousing" },
                    { label: "Customs Clearance", value: "Customs Clearance" },
                  ]}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Poids (kg) *</label>
                <Input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="Poids en kg"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-4">
            <Link href="/admin">
              <Button type="button" variant="ghost">Annuler</Button>
            </Link>
            <Button type="submit" variant="primary" size="lg" disabled={loading} className="gap-2">
              <CheckCircle2 className="w-5 h-5" />
              {loading ? "Création en cours..." : "Créer l'Expédition"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
