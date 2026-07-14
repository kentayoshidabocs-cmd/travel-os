"use client";

import { usePassportStore } from "@/lib/store/usePassportStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function PassportPage() {
  const entries = usePassportStore((s) => s.entries);

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {entries.map((e) => {
        const remaining = daysUntil(e.visaExpiryDate);
        const alert = remaining <= 7;
        return (
          <div
            key={e.id}
            className={`rounded-xl border p-4 space-y-1 ${
              alert
                ? "border-red-400 bg-red-50 dark:bg-red-950"
                : "border-black/10 dark:border-white/15"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{COUNTRY_BY_CODE[e.countryCode]?.nameJa}</span>
              {alert && <span className="text-xs text-red-600 font-bold">⚠️ 期限間近</span>}
            </div>
            <p className="text-sm">滞在開始: {e.entryDate}</p>
            <p className="text-sm">滞在終了予定: {e.plannedExitDate}</p>
            <p className="text-sm">ビザ期限: {e.visaExpiryDate}({remaining >= 0 ? `残り${remaining}日` : "期限切れ"})</p>
          </div>
        );
      })}
    </div>
  );
}
