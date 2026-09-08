import { IndicatorResult } from "@/indicators/types";

interface Props {
  indicators: IndicatorResult[];
}

const DISPLAY_INDICATORS = ["SMA", "MACD", "RSI", "BOLLINGER"];

export default function IndicatorChips({ indicators }: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {indicators
        .filter((ind) => DISPLAY_INDICATORS.includes(ind.indicator))
        .map((ind) => (
          <span
            key={ind.indicator}
            className={`
              rounded-full
              px-2.5
              py-1
              text-xs
              font-medium

              ${
                ind.signal === "BUY"
                  ? "bg-green-500/20 text-green-600"
                  : ind.signal === "SELL"
                    ? "bg-red-500/20 text-red-600"
                    : "bg-muted text-muted-foreground"
              }
            `}
          >
            {ind.indicator === "BOLLINGER" ? "BB" : ind.indicator}

            {ind.signal === "BUY" && " ↑"}
            {ind.signal === "SELL" && " ↓"}
          </span>
        ))}
    </div>
  );
}
