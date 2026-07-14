"use client";

import { useAppStore } from "@/lib/store/useAppStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";
import { X, Phone, Building2, ShieldAlert } from "lucide-react";

export function EmergencyOverlay() {
  const emergencyOpen = useAppStore((s) => s.emergencyOpen);
  const setEmergencyOpen = useAppStore((s) => s.setEmergencyOpen);
  const currentCountryCode = useAppStore((s) => s.currentCountryCode);
  const country = COUNTRY_BY_CODE[currentCountryCode];

  if (!emergencyOpen || !country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
      <div className="w-full md:w-[420px] rounded-t-2xl md:rounded-2xl bg-white dark:bg-neutral-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShieldAlert className="text-red-600" /> 緊急連絡先 — {country.nameJa}
          </h2>
          <button onClick={() => setEmergencyOpen(false)} aria-label="閉じる">
            <X />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950">
            <Phone size={18} className="text-red-600" />
            <div>
              <div className="font-semibold">警察</div>
              <div>{country.emergency.police}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950">
            <Phone size={18} className="text-red-600" />
            <div>
              <div className="font-semibold">救急</div>
              <div>{country.emergency.ambulance}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
            <Building2 size={18} className="text-blue-600" />
            <div>
              <div className="font-semibold">在{country.nameJa}日本国大使館</div>
              <div>{country.emergency.embassyJa.address}</div>
              <div>{country.emergency.embassyJa.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
