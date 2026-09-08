import { RSI_CONFIG } from "@/config";
import { IndicatorResult, IndicatorSignal } from "./types";

export function calculateRSI(closePrices: number[], period: number): number {
  if (closePrices.length < period + 1) {
    return 50;
  }

  const prices = closePrices.slice(-period - 1);

  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];

    if (change > 0) {
      gains += change;
    } else {
      losses += Math.abs(change);
    }
  }

  if (losses === 0) {
    return 100;
  }

  const rs = gains / losses;

  return 100 - 100 / (1 + rs);
}

export function generateRSISignal(
  symbol: string,
  closePrices: number[],
): IndicatorResult {
  const rsi = calculateRSI(closePrices, RSI_CONFIG.period);

  let signal = IndicatorSignal.NEUTRAL;

  // Momentum based RSI
  if (rsi >= 55) {
    signal = IndicatorSignal.BUY;
  } else if (rsi <= 45) {
    signal = IndicatorSignal.SELL;
  }

  const strength = Math.min(Math.abs(50 - rsi) * 2, 100);

  return {
    symbol,

    indicator: "RSI",

    signal,

    strength: Number(strength.toFixed(2)),

    value: Number(rsi.toFixed(2)),
  };
}
