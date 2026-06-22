"use client";

import {
  BarChart2, TrendingUp, TrendingDown, Minus,
  Target, Star, Users, CheckCircle, AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockDesempeno } from "@/lib/data/mock";

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={11}
          className={i < Math.floor(value) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/25"} />
      ))}
      <span className="text-xs font-bold text-foreground ml-1">{value}</span>
    </div>
  );
}

// Semáforo de desempeño
function Semaforo({ promedio }: { promedio: number }) {
  const level = promedio >= 4.0 ? "alto" : promedio >= 3.0 ? "medio" : "bajo";
  const config = {
    alto:  { label: "Alto",  color: "#059669", bg: "#D1FAE5", border: "#A7F3D0", desc: "Desempeño sobresaliente" },
    medio: { label: "Medio", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A", desc: "Desempeño dentro de la meta" },
    bajo:  { label: "Bajo",  color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5", desc: "Requiere atención inmediata" },
  };
  const c = config[level];
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
      style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
      <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: c.color }} />
      <div>
        <p className="text-xs font-bold" style={{ color: c.color }}>{c.label}</p>
        <p className="text-[10.5px]" style={{ color: c.color }}>{c.desc}</p>
      </div>
    </div>
  );
}

export default function DesempenoPage() {
  const d = mockDesempeno;

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Evaluación de Desempeño</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Seguimiento de objetivos, metas y desempeño por área · {d.ciclo}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Semaforo promedio={d.promedioGeneral} />
          <button
            className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors self-start"
            style={{ backgroundColor: "#1E3A8A" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}
          >
            Nuevo ciclo
          </button>
        </div>
      </div>

      {/* ── Cycle overview ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Evaluaciones completadas", value: d.evaluacionesCompletadas, note: `de ${d.totalEmpleados} empleados`, color: "#059669" },
          { label: "Pendientes",               value: d.pendientes,              note: "por completar",                    color: "#D97706" },
          { label: "Promedio general",         value: d.promedioGeneral,         note: "sobre 5.0",                        color: "#1E3A8A" },
          { label: "Cierre del ciclo",         value: d.fechaCorte,              note: d.ciclo,                            color: "#7C3AED" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl px-4 py-3.5 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #E2E8F0", borderLeftColor: s.color, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <p className="text-[1.5rem] font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] font-semibold text-foreground mt-1.5">{s.label}</p>
            <p className="text-[10.5px] text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      {/* ── Cycle progress bar ── */}
      <div className="bg-white rounded-xl p-5 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-foreground">Progreso del ciclo {d.ciclo}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: d.porcentajeCompletado >= 80 ? "#059669" : "#D97706" }}>
              {d.porcentajeCompletado}%
            </span>
            <span className="text-xs text-muted-foreground">completado · Cierre: {d.fechaCorte}</span>
          </div>
        </div>
        <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="h-full rounded-full transition-all"
            style={{ width: `${d.porcentajeCompletado}%`, background: "linear-gradient(90deg, #1E3A8A, #2563EB)" }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{d.evaluacionesCompletadas} completadas</span>
          <span>{d.pendientes} pendientes</span>
        </div>
      </div>

      {/* ── Dept performance + Top performers ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BarChart2 size={16} className="text-primary" />
              Desempeño por departamento
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            {d.porDepartamento.map((dept, i) => {
              const color = dept.promedio >= 4.0 ? "#059669" : dept.promedio >= 3.5 ? "#2563EB" : "#D97706";
              const semRing = dept.promedio >= 4.0 ? "bg-emerald-500" : dept.promedio >= 3.5 ? "bg-blue-500" : "bg-amber-500";
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${semRing}`} />
                      <span className="text-sm font-semibold text-foreground">{dept.departamento}</span>
                      {dept.tendencia === "up" && <TrendingUp size={12} className="text-emerald-500" />}
                      {dept.tendencia === "down" && <TrendingDown size={12} className="text-red-500" />}
                      {dept.tendencia === "stable" && <Minus size={12} className="text-muted-foreground" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">{dept.completados}/{dept.total}</span>
                      <span className="font-bold text-sm" style={{ color }}>{dept.promedio}</span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${(dept.promedio / 5) * 100}%`, backgroundColor: color }} />
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-muted-foreground">
                      {Math.round((dept.completados / dept.total) * 100)}% evaluado
                    </span>
                    <span className="text-[10px] text-muted-foreground">/ 5.0</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Top performers */}
        <Card className="lg:col-span-2 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Star size={15} className="text-amber-500 fill-amber-500" />
              Top 5 colaboradores
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2.5">
            {d.topEmpleados.map((emp, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  backgroundColor: i === 0 ? "#FFFBEB" : "#F8FAFC",
                  border: `1px solid ${i === 0 ? "#FDE68A" : "#E2E8F0"}`,
                }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? "bg-amber-100 text-amber-700" : "text-white"
                }`} style={{ backgroundColor: i === 0 ? undefined : "#1E3A8A" }}>
                  {i === 0 ? "🥇" : emp.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{emp.nombre}</p>
                  <p className="text-xs text-muted-foreground truncate">{emp.cargo} · {emp.dept}</p>
                </div>
                <StarRating value={emp.puntaje} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Score distribution + Goals ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Score distribution */}
        <Card className="lg:col-span-2 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users size={15} className="text-primary" />
              Distribución de puntajes
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            {d.distribucion.map((dist, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-foreground font-medium">{dist.rango}</span>
                  <span className="font-bold" style={{ color: dist.color }}>{dist.cantidad} ({dist.porcentaje}%)</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${dist.porcentaje}%`, backgroundColor: dist.color }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="lg:col-span-3 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Target size={15} className="text-primary" />
              Metas estratégicas del área de RRHH
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            {d.metas.map((meta, i) => (
              <div key={i}>
                <div className="flex items-start justify-between mb-1.5 gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      {meta.estado === "atrasado"
                        ? <AlertCircle size={13} className="text-red-500 shrink-0" />
                        : <CheckCircle size={13} className="text-emerald-500 shrink-0" />}
                      <p className="text-sm font-semibold text-foreground leading-snug">{meta.meta}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 ml-5">
                      Objetivo: <span className="font-medium">{meta.objetivo}</span>
                      {" · "}Actual: <span className="font-bold text-foreground">{meta.actual}</span>
                    </p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 border ${
                    meta.estado === "atrasado"
                      ? "bg-red-50 text-red-700 border-red-100"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}>
                    {meta.estado === "atrasado" ? "Atrasado" : "En progreso"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
                    <div className="h-full rounded-full"
                      style={{
                        width: `${meta.progreso}%`,
                        backgroundColor: meta.estado === "atrasado" ? "#DC2626" : "#059669",
                      }} />
                  </div>
                  <span className="text-xs font-bold w-9 text-right"
                    style={{ color: meta.estado === "atrasado" ? "#DC2626" : "#059669" }}>
                    {meta.progreso}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          style={{ backgroundColor: "#1E3A8A" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}>
          <CheckCircle size={15} />
          Enviar recordatorio de evaluaciones
        </button>
        <button className="flex items-center gap-2 border text-foreground px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-muted"
          style={{ borderColor: "#E2E8F0" }}>
          Exportar informe Q2
        </button>
        <button className="flex items-center gap-2 border text-foreground px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-muted"
          style={{ borderColor: "#E2E8F0" }}>
          Ver evaluaciones individuales
        </button>
      </div>
    </div>
  );
}
