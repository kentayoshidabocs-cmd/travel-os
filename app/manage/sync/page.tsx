export default function SyncPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4">
        <h2 className="font-semibold mb-2">同期状況</h2>
        <p className="text-sm text-green-600">✅ 最新の状態です(ローカル保存: localStorage / v1)</p>
        <p className="text-xs text-black/40 mt-1">
          Firebase接続後はFirestoreのオフライン永続化により自動同期されます。
        </p>
      </div>
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-4">
        <h2 className="font-semibold mb-2">オフライン地図パック</h2>
        <p className="text-sm text-black/50 dark:text-white/50">
          出発前に地域ごとの地図タイルを事前ダウンロードする機能です(v2で実装予定)。
        </p>
      </div>
    </div>
  );
}
