"use client";

import { useState } from "react";
import {
  MessageSquare, Bell, Calendar, FileText,
  Plus, Eye, Paperclip, Clock, Users,
  Download, FileEdit, Send, Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAvisos, mockEventosCal, mockDocumentos, mockComStats } from "@/lib/data/mock";

const prioridadConfig: Record<string, { badge: string; dot: string }> = {
  alta:  { badge: "bg-red-50 text-red-700 border border-red-100",     dot: "bg-red-500" },
  media: { badge: "bg-amber-50 text-amber-700 border border-amber-100", dot: "bg-amber-500" },
  baja:  { badge: "bg-emerald-50 text-emerald-700 border border-emerald-100", dot: "bg-emerald-500" },
};
const prioridadLabel: Record<string, string> = { alta: "Alta", media: "Media", baja: "Baja" };

const plantillas = [
  { icon: FileEdit, nombre: "Certificación laboral",     desc: "Certifica antigüedad y cargo del colaborador",    color: "#1E3A8A", bg: "#DBEAFE" },
  { icon: Send,     nombre: "Memorándum interno",        desc: "Comunicación formal entre departamentos",          color: "#7C3AED", bg: "#EDE9FE" },
  { icon: FileText, nombre: "Carta institucional",       desc: "Comunicación oficial con entidades externas",      color: "#0891B2", bg: "#CFFAFE" },
  { icon: Clock,    nombre: "Solicitud de horas extras", desc: "Autorización formal de tiempo adicional",          color: "#D97706", bg: "#FEF3C7" },
  { icon: Users,    nombre: "Comunicación interna",      desc: "Avisos masivos a todos los colaboradores",         color: "#059669", bg: "#D1FAE5" },
  { icon: Sparkles, nombre: "Reconocimiento laboral",    desc: "Mención especial a colaboradores destacados",     color: "#DC2626", bg: "#FEF2F2" },
];

