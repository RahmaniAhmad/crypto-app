import { shortPeriod, longPeriod, signalPeriod } from "@/const";
import { IndicatorResult, IndicatorSignal } from "./types";
import { calculateEMA } from "./utils/ema";

export function calculateMACD(closePrices: number[]) {
  const shortEMA = calculateEMA(closePrices, shortPeriod);

  const longEMA = calculateEMA(closePrices, longPeriod);

  if (shortEMA.length === 0 || longEMA.length === 0) {
    return {
      macdLine: [],
      signalLine: [],
    };
  }

  const offset = longPeriod - shortPeriod;

  const macdLine: number[] = [];

  for (let i = 0; i < longEMA.length; i++) {
    const shortValue = shortEMA[i + offset];

    if (shortValue !== undefined) {
      macdLine.push(shortValue - longEMA[i]);
    }
  }

  const signalLine = calculateEMA(macdLine, signalPeriod);

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

  let signal = IndicatorSignal.NEUTRAL;

  if (latestMACD > latestSignal) {
    signal = IndicatorSignal.BUY;
  } else if (latestMACD < latestSignal) {
    signal = IndicatorSignal.SELL;
  }

  const strength =
    latestSignal === 0
      ? 0
      : Math.min(
          (Math.abs(latestMACD - latestSignal) / Math.abs(latestSignal)) * 100,
          100,
        );

  return {
    symbol,

    indicator: "MACD",

    signal,

    strength: Number.isFinite(strength) ? strength : 0,

    value: latestMACD,
  };
}
