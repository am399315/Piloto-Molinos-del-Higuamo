"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Brain, LayoutGrid, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
  {
    icon: Zap,
    titulo: "Automatización de procesos",
    desc: "Desde reclutamiento hasta evaluación de desempeño, todo en un solo flujo digital.",
  },
  {
    icon: Brain,
    titulo: "Inteligencia Artificial aplicada",
    desc: "Análisis automático de CVs, puntuación de candidatos y predicciones de talento.",
  },
  {
    icon: LayoutGrid,
    titulo: "Gestión centralizada",
    desc: "Toda la información de sus colaboradores organizada y accesible en tiempo real.",
  },
  {
    icon: BarChart2,
    titulo: "Decisiones basadas en datos",
    desc: "Métricas, indicadores y reportes ejecutivos para liderar con información.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@molinoshiguamo.com");
  const [password, setPassword] = useState("Demo2026");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor complete todos los campos.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── Left panel (brand) ── */}
      <div
        className="hidden md:flex md:w-[54%] lg:w-[56%] flex-col relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0B1220 0%, #1E3A8A 55%, #2563EB 100%)" }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Decorative circles */}
        <div className="absolute rounded-full pointer-events-none"
          style={{ width: 520, height: 520, top: -200, left: -180, background: "rgba(37,99,235,0.14)" }}
        />
        <div className="absolute rounded-full pointer-events-none"
          style={{ width: 280, height: 280, bottom: -80, right: -60, background: "rgba(37,99,235,0.10)" }}
        />
        <div className="absolute pointer-events-none"
          style={{ width: 1, top: 0, bottom: 0, right: 0, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 50%, transparent)" }}
        />

        <div className="relative z-10 flex flex-col flex-1 px-10 lg:px-14 py-10">
          {/* Logo & brand */}
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="white" strokeWidth={2}>
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white text-[15px] leading-tight">Molinos del Higuamo</p>
              <p className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>
                Sistema Inteligente de Gestión de RRHH
              </p>
            </div>
          </div>

          {/* Headline */}
          <div className="my-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-5"
              style={{ backgroundColor: "rgba(96,165,250,0.15)", color: "#93C5FD" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Plataforma empresarial RRHH 2026
            </div>
            <h1 className="text-[1.85rem] lg:text-[2.2rem] font-bold leading-[1.15] text-white mb-3">
              Transformación Digital<br />del Talento Humano
            </h1>
            <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
              Plataforma piloto para automatizar procesos de RRHH mediante tecnología e inteligencia artificial.
            </p>
          </div>

          {/* 4 Benefits */}
          <div className="space-y-2.5 mb-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(37,99,235,0.45)" }}>
                  <b.icon size={15} color="white" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white leading-snug">{b.titulo}</p>
                  <p className="text-[11.5px] mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.50)" }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 py-4 rounded-2xl px-4"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { valor: "247", label: "Colaboradores" },
              { valor: "8", label: "Módulos RRHH" },
              { valor: "99.9%", label: "Disponibilidad" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[21px] font-bold text-white">{s.valor}</p>
                <p className="text-[10.5px] mt-0.5" style={{ color: "rgba(255,255,255,0.42)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-10 lg:px-14 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.26)" }}>
            © 2026 Molinos del Higuamo · Todos los derechos reservados
          </p>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:px-10"
        style={{ backgroundColor: "#F3F6FA" }}>
        {/* Mobile logo */}
        <div className="flex items-center gap-3 mb-8 md:hidden">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1E3A8A" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2}>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-foreground text-base leading-tight">Molinos del Higuamo</p>
            <p className="text-muted-foreground text-[11px]">Sistema Inteligente de Gestión de RRHH</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          {/* Form card */}
          <div className="bg-white rounded-2xl p-7"
            style={{ boxShadow: "0 4px 24px 0 rgba(15,23,42,0.08), 0 1px 3px 0 rgba(15,23,42,0.04)", border: "1px solid #E2E8F0" }}>
            <div className="mb-6">
              <h2 className="text-[22px] font-bold text-foreground leading-tight">Iniciar sesión</h2>
              <p className="text-muted-foreground text-[13px] mt-1.5">
                Sistema Inteligente de Gestión de Recursos Humanos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] font-medium text-foreground">
                  Correo corporativo
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@molinoshiguamo.com"
                  className="h-11 border-border focus-visible:ring-primary/20 text-sm"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-medium text-foreground">
                    Contraseña
                  </Label>
                  <button type="button" className="text-[12px] text-primary hover:underline font-medium">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 pr-10 border-border focus-visible:ring-primary/20 text-sm"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <input id="remember" type="checkbox" defaultChecked
                  className="w-4 h-4 rounded border-border accent-primary" />
                <Label htmlFor="remember" className="text-[13px] text-muted-foreground cursor-pointer">
                  Mantener sesión iniciada
                </Label>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/8 px-3 py-2 rounded-lg border border-destructive/20">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-white font-semibold text-[13.5px] mt-1"
                style={{ backgroundColor: "#1E3A8A" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando acceso…
                  </span>
                ) : (
                  "Ingresar al sistema"
                )}
              </Button>
            </form>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: "#EFF6FF", border: "1px solid #DBEAFE" }}>
            <p className="text-[11px] font-bold text-blue-700 mb-2 uppercase tracking-widest">
              Credenciales de demostración
            </p>
            <div className="space-y-0.5">
              <p className="text-[12px] text-blue-900">
                <span className="text-blue-500 font-medium">Usuario: </span>
                <span className="font-mono">demo@molinoshiguamo.com</span>
              </p>
              <p className="text-[12px] text-blue-900">
                <span className="text-blue-500 font-medium">Contraseña: </span>
                <span className="font-mono">Demo2026</span>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[11.5px] text-muted-foreground text-center">
          © 2026 Molinos del Higuamo · MVP Ejecutivo RRHH v1.0
        </p>
      </div>
    </div>
  );
}
