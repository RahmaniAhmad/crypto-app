import { IndicatorResult, IndicatorSignal } from "./types";

import { calculateSMA } from "./sma";
import { BOLLINGER_CONFIG } from "@/config";

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
    BOLLINGER_CONFIG.period,
    BOLLINGER_CONFIG.stdDevMultiplier,
  );

  const lastIndex = closePrices.length - 1;

  const currentPrice = closePrices[lastIndex];

  const upperBand = upper[lastIndex];
  const lowerBand = lower[lastIndex];
  const middleBand = middle[lastIndex];

  if (
    Number.isNaN(upperBand) ||
    Number.isNaN(lowerBand) ||
    Number.isNaN(middleBand)
  ) {
    return {
      symbol,
      indicator: "BOLLINGER",
      signal: IndicatorSignal.NEUTRAL,
      strength: 0,
      value: currentPrice,
    };
  }

  const bandPosition = (currentPrice - lowerBand) / (upperBand - lowerBand);

  let signal = IndicatorSignal.NEUTRAL;

  // More active thresholds
  if (bandPosition <= 0.3) {
    signal = IndicatorSignal.BUY;
  } else if (bandPosition >= 0.7) {
    signal = IndicatorSignal.SELL;
  }

  const strength = Math.abs(bandPosition - 0.5) * 200;

  return {
    symbol,
    indicator: "BOLLINGER",
    signal,
    strength: Number(strength.toFixed(2)),
    value: currentPrice,
  };
}