export default function ComunicacionesPage() {
  const [selectedAviso, setSelectedAviso] = useState(mockAvisos[0].id);
  const aviso = mockAvisos.find((a) => a.id === selectedAviso)!;
  const [tab, setTab] = useState<"avisos" | "plantillas" | "calendario" | "documentos">("avisos");

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Centro de Comunicaciones</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Comunicados, memorándums, certificaciones y documentos institucionales
          </p>
        </div>
        <button
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold self-start transition-colors"
          style={{ backgroundColor: "#1E3A8A" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}
        >
          <Plus size={16} />
          Generar documento
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Bell,     label: "Comunicados emitidos",     value: mockComStats.avisosSemana,  color: "#1E3A8A", bg: "bg-[#1E3A8A]" },
          { icon: Eye,      label: "Lecturas confirmadas",     value: `${mockComStats.tasaLectura}%`, color: "#059669", bg: "bg-emerald-600" },
          { icon: Calendar, label: "Eventos próximos",         value: mockComStats.eventosProximos, color: "#D97706", bg: "bg-amber-500" },
          { icon: FileText, label: "Documentos generados",     value: mockComStats.documentos,    color: "#7C3AED", bg: "bg-[#7C3AED]" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #E2E8F0", borderLeftColor: s.color, borderLeftWidth: "3px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon size={17} className="text-white" />
              </div>
              <div>
                <p className="text-[1.8rem] font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ backgroundColor: "#EEF2F7" }}>
        {([
          { key: "avisos",      label: "Avisos" },
          { key: "plantillas",  label: "Plantillas" },
          { key: "calendario",  label: "Calendario" },
          { key: "documentos",  label: "Documentos" },
        ] as const).map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === t.key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Avisos tab ── */}
      {tab === "avisos" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-2.5">
            {mockAvisos.map((a) => {
              const readPct = Math.round((a.leidos / a.total) * 100);
              const pcfg = prioridadConfig[a.prioridad];
              return (
                <button key={a.id} onClick={() => setSelectedAviso(a.id)}
                  className="w-full text-left p-4 rounded-xl border transition-all"
                  style={{
                    borderColor: selectedAviso === a.id ? "#2563EB" : "#E2E8F0",
                    backgroundColor: selectedAviso === a.id ? "#EFF6FF" : "white",
                    boxShadow: selectedAviso === a.id ? "0 0 0 1px #2563EB" : "0 1px 3px rgba(15,23,42,0.04)",
                  }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-[10px] px-1.5 py-0 border-0 ${a.categoriaColor}`}>
                        {a.categoria}
                      </Badge>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${pcfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pcfg.dot}`} />
                        {prioridadLabel[a.prioridad]}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{a.fecha}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug mb-2">{a.titulo}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{a.autor}</span>
                    <span className="flex items-center gap-1"><Eye size={10} />{readPct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${readPct}%`, backgroundColor: readPct >= 80 ? "#059669" : "#D97706" }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <Card className="lg:col-span-3 border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className={`text-xs px-2 py-0.5 border-0 ${aviso.categoriaColor}`}>{aviso.categoria}</Badge>
                <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${prioridadConfig[aviso.prioridad].badge}`}>
                  Prioridad {prioridadLabel[aviso.prioridad]}
                </span>
              </div>
              <CardTitle className="text-base leading-snug">{aviso.titulo}</CardTitle>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={11} />{aviso.fecha}</span>
                <span className="flex items-center gap-1"><Users size={11} />{aviso.autor}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-xl p-4" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <p className="text-sm text-foreground leading-relaxed">{aviso.contenido}</p>
              </div>

              {/* Read rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-foreground">Tasa de lectura</p>
                  <span className="text-sm font-bold text-foreground">
                    {aviso.leidos}/{aviso.total} ({Math.round((aviso.leidos / aviso.total) * 100)}%)
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${(aviso.leidos / aviso.total) * 100}%`,
                      backgroundColor: (aviso.leidos / aviso.total) >= 0.8 ? "#059669" : "#D97706",
                    }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {aviso.total - aviso.leidos} colaboradores aún no han leído este comunicado
                </p>
              </div>

              {aviso.adjuntos.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
                    <Paperclip size={14} /> Adjuntos ({aviso.adjuntos.length})
                  </p>
                  <div className="space-y-2">
                    {aviso.adjuntos.map((adj, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                        style={{ border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#EFF6FF"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F8FAFC"; }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "#DBEAFE" }}>
                          <FileText size={13} style={{ color: "#1E3A8A" }} />
                        </div>
                        <span className="text-sm text-foreground flex-1 truncate">{adj}</span>
                        <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "#1E3A8A" }}>
                          <Download size={12} /> Descargar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <button className="text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ backgroundColor: "#1E3A8A" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e40af"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1E3A8A"; }}>
                  Reenviar recordatorio
                </button>
                <button className="border text-foreground px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-muted"
                  style={{ borderColor: "#E2E8F0" }}>
                  Editar aviso
                </button>
                <button className="border px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ml-auto"
                  style={{ borderColor: "#FCA5A5", color: "#DC2626" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FEF2F2"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
                  Archivar
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Plantillas tab ── */}
      {tab === "plantillas" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "#EFF6FF", border: "1px solid #DBEAFE" }}>
            <Sparkles size={15} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-blue-700">
              <span className="font-semibold">Automatización documental activa. </span>
              Genera documentos corporativos en segundos usando las plantillas estandarizadas del Departamento de RRHH.
              Cada documento generado queda registrado en el historial para auditoría.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantillas.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: p.bg }}>
                    <p.icon size={19} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-[#1E3A8A] transition-colors">
                      {p.nombre}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
                <button
                  className="w-full mt-4 py-2 rounded-xl text-xs font-semibold transition-colors text-white"
                  style={{ backgroundColor: p.color }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                >
                  Generar documento
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Calendar tab ── */}
      {tab === "calendario" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockEventosCal.map((ev) => (
            <div key={ev.id} className="bg-white rounded-xl hover:shadow-md transition-shadow"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`w-2 min-h-14 rounded-full shrink-0 ${ev.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground leading-snug">{ev.titulo}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar size={11} />{ev.fecha}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{ev.hora}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{ev.participantes} participantes</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 text-xs py-2 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: "#EFF6FF", color: "#1E3A8A" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#DBEAFE"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#EFF6FF"; }}>
                    Ver detalle
                  </button>
                  <button className="flex-1 text-xs py-2 border rounded-lg font-semibold hover:bg-muted transition-colors"
                    style={{ borderColor: "#E2E8F0" }}>
                    Agregar participante
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Documents tab ── */}
      {tab === "documentos" && (
        <Card className="border shadow-sm" style={{ borderColor: "#E2E8F0" }}>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #E2E8F0", backgroundColor: "#F8FAFC" }}>
                    <th className="text-left text-xs font-bold text-muted-foreground px-5 py-3 uppercase tracking-wide">Documento</th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3 hidden sm:table-cell uppercase tracking-wide">Categoría</th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3 hidden md:table-cell uppercase tracking-wide">Tipo</th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3 hidden md:table-cell uppercase tracking-wide">Tamaño</th>
                    <th className="text-left text-xs font-bold text-muted-foreground px-4 py-3 uppercase tracking-wide">Actualizado</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {mockDocumentos.map((doc, i) => (
                    <tr key={i} className="transition-colors" style={{ borderBottom: "1px solid #F1F5F9" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "#DBEAFE" }}>
                            <FileText size={13} style={{ color: "#1E3A8A" }} />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{doc.nombre}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">{doc.categoria}</Badge>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{doc.tipo}</span>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{doc.tamaño}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-muted-foreground">{doc.fecha}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="text-xs font-semibold flex items-center gap-1 transition-colors"
                          style={{ color: "#1E3A8A" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1e40af"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1E3A8A"; }}>
                          <Download size={12} /> Descargar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
