"use client";

import { useAppStore } from "@/lib/store/useAppStore";
import { MapLayerMode } from "@/types";

const LAYERS: { mode: MapLayerMode; label: string }[] = [
  { mode: "safety", label: "危険度" },
  { mode: "cost", label: "物価" },
  { mode: "visa", label: "ビザ" },
];

export function LayerSwitcher() {
  const mapLayerMode = useAppStore((s) => s.mapLayerMode);
  const setMapLayerMode = useAppStore((s) => s.setMapLayerMode);

  return (
    <div className="absolute top-4 left-4 z-20 flex gap-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur p-1 shadow">
      {LAYERS.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => setMapLayerMode(mode)}
          className={`px-3 py-1.5 rounded-full text-sm transition ${
            mapLayerMode === mode
              ? "bg-blue-600 text-white"
              : "text-black/60 dark:text-white/60"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
