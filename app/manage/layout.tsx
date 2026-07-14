import { SubTabs } from "@/components/nav/SubTabs";

const TABS = [
  { href: "/manage", label: "パスポート/ビザ" },
  { href: "/manage/notifications", label: "通知" },
  { href: "/manage/sync", label: "データ同期" },
  { href: "/manage/settings", label: "設定" },
];

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SubTabs items={TABS} />
      <div className="flex-1 min-h-0 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
