"use client";

import React, { useEffect, useRef } from "react";
import { Anchor, ExternalLink, Navigation, Plane } from "lucide-react";
import { Shipment, ShipmentUpdate } from "@/types";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import "leaflet/dist/leaflet.css";

export interface TrackingMapCardProps {
  shipment: Shipment;
  latestUpdate?: ShipmentUpdate;
  updates?: ShipmentUpdate[];
}

type GeoPoint = { lat: number; lon: number };

async function geocodePlace(place: string): Promise<GeoPoint | null> {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(place)}`);
  if (!response.ok) return null;
  const results = await response.json();
  return results[0] ? { lat: Number(results[0].lat), lon: Number(results[0].lon) } : null;
}

function iconHtml(color: string, parcel: boolean) {
  return `<span class="leaflet-tracking-marker ${parcel ? "leaflet-tracking-parcel" : ""}" style="--marker-color:${color}">${parcel ? "▣" : ""}</span>`;
}

export function TrackingMapCard({ shipment, latestUpdate, updates = [] }: TrackingMapCardProps) {
  const { t } = useLanguage();
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const orderedUpdates = [...updates].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const firstUpdate = orderedUpdates[0];
  const latestLocation = latestUpdate?.location || shipment.origin_country;
  const latestStatus = latestUpdate?.status_title || shipment.status;
  const latestDate = latestUpdate?.timestamp || shipment.shipped_at;
  const progress = shipment.status === "Delivered" ? 100 : shipment.status === "Out for Delivery" ? 85 : shipment.status === "In Transit" ? 60 : shipment.status === "On Hold" ? 45 : shipment.status === "Cancelled" ? 0 : 15;
  const externalMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(shipment.origin_country)}&destination=${encodeURIComponent(shipment.destination_country)}`;

  const getServiceIcon = () => {
    if (shipment.service_type === "Air Freight") return <Plane className="w-5 h-5 text-[#00B4D8]" />;
    if (shipment.service_type === "Ocean Freight") return <Anchor className="w-5 h-5 text-[#00B4D8]" />;
    return <Navigation className="w-5 h-5 text-[#00B4D8]" />;
  };

  useEffect(() => {
    let disposed = false;

    async function initializeMap() {
      if (!mapElement.current) return;
      const L = await import("leaflet");
      const places = await Promise.all([
        geocodePlace(shipment.origin_country),
        geocodePlace(latestLocation),
        geocodePlace(shipment.destination_country),
      ]);
      if (disposed || !mapElement.current) return;

      const fallback = { lat: 20, lon: 0 };
      const [origin, current, destination] = places.map((place) => place || fallback);
      const map = L.map(mapElement.current, { zoomControl: true, attributionControl: true });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);

      const points = [
        { point: origin, title: t("tracking_origin"), date: shipment.shipped_at, location: firstUpdate?.location || shipment.origin_country, status: firstUpdate?.status_title || "INIT", color: "#8c9399", parcel: false },
        { point: current, title: t("tracking_current"), date: latestDate, location: latestLocation, status: latestStatus, color: "#079a32", parcel: true },
        { point: destination, title: t("tracking_destination"), date: shipment.estimated_delivery, location: shipment.destination_country, status: t("tracking_estimated_arrival"), color: "#d92f2f", parcel: false },
      ];

      const bounds = L.latLngBounds(points.map(({ point }) => [point.lat, point.lon] as [number, number]));
      points.forEach(({ point, title, date, location, status, color, parcel }) => {
        const marker = L.marker([point.lat, point.lon], {
          icon: L.divIcon({ className: "leaflet-tracking-icon", html: iconHtml(color, parcel), iconSize: parcel ? [48, 58] : [22, 22], iconAnchor: parcel ? [24, 52] : [11, 11] }),
        }).addTo(map);
        marker.bindPopup(`<strong>${title}</strong><br/>${t("tracking_date")} : ${formatDate(date)}<br/>${t("tracking_location")} : ${location}<br/>${t("tracking_status")} : ${status}`);
      });

      map.fitBounds(bounds.pad(0.18));
      if (places[1]) map.setView([current.lat, current.lon], 11);
    }

    initializeMap();
    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [shipment.origin_country, shipment.destination_country, shipment.shipped_at, shipment.estimated_delivery, latestLocation, latestDate, latestStatus, firstUpdate?.location, firstUpdate?.status_title, t]);

  return (
    <section className="consignment-section route-map-section">
      <div className="section-heading-row"><h2>{t("tracking_route")}</h2><span className="route-progress">{progress}% in route</span></div>
      <div className="map-frame">
        <div className="map-label map-label-origin">{t("tracking_origin")} : {shipment.origin_country}</div>
        <div className="map-label map-label-destination">{t("tracking_destination")} : {shipment.destination_country}</div>
        <div className="map-service">{getServiceIcon()} {shipment.service_type}</div>
        <div ref={mapElement} className="tracking-leaflet-map" aria-label={t("tracking_route")} />
        <div className="map-footer"><span>{t("tracking_map_hint")}</span><a href={externalMapUrl} target="_blank" rel="noreferrer">Open in Google Maps <ExternalLink className="w-3.5 h-3.5" /></a></div>
      </div>
    </section>
  );
}
