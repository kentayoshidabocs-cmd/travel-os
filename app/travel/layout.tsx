import { SubTabs } from "@/components/nav/SubTabs";

const TABS = [
  { href: "/travel", label: "メモ" },
  { href: "/travel/history", label: "訪問履歴" },
  { href: "/travel/budget", label: "予算・支出" },
  { href: "/travel/timeline", label: "タイムライン" },
  { href: "/travel/favorites", label: "お気に入り" },
];

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SubTabs items={TABS} />
      <div className="flex-1 min-h-0 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
