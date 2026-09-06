import React from "react";
import { Navigation, Anchor, Plane, MapPin, Compass, ShieldCheck } from "lucide-react";
import { Shipment } from "@/types";

export interface TrackingMapCardProps {
  shipment: Shipment;
}

export function TrackingMapCard({ shipment }: TrackingMapCardProps) {
  // Service icon selector
  const getServiceIcon = () => {
    switch (shipment.service_type) {
      case "Air Freight":
        return <Plane className="w-5 h-5 text-[#00B4D8]" />;
      case "Ocean Freight":
        return <Anchor className="w-5 h-5 text-[#00B4D8]" />;
      default:
        return <Navigation className="w-5 h-5 text-[#00B4D8]" />;
    }
  };

  const getProgressPercentage = () => {
    switch (shipment.status) {
      case "Pending":
        return 15;
      case "In Transit":
        return 60;
      case "Out for Delivery":
        return 85;
      case "Delivered":
        return 100;
      case "On Hold":
        return 45;
      case "Cancelled":
        return 0;
      default:
        return 50;
    }
  };

  const progress = getProgressPercentage();

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden">
      {/* Visual background grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#00B4D8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center">
              {getServiceIcon()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Acheminement International
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Service : <span className="text-[#00B4D8]">{shipment.service_type}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
            <Compass className="w-3.5 h-3.5 text-[#00B4D8] animate-spin" style={{ animationDuration: "12s" }} />
            <span className="font-mono font-bold text-[#00B4D8]">{progress}%</span>
          </div>
        </div>

        {/* Route visualization progress bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Origine: <strong className="text-white">{shipment.origin_country}</strong>
            </span>
            <span className="text-slate-300 flex items-center gap-1">
              Destination: <strong className="text-white">{shipment.destination_country}</strong>
              <MapPin className="w-3.5 h-3.5 text-[#00B4D8]" />
            </span>
          </div>

          <div className="relative h-3 w-full bg-[#0B132B] rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#00B4D8] via-[#0077B6] to-[#FF6B35] rounded-full transition-all duration-1000 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Shipping details footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Expéditeur</span>
            <span className="font-bold text-white truncate block">{shipment.sender_name}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Destinataire</span>
            <span className="font-bold text-white truncate block">{shipment.recipient_name}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Poids Brut</span>
            <span className="font-bold text-[#00B4D8] block font-mono">{shipment.weight_kg ? `${shipment.weight_kg} kg` : "N/A"}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Dimensions</span>
            <span className="font-bold text-slate-200 block font-mono">{shipment.dimensions_cm || "Standard"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
