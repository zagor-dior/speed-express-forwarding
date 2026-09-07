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
      <div className="tracking-empty-history">
        <Clock className="w-8 h-8 mx-auto mb-2" />
        <p>Aucun événement de suivi disponible pour le moment.</p>
      </div>
    );
  }

  // Sort updates descending (newest first)
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="tracking-history-table">
      <div className="tracking-history-head"><span>Date / Time</span><span>Location</span><span>Status</span><span>Remarks</span></div>
      {sortedUpdates.map((update, index) => {
        const isLatest = index === 0;

        return (
          <div key={update.id || index} className="tracking-history-row">
            <span>{formatDate(update.timestamp)}</span>
            <span><MapPin className="w-3.5 h-3.5" />{update.location}</span>
            <strong>{update.status_title}{isLatest && <em>Current</em>}</strong>
            <span>{update.description || "-"}</span>
          </div>
        );
      })}
    </div>
  );
}
