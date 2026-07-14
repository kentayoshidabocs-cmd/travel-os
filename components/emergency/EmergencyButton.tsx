"use client";

import { useAppStore } from "@/lib/store/useAppStore";

export function EmergencyButton() {
  const setEmergencyOpen = useAppStore((s) => s.setEmergencyOpen);
  return (
    <button
      onClick={() => setEmergencyOpen(true)}
      className="fixed top-4 right-4 z-40 flex items-center gap-1 rounded-full bg-red-600 text-white
        px-4 py-2 text-sm font-semibold shadow-lg shadow-red-600/30 hover:bg-red-700 transition"
      aria-label="緊急連絡先"
    >
      🆘 緊急
    </button>
  );
}
