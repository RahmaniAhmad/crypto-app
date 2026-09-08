import { MACD_CONFIG } from "@/config";
import { IndicatorResult, IndicatorSignal } from "./types";
import { calculateEMA } from "./utils/ema";

export function calculateMACD(closePrices: number[]) {
  const shortEMA = calculateEMA(closePrices, MACD_CONFIG.shortPeriod);

  const longEMA = calculateEMA(closePrices, MACD_CONFIG.longPeriod);

  if (shortEMA.length === 0 || longEMA.length === 0) {
    return {
      macdLine: [],
      signalLine: [],
    };
  }

  const offset = MACD_CONFIG.longPeriod - MACD_CONFIG.shortPeriod;

  const macdLine: number[] = [];

  for (let i = 0; i < longEMA.length; i++) {
    const shortValue = shortEMA[i + offset];

    if (shortValue !== undefined) {
      macdLine.push(shortValue - longEMA[i]);
    }
  }

  const signalLine = calculateEMA(macdLine, MACD_CONFIG.signalPeriod);

  return {
    macdLine,
    signalLine,
  };
}

export function generateMacdSignal(
  symbol: string,
  closePrices: number[],
): IndicatorResult {
  const { macdLine, signalLine } = calculateMACD(closePrices);

  if (macdLine.length === 0 || signalLine.length === 0) {
    return {
      symbol,
      indicator: "MACD",
      signal: IndicatorSignal.NEUTRAL,
      strength: 0,
    };
  }

  const latestMACD = macdLine[macdLine.length - 1];

  const latestSignal = signalLine[signalLine.length - 1];

  const histogram = latestMACD - latestSignal;

  let signal = IndicatorSignal.NEUTRAL;

  // bullish momentum
  if (latestMACD > latestSignal && histogram > 0) {
    signal = IndicatorSignal.BUY;
  }

  // bearish momentum
  else if (latestMACD < latestSignal && histogram < 0) {
    signal = IndicatorSignal.SELL;
  }

  const strength = Math.min(
    (Math.abs(histogram) / Math.max(Math.abs(latestMACD), 0.000001)) * 100,
    100,
  );

  return {
    symbol,

    indicator: "MACD",

    signal,

    strength: Number(strength.toFixed(2)),

    value: Number(latestMACD.toFixed(4)),
  };
}
