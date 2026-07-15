"use client";

import { useMemo, useState } from "react";
import { X, ExternalLink, Check } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { useVisitedCountriesStore } from "@/lib/store/useVisitedCountriesStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";
import { findNeighborRoutes } from "@/lib/mock/neighborRoutes";
import { CurrencyConverter } from "./CurrencyConverter";
import { NeighborMoves } from "./NeighborMoves";
import { RouteSearch } from "./RouteSearch";
import { useNotesStore } from "@/lib/store/useNotesStore";

const TABS = ["概要", "通貨", "隣国移動", "ルート検索", "写真", "メモ"] as const;
type Tab = (typeof TABS)[number];

export function CountryPanel() {
  const selectedCountryCode = useAppStore((s) => s.selectedCountryCode);
  const currentCountryCode = useAppStore((s) => s.currentCountryCode);
  const selectCountry = useAppStore((s) => s.selectCountry);
  const [tab, setTab] = useState<Tab>("概要");
  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);
  const [draft, setDraft] = useState("");
  const isVisited = useVisitedCountriesStore((s) => s.isVisited);
  const toggleVisited = useVisitedCountriesStore((s) => s.toggleVisited);

  const country = selectedCountryCode ? COUNTRY_BY_CODE[selectedCountryCode] : null;
  const neighborRoutes = useMemo(
    () => (country ? findNeighborRoutes(currentCountryCode, country.code) : null),
    [country, currentCountryCode]
  );
  const countryNotes = notes.filter((n) => n.countryCode === selectedCountryCode);

  if (!country) return null;

  return (
    <div
      className="
        fixed z-30 bg-white dark:bg-neutral-900 shadow-2xl
        inset-x-0 bottom-0 rounded-t-2xl max-h-[75vh]
        md:top-16 md:bottom-0 md:right-0 md:left-auto md:w-[400px] md:rounded-none md:max-h-none
        flex flex-col
      "
    >
      <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 gap-2">
        <h2 className="text-lg font-bold flex-1">{country.nameJa}</h2>
        <button
          onClick={() => toggleVisited(country.code)}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border ${
            isVisited(country.code)
              ? "bg-amber-500 border-amber-500 text-white"
              : "border-black/20 dark:border-white/20 text-black/50 dark:text-white/50"
          }`}
        >
          <Check size={14} />
          {isVisited(country.code) ? "訪問済み" : "訪問済みにする"}
        </button>
        <button onClick={() => selectCountry(null)} aria-label="閉じる">
          <X />
        </button>
      </div>

      <div className="flex overflow-x-auto border-b border-black/10 dark:border-white/10 shrink-0">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm whitespace-nowrap border-b-2 ${
              tab === t
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-black/50 dark:text-white/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-4 overflow-y-auto flex-1 space-y-3 text-sm">
        {tab === "概要" && (
          <div className="space-y-2">
            <Row label="首都" value={country.capital} />
            <Row label="言語" value={country.language} />
            <Row label="タイムゾーン" value={country.timezone} />
            <Row label="電源プラグ" value={country.plugType} />
            <Row label="治安レベル" value={`${country.safetyLevel} / 4`} />
            <Row label="宿(1泊)の目安" value={`¥${country.priceSenseJPY.hotel.toLocaleString()}`} />
            <Row label="食事(1食)の目安" value={`¥${country.priceSenseJPY.food.toLocaleString()}`} />
            <Row label="観光地入場料の目安" value={`¥${country.priceSenseJPY.sightseeing.toLocaleString()}`} />
            <Row
              label="ビザ(日本人)"
              value={
                { unnecessary: "不要", eta: "ETA", "e-visa": "電子ビザ", voa: "到着ビザ", visa_required: "通常ビザ" }[
                  country.visaForJapanese
                ]
              }
            />
            <Row label="最大滞在" value={`${country.visaDetail.maxStayDays}日`} />
            <p className="text-xs text-black/50 dark:text-white/50">{country.visaDetail.notes}</p>
          </div>
        )}

        {tab === "通貨" && <CurrencyConverter currencyCode={country.currency.code} />}

        {tab === "隣国移動" && (
          <>
            <p className="text-xs text-black/50 dark:text-white/50">
              現在地({COUNTRY_BY_CODE[currentCountryCode]?.nameJa}) → {country.nameJa}
            </p>
            <NeighborMoves routes={neighborRoutes} />
          </>
        )}

        {tab === "ルート検索" && <RouteSearch />}

        {tab === "写真" && (
          <a
            href="https://photos.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-black/5 dark:bg-white/10 py-3 font-medium"
          >
            Google Photosを開く <ExternalLink size={16} />
          </a>
        )}

        {tab === "メモ" && (
          <div className="space-y-3">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="この国についてのメモ(Markdown対応)"
              className="w-full h-24 rounded-lg border border-black/10 dark:border-white/20 bg-transparent p-2 text-sm"
            />
            <button
              onClick={() => {
                if (!draft.trim()) return;
                addNote({
                  title: `${country.nameJa}のメモ`,
                  bodyMarkdown: draft,
                  images: [],
                  tags: [],
                  countryCode: country.code,
                });
                setDraft("");
              }}
              className="rounded-lg bg-blue-600 text-white px-4 py-1.5 text-sm"
            >
              保存
            </button>
            <div className="space-y-2">
              {countryNotes.map((n) => (
                <div key={n.id} className="rounded-lg border border-black/10 dark:border-white/15 p-2">
                  <p className="whitespace-pre-wrap">{n.bodyMarkdown}</p>
                  <p className="text-xs text-black/40 mt-1">{new Date(n.createdAt).toLocaleString("ja-JP")}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-black/50 dark:text-white/50">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
