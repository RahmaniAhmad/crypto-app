import { FaChartLine } from "react-icons/fa";

import { CryptoScanResult } from "../types";
import IndicatorChips from "./IndicatorChips";
import MultiTimeframe from "./MultiTimeframe";
import SignalBadge from "./SignalBadge";
import SignalScore from "./SignalScore";

interface Props {
  item: CryptoScanResult;
  rank: number;
  onChartClick: (symbol: string) => void;
}

export default function SignalCard({ item, rank, onChartClick }: Props) {
  const isBuy = item.signal.includes("BUY");

  return (
    <div
      className={`
        rounded-xl
        border
        p-3
        transition
        hover:shadow-md

        ${
          isBuy
            ? "border-green-500/30 bg-green-200/10"
            : "border-red-500/30 bg-red-200/10"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">#{rank}</span>
            <h3 className="text-lg font-bold">{item.symbol}</h3>
          </div>
          <button
            onClick={() => onChartClick(item.symbol)}
            title={`View ${item.symbol} chart`}
          >
            <FaChartLine size={20} />
          </button>
        </div>
        <SignalBadge signal={item.signal} />
      </div>

      <SignalScore score={item.score} />
      <IndicatorChips indicators={item.indicators} />

      {item.multiTimeframe && <MultiTimeframe analysis={item.multiTimeframe} />}
    </div>
  );
}
