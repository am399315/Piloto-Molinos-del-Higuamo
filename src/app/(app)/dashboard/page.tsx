"use client";

import {
  Users, UserX, FileText, CalendarDays,
  TrendingUp, TrendingDown, Minus, Clock,
  ArrowRight, Activity, Download, Briefcase,
  ClipboardList, BookOpen, BarChart2, MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  mockStats, mockDepartamentos, mockAsistencia,
  mockActividades, mockEventosHoy,
} from "@/lib/data/mock";

// ── Compact accent KPI ────────────────────────────────────────────────────────
function KpiStrip({ label, value, accentColor }: { label: string; value: string | number; accentColor: string }) {
  return (
    <div
      className="bg-white rounded-xl px-4 py-3.5 hover:shadow-md transition-shadow"
      style={{ border: "1px solid #E2E8F0", borderLeftColor: accentColor, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}
    >
      <p className="text-[1.55rem] font-bold leading-none" style={{ color: accentColor }}>{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1.5 leading-tight">{label}</p>
    </div>
  );
}

// ── Stat card with trend ──────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, trend, trendLabel, iconBg, accentColor }: {
  icon: React.ElementType; label: string; value: string | number;
  trend?: number; trendLabel?: string; iconBg: string; accentColor: string;
}) {
  const isUp = trend !== undefined && trend > 0;
  const isDown = trend !== undefined && trend < 0;
  return (
    <div
      className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow"
      style={{ border: "1px solid #E2E8F0", borderLeftColor: accentColor, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
            isUp ? "bg-emerald-50 text-emerald-700" : isDown ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
          }`}>
            {isUp ? <TrendingUp size={10} /> : isDown ? <TrendingDown size={10} /> : <Minus size={10} />}
            {Math.abs(trend ?? 0)} {trendLabel}
          </span>
        )}
      </div>
      <p className="text-[1.9rem] font-bold text-foreground leading-none mb-1">{value}</p>
      <p className="text-[12.5px] text-muted-foreground">{label}</p>
    </div>
  );
}

// ── Attendance bar chart ──────────────────────────────────────────────────────
function AttendanceChart() {
  const max = Math.max(...mockAsistencia.map((m) => m.presentes));
  return (
    <div className="flex items-end gap-2 sm:gap-3 h-32">
      {mockAsistencia.map((m, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold text-muted-foreground">{m.porcentaje}%</span>
          <div className="w-full flex flex-col justify-end" style={{ height: "80px" }}>
            <div
              className="w-full rounded-t-[4px]"
              style={{
                height: `${(m.presentes / max) * 100}%`,
                minHeight: "8px",
                background: i === mockAsistencia.length - 1
                  ? "linear-gradient(180deg, #2563EB 0%, #1E3A8A 100%)"
                  : "linear-gradient(180deg, #93C5FD 0%, #BFDBFE 100%)",
              }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">{m.mes}</span>
        </div>
      ))}
    </div>
  );
}

// ── Donut chart ────────────────────────────────────────────────────────────────
function DeptDonut() {
  const size = 130;
  const cx = size / 2;
  const cy = size / 2;
  const r = 48;
  const inner = 30;
  let cumPct = 0;

  function slice(pct: number, color: string, idx: number) {
    const startAngle = (cumPct / 100) * 360 - 90;
    cumPct += pct;
    const endAngle = (cumPct / 100) * 360 - 90;
    const largeArc = pct > 50 ? 1 : 0;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const xi1 = cx + inner * Math.cos(toRad(startAngle));
    const yi1 = cy + inner * Math.sin(toRad(startAngle));
    const xi2 = cx + inner * Math.cos(toRad(endAngle));
    const yi2 = cy + inner * Math.sin(toRad(endAngle));
    return (
      <path
        key={idx}
        d={`M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${largeArc} 0 ${xi1} ${yi1} Z`}
        fill={color}
        stroke="#F3F6FA"
        strokeWidth={2}
      />
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <svg width={size} height={size} className="flex-shrink-0">
        {mockDepartamentos.map((d, i) => slice(d.porcentaje, d.color, i))}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#0F172A" fontSize={20} fontWeight={700}>247</text>
        <text x={cx} y={cy + 11} textAnchor="middle" fill="#64748B" fontSize={8.5}>empleados</text>
      </svg>
      <div className="w-full space-y-1.5">
        {mockDepartamentos.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[11.5px] text-muted-foreground flex-1 truncate">{d.nombre}</span>
            <span className="text-[11.5px] font-bold text-foreground">{d.porcentaje}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Activity color map ────────────────────────────────────────────────────────
const activityCfg: Record<string, { color: string; bg: string }> = {
  ingreso:     { color: "#2563EB", bg: "#DBEAFE" },
  solicitud:   { color: "#D97706", bg: "#FEF3C7" },
  evaluacion:  { color: "#059669", bg: "#D1FAE5" },
  documento:   { color: "#7C3AED", bg: "#EDE9FE" },
  capacitacion:{ color: "#0891B2", bg: "#CFFAFE" },
};

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const today = new Intl.DateTimeFormat("es-DO", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(new Date());

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

  const modules = [
    { label: "Reclutamiento",   value: "6 vacantes activas",     icon: Briefcase,     color: "#60A5FA", href: "/reclutamiento" },
    { label: "Inducción",       value: "3 nuevos ingresos",      icon: ClipboardList,  color: "#34D399", href: "/onboarding" },
    { label: "Capacitación",    value: "176 inscritos",          icon: BookOpen,       color: "#7DD3FC", href: "/capacitacion" },
    { label: "Desempeño",       value: "68% completado",         icon: BarChart2,      color: "#FDE68A", href: "/desempeno" },
    { label: "Comunicaciones",  value: "5 avisos esta semana",   icon: MessageSquare,  color: "#C4B5FD", href: "/comunicaciones" },
  ];

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── Executive Hero Banner ── */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #0B1220 0%, #1E3A8A 52%, #2563EB 100%)" }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.11) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Decorative circles */}
        <div className="absolute pointer-events-none"
          style={{ width: 380, height: 380, top: -130, right: -70, borderRadius: "50%", background: "rgba(37,99,235,0.20)" }}
        />
        <div className="absolute pointer-events-none"
          style={{ width: 160, height: 160, bottom: -60, left: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}
        />

        <div className="relative z-10 p-6 sm:p-7">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.80)" }}>
                  MVP Ejecutivo
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(5,150,105,0.25)", color: "#6EE7B7" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sistema operativo
                </span>
              </div>
              <h1 className="text-[1.45rem] sm:text-[1.8rem] font-bold text-white leading-tight mb-1.5">
                Panel Ejecutivo de Recursos Humanos
              </h1>
              <p className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.52)" }}>
                {greeting}, Ana · <span className="capitalize">{today}</span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-semibold transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.16)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.20)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.12)"; }}
              >
                <Download size={14} />
                Exportar reporte
              </button>
            </div>
          </div>

          {/* Module impact strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {modules.map((m, i) => (
              <Link
                key={i}
                href={m.href}
                className="flex items-center gap-2.5 p-3 rounded-xl transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.14)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.07)"; }}
              >
                <m.icon size={14} style={{ color: m.color, flexShrink: 0 }} />
                <div className="min-w-0">
                  <p className="text-[11.5px] font-semibold text-white truncate">{m.value}</p>
                  <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.42)" }}>{m.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Executive KPI Strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiStrip label="Total empleados"         value="247"  accentColor="#1E3A8A" />
        <KpiStrip label="Vacantes activas"        value="6"    accentColor="#2563EB" />
        <KpiStrip label="Candidatos en proceso"   value="130"  accentColor="#7C3AED" />
        <KpiStrip label="Capacitaciones activas"  value="4"    accentColor="#0891B2" />
        <KpiStrip label="Evaluaciones pendientes" value="79"   accentColor="#D97706" />
        <KpiStrip label="Avisos emitidos (sem.)"  value="5"    accentColor="#059669" />
      </div>

      {/* ── Main KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}       label="Total empleados"    value={mockStats.totalEmpleados}    trend={mockStats.empleadosTrend}   trendLabel="vs. año ant."  iconBg="bg-[#1E3A8A]"  accentColor="#1E3A8A" />
        <StatCard icon={UserX}       label="Ausencias hoy"      value={mockStats.ausenciasHoy}      trend={mockStats.ausenciasTrend}   trendLabel="vs. sem. ant." iconBg="bg-amber-500"  accentColor="#D97706" />
        <StatCard icon={FileText}    label="Solicitudes nuevas" value={mockStats.nuevasSolicitudes} trend={mockStats.solicitudesTrend} trendLabel="esta semana"   iconBg="bg-[#2563EB]"  accentColor="#2563EB" />
        <StatCard icon={CalendarDays} label="Eventos hoy"       value={mockStats.eventosHoy}                                                                       iconBg="bg-emerald-600" accentColor="#059669" />
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-bold">Asistencia mensual</CardTitle>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">Enero — Junio 2026</p>
              </div>
              <div className="text-right">
                <p className="text-[10.5px] text-muted-foreground">Promedio semestral</p>
                <p className="text-[15px] font-bold text-foreground">96.3%</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <AttendanceChart />
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(180deg, #2563EB, #1E3A8A)" }} />
                <span className="text-[11px] text-muted-foreground">Mes actual</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(180deg, #93C5FD, #BFDBFE)" }} />
                <span className="text-[11px] text-muted-foreground">Meses anteriores</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-[14px] font-bold">Distribución por departamento</CardTitle>
            <p className="text-[11.5px] text-muted-foreground">247 colaboradores activos</p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <DeptDonut />
          </CardContent>
        </Card>
      </div>

      {/* ── Activity Timeline + Events/Quick actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-primary" />
                <CardTitle className="text-[14px] font-bold">Actividad reciente</CardTitle>
              </div>
              <button className="text-[12px] text-primary hover:underline font-semibold flex items-center gap-1">
                Ver todo <ArrowRight size={11} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ backgroundColor: "#E2E8F0" }} />
              <div className="space-y-0">
                {mockActividades.map((a, i) => {
                  const cfg = activityCfg[a.tipo] ?? { color: "#64748B", bg: "#F1F5F9" };
                  return (
                    <div key={i} className="flex items-start gap-4 py-2.5 relative">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 relative z-10"
                        style={{ backgroundColor: cfg.bg, color: cfg.color, outline: "2px solid #F3F6FA" }}
                      >
                        {a.avatar}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-[13px] text-foreground leading-snug">{a.descripcion}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Clock size={10} className="text-muted-foreground/50" />
                          <p className="text-[11px] text-muted-foreground">{a.hora}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[14px] font-bold">Agenda de hoy</CardTitle>
              <Link href="/comunicaciones" className="text-[12px] text-primary hover:underline font-semibold flex items-center gap-1">
                Calendario <ArrowRight size={11} />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2">
            {mockEventosHoy.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <div className={`w-1.5 h-10 rounded-full flex-shrink-0 ${ev.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground truncate">{ev.titulo}</p>
                  <p className="text-[11px] text-muted-foreground">{ev.hora}</p>
                </div>
              </div>
            ))}

            <div className="pt-3 mt-1" style={{ borderTop: "1px solid #E2E8F0" }}>
              <p className="text-[10px] font-bold text-muted-foreground mb-2.5 uppercase tracking-widest">
                Acciones rápidas
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/reclutamiento", label: "Nueva vacante" },
                  { href: "/cv-ia",         label: "Analizar CV" },
                  { href: "/comunicaciones", label: "Publicar aviso" },
                  { href: "/desempeno",     label: "Ver evaluaciones" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[11.5px] text-center py-2 px-2 rounded-lg font-semibold transition-all"
                    style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A", border: "1px solid #DBEAFE" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#DBEAFE"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EFF6FF"; }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
