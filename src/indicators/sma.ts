import { shortPeriodSMA, longPeriodSMA } from "@/const";
import { IndicatorResult, IndicatorSignal } from "./types";

export function calculateSMA(data: number[], period: number): number {
  if (data.length < period) {
    return NaN;
  }

  const values = data.slice(-period);

  return values.reduce((sum, value) => sum + value, 0) / period;
}

export function generateSmaSignal(
  symbol: string,
  closePrices: number[],
): IndicatorResult {
  const short = calculateSMA(closePrices, shortPeriodSMA);

  const long = calculateSMA(closePrices, longPeriodSMA);

  if (Number.isNaN(short) || Number.isNaN(long)) {
    return {
      symbol,
      indicator: "SMA",
      signal: IndicatorSignal.NEUTRAL,
      strength: 0,
    };
  }

  const difference = ((short - long) / long) * 100;

  let signal = IndicatorSignal.NEUTRAL;

  // require meaningful separation
  if (difference > 0.3) {
    signal = IndicatorSignal.BUY;
  } else if (difference < -0.3) {
    signal = IndicatorSignal.SELL;
  }

  return {
    symbol,
    indicator: "SMA",
    signal,
    strength: Math.min(Math.abs(difference) * 10, 100),
    value: short,
  };
}
