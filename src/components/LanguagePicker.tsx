"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { LANGUAGES, type Lang } from "@/data/languages";
import { useApp } from "@/hooks/useClient";

export function LanguagePicker() {
  const { lang, setLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((row) => row.code === lang) || LANGUAGES[0];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LANGUAGES.filter(
      (row) =>
        !q ||
        row.code.includes(q) ||
        row.name.toLowerCase().includes(q) ||
        row.native.toLowerCase().includes(q),
    );
  }, [query]);
  const india = filtered.filter((row) => row.region === "india");
  const world = filtered.filter((row) => row.region === "world");

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#E5DECE] bg-white text-[#1C1917] hover:border-[#C85A32] hover:text-[#C85A32] transition shadow-xs"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
        <span className="font-medium">{current.native}</span>
        <span className="text-[10px] text-stone-500">· {t("chooseLanguage")}</span>
        <svg
          className={`w-3 h-3 text-stone-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <div className="absolute end-0 z-50 mt-2 w-80 max-w-[92vw] rounded-2xl border border-[#E5DECE] bg-white p-3.5 shadow-2xl shadow-stone-900/15 backdrop-blur-md">
          <div className="relative mb-2.5">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchLanguage")}
              className="w-full bg-[#FAF7F2] border border-[#E5DECE] text-[#1C1917] placeholder:text-stone-400 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C85A32] focus:ring-2 focus:ring-[#C85A32]/10 transition"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-[#F2ECE1] pr-1">
            <Group
              title={t("indiaGroup")}
              rows={india}
              current={lang}
              onPick={(code) => {
                setLang(code);
                setOpen(false);
                setQuery("");
              }}
            />
            <Group
              title={t("worldGroup")}
              rows={world}
              current={lang}
              onPick={(code) => {
                setLang(code);
                setOpen(false);
                setQuery("");
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Group({
  title,
  rows,
  current,
  onPick,
}: {
  title: string;
  rows: typeof LANGUAGES;
  current: Lang;
  onPick: (code: Lang) => void;
}) {
  if (!rows.length) return null;
  return (
    <div className="py-2.5 first:pt-0 last:pb-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500 px-2 py-1">
        {title}
      </p>
      <ul className="mt-1 space-y-0.5">
        {rows.map((row) => {
          const isSelected = row.code === current;
          return (
            <li key={row.code}>
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs transition-colors ${
                  isSelected
                    ? "bg-[#F6ECE6] text-[#C85A32] font-semibold border border-[#C85A32]/25 shadow-2xs"
                    : "text-[#1C1917] hover:bg-[#FAF7F2] hover:text-[#C85A32]"
                }`}
                onClick={() => onPick(row.code)}
              >
                <span className="font-medium text-xs text-[#1C1917]">{row.native}</span>
                <span className={`text-[11px] ${isSelected ? "text-[#C85A32] font-medium" : "text-stone-500"}`}>
                  {row.name} ({row.code.toUpperCase()})
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
