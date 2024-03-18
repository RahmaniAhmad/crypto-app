import {
  Signal,
  periodRSI,
  overboughtThreshold,
  oversoldThreshold,
} from "@/const";
import { calculateSMA } from "./sma";

export function calculateRSI(closePrices: number[], period: number): number {
  const changes: number[] = [];
  for (let i = 1; i < closePrices.length; i++) {
    changes.push(closePrices[i] - closePrices[i - 1]);
  }

  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 0; i < changes.length; i++) {
    if (changes[i] > 0) {
      gains.push(changes[i]);
      losses.push(0);
    } else {
      gains.push(0);
      losses.push(Math.abs(changes[i]));
    }
  }

  const avgGain = calculateSMA(gains, gains.length);
  const avgLoss = calculateSMA(losses, losses.length);

  const relativeStrength = avgGain / avgLoss;
  const rsi = 100 - 100 / (1 + relativeStrength);

  return rsi;
}

export function generateRSISignal(
  closePrices: number[],
  periodRSI: number,
  overboughtThreshold: number,
  oversoldThreshold: number
): Signal {
  const rsi = calculateRSI(closePrices, periodRSI);
  // const lastIdx = rsiValues.length - 1;
  // const currentRSI = rsiValues[lastIdx];
  if (rsi > overboughtThreshold) {
    return Signal.sell;
  } else if (rsi < oversoldThreshold) {
    return Signal.buy;
  } else {
    return Signal.neutral;
  }
}

export const getRSISignals = async (histories: any[]) => {
  const signals: string[] = [];
  try {
    histories.forEach((history) => {
      const signal = generateRSISignal(
        history.c,
        periodRSI,
        overboughtThreshold,
        oversoldThreshold
      );
      signals.push(signal);
    });
  } catch (error) {
    console.error(error);
  }

  return signals;
};
