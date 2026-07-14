"use client";

import { useAppStore } from "@/lib/store/useAppStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

// v1: モック値。実装フェーズでgetWeather/getExchangeRate Cloud Functionsに接続する。
const MOCK_TODAY = {
  city: "チェンマイ",
  tempC: 32,
  budgetRemainingJPY: 182400,
  visaDaysLeft: 12,
  fxChangePct: -0.8,
};

export function TodayCard() {
  const currentCountryCode = useAppStore((s) => s.currentCountryCode);
  const country = COUNTRY_BY_CODE[currentCountryCode];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center gap-x-4 gap-y-1
      rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-2 text-xs md:text-sm shadow max-w-[92vw]">
      <span>📍 {MOCK_TODAY.city}{country ? `(${country.nameJa})` : ""} {MOCK_TODAY.tempC}℃</span>
      <span className="hidden sm:inline">|</span>
      <span>残予算 ¥{MOCK_TODAY.budgetRemainingJPY.toLocaleString()}</span>
      <span className="hidden sm:inline">|</span>
      <span>ビザ残り {MOCK_TODAY.visaDaysLeft}日</span>
      <span className="hidden sm:inline">|</span>
      <span className={MOCK_TODAY.fxChangePct < 0 ? "text-red-500" : "text-green-600"}>
        為替 {MOCK_TODAY.fxChangePct > 0 ? "+" : ""}{MOCK_TODAY.fxChangePct}%
      </span>
    </div>
  );
}
