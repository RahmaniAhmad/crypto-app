import { IndicatorResult } from "@/indicators/types";
import { Signal } from "@/types";

export function getIndicator(indicators: IndicatorResult[], name: string) {
  return indicators.find((x) => x.indicator === name);
}

export function getSignal(indicators: IndicatorResult[], name: string) {
  return getIndicator(indicators, name)?.signal ?? Signal.NEUTRAL;
}

export function getValue(indicators: IndicatorResult[], name: string) {
  const value = getIndicator(indicators, name)?.value;

  if (value === undefined) {
    return "-";
  }

  return formatIndicatorValue(value, name);
}

function formatIndicatorValue(value: number, indicator: string) {
  switch (indicator) {
    case "PRICE":
    case "SUPPORT":
    case "RESISTANCE":
      return value.toLocaleString(undefined, {
        maximumFractionDigits: 4,
      });

    case "RSI":
      return value.toFixed(2);

    default:
      return value.toFixed(4);
  }
}

export function signalColor(signal: string) {
  switch (signal) {
    case Signal.BUY:
      return "text-green-500 font-bold";

    case Signal.SELL:
      return "text-red-500 font-bold";

    case Signal.NEUTRAL:
      return "text-gray-400 dark:text-gray-500";

    default:
      return "text-foreground";
  }
}
