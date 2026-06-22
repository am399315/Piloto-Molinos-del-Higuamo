"use client";

import { useState } from "react";
import {
  Briefcase, Users, CalendarCheck, UserCheck,
  Plus, Search, MapPin, Clock, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockVacantes, mockRecruitStats } from "@/lib/data/mock";

const urgenciaConfig: Record<string, { badge: string; dot: string }> = {
  alta:  { badge: "bg-red-50 text-red-700 border border-red-100",     dot: "bg-red-500" },
  media: { badge: "bg-amber-50 text-amber-700 border border-amber-100", dot: "bg-amber-500" },
  baja:  { badge: "bg-emerald-50 text-emerald-700 border border-emerald-100", dot: "bg-emerald-500" },
};
const urgenciaLabel: Record<string, string> = { alta: "Urgente", media: "Normal", baja: "Flexible" };

const stages = [
  { key: "recibidos",  label: "Recibidos",   color: "#94A3B8", bg: "#F1F5F9" },
  { key: "revision",   label: "En revisión", color: "#2563EB", bg: "#DBEAFE" },
  { key: "entrevista", label: "Entrevista",  color: "#D97706", bg: "#FEF3C7" },
  { key: "oferta",     label: "Oferta",      color: "#7C3AED", bg: "#EDE9FE" },
  { key: "contratado", label: "Contratado",  color: "#059669", bg: "#D1FAE5" },
];

