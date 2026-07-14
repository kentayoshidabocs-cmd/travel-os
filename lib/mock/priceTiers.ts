export type PriceTier =
  | "very_low"
  | "low"
  | "lower_mid"
  | "mid"
  | "upper_mid"
  | "high"
  | "very_high";

// 現地の人が普段使う宿/食堂/観光地の感覚値(円換算)。地域の物価水準から算出した目安。
// costIndexは地図のグラデーション表示用(0=安い/100=高い)。
export const TIER_PRICE: Record<
  PriceTier,
  { costIndex: number; hotel: number; food: number; sightseeing: number }
> = {
  very_low: { costIndex: 12, hotel: 1200, food: 250, sightseeing: 300 },
  low: { costIndex: 22, hotel: 2500, food: 400, sightseeing: 500 },
  lower_mid: { costIndex: 35, hotel: 4000, food: 600, sightseeing: 800 },
  mid: { costIndex: 45, hotel: 5500, food: 800, sightseeing: 1200 },
  upper_mid: { costIndex: 55, hotel: 8000, food: 1200, sightseeing: 1800 },
  high: { costIndex: 70, hotel: 12000, food: 1800, sightseeing: 2500 },
  very_high: { costIndex: 85, hotel: 18000, food: 2500, sightseeing: 3500 },
};
