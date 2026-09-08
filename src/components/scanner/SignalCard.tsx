import { CryptoScanResult } from "@/scanner/types";
import SignalBadge from "./SignalBadge";
import SignalStrength from "./SignalStrength";
import IndicatorChips from "./IndicatorChips";

interface Props {
  item: CryptoScanResult;
  rank: number;
}

export default function SignalCard({ item, rank }: Props) {
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
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">#{rank}</span>

          <h3 className="text-lg font-bold">{item.symbol}</h3>
        </div>

        <SignalBadge signal={item.signal} />
      </div>

      <SignalStrength score={item.score} />

      <IndicatorChips indicators={item.indicators} />
    </div>
  );
}
