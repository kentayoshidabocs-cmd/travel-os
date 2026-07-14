import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PassportEntry } from "@/types";

interface PassportState {
  entries: PassportEntry[];
  addEntry: (e: Omit<PassportEntry, "id">) => void;
}

export const usePassportStore = create<PassportState>()(
  persist(
    (set) => ({
      entries: [
        {
          id: "seed-1",
          countryCode: "THA",
          visaType: "unnecessary",
          entryDate: "2026-10-05",
          plannedExitDate: "2026-11-04",
          maxStayDays: 30,
          visaExpiryDate: "2026-11-04",
        },
      ],
      addEntry: (e) => set((s) => ({ entries: [{ ...e, id: crypto.randomUUID() }, ...s.entries] })),
    }),
    { name: "travel-os-passport" }
  )
);
