"use client";

import { useState } from "react";
import {
  Brain, Star, AlertTriangle, CheckCircle,
  Upload, ChevronRight, TrendingUp, Zap, Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCandidatos } from "@/lib/data/mock";

function ScoreRing({ score }: { score: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 90 ? "#059669" : score >= 75 ? "#2563EB" : score >= 60 ? "#D97706" : "#DC2626";
  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg width={64} height={64} className="-rotate-90">
        <circle cx={32} cy={32} r={r} fill="none" stroke="#E2E8F0" strokeWidth={5} />
        <circle cx={32} cy={32} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-foreground leading-none">{score}</span>
        <span className="text-[8.5px] text-muted-foreground leading-none mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 90 ? "#059669" : value >= 75 ? "#2563EB" : "#D97706";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// IA stats for the header panel
const iaStats = [
  { label: "CV analizados",         value: "5",    color: "#7C3AED", bg: "#EDE9FE" },
  { label: "Alta coincidencia",      value: "3",    color: "#059669", bg: "#D1FAE5" },
  { label: "Tiempo ahorrado",        value: "~6h",  color: "#0891B2", bg: "#CFFAFE" },
  { label: "Candidatos recomendados",value: "4",    color: "#2563EB", bg: "#DBEAFE" },
];

export default function CvIaPage() {
  const [selectedId, setSelectedId] = useState(mockCandidatos[0].id);
  const selected = mockCandidatos.find((c) => c.id === selectedId)!;

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── IA Hero Banner ── */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #3B0764 0%, #7C3AED 45%, #0891B2 100%)" }}>
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute pointer-events-none"
          style={{ width: 280, height: 280, top: -80, right: -40, borderRadius: "50%", background: "rgba(8,145,178,0.25)" }} />

        <div className="relative z-10 p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                  <Brain size={17} className="text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.65)" }}>Motor de IA activo</span>
              </div>
              <h1 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-white leading-tight mb-1.5">
                Análisis Inteligente de CV
              </h1>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.58)" }}>
                Clasificación asistida por IA para acelerar la depuración de candidatos
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-semibold transition-all self-start shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.13)", color: "white", border: "1px solid rgba(255,255,255,0.18)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.22)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.13)"; }}
            >
              <Upload size={14} />
              Analizar nuevo CV
            </button>
          </div>

          {/* IA stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {iaStats.map((s, i) => (
              <div key={i} className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <p className="text-[1.4rem] font-bold text-white leading-none">{s.value}</p>
                <p className="text-[10.5px] mt-1" style={{ color: "rgba(255,255,255,0.50)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="flex items-start gap-3 p-4 rounded-xl"
        style={{ backgroundColor: "#EFF6FF", border: "1px solid #DBEAFE" }}>
        <Zap size={15} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-blue-700">
          <span className="font-semibold">La IA asiste el proceso, pero la decisión final corresponde a Recursos Humanos. </span>
          El sistema analiza automáticamente cada CV contra los requisitos del puesto, extrae competencias clave
          y genera una puntuación compuesta de relevancia, experiencia, educación y habilidades técnicas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* ── Candidate list ── */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">{mockCandidatos.length} candidatos analizados</p>
            <span className="text-xs text-muted-foreground">Ordenado por score</span>
          </div>
          {[...mockCandidatos]
            .sort((a, b) => b.score - a.score)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="w-full text-left p-4 rounded-xl border transition-all"
                style={{
                  borderColor: selectedId === c.id ? "#2563EB" : "#E2E8F0",
                  backgroundColor: selectedId === c.id ? "#EFF6FF" : "white",
                  boxShadow: selectedId === c.id ? "0 0 0 1px #2563EB" : "0 1px 3px rgba(15,23,42,0.04)",
                }}
              >
                <div className="flex items-center gap-3">
                  <ScoreRing score={c.score} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-sm font-bold text-foreground truncate">{c.nombre}</p>
                      {selectedId === c.id && <ChevronRight size={14} className="text-[#2563EB] shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.puesto}</p>
                    <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full border-0 mt-1.5 font-medium ${c.estadoColor}`}>
                      {c.estado}
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>

        {/* ── Detail panel ── */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}>
                  {selected.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{selected.nombre}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selected.puesto}</p>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-muted-foreground">
                    <span>{selected.email}</span>
                    <span>·</span>
                    <span>{selected.telefono}</span>
                  </div>
                </div>
                <Badge className={`border-0 font-semibold shrink-0 ${selected.estadoColor}`}>
                  {selected.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-5">
              {/* Education & Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <p className="text-[10.5px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Educación</p>
                  <p className="text-sm font-semibold text-foreground">{selected.educacion}</p>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <p className="text-[10.5px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Experiencia</p>
                  <p className="text-sm font-semibold text-foreground">{selected.experiencia}</p>
                </div>
              </div>

              {/* AI Score breakdown */}
              <div>
                <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#7C3AED]" />
                  Desglose de puntuación IA
                </p>
                <div className="space-y-2.5">
                  <ScoreBar label="Relevancia del perfil"   value={selected.scoreDesglose.relevancia} />
                  <ScoreBar label="Nivel de experiencia"    value={selected.scoreDesglose.experiencia} />
                  <ScoreBar label="Formación académica"     value={selected.scoreDesglose.educacion} />
                  <ScoreBar label="Habilidades técnicas"    value={selected.scoreDesglose.habilidades} />
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm font-bold text-foreground mb-2">Competencias detectadas</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.habilidades.map((h, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ backgroundColor: "#EDE9FE", color: "#7C3AED" }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* IA Insights */}
              <div className="rounded-xl p-4"
                style={{ background: "linear-gradient(135deg, #F5F3FF, #EFF6FF)", border: "1px solid #DDD6FE" }}>
                <p className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: "#5B21B6" }}>
                  <Brain size={14} />
                  Análisis IA — Principales hallazgos
                </p>
                <ul className="space-y-1.5">
                  {selected.iaInsights.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#4C1D95" }}>
                      <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#7C3AED" }} />
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths & Risks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl p-3.5" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                  <p className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                    <Star size={11} className="text-emerald-600" /> Fortalezas detectadas
                  </p>
                  <ul className="space-y-1">
                    {selected.fortalezas.map((f, i) => (
                      <li key={i} className="text-xs text-emerald-700 flex items-start gap-1.5">
                        <CheckCircle size={10} className="shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`rounded-xl p-3.5 ${selected.riesgos.length ? "" : ""}`}
                  style={{ backgroundColor: selected.riesgos.length ? "#FFFBEB" : "#F8FAFC", border: `1px solid ${selected.riesgos.length ? "#FDE68A" : "#E2E8F0"}` }}>
                  <p className={`text-xs font-bold mb-2 flex items-center gap-1.5 ${selected.riesgos.length ? "text-amber-800" : "text-muted-foreground"}`}>
                    <AlertTriangle size={11} className={selected.riesgos.length ? "text-amber-600" : ""} />
                    Riesgos detectados
                  </p>
                  {selected.riesgos.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Sin riesgos identificados</p>
                  ) : (
                    <ul className="space-y-1">
                      {selected.riesgos.map((r, i) => (
                        <li key={i} className="text-xs text-amber-700 flex items-start gap-1.5">
                          <AlertTriangle size={10} className="shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Time saved indicator */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl"
                style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}>
                <Clock size={14} className="text-cyan-600 shrink-0" />
                <p className="text-xs text-cyan-700">
                  <span className="font-semibold">Tiempo estimado ahorrado en revisión manual: ~45 minutos</span>
                  {" "}por este candidato versus proceso tradicional en papel.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="flex-1 min-w-[120px] text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors"
                  style={{ backgroundColor: "#1E3A8A" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}>
                  Programar entrevista
                </button>
                <button className="py-2.5 px-4 text-sm font-semibold rounded-xl transition-colors text-foreground border"
                  style={{ borderColor: "#E2E8F0" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F3F6FA"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                  Enviar oferta
                </button>
                <button className="py-2.5 px-4 border text-sm font-semibold rounded-xl transition-colors"
                  style={{ borderColor: "#FCA5A5", color: "#DC2626" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FEF2F2"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                  Descartar
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
