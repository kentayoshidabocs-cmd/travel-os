import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Expense } from "@/types";

interface ExpenseState {
  expenses: Expense[];
  budgetTotalJPY: number;
  addExpense: (e: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      budgetTotalJPY: 800000,
      addExpense: (e) =>
        set((s) => ({ expenses: [{ ...e, id: crypto.randomUUID() }, ...s.expenses] })),
      removeExpense: (id) =>
        set((s) => ({ expenses: s.expenses.filter((x) => x.id !== id) })),
    }),
    { name: "travel-os-expenses" }
  )
);
