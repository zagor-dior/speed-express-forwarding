import React from "react";
import { Clock, MapPin } from "lucide-react";
import { ShipmentUpdate } from "@/types";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface TrackingTimelineProps {
  updates: ShipmentUpdate[];
}

export function TrackingTimeline({ updates }: TrackingTimelineProps) {
  const { t } = useLanguage();
  const history = [...(updates || [])];

  if (history.length === 0) {
    return (
      <div className="tracking-empty-history">
        <Clock className="w-8 h-8 mx-auto mb-2" />
        <p>{t("tracking_no_events")}</p>
      </div>
    );
  }

  // Sort updates descending (newest first)
  const sortedUpdates = history.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="tracking-history-table">
      <div className="tracking-history-head"><span>{t("tracking_date")}</span><span>{t("tracking_location")}</span><span>{t("tracking_status")}</span><span>{t("tracking_remarks")}</span></div>
      {sortedUpdates.map((update, index) => {
        const isLatest = index === 0;

        return (
          <div key={update.id || index} className="tracking-history-row">
            <span>{update.status_title === "Commande enregistrée" || update.status_title === "INIT" ? "INIT" : formatDate(update.timestamp)}</span>
            <span>{update.location ? <><MapPin className="w-3.5 h-3.5" />{update.location}</> : "-"}</span>
            <strong>{update.status_title}{isLatest && <em>Current</em>}</strong>
            <span>{update.description || "-"}</span>
          </div>
        );
      })}
    </div>
  );
}
