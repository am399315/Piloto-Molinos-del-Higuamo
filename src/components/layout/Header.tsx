"use client";

import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
}

const mockUser = {
  nombre: "Ana Rodríguez",
  cargo: "Directora de RRHH",
  initials: "AR",
};

const mockNotifications = [
  { id: 1, texto: "Nueva solicitud de vacaciones — Pedro Almonte", tiempo: "hace 5 min", leida: false },
  { id: 2, texto: "Evaluación completada — Dpto. Ventas (40/42)", tiempo: "hace 1h", leida: false },
  { id: 3, texto: "Entrevista programada — 10:00 AM mañana", tiempo: "hace 2h", leida: true },
];

const pathLabels: Record<string, string> = {
  "/dashboard": "Dashboard RRHH",
  "/reclutamiento": "Reclutamiento Inteligente",
  "/cv-ia": "IA Análisis de CV",
  "/onboarding": "Onboarding Digital",
  "/capacitacion": "Capacitación Virtual",
  "/desempeno": "Evaluación de Desempeño",
  "/comunicaciones": "Centro de Comunicaciones",
};

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const pathname = usePathname();

  const unread = mockNotifications.filter((n) => !n.leida).length;
  const pageTitle = pathLabels[pathname] ?? "RRHH Digital";

  return (
    <header className="sticky top-0 z-20 h-16 bg-white flex items-center px-4 gap-3"
      style={{ borderBottom: "1px solid #E8ECF0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.05)" }}
    >
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      {/* Page title — desktop breadcrumb */}
      <div className="hidden lg:flex items-center gap-2 text-sm">
        <span className="text-muted-foreground/60 font-medium">RRHH</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="font-semibold text-foreground">{pageTitle}</span>
      </div>

      {/* Mobile title */}
      <span className="lg:hidden text-sm font-semibold text-foreground flex-1 truncate">{pageTitle}</span>

      {/* Search — desktop */}
      <div className="hidden sm:flex flex-1 items-center justify-center max-w-xs mx-auto">
        <div className="relative w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Buscar empleados, documentos…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full transition-all placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{
              backgroundColor: "#F1F5F9",
              border: "1px solid #E2E8F0",
              color: "#0F172A",
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#93C5FD";
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = "#F1F5F9";
              e.currentTarget.style.borderColor = "#E2E8F0";
            }}
          />
        </div>
      </div>

      <div className="flex-1 lg:flex-none" />

      {/* Right side actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowUser(false); }}
            className="relative p-2.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Notificaciones"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-xl z-50 overflow-hidden"
              style={{ boxShadow: "0 8px 24px 0 rgba(15,23,42,0.10), 0 2px 6px 0 rgba(15,23,42,0.06)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold text-foreground">Notificaciones</span>
                {unread > 0 && (
                  <span className="text-[11px] bg-primary text-white px-2 py-0.5 rounded-full font-medium">
                    {unread} nuevas
                  </span>
                )}
              </div>
              <div className="divide-y divide-border">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 transition-colors hover:bg-muted/40 cursor-pointer ${!n.leida ? "bg-blue-50/60" : ""}`}
                  >
                    <div className="flex items-start gap-2.5">
                      {!n.leida && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                      )}
                      <div className={!n.leida ? "" : "pl-4"}>
                        <p className={`text-sm leading-snug ${!n.leida ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {n.texto}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">{n.tiempo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border bg-muted/20">
                <button className="text-xs text-primary hover:underline font-semibold">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUser(!showUser); setShowNotifs(false); }}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback
                className="text-xs font-bold text-white"
                style={{ backgroundColor: "#1E3A8A" }}
              >
                {mockUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-[12.5px] font-semibold text-foreground leading-tight">{mockUser.nombre}</p>
              <p className="text-[10.5px] text-muted-foreground leading-tight">{mockUser.cargo}</p>
            </div>
            <ChevronDown size={13} className="text-muted-foreground/60 hidden md:block" />
          </button>

          {showUser && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-border rounded-xl z-50 overflow-hidden"
              style={{ boxShadow: "0 8px 24px 0 rgba(15,23,42,0.10), 0 2px 6px 0 rgba(15,23,42,0.06)" }}
            >
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback
                      className="text-xs font-bold text-white"
                      style={{ backgroundColor: "#1E3A8A" }}
                    >
                      {mockUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{mockUser.nombre}</p>
                    <p className="text-xs text-muted-foreground">{mockUser.cargo}</p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                  <User size={14} className="text-muted-foreground" />
                  Mi perfil
                </button>
                <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                  <Settings size={14} className="text-muted-foreground" />
                  Configuración
                </button>
              </div>
              <div className="border-t border-border py-1">
                <Link
                  href="/login"
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Cerrar sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns on outside click */}
      {(showNotifs || showUser) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotifs(false); setShowUser(false); }}
        />
      )}
    </header>
  );
}
