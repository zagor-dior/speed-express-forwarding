"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Plus,
  Search,
  Filter,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { MOCK_SHIPMENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Shipment, ShipmentStatus, ServiceType } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  // ALL hooks must be declared before any conditional return
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateStatus, setUpdateStatus] = useState<ShipmentStatus>("In Transit");

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    const isAuth = sessionStorage.getItem("sef_admin_auth");
    if (isAuth !== "true") {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  const loadShipments = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0 && !error) {
        setShipments(data as Shipment[]);
      } else {
        setShipments(MOCK_SHIPMENTS);
      }
    } catch (err) {
      setShipments(MOCK_SHIPMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authChecked) {
      loadShipments();
    }
  }, [authChecked]);

  // Filter shipments
  const filteredShipments = shipments.filter((ship) => {
    const matchesSearch =
      ship.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.sender_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || ship.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate quick stats
  const totalShipments = shipments.length;
  const inTransitCount = shipments.filter((s) => s.status === "In Transit" || s.status === "Out for Delivery").length;
  const deliveredCount = shipments.filter((s) => s.status === "Delivered").length;
  const pendingCount = shipments.filter((s) => s.status === "Pending" || s.status === "On Hold").length;

  const handleOpenUpdateModal = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setUpdateStatus(shipment.status);
    setUpdateLocation("");
    setUpdateTitle("");
    setUpdateDescription("");
    setIsUpdateModalOpen(true);
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment || !updateLocation || !updateTitle) return;

    try {
      const supabase = createClient();

      await supabase
        .from("shipments")
        .update({ status: updateStatus, updated_at: new Date().toISOString() })
        .eq("id", selectedShipment.id);

      await supabase.from("shipment_updates").insert({
        shipment_id: selectedShipment.id,
        location: updateLocation,
        status_title: updateTitle,
        description: updateDescription,
        timestamp: new Date().toISOString(),
      });

      setShipments((prev) =>
        prev.map((s) =>
          s.id === selectedShipment.id ? { ...s, status: updateStatus } : s
        )
      );

      setIsUpdateModalOpen(false);
      alert(`Nouvelle étape ajoutée avec succès pour ${selectedShipment.tracking_number} !`);
    } catch (err) {
      console.error(err);
      alert("Mise à jour simulée effectuée !");
      setIsUpdateModalOpen(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sef_admin_auth");
    sessionStorage.removeItem("sef_admin_email");
    router.replace("/login");
  };

  // Don't render dashboard until auth is verified
  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e0dbd5", borderTopColor: "#9D8870", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ color: "#9D8870", fontSize: "0.9rem", fontWeight: 500 }}>Vérification...</p>
          <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F8F6F3", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6" style={{ borderBottom: "1px solid #e0dbd5" }}>
          <div>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1" style={{ color: "#9D8870" }}>
              <Shield className="w-4 h-4" /> Panneau de Gestion Administrateur
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: "#1A3A4A", fontFamily: "'Poppins', sans-serif" }}>Gestion des Expéditions</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/shipments/new">
              <button
                style={{
                  background: "#9D8870",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.7rem 1.5rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                <Plus className="w-5 h-5" />
                Nouvelle Expédition
              </button>
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1.5px solid #e0dbd5",
                borderRadius: "10px",
                padding: "0.7rem",
                cursor: "pointer",
                color: "#9D8870",
                transition: "all 0.2s",
              }}
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Expéditions", value: totalShipments, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", icon: <Package className="w-6 h-6" /> },
            { label: "En Transit / Vol", value: inTransitCount, color: "#9D8870", bg: "rgba(157,136,112,0.1)", icon: <TrendingUp className="w-6 h-6" /> },
            { label: "Livrées avec Succès", value: deliveredCount, color: "#10B981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle className="w-6 h-6" /> },
            { label: "En Attente", value: pendingCount, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: <Clock className="w-6 h-6" /> },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "1.5rem",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</span>
                  <h3 style={{ fontSize: "2rem", fontWeight: 800, color: stat.color, fontFamily: "monospace", marginTop: "4px" }}>{stat.value}</h3>
                </div>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: stat.bg, color: stat.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search Toolbar */}
        <div style={{ background: "#fff", padding: "1rem 1.25rem", borderRadius: "14px", border: "1px solid #eee" }} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par n° de suivi, client..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#888" }} className="flex items-center gap-1.5 shrink-0">
              <Filter className="w-4 h-4" style={{ color: "#9D8870" }} /> Filtrer par Statut :
            </span>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-44 py-2"
              options={[
                { label: "Tous les statuts", value: "ALL" },
                { label: "In Transit", value: "In Transit" },
                { label: "Out for Delivery", value: "Out for Delivery" },
                { label: "Delivered", value: "Delivered" },
                { label: "Pending", value: "Pending" },
                { label: "On Hold", value: "On Hold" },
              ]}
            />
          </div>
        </div>

        {/* Shipments Table */}
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #eee", overflow: "hidden" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" style={{ color: "#2D3448" }}>
              <thead style={{ background: "#F8F6F3", fontSize: "0.7rem", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #eee" }}>
                <tr>
                  <th className="px-6 py-4">N° de Suivi</th>
                  <th className="px-6 py-4">Expéditeur</th>
                  <th className="px-6 py-4">Destinataire</th>
                  <th className="px-6 py-4">Itinéraire</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((ship) => (
                  <tr key={ship.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td className="px-6 py-4 font-mono font-bold" style={{ color: "#9D8870" }}>
                      <Link href={`/track/${ship.tracking_number}`} className="hover:underline flex items-center gap-1.5">
                        {ship.tracking_number}
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium">{ship.sender_name}</td>
                    <td className="px-6 py-4 font-medium">{ship.recipient_name}</td>
                    <td className="px-6 py-4 text-xs font-mono" style={{ color: "#666" }}>
                      {ship.origin_country} → {ship.destination_country}
                    </td>
                    <td className="px-6 py-4">
                      <span style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(157,136,112,0.1)", fontSize: "0.75rem", fontWeight: 600, color: "#9D8870", border: "1px solid rgba(157,136,112,0.2)" }}>
                        {ship.service_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={ship.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenUpdateModal(ship)}
                        style={{
                          background: "transparent",
                          border: "1px solid #e0dbd5",
                          borderRadius: "8px",
                          padding: "0.35rem 0.75rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#9D8870",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.2s",
                        }}
                      >
                        <PlusCircle className="w-4 h-4" />
                        Mettre à Jour
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Modal to Add a Tracking Step */}
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title={`Ajouter un Événement pour ${selectedShipment?.tracking_number}`}
        >
          <form onSubmit={handleAddUpdate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Nouveau Statut Global
              </label>
              <Select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value as ShipmentStatus)}
                options={[
                  { label: "In Transit", value: "In Transit" },
                  { label: "Out for Delivery", value: "Out for Delivery" },
                  { label: "Delivered", value: "Delivered" },
                  { label: "On Hold", value: "On Hold" },
                  { label: "Pending", value: "Pending" },
                ]}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Localisation (Hub / Ville / Port) *
              </label>
              <Input
                value={updateLocation}
                onChange={(e) => setUpdateLocation(e.target.value)}
                placeholder="Ex: Hub de Transit Casablanca, Maroc"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Titre du Statut *
              </label>
              <Input
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                placeholder="Ex: Contrôle douanier validé"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Description Détaillée
              </label>
              <textarea
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                placeholder="Ex: Le colis a passé la vérification douanière et est en cours d'embarquement."
                rows={3}
                className="glass-input w-full p-3 rounded-xl text-sm"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" variant="primary">
                Enregistrer l&apos;Étape
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
