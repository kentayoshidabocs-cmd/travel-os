const MOCK_NOTIFICATIONS = [
  { id: "1", type: "visa_expiry", message: "タイのビザ期限まで残り7日です", createdAt: "2026-10-28" },
  { id: "2", type: "fx_change", message: "THB/JPYが過去24時間で3.2%変動しました", createdAt: "2026-10-27" },
  { id: "3", type: "safety_change", message: "ミャンマーの危険度レベルが更新されました", createdAt: "2026-10-25" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-2">
      {MOCK_NOTIFICATIONS.map((n) => (
        <div key={n.id} className="rounded-xl border border-black/10 dark:border-white/15 p-3 flex justify-between">
          <span className="text-sm">{n.message}</span>
          <span className="text-xs text-black/40 whitespace-nowrap ml-2">{n.createdAt}</span>
        </div>
      ))}
      <p className="text-xs text-black/40 pt-2">
        v1はモック通知です。将来checkVisaExpiryAlerts / checkFxAndPriceAlerts Cloud Functionsが自動生成します。
      </p>
    </div>
  );
}
