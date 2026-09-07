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

  let signal = IndicatorSignal.NEUTRAL;

  if (short > long) {
    signal = IndicatorSignal.BUY;
  } else if (short < long) {
    signal = IndicatorSignal.SELL;
  }

  const strength =
    long === 0 ? 0 : Math.min((Math.abs(short - long) / long) * 100, 100);

  return {
    symbol,

    indicator: "SMA",

    signal,

    strength,

    value: short,
  };
}
