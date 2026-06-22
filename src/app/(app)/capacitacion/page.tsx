"use client";

import { useState } from "react";
import {
  BookOpen, Users, Award, Clock,
  Monitor, MapPin, Plus, Search,
  TrendingUp, CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { mockCursos, mockCapacitacionStats } from "@/lib/data/mock";

const categorias = ["Todas", "Seguridad", "Calidad", "Gerencial", "Tecnología", "Ventas", "Habilidades Blandas"];

const estadoStyle: Record<string, { bg: string; text: string; border: string }> = {
  "Completado":   { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  "En progreso":  { bg: "#DBEAFE", text: "#1E40AF", border: "#BFDBFE" },
  "Próximo":      { bg: "#F1F5F9", text: "#475569", border: "#E2E8F0" },
};

export default function CapacitacionPage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");

  const filtered = mockCursos.filter((c) => {
    const matchSearch = c.titulo.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoria === "Todas" || c.categoria === categoria;
    const matchEst = estado === "Todos" || c.estado === estado;
    return matchSearch && matchCat && matchEst;
  });

  // Cumplimiento global
  const totalInscritos   = mockCursos.reduce((s, c) => s + c.inscritos, 0);
  const totalCompletados = mockCursos.reduce((s, c) => s + c.completados, 0);
  const cumplimiento     = Math.round((totalCompletados / totalInscritos) * 100);

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Capacitación Virtual</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gestión del plan anual de capacitación y formación interna
          </p>
        </div>
        <button
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold self-start transition-colors"
          style={{ backgroundColor: "#1E3A8A" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}
        >
          <Plus size={16} />
          Nuevo curso
        </button>
      </div>

      {/* ── KPI strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "Cursos activos",        value: mockCapacitacionStats.cursosActivos,     color: "#1E3A8A", bg: "bg-[#1E3A8A]" },
          { icon: Users,    label: "Empleados inscritos",   value: mockCapacitacionStats.empleadosInscritos, color: "#7C3AED", bg: "bg-[#7C3AED]" },
          { icon: Award,    label: "Tasa de completación",  value: `${mockCapacitacionStats.tasaCompletacion}%`, color: "#059669", bg: "bg-emerald-600" },
          { icon: Clock,    label: "Horas de formación",    value: mockCapacitacionStats.horasFormacion,    color: "#D97706", bg: "bg-amber-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #E2E8F0", borderLeftColor: s.color, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[1.8rem] font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Compliance bar ── */}
      <div className="bg-white rounded-xl p-5 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-[#1E3A8A]" />
            <p className="text-sm font-bold text-foreground">Indicador de cumplimiento del plan</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-500" />
            <span className="text-sm font-bold" style={{ color: cumplimiento >= 80 ? "#059669" : cumplimiento >= 60 ? "#D97706" : "#DC2626" }}>
              {cumplimiento}% completado
            </span>
            <span className="text-xs text-muted-foreground">({totalCompletados}/{totalInscritos} participantes)</span>
          </div>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="h-full rounded-full transition-all"
            style={{
              width: `${cumplimiento}%`,
              background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Meta: 100% empleados capacitados</span>
          <span>Falta {100 - cumplimiento}% para completar</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar curso o instructor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Todos", "Completado", "En progreso", "Próximo"].map((e) => (
              <button key={e} onClick={() => setEstado(e)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  estado === e ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : "bg-white text-muted-foreground border-border hover:border-primary/40"
                }`}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categorias.map((c) => (
            <button key={c} onClick={() => setCategoria(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                categoria === c ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : "bg-white text-muted-foreground border-border hover:border-primary/40"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Course grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((curso) => {
          const est = estadoStyle[curso.estado] ?? estadoStyle["Próximo"];
          return (
            <div key={curso.id} className="bg-white rounded-xl hover:shadow-md transition-all"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
              {/* Top accent */}
              <div className="h-1 rounded-t-xl" style={{
                backgroundColor: curso.estado === "Completado" ? "#059669" : curso.estado === "En progreso" ? "#2563EB" : "#94A3B8"
              }} />
              <div className="p-5">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge className={`text-[10px] px-2 py-0.5 border-0 ${curso.categoriaColor}`}>
                    {curso.categoria}
                  </Badge>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: est.bg, color: est.text, border: `1px solid ${est.border}` }}>
                    {curso.estado}
                  </span>
                  {curso.obligatorio && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto"
                      style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5" }}>
                      Obligatorio
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-foreground text-[13.5px] leading-snug mb-1">{curso.titulo}</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{curso.descripcion}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} /> {curso.duracion}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {curso.modalidad === "Virtual" ? <Monitor size={11} /> : <MapPin size={11} />}
                    {curso.modalidad}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={11} /> {curso.inscritos} inscritos
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={11} /> {curso.completados} completados
                  </div>
                </div>

                {/* Instructor */}
                <div className="rounded-lg px-3 py-2 mb-3 flex items-center justify-between"
                  style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <span className="text-xs text-muted-foreground">Instructor</span>
                  <span className="text-xs font-semibold text-foreground">{curso.instructor}</span>
                </div>

                {/* Progress bar */}
                {curso.estado !== "Próximo" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Completación</span>
                      <span className="text-xs font-bold" style={{ color: curso.progreso >= 80 ? "#059669" : "#2563EB" }}>
                        {curso.progreso}%
                      </span>
                    </div>
                    <Progress value={curso.progreso} className="h-2" />
                  </div>
                )}

                {/* Dates */}
                <p className="text-xs text-muted-foreground mb-4">
                  {curso.fechaInicio === curso.fechaFin
                    ? `Fecha: ${curso.fechaInicio}`
                    : `${curso.fechaInicio} → ${curso.fechaFin}`}
                </p>

                {/* Action */}
                <button
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors ${
                    curso.estado === "Próximo"
                      ? "border text-[#1E3A8A] hover:bg-blue-50"
                      : curso.estado === "Completado"
                      ? "cursor-default text-muted-foreground"
                      : "text-white"
                  }`}
                  style={{
                    borderColor: curso.estado === "Próximo" ? "#1E3A8A" : undefined,
                    backgroundColor: curso.estado === "En progreso" ? "#1E3A8A" : curso.estado === "Completado" ? "#F1F5F9" : undefined,
                  }}
                >
                  {curso.estado === "Próximo" ? "Preinscribirse" : curso.estado === "Completado" ? "Ver certificados" : "Ver participantes"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No se encontraron cursos con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}
