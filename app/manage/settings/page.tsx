"use client";

import { useExpenseStore } from "@/lib/store/useExpenseStore";
import { signOutOwner } from "@/lib/auth/AuthGate";

export default function SettingsPage() {
  const budgetTotalJPY = useExpenseStore((s) => s.budgetTotalJPY);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-2">
        <h2 className="font-semibold">アカウント</h2>
        <p className="text-sm text-black/50 dark:text-white/50">Firebase Authでログイン中</p>
        <button
          onClick={() => signOutOwner()}
          className="rounded-lg border border-black/10 dark:border-white/20 px-4 py-1.5 text-sm"
        >
          ログアウト
        </button>
      </div>
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-2">
        <h2 className="font-semibold">予算総額</h2>
        <p className="text-sm">¥{budgetTotalJPY.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-2">
        <h2 className="font-semibold">ホーム通貨</h2>
        <p className="text-sm">JPY</p>
      </div>
    </div>
  );
}
