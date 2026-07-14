import { notFound } from "next/navigation";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

const VISA_LABEL = {
  unnecessary: "不要",
  eta: "ETA",
  "e-visa": "電子ビザ",
  voa: "到着ビザ",
  visa_required: "通常ビザ",
};

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const country = COUNTRY_BY_CODE[code];
  if (!country) notFound();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">{country.nameJa}</h1>

      <Section title="基本情報">
        <Row label="首都" value={country.capital} />
        <Row label="言語" value={country.language} />
        <Row label="タイムゾーン" value={country.timezone} />
      </Section>

      <Section title="ビザ(日本人)">
        <Row label="種別" value={VISA_LABEL[country.visaForJapanese]} />
        <Row label="最大滞在日数" value={`${country.visaDetail.maxStayDays}日`} />
        <p className="text-sm text-black/60 dark:text-white/60">{country.visaDetail.notes}</p>
      </Section>

      <Section title="通貨">
        <Row label="通貨" value={`${country.currency.code} (${country.currency.symbol})`} />
      </Section>

      <Section title="物価感覚(現地の人の目安・円換算)">
        <Row label="宿(1泊)" value={`¥${country.priceSenseJPY.hotel.toLocaleString()}`} />
        <Row label="食事(1食)" value={`¥${country.priceSenseJPY.food.toLocaleString()}`} />
        <Row label="観光地入場料" value={`¥${country.priceSenseJPY.sightseeing.toLocaleString()}`} />
      </Section>

      <Section title="SIM / eSIM">
        <Row label="入手性" value={country.sim.availability} />
        <Row label="目安料金" value={`$${country.sim.avgPriceUSD}`} />
        <Row label="eSIM対応" value={country.sim.esimSupport ? "対応" : "未対応"} />
      </Section>

      <Section title="WiFi">
        <Row label="速度感" value={country.wifi.avgSpeedNote} />
        <Row label="利用可能範囲" value={country.wifi.availability} />
      </Section>

      <Section title="電源プラグ">
        <Row label="タイプ" value={country.plugType} />
      </Section>

      <Section title="基本フレーズ">
        {country.phrases.map((p, i) => (
          <p key={i} className="text-sm">
            {p.ja} = {p.local}({p.romaji})
          </p>
        ))}
      </Section>

      <Section title="治安">
        <Row label="レベル" value={`${country.safetyLevel} / 4`} />
      </Section>

      <Section title="チップ文化">
        <p className="text-sm">{country.tipping.custom ? "あり" : "なし"} — {country.tipping.note}</p>
      </Section>

      <p className="text-xs text-black/30">最終更新: {country.lastUpdated}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-1">
      <h2 className="font-semibold mb-1">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-black/50 dark:text-white/50">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
