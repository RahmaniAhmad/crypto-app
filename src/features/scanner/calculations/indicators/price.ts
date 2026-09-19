import { IndicatorResult, IndicatorSignal } from "./types";

export function generatePriceIndicator(
  symbol: string,
  closePrices: number[],
): IndicatorResult {
  const price = closePrices[closePrices.length - 1];

  return {
    symbol,
    indicator: "PRICE",
    signal: IndicatorSignal.NEUTRAL,
    strength: 0,
    value: price,
  };
}
