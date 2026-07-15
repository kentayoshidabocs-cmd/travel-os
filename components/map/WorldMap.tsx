"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map as MLMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppStore } from "@/lib/store/useAppStore";
import { useVisitedCountriesStore } from "@/lib/store/useVisitedCountriesStore";
import { COUNTRIES } from "@/lib/mock/countries";
import { MapLayerMode, SafetyLevel, VisaCategory } from "@/types";

// v1: MapLibreデモスタイル(無料/無キー)を使用。
// 本番ではProtomaps/MapTilerの自前ベクトルタイルに差し替える(設計書3章)。
const STYLE_URL = "https://demotiles.maplibre.org/style.json";

// 一部の環境(厳格なCSP/サンドボックス)ではデフォルトのblob URL経由のワーカー生成が
// ブロックされるため、CSP対応の静的ワーカースクリプトを明示的に指定する。
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-csp-worker.js");
}

const SAFETY_COLORS: Record<SafetyLevel, string> = {
  1: "#22c55e", // 緑
  2: "#eab308", // 黄
  3: "#f97316", // オレンジ
  4: "#ef4444", // 赤
};

const VISA_COLORS: Record<VisaCategory, string> = {
  unnecessary: "#22c55e",
  eta: "#84cc16",
  "e-visa": "#eab308",
  voa: "#f97316",
  visa_required: "#ef4444",
};

function costColor(costIndex: number): string {
  // 0(安い/緑) 〜 100(高い/赤)
  const hue = Math.max(0, 120 - (costIndex / 100) * 120);
  return `hsl(${hue}, 70%, 45%)`;
}

const UNVISITED_GRAY = "#9ca3af";

// showVisited時は訪問済み国以外をグレースケールにして、訪問済みだけを際立たせる。
function buildColorExpression(
  mode: MapLayerMode,
  visitedCodes: string[],
  showVisited: boolean
): maplibregl.ExpressionSpecification {
  const visitedSet = new Set(visitedCodes);
  const match: unknown[] = ["match", ["get", "iso3"]];
  for (const c of COUNTRIES) {
    let color: string;
    if (showVisited && !visitedSet.has(c.code)) {
      color = UNVISITED_GRAY;
    } else if (mode === "safety") color = SAFETY_COLORS[c.safetyLevel];
    else if (mode === "visa") color = VISA_COLORS[c.visaForJapanese];
    else color = costColor(c.costIndex);
    match.push(c.code, color);
  }
  match.push(showVisited ? UNVISITED_GRAY : "#d4d4d8"); // デフォルト(データ未投入国)
  return match as unknown as maplibregl.ExpressionSpecification;
}

export function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const mapLayerMode = useAppStore((s) => s.mapLayerMode);
  const selectCountry = useAppStore((s) => s.selectCountry);
  const showVisitedOverlay = useAppStore((s) => s.showVisitedOverlay);
  const visitedCodes = useVisitedCountriesStore((s) => s.visitedCodes);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: [100, 15],
      zoom: 3.2,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({}), "bottom-right");

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    // "load"(初期タイル描画完了まで待つ)ではなく"style.load"(スタイル解析完了時点)を使う。
    // ベースタイルの読み込みが遅い/失敗しても自国境オーバーレイは独立して表示できるようにする。
    map.once("style.load", async () => {
      const res = await fetch("/data/countries.geo.json");
      const geojson = await res.json();
      // GeoJSONの feature.id を properties.iso3 に複製(match式はpropertiesのみ参照可能なため)
      for (const f of geojson.features) {
        f.properties = { ...f.properties, iso3: f.id };
      }

      map.addSource("countries", { type: "geojson", data: geojson });

      map.addLayer({
        id: "app-countries-fill",
        type: "fill",
        source: "countries",
        paint: {
          "fill-color": buildColorExpression(
            mapLayerMode,
            useVisitedCountriesStore.getState().visitedCodes,
            useAppStore.getState().showVisitedOverlay
          ),
          "fill-opacity": 0.65,
        },
      });

      map.addLayer({
        id: "app-countries-line",
        type: "line",
        source: "countries",
        paint: { "line-color": "#ffffff", "line-width": 0.5 },
      });

      // 訪問済み国のハイライト表示。危険度/物価/ビザのレイヤーとは独立して重ね描画する。
      map.addLayer({
        id: "app-visited-outline",
        type: "line",
        source: "countries",
        filter: ["in", ["get", "iso3"], ["literal", useVisitedCountriesStore.getState().visitedCodes]],
        paint: { "line-color": "#f59e0b", "line-width": 3 },
        layout: { visibility: useAppStore.getState().showVisitedOverlay ? "visible" : "none" },
      });

      map.on("click", "app-countries-fill", (e) => {
        const code = e.features?.[0]?.properties?.iso3 as string | undefined;
        if (code) selectCountry(code);
      });
      map.on(
        "mouseenter",
        "app-countries-fill",
        () => (map.getCanvas().style.cursor = "pointer")
      );
      map.on(
        "mouseleave",
        "app-countries-fill",
        () => (map.getCanvas().style.cursor = "")
      );
    });

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // レイヤーモード/訪問済み国/表示ON-OFFの変更を塗り分けに反映
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("app-countries-fill")) return;
    map.setPaintProperty(
      "app-countries-fill",
      "fill-color",
      buildColorExpression(mapLayerMode, visitedCodes, showVisitedOverlay)
    );
  }, [mapLayerMode, visitedCodes, showVisitedOverlay]);

  // 訪問済み国リスト/表示ON-OFFの変更を縁取りにも反映
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("app-visited-outline")) return;
    map.setFilter("app-visited-outline", ["in", ["get", "iso3"], ["literal", visitedCodes]]);
    map.setLayoutProperty("app-visited-outline", "visibility", showVisitedOverlay ? "visible" : "none");
  }, [visitedCodes, showVisitedOverlay]);

  // MapLibreは渡したコンテナに inline style position:relative を強制設定するため、
  // Tailwindの absolute/inset-0 を直接同じ要素につけると無効化される。ラッパーで包む。
  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
