import { NeighborRoutes, TransportMode } from "@/types";

const MODE_ICON: Record<TransportMode, string> = {
  flight: "✈️",
  train: "🚆",
  bus: "🚌",
  ferry: "🚢",
  walk: "🚶",
};

export function NeighborMoves({ routes }: { routes: NeighborRoutes | null }) {
  if (!routes) {
    return (
      <p className="text-sm text-black/50 dark:text-white/50">
        隣国移動データは未整備です(v1では東南アジア主要ルートのみ収録)。
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {routes.options.map((o, i) => (
        <div key={i} className="rounded-lg border border-black/10 dark:border-white/15 p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {MODE_ICON[o.mode]} {o.mode === "flight" ? "飛行機" : o.mode === "bus" ? "バス" : o.mode === "ferry" ? "フェリー" : o.mode === "train" ? "鉄道" : "徒歩"}
            </span>
            <span>{"★".repeat(o.rating)}{"☆".repeat(5 - o.rating)}</span>
          </div>
          <div className="text-sm grid grid-cols-2 gap-x-2 text-black/70 dark:text-white/70">
            <span>費用: ${o.costUSD}</span>
            <span>時間: {o.hours}h</span>
            <span className="col-span-2">国境: {o.borderName}</span>
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400">⚠️ {o.visaNote}</div>
          <div className="text-xs text-black/50 dark:text-white/50">{o.note}</div>
        </div>
      ))}
    </div>
  );
}
