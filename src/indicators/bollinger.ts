import { periodBB, stdDevMultiplier } from "@/const";
import { IndicatorResult, IndicatorSignal } from "./types";

import { calculateSMA } from "./sma";

export function calculateBollingerBands(
  closePrices: number[],
  period: number,
  multiplier: number,
) {
  const upper: number[] = [];
  const lower: number[] = [];
  const middle: number[] = [];

  for (let i = 0; i < closePrices.length; i++) {
    if (i < period - 1) {
      middle.push(NaN);
      upper.push(NaN);
      lower.push(NaN);
      continue;
    }

    const slice = closePrices.slice(i - period + 1, i + 1);

    const sma = calculateSMA(slice, period);

    const variance =
      slice.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;

    const stdDev = Math.sqrt(variance);

    middle.push(sma);

    upper.push(sma + multiplier * stdDev);

    lower.push(sma - multiplier * stdDev);
  }

  return {
    upper,
    lower,
    middle,
  };
}

export function generateBollingerSignal(
  symbol: string,
  closePrices: number[],
): IndicatorResult {
  const { upper, lower, middle } = calculateBollingerBands(
    closePrices,
    periodBB,
    stdDevMultiplier,
  );

  const lastIndex = closePrices.length - 1;

  const currentPrice = closePrices[lastIndex];

  const upperBand = upper[lastIndex];

  const lowerBand = lower[lastIndex];

  const middleBand = middle[lastIndex];

  let signal = IndicatorSignal.NEUTRAL;

  if (currentPrice > upperBand) {
    signal = IndicatorSignal.SELL;
  }

  if (currentPrice < lowerBand) {
    signal = IndicatorSignal.BUY;
  }

  const distance = (Math.abs(currentPrice - middleBand) / middleBand) * 100;

  return {
    symbol,

    indicator: "BOLLINGER",

    signal,

    strength: Math.min(distance, 100),

    value: currentPrice,
  };
}
