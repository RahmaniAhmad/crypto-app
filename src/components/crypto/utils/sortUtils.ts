import { IndicatorResult } from "@/indicators/types";

export function getSortValue(
  item: {
    symbol: string;
    indicators: IndicatorResult[];
  },
  column: string,
) {
  const indicator = (name: string) =>
    item.indicators.find((x) => x.indicator === name)?.value ?? 0;

  switch (column) {
    case "symbol":
      return item.symbol;

    case "rsi":
      return indicator("RSI");

    case "macd":
      return indicator("MACD");

    case "sma":
      return indicator("SMA");

    case "bollinger":
      return indicator("BOLLINGER");

    case "price":
      return indicator("PRICE");

    case "support":
      return indicator("SUPPORT");

    case "resistance":
      return indicator("RESISTANCE");

    default:
      return 0;
  }
}
