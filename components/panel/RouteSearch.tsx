"use client";

import { useState } from "react";
import { RouteSearchOption } from "@/types";

// v1モック: 本番ではsearchRoute Cloud Function(Rome2Rio/OSRM/航空券APIを集約)を叩く
function mockSearch(from: string, to: string): RouteSearchOption[] {
  if (!from || !to) return [];
  return [
    { mode: "flight", provider: "AirAsia", costUSD: 65, durationHours: 1.5, transfers: 0 },
    { mode: "bus", provider: "国際バス各社", costUSD: 18, durationHours: 9, transfers: 0 },
    { mode: "train", provider: "State Railway", costUSD: 12, durationHours: 12, transfers: 1 },
  ];
}

export function RouteSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState<RouteSearchOption[] | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          placeholder="出発都市"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="flex-1 rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm"
        />
        <input
          placeholder="目的都市"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="flex-1 rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <button
        onClick={() => setResults(mockSearch(from, to))}
        className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium"
      >
        ルート検索
      </button>
      <p className="text-xs text-black/40 dark:text-white/40">
        v1はモック結果です。将来Rome2Rio/OSRM/航空券APIを統合します(設計書5章)。
      </p>
      {results && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex justify-between rounded-lg border border-black/10 dark:border-white/15 p-2 text-sm">
              <span>{r.mode === "flight" ? "✈️" : r.mode === "bus" ? "🚌" : "🚆"} {r.provider}</span>
              <span>${r.costUSD} / {r.durationHours}h / 乗換{r.transfers}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
