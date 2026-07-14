// Firestore設計(設計書 4章)に対応するドメイン型定義

export type VisaCategory =
  | "unnecessary"
  | "eta"
  | "e-visa"
  | "voa" // visa on arrival
  | "visa_required";

export type SafetyLevel = 1 | 2 | 3 | 4; // 1=緑(安全) 4=赤(危険)

export type MapLayerMode = "safety" | "cost" | "visa";

export interface CountryInfo {
  code: string; // ISO3 (GeoJSONのidと一致させる)
  code2: string; // ISO2 (通貨/国旗絵文字用)
  nameJa: string;
  nameEn: string;
  capital: string;
  timezone: string;
  plugType: string;
  language: string;
  safetyLevel: SafetyLevel;
  costIndex: number; // 0(安い)〜100(高い)
  visaForJapanese: VisaCategory;
  visaDetail: {
    maxStayDays: number;
    notes: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
  emergency: {
    police: string;
    ambulance: string;
    embassyJa: { address: string; phone: string };
  };
  sim: { availability: string; avgPriceUSD: number; esimSupport: boolean };
  wifi: { avgSpeedNote: string; availability: string };
  phrases: { ja: string; local: string; romaji: string }[];
  tipping: { custom: boolean; note: string };
  lastUpdated: string;
}

export type TransportMode = "flight" | "train" | "bus" | "ferry" | "walk";

export interface NeighborRouteOption {
  mode: TransportMode;
  costUSD: number;
  hours: number;
  borderName: string;
  visaNote: string;
  rating: number; // 1-5
  note: string;
}

export interface NeighborRoutes {
  fromCode: string;
  toCode: string;
  options: NeighborRouteOption[];
}

export interface RouteSearchOption {
  mode: TransportMode;
  provider: string;
  costUSD: number;
  durationHours: number;
  transfers: number;
}

export interface Visit {
  id: string;
  countryCode: string;
  city: string;
  arrivalDate: string;
  departureDate: string | null;
  geo: { lat: number; lng: number };
}

export type ExpenseCategory =
  | "lodging"
  | "food"
  | "transport"
  | "activity"
  | "shopping"
  | "other";

export interface Expense {
  id: string;
  date: string;
  amountLocal: number;
  currency: string;
  amountJPY: number;
  category: ExpenseCategory;
  note: string;
  countryCode: string;
}

export interface TravelNote {
  id: string;
  title: string;
  bodyMarkdown: string;
  images: string[];
  tags: string[];
  countryCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PassportEntry {
  id: string;
  countryCode: string;
  visaType: VisaCategory;
  entryDate: string;
  plannedExitDate: string;
  maxStayDays: number;
  visaExpiryDate: string;
}

export type NotificationType =
  | "visa_expiry"
  | "fx_change"
  | "safety_change"
  | "flight_price";

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface DestinationSuggestion {
  countryCode: string;
  city: string;
  score: number;
  reasons: string[];
}

export interface FavoriteItem {
  id: string;
  kind: "place" | "route" | "note";
  refId: string;
  label: string;
}
