"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Building, Phone, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
            role: "client",
          },
        },
      });

      alert("Inscription réussie ! Redirection vers l'espace client.");
      router.push("/client");
    } catch (err) {
      router.push("/client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F6FA] min-h-screen py-16">
      <div className="max-w-md mx-auto px-4">
        <Card hover={false} className="p-8 rounded-xl border border-slate-200 shadow-sm bg-white space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-[#1A3A6B] text-white flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A1628]">Créer un Compte Client SaaS</h1>
          <p className="text-xs text-[#5A637A]">
            Gérez toutes vos expéditions de fret en un seul endroit
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#5A637A] mb-1.5 block">Nom & Prénom</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Jean Dupont"
              icon={<User className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#5A637A] mb-1.5 block">Nom de l'Entreprise</label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ex: Global Trade S.A."
              icon={<Building className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#5A637A] mb-1.5 block">Email Professionnel</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@entreprise.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#5A637A] mb-1.5 block">Mot de Passe</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              icon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center py-3.5">
            {loading ? "Création..." : "S'inscrire"}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#5A637A]">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-[#C8962A] font-bold hover:underline">
            Se connecter
          </Link>
        </div>
      </Card>
      </div>
    </div>
  );
}
