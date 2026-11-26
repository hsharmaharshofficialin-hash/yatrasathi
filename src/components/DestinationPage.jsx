"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HISTORY } from "@/data/destination-history";
import { DETAILS } from "@/data/destination-details";
import DestinationFeatures from "@/components/DestinationFeatures";

export default function DestinationPage({ dest }) {
  const [activeTab, setActiveTab] = useState("history");
  const img = `/images/destinations/${dest.s}.jpg`;

  const facts = [
    { title: "Authentic Cuisine", desc: dest.dish, icon: "🍲" },
    { title: "Traditional Attire", desc: dest.dress, icon: "👘" },
    { title: "Living Culture & Adab", desc: dest.cul, icon: "🎭" },
  ];

  const historyList = HISTORY[dest.s] || [];
  const hasDetails = Boolean(DETAILS[dest.s]);

  return (
    <div className="space-y-12 pb-16">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#C85A32] transition"
        >
          ← Back to All Destinations
        </Link>
        <span className="editorial-pill">{dest.f.toUpperCase()} COLLECTION</span>
      </div>

      {/* Hero Editorial Showcase */}
      <section className="relative rounded-[32px] overflow-hidden border border-[#E5DECE] bg-[#1C1917] text-white shadow-xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[360px] overflow-hidden">
          <img
            src={img}
            alt={dest.n}
            className="w-full h-full object-cover object-center opacity-80"
            onError={(e) => {
              e.currentTarget.src = "/images/hero-jaipur.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-black/30 to-black/20" />

          {/* Floating UNESCO / Citation badge */}
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-stone-900 border border-stone-200 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-lg">
            PRAMAAN VERIFIED
          </div>

          {/* Cursive Handwriting script */}
          <div className="absolute top-8 left-8 text-[#FDE68A] drop-shadow-md pointer-events-none">
            <span className="script-accent text-3xl sm:text-4xl">More Than A Destination</span>
          </div>

          {/* Hero Bottom Banner */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#FDBA74] block">
              {dest.p}
            </span>
            <h1 className="editorial-heading text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-none">
              {dest.n}
            </h1>
            <p className="text-sm sm:text-base text-stone-200 max-w-2xl leading-relaxed">
              {dest.b}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Cultural Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-[24px] border border-[#E5DECE] p-6 space-y-2 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{f.icon}</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#C85A32]">
                {f.title}
              </h3>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed font-medium">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5DECE] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
            activeTab === "history"
              ? "bg-[#1C1917] text-white"
              : "bg-white text-stone-700 border border-stone-200 hover:border-stone-400"
          }`}
        >
          History &amp; Heritage
        </button>
        {hasDetails && (
          <button
            type="button"
            onClick={() => setActiveTab("explore")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
              activeTab === "explore"
                ? "bg-[#1C1917] text-white"
                : "bg-white text-stone-700 border border-stone-200 hover:border-stone-400"
            }`}
          >
            Eat, Wear &amp; Culture
          </button>
        )}
        <button
          type="button"
          onClick={() => setActiveTab("toolkit")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
            activeTab === "toolkit"
              ? "bg-[#1C1917] text-white"
              : "bg-white text-stone-700 border border-stone-200 hover:border-stone-400"
          }`}
        >
          Travel Tools &amp; Navigation
        </button>
      </div>

      {/* Tab: History & Heritage */}
      {activeTab === "history" && (
        <section className="space-y-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C85A32] block mb-1">
              CHRONICLES &amp; ARCHIVES
            </span>
            <h2 className="editorial-heading text-3xl font-bold text-[#1C1917]">
              Historical Foundations
            </h2>
          </div>

          {historyList.length > 0 ? (
            <div className="space-y-6">
              {historyList.map((h) => (
                <article
                  key={h.name}
                  className="bg-white rounded-[24px] border border-[#E5DECE] p-6 sm:p-8 space-y-4 shadow-sm"
                >
                  <h3 className="editorial-heading text-2xl font-bold text-[#1C1917]">
                    {h.name}
                  </h3>
                  {h.intro && (
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {h.intro}
                    </p>
                  )}
                  {h.history && (
                    <div className="pt-2 border-t border-stone-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1">
                        Historical Context
                      </h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {h.history}
                      </p>
                    </div>
                  )}
                  {h.about && (
                    <div className="pt-2 border-t border-stone-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1">
                        Architectural &amp; Cultural Significance
                      </h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {h.about}
                      </p>
                    </div>
                  )}
                  {h.url && (
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span>Primary Documentation: Archival Archive</span>
                      <a
                        href={h.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C85A32] hover:underline font-medium"
                      >
                        Read Documentation →
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[24px] border border-[#E5DECE] p-8 text-center text-sm text-stone-600">
              <p>Historical archive dossier for {dest.n} is currently cited in the knowledge pack.</p>
              <Link href={`/ask?city=${dest.s}`} className="btn-editorial-primary mt-4 inline-flex">
                Ask Pramaan Engine about {dest.n} →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab: Detail Tabs (Eat, Wear, Culture) */}
      {activeTab === "explore" && hasDetails && (
        <DetailTabs dest={dest} />
      )}

      {/* Tab: Travel Tools & Amenities */}
      {activeTab === "toolkit" && (
        <DestinationFeatures />
      )}

      {/* Action Footer Bar */}
      <div className="rounded-[28px] bg-[#F5EFE6] border border-[#E5DECE] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="editorial-heading text-xl font-bold text-[#1C1917]">
            Ready to experience {dest.n}?
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Build your day-by-day plan or ask the Pramaan engine for verified citations.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/itinerary" className="btn-editorial-primary !py-2.5">
            Plan Itinerary →
          </Link>
          <Link href={`/ask?city=${dest.s}`} className="btn-editorial-outline !py-2.5">
            Ask Pramaan
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailTabs({ dest }) {
  const details = DETAILS[dest.s] || {};
  const [tab, setTab] = useState("eat");
  const [manifest, setManifest] = useState({});
  const [bad, setBad] = useState({});

  useEffect(() => {
    let off = false;
    fetch("/images/destinations/photo-manifest.json")
      .then((r) => (r.ok ? r.json() : {}))
      .then((m) => {
        if (!off) setManifest(m || {});
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  const tabs = [
    ["eat", "Culinary Delights", "🍲"],
    ["wear", "Traditional Attire", "👘"],
    ["culture", "Heritage & Arts", "🎭"],
  ];

  const currentItems = details[tab] || [];

  return (
    <section className="space-y-6">
      <div className="flex gap-2">
        {tabs.map(([k, label, ic]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition ${
              tab === k
                ? "bg-[#1C1917] text-white"
                : "bg-white text-stone-700 border border-stone-200 hover:border-stone-400"
            }`}
          >
            {ic} {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((it) => {
          const key = dest.s + "/" + tab + "/" + it.id;
          const show = manifest[key] === true && !bad[key];
          return (
            <div
              key={it.id}
              className="bg-white rounded-[24px] border border-[#E5DECE] overflow-hidden p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                {show ? (
                  <img
                    className="w-full aspect-[4/3] object-cover rounded-xl mb-3"
                    src={"/images/destinations/" + key + ".jpg"}
                    alt={it.name}
                    loading="lazy"
                    onError={() => setBad((b) => ({ ...b, [key]: true }))}
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-[#F5EFE6] rounded-xl flex items-center justify-center text-4xl mb-3">
                    {tabs.find((t) => t[0] === tab)?.[2]}
                  </div>
                )}
                <h4 className="editorial-heading text-lg font-bold text-[#1C1917]">
                  {it.name}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {it.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
