"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useApp } from "@/hooks/useClient";

const NAV = [
  { href: "/", label: "Overview", key: "jaipurTrip" as const },
  { href: "/ask", label: "Pramaan Q&A", key: "ask" as const },
  { href: "/sites/amer-fort", label: "Sanskar Sites", key: "sanskar" as const },
  { href: "/itinerary", label: "Itinerary", key: "itinerary" as const },
  { href: "/phrases", label: "Bol Chaal", key: "phrases" as const },
  { href: "/crowd", label: "Bheed Index", key: "crowd" as const },
  { href: "/pack-and-go", label: "Offline Pack", key: "packgo" as const },
  { href: "/demo", label: "Arena Demo", key: "demo" as const },
  { href: "/sos", label: "SOS 112", key: "sos" as const },
];

export function AppChrome({ children }: { children: ReactNode }) {
  const { t, net, demo } = useApp();
  const path = usePathname();

  const isHome = path === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2723]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-stone-900 focus:p-2 focus:text-amber-200 focus:z-50 rounded"
      >
        {t("skip") || "Skip to content"}
      </a>

      {/* Top Editorial Utility Bar */}
      <div className="border-b border-[#E5DECE] bg-[#FAF7F2] text-[11px] tracking-[0.16em] uppercase text-stone-500 py-1.5 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-[#C85A32]">NATURE · HERITAGE · VERIFIED CITATIONS</span>
            <span className="hidden md:inline text-stone-300">|</span>
            <span className="hidden md:inline">UNKNOWN IS A VALID ANSWER</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  net === "offline" ? "bg-rose-500" : net === "degraded" ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
              <span className="font-semibold text-stone-700">
                {net === "offline" ? "OFFLINE READY" : demo ? "DEMO MODE" : "ONLINE VERIFIED"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <header className="sticky top-0 z-40 border-b border-[#E5DECE] bg-[#FAF7F2]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 py-3.5">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[0.12em] text-[#1C1917] group-hover:text-[#C85A32] transition-colors leading-none">
              YATRA SATHI
            </span>
            <span className="mt-1 text-[10px] tracking-[0.24em] uppercase text-[#78716C] font-semibold">
              CULTURAL COMPANION · INDIA
            </span>
          </Link>

          {/* Navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {NAV.slice(0, 6).map((item) => {
              const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors py-1 relative ${
                    active ? "text-[#C85A32] font-semibold" : "hover:text-[#1C1917]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C85A32] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Language */}
          <div className="flex items-center gap-3">
            <LanguagePicker />

            <Link
              href="/sos"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition"
              title="Emergency helpline 112 with GPS coordinates"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              SOS 112
            </Link>

            <Link
              href="/plans"
              className="btn-editorial-primary !py-2 !px-4 text-xs hidden sm:inline-flex"
            >
              Plan Your Trip →
            </Link>
          </div>
        </div>

        {/* Secondary Navigation Row (Mobile & Tablet) */}
        <div className="lg:hidden border-t border-[#EAE2D5] overflow-x-auto py-2 px-4 flex gap-2 no-scrollbar">
          {NAV.map((item) => {
            const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "bg-[#1C1917] text-white"
                    : "bg-[#F3ECE1] text-stone-700 hover:bg-[#EAE2D5]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Network Alert Banner (if offline or degraded) */}
      {net === "offline" && (
        <div className="bg-amber-100/90 border-b border-amber-300 text-amber-900 px-4 py-2 text-center text-xs font-medium">
          📡 You are browsing offline. All queries are served on-device from the cached Jaipur Knowledge Pack.
        </div>
      )}

      {/* Main Body */}
      <main id="main-content" className={`flex-1 ${isHome ? "" : "mx-auto max-w-7xl w-full px-4 sm:px-8 py-8"}`}>
        {children}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-[#E5DECE] bg-[#F5EFE6] text-stone-700 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[0.12em] text-[#1C1917] block">
                YATRA SATHI
              </span>
              <p className="mt-3 text-sm text-stone-600 max-w-md leading-relaxed">
                An honest travel companion for exploring India. Grounded in UNESCO, ASI, and primary archival evidence. We believe unknown is a valid answer.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="editorial-pill">🏛 43 UNESCO SITES</span>
                <span className="editorial-pill">📖 100% CITED EVIDENCE</span>
                <span className="editorial-pill">⚡ ZERO SPONSORED LISTINGS</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900 mb-3">Core Toolkit</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><Link href="/ask" className="hover:text-[#C85A32] transition">Pramaan Q&A</Link></li>
                <li><Link href="/sites/amer-fort" className="hover:text-[#C85A32] transition">Sanskar Etiquette Cards</Link></li>
                <li><Link href="/itinerary" className="hover:text-[#C85A32] transition">Day-by-Day Itinerary</Link></li>
                <li><Link href="/pack-and-go" className="hover:text-[#C85A32] transition">Pack & Go Offline Cache</Link></li>
                <li><Link href="/demo" className="hover:text-[#C85A32] transition">Arena Hallucination Check</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-stone-900 mb-3">Safety & Civic</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><Link href="/sos" className="hover:text-[#C85A32] transition font-semibold text-rose-700">National Emergency 112</Link></li>
                <li><Link href="/crowd" className="hover:text-[#C85A32] transition">Bheed Crowd Barometer</Link></li>
                <li><Link href="/phrases" className="hover:text-[#C85A32] transition">Bol Chaal Phrases</Link></li>
                <li><Link href="/handoff.md" className="hover:text-[#C85A32] transition" target="_blank">Research Handoff Doc</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#E5DECE] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} YatraSathi · Open Cultural Tourism Initiative for India.</p>
            <p>Built with Next.js 16, FastAPI, and OpenStreetMap data.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
