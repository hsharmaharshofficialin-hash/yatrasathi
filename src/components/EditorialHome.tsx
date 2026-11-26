"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DESTS } from "@/data/destinations";
import { buildPramaanAnswer } from "@/lib/pramaan";
import type { AskResponse } from "@/lib/types";

const HERO_IMG = "/images/hero-jaipur.jpg";
const FALLBACK_IMG = "/images/hero-temple.jpg";

const PILLARS = [
  {
    num: "01",
    tag: "PRAMAAN CITATIONS",
    title: "Cited Cultural Narratives",
    desc: "Every historical statement is verified against UNESCO, ASI, and archival records. If an answer cannot be grounded in verified sources, YatraSathi abstains.",
    action: "Ask Pramaan",
    href: "/ask",
  },
  {
    num: "02",
    tag: "SANSKAR PROTOCOLS",
    title: "Sacred Site Etiquette",
    desc: "Understand footwear, head coverings, photography bans, and quiet hours before stepping into temples, mosques, and gurudwaras.",
    action: "View Etiquette",
    href: "/sites/amer-fort",
  },
  {
    num: "03",
    tag: "ON-DEVICE OFFLINE",
    title: "Network-Honest PWA",
    desc: "Cell service drops in deserts, hill forts, and ghats. Pre-cache complete city packs to IndexedDB so search, maps, and etiquette work offline.",
    action: "Pack & Go",
    href: "/pack-and-go",
  },
  {
    num: "04",
    tag: "CIVIC AMENITIES & SOS",
    title: "Ground Reality & Safety",
    desc: "Direct 112 emergency calling with on-device GPS coordinates, plus live OpenStreetMap data for drinking water, public toilets, and clinics.",
    action: "Safety Panel",
    href: "/sos",
  },
];

const SAMPLE_QUESTIONS = [
  "Why is Amer Fort a UNESCO World Heritage site?",
  "What are the six hill forts of Rajasthan?",
  "What are the etiquette rules for visiting Jama Masjid?",
  "Best Italian restaurant near Amer Fort?", // Abstains honestly!
];

