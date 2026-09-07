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

    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }

  if (losses === 0) return 100;

  const rs = gains / losses;

  return 100 - 100 / (1 + rs);
}

export function generateRSISignal(
  symbol: string,
  closePrices: number[],
): IndicatorResult {
  const rsi = calculateRSI(closePrices, RSI_CONFIG.period);

  let signal = IndicatorSignal.NEUTRAL;

  if (rsi < RSI_CONFIG.oversoldThreshold) signal = IndicatorSignal.BUY;

  if (rsi > RSI_CONFIG.overboughtThreshold) signal = IndicatorSignal.SELL;

  return {
    symbol,

    indicator: "RSI",

    signal,

    strength: Math.min(Math.abs(50 - rsi) * 2, 100),

    value: rsi,
  };
}
