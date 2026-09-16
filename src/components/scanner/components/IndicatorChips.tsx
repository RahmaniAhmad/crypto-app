import { IndicatorResult } from "@/indicators/types";

interface Props {
  indicators: IndicatorResult[];
}

const DISPLAY_INDICATORS = ["SMA", "MACD", "RSI", "BOLLINGER", "VOLUME"];

export default function IndicatorChips({ indicators }: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {indicators
        .filter((ind) => DISPLAY_INDICATORS.includes(ind.indicator))
        .map((ind) => {
          const isVolume = ind.indicator === "VOLUME";

          return (
            <span
              key={ind.indicator}
              className={`
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium

                ${
                  isVolume
                    ? "bg-blue-500/20 text-blue-600"
                    : ind.signal === "BUY"
                      ? "bg-green-500/20 text-green-600"
                      : ind.signal === "SELL"
                        ? "bg-red-500/20 text-red-600"
                        : "bg-muted text-muted-foreground"
                }
              `}
            >
              {isVolume
                ? `Volume ${ind.value?.toFixed(2)}x`
                : ind.indicator === "BOLLINGER"
                  ? "BB"
                  : ind.indicator}

              {!isVolume && ind.signal === "BUY" && " ↑"}
              {!isVolume && ind.signal === "SELL" && " ↓"}
            </span>
          );
        })}
    </div>
  );
}
