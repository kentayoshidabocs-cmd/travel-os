import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Visit } from "@/types";

interface VisitState {
  visits: Visit[];
  addVisit: (v: Omit<Visit, "id">) => void;
}

export const useVisitStore = create<VisitState>()(
  persist(
    (set) => ({
      visits: [
        {
          id: "seed-1",
          countryCode: "THA",
          city: "バンコク",
          arrivalDate: "2026-10-05",
          departureDate: "2026-10-10",
          geo: { lat: 13.7563, lng: 100.5018 },
        },
        {
          id: "seed-2",
          countryCode: "THA",
          city: "チェンマイ",
          arrivalDate: "2026-10-10",
          departureDate: null,
          geo: { lat: 18.7883, lng: 98.9853 },
        },
      ],
      addVisit: (v) =>
        set((s) => ({ visits: [{ ...v, id: crypto.randomUUID() }, ...s.visits] })),
    }),
    { name: "travel-os-visits" }
  )
);
