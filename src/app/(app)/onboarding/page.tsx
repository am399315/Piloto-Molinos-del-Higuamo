"use client";

import { useState } from "react";
import {
  ClipboardList, CheckCircle2, Circle,
  UserPlus, Calendar, User, TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockNuevosIngresos } from "@/lib/data/mock";

function ProgressRing({ pct }: { pct: number }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 75 ? "#059669" : pct >= 40 ? "#2563EB" : "#D97706";
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg width={56} height={56} className="-rotate-90">
        <circle cx={28} cy={28} r={r} fill="none" stroke="#E2E8F0" strokeWidth={4} />
        <circle cx={28} cy={28} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground">{pct}%</span>
      </div>
    </div>
  );
}

const phaseColors = [
  { bg: "#DBEAFE", text: "#1E3A8A", border: "#BFDBFE" },
  { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  { bg: "#EDE9FE", text: "#5B21B6", border: "#DDD6FE" },
];

export default function OnboardingPage() {
  const [selectedId, setSelectedId] = useState(mockNuevosIngresos[0].id);
  const selected = mockNuevosIngresos.find((n) => n.id === selectedId)!;

  const totalTareas   = selected.tareas.reduce((s, c) => s + c.total, 0);
  const completadas   = selected.tareas.reduce((s, c) => s + c.completadas, 0);
  const totalAll      = mockNuevosIngresos.reduce((s, n) => s + n.tareas.reduce((a, c) => a + c.total, 0), 0);
  const completadasAll = mockNuevosIngresos.reduce((s, n) => s + n.tareas.reduce((a, c) => a + c.completadas, 0), 0);
  const promedio       = Math.round(mockNuevosIngresos.reduce((s, n) => s + n.progreso, 0) / mockNuevosIngresos.length);

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Onboarding Digital</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Inducción general, seguimiento y documentación de nuevos ingresos
          </p>
        </div>
        <button
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold self-start transition-colors"
          style={{ backgroundColor: "#1E3A8A" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}
        >
          <UserPlus size={16} />
          Nuevo proceso
        </button>
      </div>

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Nuevos ingresos activos",   value: mockNuevosIngresos.length, color: "#1E3A8A", bg: "#DBEAFE" },
          { label: "Tareas completadas",        value: completadasAll,             color: "#059669", bg: "#D1FAE5" },
          { label: "Pendientes total",          value: totalAll - completadasAll,  color: "#D97706", bg: "#FEF3C7" },
          { label: "Progreso promedio",         value: `${promedio}%`,             color: "#7C3AED", bg: "#EDE9FE" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl px-4 py-3.5 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #E2E8F0", borderLeftColor: s.color, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <p className="text-[1.6rem] font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11.5px] text-muted-foreground mt-1.5 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Employee list ── */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-foreground">Nuevos ingresos activos</p>
          {mockNuevosIngresos.map((emp) => (
            <button
              key={emp.id}
              onClick={() => setSelectedId(emp.id)}
              className="w-full text-left p-4 rounded-xl border transition-all"
              style={{
                borderColor: selectedId === emp.id ? "#2563EB" : "#E2E8F0",
                backgroundColor: selectedId === emp.id ? "#EFF6FF" : "white",
                boxShadow: selectedId === emp.id ? "0 0 0 1px #2563EB" : "0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              <div className="flex items-center gap-3">
                <ProgressRing pct={emp.progreso} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{emp.nombre}</p>
                  <p className="text-xs text-muted-foreground truncate">{emp.cargo}</p>
                  <p className="text-xs text-muted-foreground">{emp.departamento} · Día {emp.dias}</p>
                </div>
              </div>
              <div className="mt-3">
                <Progress value={emp.progreso} className="h-1.5" />
              </div>
            </button>
          ))}
        </div>

        {/* ── Checklist detail ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Employee header card */}
          <Card className="border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 text-white"
                  style={{ background: "linear-gradient(135deg, #1E3A8A, #2563EB)" }}>
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-base">{selected.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{selected.cargo} · {selected.departamento}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={11} /> Ingresó: {selected.fechaIngreso}</span>
                    <span className="flex items-center gap-1"><User size={11} /> Supervisor: {selected.supervisor}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-foreground">{selected.progreso}%</p>
                  <p className="text-xs text-muted-foreground">{completadas}/{totalTareas} tareas</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{selected.progreso < 50 ? "En proceso inicial" : selected.progreso < 80 ? "Avanzando bien" : "Casi completado"}</span>
                  <span>Día {selected.dias} de inducción</span>
                </div>
                <Progress value={selected.progreso} className="h-2.5" />
              </div>
            </CardContent>
          </Card>

          {/* Checklist by category */}
          <div className="space-y-3">
            {selected.tareas.map((cat, ci) => {
              const pct = Math.round((cat.completadas / cat.total) * 100);
              const colors = phaseColors[ci % phaseColors.length];
              return (
                <Card key={ci} className="border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
                  <CardHeader className="pb-2 pt-4 px-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: colors.bg }}>
                          <ClipboardList size={13} style={{ color: colors.text }} />
                        </div>
                        <CardTitle className="text-sm font-bold">{cat.categoria}</CardTitle>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                        {cat.completadas}/{cat.total}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-4">
                    <div className="space-y-1.5">
                      {cat.items.map((item, ii) => (
                        <div key={ii} className="flex items-center gap-3 py-1.5 px-3 rounded-lg transition-colors"
                          style={{ backgroundColor: item.completado ? "#F0FDF4" : "transparent" }}>
                          {item.completado ? (
                            <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                          ) : (
                            <Circle size={15} className="text-muted-foreground/30 shrink-0" />
                          )}
                          <span className={`text-sm flex-1 ${item.completado ? "text-muted-foreground line-through" : "text-foreground"}`}>
                            {item.nombre}
                          </span>
                          {!item.completado && (
                            <button className="text-xs font-semibold shrink-0 transition-colors"
                              style={{ color: "#2563EB" }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1E3A8A"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#2563EB"; }}>
                              Marcar
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Progress insight */}
          <div className="flex items-start gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "#EFF6FF", border: "1px solid #DBEAFE" }}>
            <TrendingUp size={15} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-blue-700">
              <span className="font-semibold">Módulo completado al {selected.progreso}%.</span>
              {" "}Faltan {totalTareas - completadas} tareas para completar el proceso de inducción de {selected.nombre}.
              El proceso estándar tarda entre 5 y 10 días hábiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
