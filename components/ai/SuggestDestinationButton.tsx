"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { DestinationSuggestion } from "@/types";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

// v1モック: 本番ではsuggestNextDestination Cloud Function(Claude API)を呼び出す(設計書5章)
const MOCK_SUGGESTIONS: DestinationSuggestion[] = [
  {
    countryCode: "LAO",
    city: "ルアンパバーン",
    score: 92,
    reasons: [
      "現在地から陸路6時間程度で到達可能",
      "未訪問国かつ物価が現在地より安い",
      "ビザは到着ビザで即日取得可能",
      "直近の治安情報に大きな変化なし",
    ],
  },
  {
    countryCode: "VNM",
    city: "ハノイ",
    score: 78,
    reasons: ["ビザ免除で移動しやすい", "航空券価格が過去1週間で下落傾向", "雨季入り前の気候が安定"],
  },
];

export function SuggestDestinationButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full
          bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 shadow-lg font-medium"
      >
        <Sparkles size={18} /> 次の目的地を提案
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
          <div className="w-full md:w-[420px] max-h-[80vh] overflow-y-auto rounded-t-2xl md:rounded-2xl bg-white dark:bg-neutral-900 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="text-blue-600" /> 次の目的地候補
              </h2>
              <button onClick={() => setOpen(false)} aria-label="閉じる">
                <X />
              </button>
            </div>
            {MOCK_SUGGESTIONS.map((s, i) => (
              <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 p-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {i + 1}. {COUNTRY_BY_CODE[s.countryCode]?.nameJa} {s.city}
                  </span>
                  <span className="text-sm text-blue-600 font-bold">適合度{s.score}%</span>
                </div>
                <ul className="text-xs text-black/60 dark:text-white/60 list-disc list-inside space-y-0.5">
                  {s.reasons.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-xs text-black/40">
              v1はモック提案です。将来Claude APIによる動的生成に置き換えます。
            </p>
          </div>
        </div>
      )}
    </>
  );
}
