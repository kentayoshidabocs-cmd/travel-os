import Link from "next/link";
import { COUNTRIES } from "@/lib/mock/countries";

const SAFETY_LABEL = ["", "緑(安全)", "黄(注意)", "オレンジ(警戒)", "赤(危険)"];

export default function CountryListPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-2">
      <h1 className="text-lg font-bold mb-2">国情報(オフライン閲覧可)</h1>
      {COUNTRIES.map((c) => (
        <Link
          key={c.code}
          href={`/country/${c.code}`}
          className="flex justify-between items-center rounded-xl border border-black/10 dark:border-white/15 p-3 hover:bg-black/5 dark:hover:bg-white/5"
        >
          <span className="font-medium">{c.nameJa}</span>
          <span className="text-xs text-black/40">{SAFETY_LABEL[c.safetyLevel]}</span>
        </Link>
      ))}
    </div>
  );
}
