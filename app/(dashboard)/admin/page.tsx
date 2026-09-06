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

export default function AdminDashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);

  // Modal state for adding a shipment update event
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateStatus, setUpdateStatus] = useState<ShipmentStatus>("In Transit");

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
    loadShipments();
  }, []);

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

      // Update shipment status
      await supabase
        .from("shipments")
        .update({ status: updateStatus, updated_at: new Date().toISOString() })
        .eq("id", selectedShipment.id);

      // Insert new update step
      await supabase.from("shipment_updates").insert({
        shipment_id: selectedShipment.id,
        location: updateLocation,
        status_title: updateTitle,
        description: updateDescription,
        timestamp: new Date().toISOString(),
      });

      // Update local state for immediate feedback
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#00B4D8] font-bold text-xs uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" /> Panneau de Gestion Administrateur
          </div>
          <h1 className="text-3xl font-extrabold text-white">Gestion des Expéditions</h1>
        </div>

        <Link href="/admin/shipments/new">
          <Button variant="primary" size="lg" className="gap-2 shadow-xl shadow-[#00B4D8]/20">
            <Plus className="w-5 h-5" />
            Nouvelle Expédition
          </Button>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover={false} className="border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Expéditions</span>
              <h3 className="text-3xl font-extrabold text-white font-mono mt-1">{totalShipments}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card hover={false} className="border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">En Transit / Vol</span>
              <h3 className="text-3xl font-extrabold text-[#00B4D8] font-mono mt-1">{inTransitCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-[#00B4D8] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card hover={false} className="border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Livrées avec Succès</span>
              <h3 className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">{deliveredCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card hover={false} className="border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">En Attente / Reconstitution</span>
              <h3 className="text-3xl font-extrabold text-amber-400 font-mono mt-1">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par n° de suivi, client..."
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0">
            <Filter className="w-4 h-4 text-[#00B4D8]" /> Filtrer par Statut :
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
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#0B132B] text-xs uppercase font-bold text-slate-400 border-b border-white/10">
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
            <tbody className="divide-y divide-white/5">
              {filteredShipments.map((ship) => (
                <tr key={ship.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#00B4D8]">
                    <Link href={`/track/${ship.tracking_number}`} className="hover:underline flex items-center gap-1.5">
                      {ship.tracking_number}
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{ship.sender_name}</td>
                  <td className="px-6 py-4 font-medium text-white">{ship.recipient_name}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-300">
                    {ship.origin_country} → {ship.destination_country}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-semibold text-slate-300 border border-white/10">
                      {ship.service_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={ship.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenUpdateModal(ship)}
                      className="gap-1.5 text-xs text-[#00B4D8] hover:bg-[#00B4D8]/10"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Mettre à Jour
                    </Button>
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
              Enregistrer l'Étape
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
