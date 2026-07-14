// v1: モック為替レート(1 JPY = ? 現地通貨)。実装フェーズでgetExchangeRate Cloud Functionへ差し替え。
export const JPY_TO_LOCAL: Record<string, number> = {
  JPY: 1,
  THB: 0.23,
  LAK: 137,
  VND: 163,
  KHR: 27,
  MMK: 14,
  MYR: 0.03,
  SGD: 0.0087,
  IDR: 103,
  PHP: 0.38,
  INR: 0.56,
  NPR: 0.9,
  USD: 0.0067,
};
