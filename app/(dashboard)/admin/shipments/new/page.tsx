"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  PackagePlus,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Building,
  Package,
  Weight,
  Hash,
  DollarSign,
  Calendar,
  Clock,
  CreditCard,
  Smartphone,
  Plane,
  Ship,
  Truck,
  Zap,
  Warehouse,
  FileCheck,
} from "lucide-react";
import { generateTrackingNumber } from "@/lib/utils";
import { ServiceType } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function NewShipmentPage() {
  const router = useRouter();
  const [trackingNumber] = useState(generateTrackingNumber());
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Destinataire
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientCountry, setRecipientCountry] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientDestination, setRecipientDestination] = useState("");

  // Expéditeur
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [senderCity, setSenderCity] = useState("");

  // Fret et transport
  const [article, setArticle] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [productQuantity, setProductQuantity] = useState("1");
  const [weightKg, setWeightKg] = useState("");
  const [totalFreight, setTotalFreight] = useState("");
  const [shippedAt, setShippedAt] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bancaire");
  const [serviceType, setServiceType] = useState<ServiceType>("Air Freight");

  // Auth guard
  useEffect(() => {
    const isAuth = sessionStorage.getItem("sef_admin_auth");
    if (isAuth !== "true") {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = Number.parseInt(productQuantity, 10);
    const freight = Number.parseFloat(totalFreight);
    const shippedDate = new Date(shippedAt);
    const deliveryDate = new Date(estimatedDelivery);

    if (!Number.isInteger(quantity) || quantity < 1) {
      alert("La quantité du produit doit être un nombre entier supérieur à zéro.");
      return;
    }

    if (!Number.isFinite(freight) || freight < 0) {
      alert("Le fret total doit être un montant positif ou nul.");
      return;
    }

    if (!shippedAt || Number.isNaN(shippedDate.getTime())) {
      alert("Veuillez renseigner la date et l'heure d'expédition.");
      return;
    }

    if (!estimatedDelivery || Number.isNaN(deliveryDate.getTime())) {
      alert("Veuillez renseigner la date et l'heure de livraison estimée.");
      return;
    }

    if (deliveryDate < shippedDate) {
      alert("La livraison estimée doit être postérieure à l'expédition.");
      return;
    }

    setLoading(true);

    const newShipmentData = {
      tracking_number: trackingNumber,
      sender_name: senderName,
      sender_phone: senderPhone,
      sender_email: senderEmail,
      sender_address: `${senderCity}, ${senderCountry}`,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      recipient_email: recipientEmail,
      recipient_address: `${recipientAddress}, ${recipientDestination}`,
      origin_country: originCountry,
      destination_country: destinationCountry,
      service_type: serviceType,
      product_quantity: quantity,
      weight_kg: parseFloat(weightKg) || 1,
      dimensions_cm: article,
      total_freight: freight,
      payment_method: paymentMethod,
      shipped_at: shippedDate.toISOString(),
      status: "Pending",
      estimated_delivery: deliveryDate.toISOString(),
    };

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("shipments")
        .insert(newShipmentData)
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || "L'expédition n'a pas été créée.");
      }

      const { error: updateError } = await supabase.from("shipment_updates").insert({
          shipment_id: data.id,
          location: originCountry,
          status_title: "Commande enregistrée",
          description: "Expédition créée et enregistrée dans le système logistique.",
      });

      if (updateError) {
        throw new Error(`Expédition créée, mais historique non enregistré : ${updateError.message}`);
      }

      alert(`Expédition ${trackingNumber} créée avec succès !`);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Impossible de créer l'expédition.");
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8F6F3" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e0dbd5", borderTopColor: "#9D8870", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ color: "#9D8870", fontSize: "0.9rem", fontWeight: 500 }}>Vérification...</p>
          <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 0.85rem 0.75rem 2.6rem",
    border: "1.5px solid #e0dbd5",
    borderRadius: "10px",
    fontSize: "0.85rem",
    fontFamily: "'Poppins', sans-serif",
    color: "#2D3448",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "#FAFAF8",
  };

  const iconWrapStyle: React.CSSProperties = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9D8870",
    pointerEvents: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#5A637A",
    marginBottom: "0.4rem",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#9D8870",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#9D8870";
    e.target.style.boxShadow = "0 0 0 3px rgba(157,136,112,0.12)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#e0dbd5";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{ background: "#F8F6F3", minHeight: "100vh", padding: "2rem 1rem" }}>
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/admin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#9D8870",
            marginBottom: "1.5rem",
            textDecoration: "none",
          }}
        >
          <ArrowLeft className="w-4 h-4" /> Retour au tableau de bord
        </Link>

        {/* Main Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            border: "1px solid #eee",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            padding: "2.5rem",
          }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: "1px solid #eee", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ ...sectionTitleStyle, marginBottom: "0.25rem", fontSize: "0.7rem" }}>
                <PackagePlus className="w-4 h-4" /> Formulaire de Création
              </div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1A3A4A" }}>
                Nouvelle Expédition
              </h1>
            </div>
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "12px",
                background: "#F8F6F3",
                border: "1.5px solid #e0dbd5",
              }}
            >
              <span style={{ fontSize: "0.65rem", color: "#888", display: "block", marginBottom: "2px" }}>N° de suivi généré</span>
              <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1rem", color: "#9D8870" }}>{trackingNumber}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ===== SECTION 1: Informations Destinataire ===== */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={sectionTitleStyle}>
                <User className="w-4 h-4" />
                1. Informations du Destinataire
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Noms */}
                <div>
                  <label style={labelStyle}>Noms *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><User size={16} /></div>
                    <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Nom complet" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Téléphone */}
                <div>
                  <label style={labelStyle}>Numéro de téléphone *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Phone size={16} /></div>
                    <input type="tel" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} placeholder="+237 6XX XXX XXX" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label style={labelStyle}>Email *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Mail size={16} /></div>
                    <input type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="email@exemple.com" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Pays */}
                <div>
                  <label style={labelStyle}>Pays *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Globe size={16} /></div>
                    <input type="text" value={recipientCountry} onChange={(e) => setRecipientCountry(e.target.value)} placeholder="Ex: Cameroun" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Adresse de livraison */}
                <div>
                  <label style={labelStyle}>Adresse de livraison *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><MapPin size={16} /></div>
                    <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Adresse complète" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Destination finale */}
                <div>
                  <label style={labelStyle}>Destination finale *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><MapPin size={16} /></div>
                    <input type="text" value={recipientDestination} onChange={(e) => setRecipientDestination(e.target.value)} placeholder="Ville / Quartier final" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SECTION 2: Informations Expéditeur ===== */}
            <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #eee" }}>
              <div style={sectionTitleStyle}>
                <Building className="w-4 h-4" />
                2. Informations de l&apos;Expéditeur
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Noms */}
                <div>
                  <label style={labelStyle}>Noms *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><User size={16} /></div>
                    <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Nom / Entreprise" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Téléphone */}
                <div>
                  <label style={labelStyle}>Numéro de téléphone *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Phone size={16} /></div>
                    <input type="tel" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} placeholder="+86 XXX XXXX XXXX" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label style={labelStyle}>Email *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Mail size={16} /></div>
                    <input type="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="email@entreprise.com" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Pays */}
                <div>
                  <label style={labelStyle}>Pays *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Globe size={16} /></div>
                    <input type="text" value={senderCountry} onChange={(e) => setSenderCountry(e.target.value)} placeholder="Ex: Chine" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Ville */}
                <div>
                  <label style={labelStyle}>Ville *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Building size={16} /></div>
                    <input type="text" value={senderCity} onChange={(e) => setSenderCity(e.target.value)} placeholder="Ex: Guangzhou" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SECTION 3: Fret et Transport ===== */}
            <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #eee" }}>
              <div style={sectionTitleStyle}>
                <Package className="w-4 h-4" />
                3. Fret et Transport
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Article */}
                <div>
                  <label style={labelStyle}>Article *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Package size={16} /></div>
                    <input type="text" value={article} onChange={(e) => setArticle(e.target.value)} placeholder="Ex: Téléphones, Vêtements..." required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Pays d'expédition */}
                <div>
                  <label style={labelStyle}>Pays d&apos;expédition *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Globe size={16} /></div>
                    <input type="text" value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} placeholder="Ex: Chine" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Pays de livraison */}
                <div>
                  <label style={labelStyle}>Pays de livraison *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><MapPin size={16} /></div>
                    <input type="text" value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} placeholder="Ex: Cameroun" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Date et heure d'expédition */}
                <div>
                  <label style={labelStyle}>Date et heure d&apos;expédition *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Calendar size={16} /></div>
                    <input type="datetime-local" value={shippedAt} onChange={(e) => setShippedAt(e.target.value)} required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Date et heure de livraison */}
                <div>
                  <label style={labelStyle}>Livraison estimée (date et heure) *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Clock size={16} /></div>
                    <input type="datetime-local" value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Poids */}
                <div>
                  <label style={labelStyle}>Poids (kg) *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Weight size={16} /></div>
                    <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="Poids en kg" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Quantité */}
                <div>
                  <label style={labelStyle}>Quantité du produit *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Hash size={16} /></div>
                    <input type="number" min="1" step="1" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} placeholder="Ex: 10" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Fret total */}
                <div>
                  <label style={labelStyle}>Fret total (USD) *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><DollarSign size={16} /></div>
                    <input type="number" min="0" step="0.01" value={totalFreight} onChange={(e) => setTotalFreight(e.target.value)} placeholder="Ex: 250.00" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                {/* Moyen de paiement */}
                <div>
                  <label style={labelStyle}>Moyen de paiement *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}>
                      {paymentMethod === "Bancaire" ? <CreditCard size={16} /> : <Smartphone size={16} />}
                    </div>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="Bancaire">💳 Bancaire</option>
                      <option value="Mobile">📱 Mobile Money</option>
                    </select>
                  </div>
                </div>
                {/* Type de Service */}
                <div>
                  <label style={labelStyle}>Type de service *</label>
                  <div style={{ position: "relative" }}>
                    <div style={iconWrapStyle}><Truck size={16} /></div>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as ServiceType)}
                      style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="Air Freight">✈️ Air Freight</option>
                      <option value="Ocean Freight">🚢 Ocean Freight</option>
                      <option value="Road Freight">🚛 Road Freight</option>
                      <option value="Express Delivery">⚡ Express Delivery</option>
                      <option value="Warehousing">🏭 Warehousing</option>
                      <option value="Customs Clearance">📋 Customs Clearance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SECTION 4: Types de transport — Info cards ===== */}
            <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #eee" }}>
              <div style={sectionTitleStyle}>
                <Truck className="w-4 h-4" />
                Modes de Transport Disponibles
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { icon: <Plane size={22} />, label: "Par Avion", sub: "Air Freight", color: "#3B82F6" },
                  { icon: <Ship size={22} />, label: "Par Bateau", sub: "Ocean Freight", color: "#0891B2" },
                  { icon: <Truck size={22} />, label: "Par Route", sub: "Road Freight", color: "#9D8870" },
                  { icon: <Zap size={22} />, label: "Express", sub: "Express Delivery", color: "#F59E0B" },
                  { icon: <Warehouse size={22} />, label: "Entreposage", sub: "Warehousing", color: "#8B5CF6" },
                  { icon: <FileCheck size={22} />, label: "Douane", sub: "Customs Clearance", color: "#10B981" },
                ].map((mode, i) => (
                  <div
                    key={i}
                    onClick={() => setServiceType(mode.sub as ServiceType)}
                    style={{
                      background: serviceType === mode.sub ? `${mode.color}10` : "#FAFAF8",
                      border: serviceType === mode.sub ? `2px solid ${mode.color}` : "1.5px solid #e0dbd5",
                      borderRadius: "12px",
                      padding: "1rem 0.75rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ color: mode.color, marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>
                      {mode.icon}
                    </div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2D3448", marginBottom: "2px" }}>{mode.label}</p>
                    <p style={{ fontSize: "0.6rem", color: "#888" }}>{mode.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== SUBMIT ===== */}
            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1rem" }}>
              <Link href="/admin">
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    border: "1.5px solid #e0dbd5",
                    borderRadius: "10px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#888",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Annuler
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "#B8A691" : "#9D8870",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.75rem 2rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s",
                }}
              >
                <CheckCircle2 className="w-5 h-5" />
                {loading ? "Création en cours..." : "Créer l'Expédition"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