export default function EditorialHome() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeDestIdx, setActiveDestIdx] = useState<number>(0);
  const [askInput, setAskInput] = useState<string>("Why is Amer Fort a UNESCO World Heritage site?");
  const [askResult, setAskResult] = useState<AskResponse | null>(() =>
    buildPramaanAnswer({
      question: "Why is Amer Fort a UNESCO World Heritage site?",
      lang: "en",
      siteSlug: "amer-fort",
    })
  );
  const [isAsking, setIsAsking] = useState(false);
  const [geofenceActive, setGeofenceActive] = useState(false);

  const filteredPlaces = DESTS.filter((d) => {
    if (activeFilter === "all") return true;
    return d.f === activeFilter;
  });

  const handleAsk = (query: string) => {
    setAskInput(query);
    setIsAsking(true);
    setTimeout(() => {
      const res = buildPramaanAnswer({
        question: query,
        lang: "en",
        siteSlug: query.toLowerCase().includes("amer") ? "amer-fort" : undefined,
      });
      setAskResult(res);
      setIsAsking(false);
    }, 250);
  };

  const currentHeroDest = DESTS[activeDestIdx % DESTS.length];

  return (
    <div className="space-y-24 pb-20">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (EDITORIAL COLLAGE STYLE FROM SCREENSHOT 1)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#C85A32]">
                EXPLORE A MORE MEANINGFUL WAY
              </span>
            </div>

            <h1 className="editorial-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-[#1C1917]">
              A Deeper <br />
              <span className="italic font-serif font-normal text-stone-700">Way to</span> <br />
              Travel
            </h1>

            <p className="text-lg text-stone-600 max-w-md leading-relaxed font-normal">
              Small groups. Meaningful places. A brighter tomorrow. Experience India with verified cultural integrity, primary sources, and zero AI hallucinations.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a href="#destinations" className="btn-editorial-primary">
                Explore All Destinations →
              </a>
              <a href="#pramaan" className="btn-editorial-outline">
                Ask Pramaan with Proof
              </a>
            </div>

            {/* Slide / Counter Indicator */}
            <div className="pt-8 flex items-center gap-6 text-xs tracking-[0.16em] uppercase text-stone-500 font-semibold border-t border-[#E5DECE]">
              <span className="text-[#C85A32] font-bold">
                {String((activeDestIdx % DESTS.length) + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-stone-300" />
              <span>{String(DESTS.length).padStart(2, "0")} CULTURAL SANCTUARIES</span>
              <div className="flex gap-1 ml-auto">
                <button
                  type="button"
                  aria-label="Previous destination"
                  onClick={() => setActiveDestIdx((i) => (i === 0 ? DESTS.length - 1 : i - 1))}
                  className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-900 hover:text-white transition"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next destination"
                  onClick={() => setActiveDestIdx((i) => (i + 1) % DESTS.length)}
                  className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-900 hover:text-white transition"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right Layered Torn-Paper Collage Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-[#E5DECE] bg-[#F5EFE6]">
              {/* Main Photo Background */}
              <div className="absolute inset-0 bg-stone-900">
                <img
                  src={`/images/destinations/${currentHeroDest.s}.jpg`}
                  alt={currentHeroDest.n}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = HERO_IMG;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Decorative Terracotta Sun Disc */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-[#C85A32] shadow-lg flex items-center justify-center text-white/90 text-center p-2 opacity-95 pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-widest leading-tight">
                  UNESCO <br /> CITED
                </span>
              </div>

              {/* Torn Paper Layer Effect (CSS polygon layer) */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 bg-[#FAF7F2] p-6 flex flex-col justify-end"
                style={{
                  clipPath: "polygon(0 25%, 15% 15%, 35% 28%, 55% 12%, 75% 22%, 100% 5%, 100% 100%, 0 100%)",
                }}
              >
                <div className="pt-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#C85A32] block">
                    {currentHeroDest.p}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="editorial-heading text-2xl font-bold text-[#1C1917]">
                      {currentHeroDest.n}
                    </h3>
                    <Link
                      href={`/destinations/${currentHeroDest.s}`}
                      className="btn-circle !w-10 !h-10"
                      title="View Destination"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Cursive Handwriting Badge */}
              <div className="absolute top-1/3 left-6 text-white drop-shadow-lg -rotate-6 pointer-events-none">
                <span className="script-accent text-3xl sm:text-4xl text-[#FDE68A]">
                  More Than A Destination
                </span>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute bottom-44 left-6 bg-white/90 backdrop-blur-md border border-stone-200 rounded-2xl p-3.5 shadow-xl max-w-[240px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">
                    Pramaan Verified
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {currentHeroDest.b}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Strip under Hero */}
        <div className="mt-16 pt-8 border-t border-[#E5DECE] grid grid-cols-2 md:grid-cols-4 gap-6 text-xs uppercase tracking-[0.14em] text-stone-600">
          <div className="flex items-center gap-3">
            <span className="text-[#C85A32] text-lg">✦</span>
            <div>
              <strong className="block text-stone-900">Pramaan Ledger</strong>
              <span className="text-stone-500 text-[10px]">100% Cited Sources</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#C85A32] text-lg">✦</span>
            <div>
              <strong className="block text-stone-900">Sanskar Cards</strong>
              <span className="text-stone-500 text-[10px]">Threshold Etiquette</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#C85A32] text-lg">✦</span>
            <div>
              <strong className="block text-stone-900">Network Honest</strong>
              <span className="text-stone-500 text-[10px]">On-device Offline PWA</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#C85A32] text-lg">✦</span>
            <div>
              <strong className="block text-stone-900">National 112</strong>
              <span className="text-stone-500 text-[10px]">GPS Coordinate SOS</span>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. POPULAR DESTINATIONS: "PLACES THAT INSPIRE" (SCREENSHOT 1)
         ───────────────────────────────────────────────────────────── */}
      <section id="destinations" className="space-y-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C85A32] block mb-2">
              POPULAR DESTINATIONS
            </span>
            <h2 className="editorial-heading text-4xl sm:text-5xl font-bold text-[#1C1917]">
              Places That Inspire
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Carefully curated journeys to extraordinary cultural sanctuaries across India.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: "all", label: "All Destinations" },
            { id: "royal", label: "Royal Forts & Palaces" },
            { id: "classic", label: "Spiritual & Classical" },
            { id: "bold", label: "Living Landscapes & Ruins" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
                activeFilter === f.id
                  ? "bg-[#1C1917] text-white"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-stone-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 4-Column Editorial Cards Grid (Matching Screenshot 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {filteredPlaces.slice(0, 8).map((dest) => (
            <article
              key={dest.s}
              className="group bg-white rounded-[24px] border border-[#E5DECE] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-stone-400 transition-all duration-300"
            >
              <div>
                {/* Image Aspect ratio card */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={`/images/destinations/${dest.s}.jpg`}
                    alt={dest.n}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full text-stone-800">
                    {dest.f}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C85A32] block">
                    {dest.p.split(",")[1]?.trim() || dest.p}
                  </span>
                  <h3 className="editorial-heading text-xl font-bold text-[#1C1917] group-hover:text-[#C85A32] transition-colors">
                    {dest.n}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dest.b}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-stone-500">
                    <span className="bg-[#FAF7F2] border border-[#E5DECE] px-2 py-0.5 rounded-md">
                      🍲 {dest.dish.split(",")[0]}
                    </span>
                    <span className="bg-[#FAF7F2] border border-[#E5DECE] px-2 py-0.5 rounded-md">
                      👘 {dest.dress.split(",")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-[#F5EFE6] mt-4">
                <span className="text-xs text-stone-500 font-medium">Explore heritage</span>
                <Link
                  href={`/destinations/${dest.s}`}
                  className="btn-circle !w-9 !h-9"
                  aria-label={`View ${dest.n}`}
                >
                  →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Drawer Link */}
        <div className="text-center pt-6">
          <Link
            href="/destinations/amer-jaipur"
            className="btn-editorial-outline inline-flex"
          >
            Explore Complete Jaipur Trip Pack (All Sites & Geofences) →
          </Link>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. PRAMAAN CLAIM LEDGER & INTERACTIVE Q&A (THE CORE DIFFERENTIATOR)
         ───────────────────────────────────────────────────────────── */}
      <section id="pramaan" className="bg-white rounded-[32px] border border-[#E5DECE] p-8 sm:p-12 shadow-sm space-y-8 scroll-mt-20">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C85A32] block">
            THE PRAMAAN ENGINE
          </span>
          <h2 className="editorial-heading text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Ask with Verified Proof. <br />
            <span className="font-serif italic font-normal text-stone-600">
              Unknown is a valid answer.
            </span>
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Unlike commercial LLMs that fabricate hotel recommendations or invent train routes, Pramaan validates every statement against primary UNESCO dossiers and Archaeological Survey records.
          </p>
        </div>

        {/* Preset Question Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
            Test a sample question:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleAsk(q)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition text-left ${
                  askInput === q
                    ? "bg-[#1C1917] text-white border-[#1C1917]"
                    : "bg-[#FAF7F2] text-stone-700 border-stone-300 hover:border-stone-500"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Query Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk(askInput)}
            placeholder="Ask about Jaipur history, UNESCO facts, or temple customs..."
            className="field flex-1 rounded-2xl px-4 py-3 text-sm border-stone-300 focus:border-[#C85A32]"
          />
          <button
            type="button"
            onClick={() => handleAsk(askInput)}
            disabled={isAsking}
            className="btn-editorial-primary justify-center"
          >
            {isAsking ? "Checking..." : "Verify Claim →"}
          </button>
        </div>

        {/* Claim Ledger Output */}
        {askResult && (
          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Claim Ledger Output
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    askResult.abstained
                      ? "bg-stone-200 text-stone-700"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {askResult.abstained ? "ABSTAINED (HONEST UNKNOWN)" : "PRAMAAN VERIFIED"}
                </span>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                Engine: {askResult.engine}
              </span>
            </div>

            {/* Sentence by sentence breakdown */}
            <div className="space-y-3">
              {askResult.segments.map((seg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-sm leading-relaxed ${
                    seg.status === "verified"
                      ? "claim-verified"
                      : seg.status === "inferred"
                      ? "claim-inferred"
                      : "claim-unknown"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black/5">
                      {seg.status}
                    </span>
                    {seg.sourceIds && seg.sourceIds.length > 0 && (
                      <span className="text-[11px] font-semibold opacity-80">
                        Citation: {seg.sourceIds.join(", ")}
                      </span>
                    )}
                  </div>
                  <p>{seg.text}</p>
                  {seg.reason && (
                    <p className="mt-1 text-xs opacity-75 italic">
                      Note: {seg.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Sources List */}
            {askResult.sources && askResult.sources.length > 0 && (
              <div className="pt-3 border-t border-stone-200 space-y-1">
                <span className="text-xs font-semibold uppercase text-stone-600 block">
                  CITED PRIMARY EVIDENCE:
                </span>
                <ul className="text-xs space-y-1 text-stone-600">
                  {askResult.sources.map((src) => (
                    <li key={src.code} className="flex items-baseline gap-2">
                      <span className="text-[#C85A32] font-semibold">[{src.code}]</span>
                      <span>
                        <strong>{src.title}</strong> — {src.publisher}
                        {src.verifiedAt && ` (Verified: ${src.verifiedAt})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. SANSKAR CARDS: THRESHOLD ETIQUETTE FOR SACRED PLACES
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C85A32] block mb-2">
              SANSKAR THRESHOLD CARDS
            </span>
            <h2 className="editorial-heading text-4xl sm:text-5xl font-bold text-[#1C1917]">
              Respect Before Entry
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGeofenceActive((v) => !v)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
                geofenceActive
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-stone-800 border border-stone-300 hover:border-stone-500"
              }`}
            >
              {geofenceActive ? "✓ Geofence Triggered (~150m)" : "Simulate Geofence"}
            </button>
            <Link href="/sites/amer-fort" className="btn-circle !w-10 !h-10" title="All Site Cards">
              →
            </Link>
          </div>
        </div>

        {/* 6 Key Etiquette Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Footwear Rules",
              field: "footwear",
              rule: "Remove leather shoes and belts before crossing the threshold. Clean socks are permitted in designated winter marble paths.",
              status: "Verified",
              source: "ASI Heritage Manual",
            },
            {
              title: "Head Covering",
              field: "head_covering",
              rule: "Cover your head with a clean scarf, handkerchief, or chunni. Caps and hats are discouraged inside prayer halls.",
              status: "Verified",
              source: "Shrine Trust Protocol",
            },
            {
              title: "Photography Norms",
              field: "photography",
              rule: "Exterior courtyards permitted. Photography strictly forbidden inside inner sanctums and during daily aarti rituals.",
              status: "Verified",
              source: "Site Archaeological Order",
            },
            {
              title: "Gendered Access",
              field: "gendered_access",
              rule: "Specific sections maintain separate queues or seating areas during congregational prayer times.",
              status: "Verified",
              source: "Local Board Bylaws",
            },
            {
              title: "Non-Adherent Entry",
              field: "non_adherent_entry",
              rule: "Respectful entry permitted up to the second courtyard. Inner sanctum restricted to active worship practitioners.",
              status: "Unverified",
              source: "Community Custodian Practice",
            },
            {
              title: "Quiet Hours & Chanting",
              field: "quiet_hours",
              rule: "Maintain total silence during morning and twilight aarti bells. Mobile devices must remain powered off.",
              status: "Verified",
              source: "Heritage Trust Advisory",
            },
          ].map((item) => (
            <div
              key={item.field}
              className="bg-white rounded-[24px] border border-[#E5DECE] p-6 space-y-3 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="editorial-heading text-lg font-bold text-[#1C1917]">
                    {item.title}
                  </h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.status === "Verified" ? "pill-jade" : "pill-sand"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {item.rule}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Source: {item.source}</span>
                <span className="text-[#C85A32] font-semibold">Pramaan</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          5. NUMBERED PILLARS (EDITORIAL SYSTEM FROM SCREENSHOT 2)
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8 pt-8">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C85A32] block mb-2">
            WHY YATRASATHI MATTERS
          </span>
          <h2 className="editorial-heading text-4xl sm:text-5xl font-bold text-[#1C1917]">
            Integrity Over Algorithms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="bg-white rounded-[24px] border border-[#E5DECE] p-6 flex flex-col justify-between hover:shadow-lg transition space-y-6"
            >
              <div className="space-y-4">
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#C85A32] block">
                  {p.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 block">
                  {p.tag}
                </span>
                <h3 className="editorial-heading text-xl font-bold text-[#1C1917]">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={p.href}
                  className="text-xs font-bold text-[#1C1917] hover:text-[#C85A32] transition inline-flex items-center gap-1"
                >
                  {p.action} →
                </Link>
                <Link href={p.href} className="btn-circle !w-8 !h-8 text-xs">
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          6. ARENA MODE & HALLUCINATION CHECK (SIDE-BY-SIDE PROOF)
         ───────────────────────────────────────────────────────────── */}
      <section className="rounded-[32px] bg-[#1C1917] text-white p-8 sm:p-12 space-y-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 block">
            ARENA BENCHMARK
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold">
            The Hallucination Problem in Travel
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            Generic AI travel chatbots regularly invent monument hours, fabricate ratings, and erase local nuances. See how Pramaan handles the exact same query:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plain AI Tourist Guide (Unverified) */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Standard AI Guide (Ungrounded)
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300">
                HALLUCINATED
              </span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              &quot;Amer Fort is a 5-star destination with 24-hour entry. Be sure to dine at the royal palace cafe directly inside the mirror palace, and book camel rides with any guide at the gate.&quot;
            </p>
            <div className="text-[11px] text-rose-400/80 pt-2 border-t border-rose-500/20">
              ⚠️ Inaccurate timings, invented cafe location, and unvetted commercial advice.
            </div>
          </div>

          {/* Pramaan Answer */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                YatraSathi Pramaan
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300">
                CITED EVIDENCE
              </span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              &quot;Amer Fort was inscribed as a UNESCO World Heritage Site in 2013 under the serial nomination &apos;Hill Forts of Rajasthan&apos; (Criterion ii &amp; iii). Monument timings are strictly regulated by ASI from 08:00 to 17:30. Commercial dining inside Sheesh Mahal is prohibited.&quot;
            </p>
            <div className="text-[11px] text-emerald-300/80 pt-2 border-t border-emerald-500/20">
              ✓ Cited to UNESCO Dossier #247 &amp; ASI Notification.
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 font-semibold text-xs hover:bg-stone-200 transition"
          >
            Launch Full Interactive Arena Demo →
          </Link>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          7. TRIP READINESS & OFFLINE "PACK & GO"
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5EFE6] rounded-[32px] border border-[#E5DECE] p-8 sm:p-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C85A32] block">
              OFFLINE PWA READINESS
            </span>
            <h2 className="editorial-heading text-3xl font-bold text-[#1C1917]">
              Going Off the Grid? Pack Your Knowledge.
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Download the entire Jaipur knowledge pack (vector coordinates, etiquette cards, offline retrieval worker, and verified facts) directly into your browser storage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pack-and-go"
              className="btn-editorial-primary justify-center text-center"
            >
              Pack &amp; Go (Offline) →
            </Link>
            <Link
              href="/just-landed"
              className="btn-editorial-outline justify-center text-center"
            >
              Just Landed Plan
            </Link>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          8. SOS EMERGENCY BAR
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-rose-50 border border-rose-200 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-rose-700 font-bold text-sm tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            NATIONAL EMERGENCY ASSISTANCE (112)
          </div>
          <p className="text-xs text-rose-900/80 max-w-lg">
            Immediate dialer for police, fire, and medical dispatch across India. YatraSathi provides on-device GPS coordinates so you can read your exact position to emergency operators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:112"
            className="px-6 py-3 rounded-full bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition shadow-lg shadow-rose-600/20"
          >
            Call 112 Now
          </a>
          <Link
            href="/sos"
            className="px-5 py-3 rounded-full bg-white text-rose-900 border border-rose-200 font-medium text-xs hover:bg-rose-100 transition"
          >
            View GPS &amp; Overpass Clinics
          </Link>
        </div>
      </section>
    </div>
  );
}
