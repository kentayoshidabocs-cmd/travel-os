import { create } from "zustand";
import { MapLayerMode } from "@/types";

interface AppState {
  mapLayerMode: MapLayerMode;
  setMapLayerMode: (mode: MapLayerMode) => void;

  selectedCountryCode: string | null;
  selectCountry: (code: string | null) => void;

  emergencyOpen: boolean;
  setEmergencyOpen: (open: boolean) => void;

  currentCountryCode: string; // 現在地(モック: バンコク=THA)

  showVisitedOverlay: boolean; // 訪問済み国のハイライト表示(他レイヤーと独立)
  setShowVisitedOverlay: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mapLayerMode: "safety",
  setMapLayerMode: (mode) => set({ mapLayerMode: mode }),

  selectedCountryCode: null,
  selectCountry: (code) => set({ selectedCountryCode: code }),

  emergencyOpen: false,
  setEmergencyOpen: (open) => set({ emergencyOpen: open }),

  currentCountryCode: "THA",

  showVisitedOverlay: true,
  setShowVisitedOverlay: (show) => set({ showVisitedOverlay: show }),
}));
