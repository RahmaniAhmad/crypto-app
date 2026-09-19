import { Signal } from "@/features/scanner/types";

export function formatIndicatorValue(value: number, indicator: string) {
  switch (indicator) {
    case "PRICE":
    case "SUPPORT":
    case "RESISTANCE":
      return value.toLocaleString(undefined, {
        maximumFractionDigits: 4,
      });

    case "RSI":
      return value.toFixed(2);

    case "VOLUME":
      return `${value.toFixed(2)}x`;

    default:
      return value.toFixed(4);
  }
}

export function getIndicatorValue(indicators: any[], name: string) {
  const value = indicators.find((x) => x.indicator === name)?.value;

  if (value === undefined) {
    return "-";
  }

  return formatIndicatorValue(value, name);
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
