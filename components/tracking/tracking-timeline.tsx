import React from "react";
import { CheckCircle2, Clock, MapPin, Plane, Ship, Truck, AlertCircle } from "lucide-react";
import { ShipmentUpdate } from "@/types";
import { formatDate } from "@/lib/utils";

export interface TrackingTimelineProps {
  updates: ShipmentUpdate[];
}

export function TrackingTimeline({ updates }: TrackingTimelineProps) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#00B4D8]" />
        <p className="text-sm font-medium">Aucun événement de suivi disponible pour le moment.</p>
      </div>
    );
  }

  // Sort updates descending (newest first)
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#00B4D8] before:via-[#0077B6] before:to-slate-700">
      {sortedUpdates.map((update, index) => {
        const isLatest = index === 0;

        return (
          <div key={update.id || index} className="relative group">
            {/* Timeline Circle Marker */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                isLatest
                  ? "bg-[#00B4D8] border-white text-white glow-cyan scale-110"
                  : "bg-[#1C2541] border-slate-600 text-slate-400"
              }`}
            >
              {isLatest ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-400" />
              )}
            </div>

            {/* Event Content Card */}
            <div className="glass-card p-5 rounded-2xl border border-white/10 group-hover:border-[#00B4D8]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  {update.status_title}
                  {isLatest && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30">
                      Étape Actuelle
                    </span>
                  )}
                </h4>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00B4D8]" />
                  {formatDate(update.timestamp)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00B4D8] mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{update.location}</span>
              </div>

              {update.description && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {update.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
