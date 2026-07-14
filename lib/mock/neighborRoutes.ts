import { NeighborRoutes } from "@/types";

export const NEIGHBOR_ROUTES: NeighborRoutes[] = [
  {
    fromCode: "THA",
    toCode: "LAO",
    options: [
      {
        mode: "flight",
        costUSD: 120,
        hours: 1.3,
        borderName: "-",
        visaNote: "到着ビザ推奨事前確認",
        rating: 3,
        note: "バンコク⇔ビエンチャン直行あり",
      },
      {
        mode: "bus",
        costUSD: 25,
        hours: 8,
        borderName: "チェンコーン/フエイサイ",
        visaNote: "到着ビザ可(現金USD推奨)",
        rating: 4,
        note: "国境またぎバスが主流ルート",
      },
      {
        mode: "ferry",
        costUSD: 35,
        hours: 48,
        borderName: "フエイサイ→ルアンパバーン",
        visaNote: "到着ビザ可",
        rating: 5,
        note: "メコン川スローボート、景色が良く人気",
      },
    ],
  },
  {
    fromCode: "THA",
    toCode: "KHM",
    options: [
      {
        mode: "bus",
        costUSD: 15,
        hours: 6,
        borderName: "アランヤプラテート/ポイペト",
        visaNote: "事前E-visa推奨(詐欺多発区間)",
        rating: 3,
        note: "国境での客引きに注意",
      },
      {
        mode: "flight",
        costUSD: 90,
        hours: 1.2,
        borderName: "-",
        visaNote: "事前E-visa推奨",
        rating: 4,
        note: "バンコク⇔シェムリアップ/プノンペン",
      },
    ],
  },
  {
    fromCode: "VNM",
    toCode: "KHM",
    options: [
      {
        mode: "bus",
        costUSD: 20,
        hours: 7,
        borderName: "モクバイ/バベット",
        visaNote: "事前E-visa推奨",
        rating: 4,
        note: "ホーチミン⇔プノンペン直行バスが充実",
      },
    ],
  },
  {
    fromCode: "VNM",
    toCode: "LAO",
    options: [
      {
        mode: "bus",
        costUSD: 30,
        hours: 20,
        borderName: "ラオバオ/デンサワン等",
        visaNote: "到着ビザ可",
        rating: 3,
        note: "山岳路線で時間がかかる",
      },
    ],
  },
];

export function findNeighborRoutes(a: string, b: string): NeighborRoutes | null {
  return (
    NEIGHBOR_ROUTES.find(
      (r) =>
        (r.fromCode === a && r.toCode === b) ||
        (r.fromCode === b && r.toCode === a)
    ) ?? null
  );
}
