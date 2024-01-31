import { Signal, periodBB, periodSMA } from "@/const";
import { calculateSMA } from "./sma";

export function calculateBollingerBands(
  closePrices: number[],
  period: number,
  stdDevMultiplier: number
): { upper: number[]; lower: number[] } {
  const smaValues = calculateSMA(closePrices, period);

  const upperBands: number[] = [];
  const lowerBands: number[] = [];

  for (let i = 0; i < closePrices.length; i++) {
    if (i < period - 1) {
      upperBands.push(1); // Not enough data for the initial period
      lowerBands.push(1); // Not enough data for the initial period
    } else {
      const slice = closePrices.slice(i - period + 1, i + 1);
      const sma = smaValues[i];
      const stdDev = Math.sqrt(
        slice.reduce((acc, val) => acc + Math.pow(val - sma, 2), 0) / period
      );

      upperBands.push(sma + stdDevMultiplier * stdDev);
      lowerBands.push(sma - stdDevMultiplier * stdDev);
    }
  }

  return { upper: upperBands, lower: lowerBands };
}

export function generateBollingerSignal(
  closePrices: number[],
  periodBB: number,
  stdDevMultiplier: number
): Signal {
  const { upper, lower } = calculateBollingerBands(
    closePrices,
    periodBB,
    stdDevMultiplier
  );

  const lastIdx = closePrices.length - 1;
  const currentClose = closePrices[lastIdx];
  const currentUpperBB = upper[lastIdx];
  const currentLowerBB = lower[lastIdx];

  if (currentClose > currentUpperBB) {
    return Signal.Sell;
  } else if (currentClose < currentLowerBB) {
    return Signal.Buy;
  } else {
    return Signal.Hold;
  }
}

export const getBollingerSignals = async (histories: any[]) => {
  const signals: string[] = [];

  try {
    histories.forEach((history) => {
      const signal = generateBollingerSignal(history.c, periodSMA, periodBB);
      signals.push(signal);
    });
  } catch (error) {
    console.error(error);
  }

  return signals;
};
