"use client";

import { useVisitStore } from "@/lib/store/useVisitStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

export default function HistoryPage() {
  const visits = useVisitStore((s) => s.visits);
  const visitedCountryCodes = Array.from(new Set(visits.map((v) => v.countryCode)));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4">
        <h2 className="font-semibold mb-2">訪問済み国 ({visitedCountryCodes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {visitedCountryCodes.map((code) => (
            <span key={code} className="rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 text-sm">
              {COUNTRY_BY_CODE[code]?.nameJa ?? code}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">訪問都市の記録</h2>
        {visits.map((v) => (
          <div key={v.id} className="rounded-xl border border-black/10 dark:border-white/15 p-4 flex justify-between">
            <div>
              <p className="font-medium">{v.city}({COUNTRY_BY_CODE[v.countryCode]?.nameJa})</p>
              <p className="text-xs text-black/40">
                {v.arrivalDate} 〜 {v.departureDate ?? "滞在中"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
