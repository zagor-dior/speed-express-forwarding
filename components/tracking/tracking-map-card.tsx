import React, { useState } from "react";
import { Navigation, Anchor, Plane, MapPin, ExternalLink } from "lucide-react";
import { Shipment, ShipmentUpdate } from "@/types";
import { formatDate } from "@/lib/utils";

export interface TrackingMapCardProps {
  shipment: Shipment;
  latestUpdate?: ShipmentUpdate;
}

export function TrackingMapCard({ shipment, latestUpdate }: TrackingMapCardProps) {
  const [isMarkerOpen, setIsMarkerOpen] = useState(true);
  const latestLocation = latestUpdate?.location || shipment.origin_country;
  const latestStatus = latestUpdate?.status_title || shipment.status;
  const latestDate = latestUpdate?.timestamp || shipment.shipped_at || shipment.created_at;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(latestLocation)}&z=11&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(shipment.origin_country)}&destination=${encodeURIComponent(shipment.destination_country)}`;

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
    <section className="consignment-section route-map-section">
      <div className="section-heading-row">
        <h2>Shipment Route</h2>
        <span className="route-progress">{progress}% in route</span>
      </div>
      <div className="route-indicator">
        <div className="route-point"><span className="route-dot origin-dot" /><b>Origin</b><small>{shipment.origin_country}</small></div>
        <div className="route-line"><span style={{ width: `${progress}%` }} /></div>
        <div className="route-point route-point-end"><span className="route-dot destination-dot" /><b>Destination</b><small>{shipment.destination_country}</small></div>
      </div>
      <div className="map-frame">
        <div className="map-label map-label-origin"><MapPin className="w-4 h-4" /> {shipment.origin_country}</div>
        <div className="map-label map-label-destination"><MapPin className="w-4 h-4" /> {shipment.destination_country}</div>
        <div className="flex items-center justify-between">
          <span className="map-service">{getServiceIcon()} {shipment.service_type}</span>
        </div>
        <div className="map-embed">
          <iframe
            title={`Carte de l'itinéraire ${shipment.origin_country} vers ${shipment.destination_country}`}
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-72 sm:h-96 border-0"
          />
          <button
            type="button"
            className={`parcel-map-marker ${isMarkerOpen ? "is-open" : ""}`}
            onClick={() => setIsMarkerOpen((open) => !open)}
            aria-label={`Afficher les détails de la position ${latestLocation}`}
          >
            {isMarkerOpen && (
              <span className="parcel-map-popup">
                <strong>Dernière position du colis</strong>
                <span>Date : {formatDate(latestDate)}</span>
                <span>Location : {latestLocation}</span>
                <span>Status : {latestStatus}</span>
              </span>
            )}
            <span className="parcel-map-pin"><span className="parcel-map-box" /></span>
          </button>
        </div>
        <div className="map-footer">
          <span>Interactive map: zoom and move the map to inspect the route.</span>
          <a href={externalMapUrl} target="_blank" rel="noreferrer">Open in Google Maps <ExternalLink className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </section>
  );
}
