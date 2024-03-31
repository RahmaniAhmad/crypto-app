import { Signal, periodBB, stdDevMultiplier } from "@/const";
import { calculateSMA } from "./sma";

export function calculateBollingerBands(
  closePrices: number[],
  period: number,
  stdDevMultiplier: number
): { upper: number[]; lower: number[]; middle: number } {
  const sma = calculateSMA(closePrices, period);

  const upperBands: number[] = [];
  const lowerBands: number[] = [];

  for (let i = 0; i < closePrices.length; i++) {
    if (i < period - 1) {
      upperBands.push(1); // Not enough data for the initial period
      lowerBands.push(1); // Not enough data for the initial period
    } else {
      const slice = closePrices.slice(i - period + 1, i + 1);
      const stdDev = Math.sqrt(
        slice.reduce((acc, val) => acc + Math.pow(val - sma, 2), 0) /
          slice.length
      );
      upperBands.push(sma + stdDevMultiplier * stdDev);
      lowerBands.push(sma - stdDevMultiplier * stdDev);
    }
  }
  return { upper: upperBands, lower: lowerBands, middle: sma };
}

export function generateBollingerSignal(
  closePrices: number[],
  periodBB: number,
  stdDevMultiplier: number
): Signal {
  const { upper, lower, middle } = calculateBollingerBands(
    closePrices,
    periodBB,
    stdDevMultiplier
  );

  const lastIdx = closePrices.length - 1;
  const currentClose = closePrices[lastIdx];
  const currentUpperBB = upper[lastIdx];
  const currentLowerBB = lower[lastIdx];
  debugger;
  if (currentClose > currentUpperBB) {
    return Signal.sell;
  } else if (currentClose < currentLowerBB) {
    return Signal.buy;
  } else {
    return Signal.neutral;
  }
}

export const getBollingerSignals = async (histories: any[]) => {
  const signals: string[] = [];

  try {
    histories.forEach((history) => {
      const signal = generateBollingerSignal(
        history.c,
        periodBB,
        stdDevMultiplier
      );
      signals.push(signal);
    });
  } catch (error) {
    console.error(error);
  }

  return signals;
};
