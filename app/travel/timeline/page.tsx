"use client";

import { useVisitStore } from "@/lib/store/useVisitStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

export default function TimelinePage() {
  const visits = useVisitStore((s) => s.visits);
  const sorted = [...visits].sort((a, b) => a.arrivalDate.localeCompare(b.arrivalDate));

  return (
    <div className="max-w-2xl mx-auto">
      <ol className="relative border-l border-black/10 dark:border-white/15 ml-3 space-y-6">
        {sorted.map((v) => (
          <li key={v.id} className="ml-4">
            <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] mt-1.5 border-2 border-white dark:border-neutral-900" />
            <p className="text-xs text-black/40">{v.arrivalDate} 〜 {v.departureDate ?? "滞在中"}</p>
            <p className="font-semibold">{v.city}({COUNTRY_BY_CODE[v.countryCode]?.nameJa})</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
