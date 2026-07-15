import { WorldMap } from "@/components/map/WorldMap";
import { LayerSwitcher } from "@/components/map/LayerSwitcher";
import { VisitedToggle } from "@/components/map/VisitedToggle";
import { TodayCard } from "@/components/home/TodayCard";
import { CountryPanel } from "@/components/panel/CountryPanel";
import { SuggestDestinationButton } from "@/components/ai/SuggestDestinationButton";

export default function HomePage() {
  return (
    <div className="relative flex-1 min-h-0">
      <WorldMap />
      <LayerSwitcher />
      <VisitedToggle />
      <TodayCard />
      <SuggestDestinationButton />
      <CountryPanel />
    </div>
  );
}
