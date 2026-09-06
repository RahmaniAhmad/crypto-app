import { Signal, longPeriod, shortPeriod, signalPeriod } from "@/const";
import { calculateEMA } from "./ema";

function padArray(array: number[], length: number): number[] {
  if (array.length >= length) {
    return array;
  }
  const padding = Array(length - array.length).fill(0);
  return padding.concat(array);
}

export const calculateMACD = (
  closePrices: number[],
  shortPeriod: number,
  longPeriod: number
): { macdLine: number[] } => {
  const shortEMAs = calculateEMA(closePrices, shortPeriod);
  const longEMAs = calculateEMA(closePrices, longPeriod);

  const alignedShortEMAs = padArray(shortEMAs, longPeriod);
  const alignedLongEMAs = padArray(longEMAs, longPeriod);

  const macdLine: number[] = [];
  for (let i = shortPeriod; i < longPeriod; i++) {
    macdLine.push(alignedShortEMAs[i] - alignedLongEMAs[i]);
  }

  return { macdLine };
};
export function generateMacdSignal(
  closePrices: number[],
  shortPeriod: number,
  longPeriod: number,
  signalPeriod: number
): any {
  const { macdLine } = calculateMACD(closePrices, shortPeriod, longPeriod);

  const signalLine = calculateEMA(macdLine, signalPeriod);

  const latestMacd = macdLine[macdLine.length - 1];
  const latestSignal = signalLine[signalLine.length - 1];

  if (latestMacd > latestSignal) {
    return Signal.buy;
  } else if (latestMacd < latestSignal) {
    return Signal.sell;
  } else {
    return Signal.neutral;
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
        signalPeriod
      );
      signals.push(signal);
    });
  } catch (error) {
    console.error(error);
  }

  return signals;
};
