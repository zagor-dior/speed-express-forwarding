"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const showError = (message: string) => {
    setError(message);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        const message = error?.message || "Adresse email ou mot de passe incorrect.";
        const readableMessage = message === "{}"
          ? "Connexion impossible. Vérifiez l'URL Supabase, la clé publique et les identifiants du compte."
          : message.toLowerCase().includes("database error querying schema")
            ? "Le compte Auth Supabase est invalide. Supprimez-le puis recréez-le depuis Supabase > Authentication > Users."
          : message;
        showError(readableMessage);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        await supabase.auth.signOut();
        showError(`Profil administrateur introuvable : ${profileError.message}`);
        return;
      }

      if (profile?.role === "admin" || profile?.role === "operator") {
        sessionStorage.setItem("sef_admin_auth", "true");
        sessionStorage.setItem("sef_admin_email", email.trim());
        router.push("/admin");
      } else {
        await supabase.auth.signOut();
        showError("Ce compte n’a pas les droits administrateur requis.");
      }
    } catch (loginError) {
      console.error("Erreur de connexion Supabase:", loginError);
      showError("Impossible de contacter Supabase. Vérifiez votre connexion et les variables .env.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%)",
        padding: "2rem",
      }}
    >
      <div
        className={shake ? "animate-shake" : ""}
        style={{
          background: "var(--white, #fff)",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          padding: "3rem 2.5rem",
          width: "100%",
          maxWidth: "420px",
          animation: "fadeInUp 0.5s ease-out",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "var(--tan-primary, #9D8870)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <Shield size={28} color="#fff" />
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "var(--dark-heading, #1A3A4A)",
              marginBottom: "0.5rem",
            }}
          >
            Espace Administrateur
          </h1>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--gray-600, #5A637A)",
              lineHeight: 1.5,
            }}
          >
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Lock size={14} color="#EF4444" />
            <span
              style={{
                fontSize: "0.8rem",
                color: "#DC2626",
                fontWeight: 500,
              }}
            >
              {error}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--dark-text, #2D3448)",
                marginBottom: "0.5rem",
              }}
            >
              Adresse Email
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--tan-primary, #9D8870)",
                }}
              >
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem 0.85rem 2.75rem",
                  border: "1.5px solid #e0dbd5",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontFamily: "'Poppins', sans-serif",
                  color: "var(--dark-text, #2D3448)",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  background: "#FAFAFA",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#9D8870";
                  e.target.style.boxShadow = "0 0 0 3px rgba(157,136,112,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0dbd5";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.75rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--dark-text, #2D3448)",
                marginBottom: "0.5rem",
              }}
            >
              Mot de Passe
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--tan-primary, #9D8870)",
                }}
              >
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem 0.85rem 2.75rem",
                  border: "1.5px solid #e0dbd5",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontFamily: "'Poppins', sans-serif",
                  color: "var(--dark-text, #2D3448)",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  background: "#FAFAFA",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#9D8870";
                  e.target.style.boxShadow = "0 0 0 3px rgba(157,136,112,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0dbd5";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.95rem",
              background: loading
                ? "var(--tan-light, #B8A691)"
                : "var(--tan-primary, #9D8870)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.95rem",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.background = "#8a7660";
                (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "0 6px 20px rgba(157,136,112,0.35)";
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "#9D8870";
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
              (e.target as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {loading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 2 A10 10 0 0 1 22 12"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Vérification...
              </>
            ) : (
              <>
                <Lock size={18} />
                Se Connecter
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: "#aaa",
              lineHeight: 1.5,
            }}
          >
            🔒 Accès réservé aux administrateurs autorisés.
            <br />
            Speed Express Forwarding © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
