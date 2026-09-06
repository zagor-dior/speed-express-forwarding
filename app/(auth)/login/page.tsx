"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Package, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Fallback for demonstration mode
        if (email.includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/client");
        }
      } else {
        router.push("/client");
      }
    } catch (err) {
      router.push("/admin");
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
          <h1 className="text-2xl font-extrabold text-[#0A1628]">Connexion E-Client / Admin</h1>
          <p className="text-xs text-[#5A637A]">
            Accédez à votre espace logistique Speed Express Forwarding
          </p>
        </div>

        {error && <p className="text-xs text-rose-400 font-semibold text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#5A637A] mb-1.5 block">Email Professionnel</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.nom@entreprise.com"
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
            {loading ? "Vérification..." : "Se Connecter"}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#5A637A] space-y-2">
          <p>
            Vous n'avez pas de compte ?{" "}
            <Link href="/register" className="text-[#C8962A] font-bold hover:underline">
              S'inscrire gratuitement
            </Link>
          </p>
          <div className="p-2 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300">
            Mode Démo : Saisissez n'importe quel email/mot de passe pour tester.
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
