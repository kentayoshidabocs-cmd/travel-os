"use client";

import { useAppStore } from "@/lib/store/useAppStore";

export function VisitedToggle() {
  const showVisitedOverlay = useAppStore((s) => s.showVisitedOverlay);
  const setShowVisitedOverlay = useAppStore((s) => s.setShowVisitedOverlay);

  return (
    <button
      onClick={() => setShowVisitedOverlay(!showVisitedOverlay)}
      className={`absolute top-16 left-4 z-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm shadow
        bg-white/90 dark:bg-black/80 backdrop-blur ${
          showVisitedOverlay ? "text-amber-600" : "text-black/40 dark:text-white/40"
        }`}
    >
      <span
        className={`inline-block w-3 h-3 rounded-full border-2 ${
          showVisitedOverlay ? "border-amber-500 bg-amber-500/30" : "border-black/30 dark:border-white/30"
        }`}
      />
      訪問済みを強調
    </button>
  );
}
