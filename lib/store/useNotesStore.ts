import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TravelNote } from "@/types";

interface NotesState {
  notes: TravelNote[];
  addNote: (note: Omit<TravelNote, "id" | "createdAt" | "updatedAt">) => void;
  removeNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) =>
        set((s) => ({
          notes: [
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...s.notes,
          ],
        })),
      removeNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
    }),
    { name: "travel-os-notes" }
  )
);
