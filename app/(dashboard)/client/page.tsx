"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Search, ExternalLink, Calendar, ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MOCK_SHIPMENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function ClientDashboardPage() {
  const [shipments] = useState(MOCK_SHIPMENTS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#00B4D8] font-bold text-xs uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" /> Espace E-Client
          </div>
          <h1 className="text-3xl font-extrabold text-white">Mes Expéditions</h1>
        </div>

        <Link href="/track">
          <Button variant="primary" className="gap-2">
            <Search className="w-4 h-4" /> Suivre un autre colis
          </Button>
        </Link>
      </div>

      {/* Grid of client shipments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shipments.map((ship) => (
          <Card key={ship.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#00B4D8] text-lg">{ship.tracking_number}</span>
                <Badge status={ship.status} />
              </div>

              <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mode :</span>
                  <span className="font-semibold text-white">{ship.service_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Origine → Dest. :</span>
                  <span className="font-semibold text-white">{ship.origin_country} → {ship.destination_country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Poids :</span>
                  <span className="font-semibold text-[#00B4D8] font-mono">{ship.weight_kg ? `${ship.weight_kg} kg` : "N/A"}</span>
                </div>
              </div>
            </div>

            <Link href={`/track/${ship.tracking_number}`} className="pt-2 border-t border-white/10">
              <Button variant="outline" size="sm" className="w-full justify-between">
                <span>Voir le Suivi Détaillé</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
