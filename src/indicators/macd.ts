import { IndicatorResult, IndicatorSignal } from "./types";
import { calculateEMA } from "./utils/ema";

interface MacdConfig {
  shortPeriod: number;
  longPeriod: number;
  signalPeriod: number;
}

export function calculateMACD(closePrices: number[], config: MacdConfig) {
  const shortEMA = calculateEMA(closePrices, config.shortPeriod);

  const longEMA = calculateEMA(closePrices, config.longPeriod);

  if (shortEMA.length === 0 || longEMA.length === 0) {
    return {
      macdLine: [],
      signalLine: [],
    };
  }

  const offset = config.longPeriod - config.shortPeriod;

  const macdLine: number[] = [];

  for (let i = 0; i < longEMA.length; i++) {
    const shortValue = shortEMA[i + offset];

    if (shortValue !== undefined) {
      macdLine.push(shortValue - longEMA[i]);
    }
  }

  const signalLine = calculateEMA(macdLine, config.signalPeriod);

  return {
    macdLine,
    signalLine,
  };
}

export function generateMacdSignal(
  symbol: string,
  closePrices: number[],
  config: MacdConfig,
): IndicatorResult {
  const { macdLine, signalLine } = calculateMACD(closePrices, config);

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

  if (latestMACD > latestSignal) {
    signal = IndicatorSignal.BUY;
  } else if (latestMACD < latestSignal) {
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
