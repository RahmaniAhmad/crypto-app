import { Signal, longPeriod, shortPeriod, stdDevMultiplier } from "@/const";
import { calculateEMA } from "./ema";

export function calculateMACD(
  closePrices: number[],
  shortPeriod: number,
  longPeriod: number,
  signalPeriod: number
): { macd: number[]; signalLine: number[] } {
  const shortEMA = calculateEMA(closePrices, shortPeriod);
  const longEMA = calculateEMA(closePrices, longPeriod);

  const macd: number[] = [];
  for (let i = 0; i < closePrices.length; i++) {
    macd.push(shortEMA[i] - longEMA[i]);
  }

  const signalLine = calculateEMA(macd, signalPeriod);

  return { macd, signalLine };
}
export function generateMacdSignal(
  closePrices: number[],

  shortPeriod: number,
  longPeriod: number,
  signalPeriod: number
): any {
  const { macd, signalLine } = calculateMACD(
    closePrices,
    shortPeriod,
    longPeriod,
    signalPeriod
  );

  const lastIdx = closePrices.length - 1;

  const currentMACD = macd[lastIdx];
  const currentSignalLine = signalLine[lastIdx];

  if (currentMACD > currentSignalLine) {
    return Signal.Sell;
  } else if (currentMACD < currentSignalLine) {
    return Signal.Buy;
  } else {
    return currentMACD + " , " + currentSignalLine; //Signal.Hold;
  }
}
export const getMacdSignals = async (histories: any[]) => {
  const signals: string[] = [];
  try {
    histories.forEach((history) => {
      const signal = generateMacdSignal(
        history.c,
        shortPeriod,
        longPeriod,
        stdDevMultiplier
      );
      signals.push(signal);
    });
  } catch (error) {
    console.error(error);
  }

  return signals;
};
