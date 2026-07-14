"use client";

import { useState } from "react";
import { JPY_TO_LOCAL } from "@/lib/mock/fxRates";

export function CurrencyConverter({ currencyCode }: { currencyCode: string }) {
  const rate = JPY_TO_LOCAL[currencyCode] ?? 1;
  const [jpy, setJpy] = useState("1000");
  const [local, setLocal] = useState((Number("1000") * rate).toFixed(2));

  function onJpyChange(v: string) {
    setJpy(v);
    const n = Number(v);
    setLocal(Number.isFinite(n) ? (n * rate).toFixed(2) : "");
  }
  function onLocalChange(v: string) {
    setLocal(v);
    const n = Number(v);
    setJpy(Number.isFinite(n) ? (n / rate).toFixed(0) : "");
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-black/50 dark:text-white/50">
        1 JPY ≈ {rate} {currencyCode}(モック値。実装時はリアルタイム取得に置換)
      </div>
      <div className="flex items-center gap-2">
        <span className="w-14 text-sm">JPY</span>
        <input
          value={jpy}
          onChange={(e) => onJpyChange(e.target.value)}
          inputMode="decimal"
          className="flex-1 rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-14 text-sm">{currencyCode}</span>
        <input
          value={local}
          onChange={(e) => onLocalChange(e.target.value)}
          inputMode="decimal"
          className="flex-1 rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
        />
      </div>
    </div>
  );
}
