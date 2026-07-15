import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VisitedCountriesState {
  visitedCodes: string[];
  isVisited: (code: string) => boolean;
  toggleVisited: (code: string) => void;
}

export const useVisitedCountriesStore = create<VisitedCountriesState>()(
  persist(
    (set, get) => ({
      visitedCodes: [],
      isVisited: (code) => get().visitedCodes.includes(code),
      toggleVisited: (code) =>
        set((s) => ({
          visitedCodes: s.visitedCodes.includes(code)
            ? s.visitedCodes.filter((c) => c !== code)
            : [...s.visitedCodes, code],
        })),
    }),
    { name: "travel-os-visited-countries" }
  )
);
