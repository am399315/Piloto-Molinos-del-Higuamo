"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  Brain,
  ClipboardList,
  BookOpen,
  BarChart2,
  MessageSquare,
  X,
  LogOut,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: null,
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Gestión de Talento",
    items: [
      { href: "/reclutamiento", icon: UserPlus, label: "Reclutamiento" },
      { href: "/cv-ia", icon: Brain, label: "IA Análisis de CV" },
      { href: "/onboarding", icon: ClipboardList, label: "Onboarding" },
    ],
  },
  {
    label: "Desarrollo",
    items: [
      { href: "/capacitacion", icon: BookOpen, label: "Capacitación" },
      { href: "/desempeno", icon: BarChart2, label: "Desempeño" },
    ],
  },
  {
    label: "Comunicación",
    items: [
      { href: "/comunicaciones", icon: MessageSquare, label: "Comunicaciones" },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full flex flex-col transition-all duration-300 ease-in-out",
          "lg:translate-x-0 lg:z-30",
          open ? "translate-x-0" : "-translate-x-full",
          "w-[280px]",
          collapsed && "lg:w-20"
        )}
        style={{ backgroundColor: "#0B1220" }}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center justify-between h-16 flex-shrink-0 px-5",
            collapsed && "lg:px-3"
          )}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 100 110" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <line x1="50" y1="50" x2="75" y2="25" strokeWidth="3.5"/>
                <line x1="56" y1="44" x2="51" y2="39" strokeWidth="2.5"/><line x1="56" y1="44" x2="61" y2="49" strokeWidth="2.5"/>
                <line x1="63" y1="37" x2="59" y2="33" strokeWidth="2.5"/><line x1="63" y1="37" x2="67" y2="41" strokeWidth="2.5"/>
                <line x1="69" y1="31" x2="66" y2="28" strokeWidth="2"/><line x1="69" y1="31" x2="72" y2="34" strokeWidth="2"/>
                <line x1="50" y1="50" x2="25" y2="25" strokeWidth="3.5"/>
                <line x1="44" y1="44" x2="49" y2="39" strokeWidth="2.5"/><line x1="44" y1="44" x2="39" y2="49" strokeWidth="2.5"/>
                <line x1="37" y1="37" x2="41" y2="33" strokeWidth="2.5"/><line x1="37" y1="37" x2="33" y2="41" strokeWidth="2.5"/>
                <line x1="31" y1="31" x2="34" y2="28" strokeWidth="2"/><line x1="31" y1="31" x2="28" y2="34" strokeWidth="2"/>
                <line x1="50" y1="50" x2="75" y2="75" strokeWidth="3.5"/>
                <line x1="56" y1="56" x2="61" y2="51" strokeWidth="2.5"/><line x1="56" y1="56" x2="51" y2="61" strokeWidth="2.5"/>
                <line x1="63" y1="63" x2="67" y2="59" strokeWidth="2.5"/><line x1="63" y1="63" x2="59" y2="67" strokeWidth="2.5"/>
                <line x1="69" y1="69" x2="72" y2="66" strokeWidth="2"/><line x1="69" y1="69" x2="66" y2="72" strokeWidth="2"/>
                <line x1="50" y1="50" x2="25" y2="75" strokeWidth="3.5"/>
                <line x1="44" y1="56" x2="39" y2="51" strokeWidth="2.5"/><line x1="44" y1="56" x2="49" y2="61" strokeWidth="2.5"/>
                <line x1="37" y1="63" x2="33" y2="59" strokeWidth="2.5"/><line x1="37" y1="63" x2="41" y2="67" strokeWidth="2.5"/>
                <line x1="31" y1="69" x2="28" y2="66" strokeWidth="2"/><line x1="31" y1="69" x2="34" y2="72" strokeWidth="2"/>
                <path d="M 47 50 Q 40 74 33 100" strokeWidth="3.5"/>
                <path d="M 53 50 Q 60 74 67 100" strokeWidth="3.5"/>
                <line x1="41" y1="72" x2="59" y2="72" strokeWidth="3.5"/>
              </svg>
            </div>
            <div className={cn("min-w-0", collapsed && "lg:hidden")}>
              <p className="text-[12.5px] font-bold text-white leading-tight truncate">Molinos del Higuamo</p>
              <p className="text-[10px] leading-tight mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                Plataforma RRHH IA
              </p>
            </div>
          </div>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md transition-colors flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
            }}
            aria-label="Cerrar menú"
          >
            <X size={16} />
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md transition-colors flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.32)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.32)";
            }}
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          {navGroups.map((group, gi) => (
            <div key={gi} className={cn(gi > 0 && "mt-3")}>
              {group.label && (
                <>
                  <p
                    className={cn(
                      "px-5 pt-1 pb-2 text-[9.5px] font-bold uppercase tracking-[0.14em]",
                      collapsed && "lg:hidden"
                    )}
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {group.label}
                  </p>
                  <div className={cn("hidden px-4 pb-2", collapsed && "lg:block")}>
                    <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
                  </div>
                </>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <div key={item.href} className="relative px-3 mb-0.5">
                    {isActive && (
                      <div
                        className="absolute left-0 rounded-r-full pointer-events-none"
                        style={{ top: "7px", bottom: "7px", width: "3px", backgroundColor: "#60A5FA" }}
                      />
                    )}
                    <Link
                      href={item.href}
                      onClick={onClose}
                      title={item.label}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-150",
                        isActive ? "text-white" : "hover:text-white",
                        collapsed && "lg:justify-center lg:px-0 lg:gap-0"
                      )}
                      style={{
                        backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.52)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon
                        size={16}
                        style={{ flexShrink: 0, color: isActive ? "#93C5FD" : "rgba(255,255,255,0.4)" }}
                      />
                      <span className={cn("flex-1 truncate", collapsed && "lg:hidden")}>
                        {item.label}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-3 py-3 flex-shrink-0 space-y-0.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <button
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-[9px] rounded-lg text-[13px] transition-colors text-left",
              collapsed && "lg:justify-center lg:px-0 lg:gap-0"
            )}
            title={collapsed ? "Configuración" : undefined}
            style={{ color: "rgba(255,255,255,0.38)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.38)";
            }}
          >
            <Settings size={14} style={{ flexShrink: 0, color: "rgba(255,255,255,0.28)" }} />
            <span className={cn(collapsed && "lg:hidden")}>Configuración</span>
          </button>
          <Link
            href="/login"
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-[9px] rounded-lg text-[13px] transition-colors",
              collapsed && "lg:justify-center lg:px-0 lg:gap-0"
            )}
            title={collapsed ? "Cerrar sesión" : undefined}
            style={{ color: "rgba(255,255,255,0.38)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(239,68,68,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,165,165,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)";
            }}
          >
            <LogOut size={14} style={{ flexShrink: 0, color: "rgba(255,255,255,0.28)" }} />
            <span className={cn(collapsed && "lg:hidden")}>Cerrar sesión</span>
          </Link>
          <div className={cn("px-3 pt-2", collapsed && "lg:hidden")}>
            <p className="text-[9.5px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              Sistema RRHH IA · © 2026 Molinos del Higuamo
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