function PipelineBar({ pipeline }: { pipeline: Record<string, number> }) {
  const total = pipeline.recibidos || 1;
  const colors = ["#94A3B8", "#2563EB", "#D97706", "#7C3AED", "#059669"];
  const keys = ["recibidos", "revision", "entrevista", "oferta", "contratado"];
  return (
    <div className="space-y-2 mt-4">
      <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
        {keys.map((k, i) => (
          <div key={k} style={{ width: `${((pipeline[k] || 0) / total) * 100}%`, backgroundColor: colors[i] }} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-0.5">
        {stages.map((s) => (
          <div key={s.key} className="text-center">
            <p className="text-[11px] font-bold" style={{ color: s.color }}>{(pipeline as Record<string, number>)[s.key]}</p>
            <p className="text-[9px] text-muted-foreground leading-tight truncate">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Global pipeline totals across all vacancies
function GlobalPipeline() {
  const totals = mockVacantes.reduce(
    (acc, v) => {
      acc.recibidos  += v.pipeline.recibidos;
      acc.revision   += v.pipeline.revision;
      acc.entrevista += v.pipeline.entrevista;
      acc.oferta     += v.pipeline.oferta;
      acc.contratado += v.pipeline.contratado;
      return acc;
    },
    { recibidos: 0, revision: 0, entrevista: 0, oferta: 0, contratado: 0 }
  );
  const total = totals.recibidos || 1;

  return (
    <Card className="border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
      <CardHeader className="pb-3 pt-5 px-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[14px] font-bold">Pipeline global de reclutamiento</CardTitle>
            <p className="text-[11.5px] text-muted-foreground mt-0.5">
              {total} candidatos en todas las vacantes activas
            </p>
          </div>
          <span className="text-[11px] text-muted-foreground">{mockVacantes.length} vacantes</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {/* Funnel bar */}
        <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-4">
          {stages.map((s, i) => {
            const val = (totals as Record<string, number>)[s.key];
            return (
              <div key={s.key} style={{ width: `${(val / total) * 100}%`, backgroundColor: s.color, minWidth: val > 0 ? "4px" : 0 }} />
            );
          })}
        </div>
        {/* Stage breakdown */}
        <div className="grid grid-cols-5 gap-2">
          {stages.map((s) => {
            const val = (totals as Record<string, number>)[s.key];
            const pct = Math.round((val / total) * 100);
            return (
              <div key={s.key} className="text-center p-3 rounded-xl" style={{ backgroundColor: s.bg }}>
                <p className="text-[1.4rem] font-bold leading-none" style={{ color: s.color }}>{val}</p>
                <p className="text-[10px] font-semibold mt-1 leading-tight" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{pct}%</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReclutamientoPage() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("Todos");
  const [selectedUrgencia, setSelectedUrgencia] = useState("Todas");

  const departamentos = ["Todos", ...Array.from(new Set(mockVacantes.map((v) => v.departamento)))];

  const filtered = mockVacantes.filter((v) => {
    const matchSearch = v.titulo.toLowerCase().includes(search.toLowerCase()) ||
      v.departamento.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === "Todos" || v.departamento === selectedDept;
    const matchUrg = selectedUrgencia === "Todas" || v.urgencia === selectedUrgencia.toLowerCase();
    return matchSearch && matchDept && matchUrg;
  });

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Reclutamiento Inteligente</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gestión de vacantes, candidatos y procesos de selección
          </p>
        </div>
        <button
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start"
          style={{ backgroundColor: "#1E3A8A" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}
        >
          <Plus size={16} />
          Nueva requisición
        </button>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Briefcase,     label: "Vacantes activas",           value: mockRecruitStats.vacantesActivas,         color: "#1E3A8A", bg: "bg-[#1E3A8A]" },
          { icon: Users,        label: "Candidatos activos",          value: mockRecruitStats.candidatosActivos,        color: "#2563EB", bg: "bg-[#2563EB]" },
          { icon: CalendarCheck, label: "Entrevistas programadas",    value: mockRecruitStats.entrevistasProgramadas,   color: "#D97706", bg: "bg-amber-500" },
          { icon: UserCheck,    label: "Contrataciones este mes",     value: mockRecruitStats.contratacionesMes,        color: "#059669", bg: "bg-emerald-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #E2E8F0", borderLeftColor: s.color, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[1.8rem] font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Global pipeline ── */}
      <GlobalPipeline />

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar vacante o departamento…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departamentos.map((d) => (
            <button key={d} onClick={() => setSelectedDept(d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                selectedDept === d ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : "bg-white text-muted-foreground border-border hover:border-primary/40"
              }`}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Todas", "Alta", "Media", "Baja"].map((u) => (
            <button key={u} onClick={() => setSelectedUrgencia(u)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                selectedUrgencia === u ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : "bg-white text-muted-foreground border-border hover:border-primary/40"
              }`}>
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* ── Vacantes grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((v) => {
          const ucfg = urgenciaConfig[v.urgencia];
          return (
            <div key={v.id} className="bg-white rounded-xl hover:shadow-md transition-all cursor-pointer group"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
              {/* Card header accent */}
              <div className="h-1 rounded-t-xl" style={{
                background: v.urgencia === "alta" ? "#DC2626" : v.urgencia === "media" ? "#D97706" : "#059669"
              }} />
              <div className="p-5">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-[14px] leading-snug group-hover:text-[#1E3A8A] transition-colors">{v.titulo}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">{v.departamento}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 flex items-center gap-1 ${ucfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ucfg.dot}`} />
                    {urgenciaLabel[v.urgencia]}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={11} className="shrink-0" />
                    {v.ubicacion}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={11} className="shrink-0" />
                    {v.tipo} · Publicada {v.fechaPublicacion}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#059669" }}>
                    <span className="text-muted-foreground font-normal">Salario:</span>
                    {v.salario}
                  </div>
                </div>

                {/* Candidates count */}
                <div className="flex items-center justify-between px-3 py-2 rounded-lg mb-3"
                  style={{ backgroundColor: "#F3F6FA", border: "1px solid #E2E8F0" }}>
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Candidatos totales</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{v.candidatos}</span>
                </div>

                {/* Pipeline */}
                <PipelineBar pipeline={v.pipeline} />

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg font-semibold text-white transition-colors"
                    style={{ backgroundColor: "#1E3A8A" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}>
                    Ver candidatos <ChevronRight size={12} />
                  </button>
                  <button className="px-3 py-2 text-xs text-muted-foreground border rounded-lg hover:bg-muted transition-colors"
                    style={{ borderColor: "#E2E8F0" }}>
                    Editar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Briefcase size={40} className="text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No se encontraron vacantes con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}
