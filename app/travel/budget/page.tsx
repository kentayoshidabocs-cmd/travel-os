"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useExpenseStore } from "@/lib/store/useExpenseStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";
import { ExpenseCategory } from "@/types";

const CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  lodging: "宿泊",
  food: "食費",
  transport: "交通",
  activity: "アクティビティ",
  shopping: "買い物",
  other: "その他",
};

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#eab308", "#94a3b8"];

export default function BudgetPage() {
  const expenses = useExpenseStore((s) => s.expenses);
  const budgetTotalJPY = useExpenseStore((s) => s.budgetTotalJPY);
  const addExpense = useExpenseStore((s) => s.addExpense);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [countryCode, setCountryCode] = useState("THA");

  const spent = expenses.reduce((sum, e) => sum + e.amountJPY, 0);
  const remaining = budgetTotalJPY - spent;

  const byCategory = useMemo(() => {
    const m = new Map<ExpenseCategory, number>();
    for (const e of expenses) m.set(e.category, (m.get(e.category) ?? 0) + e.amountJPY);
    return Array.from(m.entries()).map(([k, v]) => ({ name: CATEGORY_LABEL[k], value: v }));
  }, [expenses]);

  const byCountry = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of expenses) m.set(e.countryCode, (m.get(e.countryCode) ?? 0) + e.amountJPY);
    return Array.from(m.entries()).map(([k, v]) => ({
      name: COUNTRY_BY_CODE[k]?.nameJa ?? k,
      value: v,
    }));
  }, [expenses]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat label="予算総額" value={`¥${budgetTotalJPY.toLocaleString()}`} />
        <Stat label="支出済み" value={`¥${spent.toLocaleString()}`} />
        <Stat label="残予算" value={`¥${remaining.toLocaleString()}`} highlight />
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-2">
        <h2 className="font-semibold">支出を記録</h2>
        <div className="flex flex-wrap gap-2">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="金額(JPY換算)"
            inputMode="decimal"
            className="flex-1 min-w-[120px] rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-2 py-2 text-sm"
          >
            {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-2 py-2 text-sm"
          >
            {Object.values(COUNTRY_BY_CODE).map((c) => (
              <option key={c.code} value={c.code}>{c.nameJa}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            const n = Number(amount);
            if (!Number.isFinite(n) || n <= 0) return;
            addExpense({
              date: new Date().toISOString().slice(0, 10),
              amountLocal: n,
              currency: "JPY",
              amountJPY: n,
              category,
              note: "",
              countryCode,
            });
            setAmount("");
          }}
          className="rounded-lg bg-blue-600 text-white px-4 py-1.5 text-sm"
        >
          記録する
        </button>
      </div>

      {byCategory.length > 0 && (
        <div className="rounded-xl border border-black/10 dark:border-white/15 p-4">
          <h2 className="font-semibold mb-2">カテゴリ別支出</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={80} label>
                {byCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {byCountry.length > 0 && (
        <div className="rounded-xl border border-black/10 dark:border-white/15 p-4">
          <h2 className="font-semibold mb-2">国別支出</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byCountry}>
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/15 p-3">
      <p className="text-xs text-black/50 dark:text-white/50">{label}</p>
      <p className={`font-bold ${highlight ? "text-blue-600" : ""}`}>{value}</p>
    </div>
  );
}
