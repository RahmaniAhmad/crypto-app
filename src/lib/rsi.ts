import {
  Signal,
  periodRSI,
  overboughtThreshold,
  oversoldThreshold,
} from "@/const";
import { calculateSMA } from "./sma";

export function calculateRSI(closePrices: number[], period: number): number[] {
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

  const avgGain = calculateSMA(gains, period);
  const avgLoss = calculateSMA(losses, period);

  const rsiValues: number[] = [];
  for (let i = period; i < closePrices.length; i++) {
    const relativeStrength = avgGain[i - period] / avgLoss[i - period];
    const rsi = 100 - 100 / (1 + relativeStrength);
    rsiValues.push(rsi);
  }

  return rsiValues;
}

export function generateRSISignal(
  closePrices: number[],
  periodRSI: number,
  overboughtThreshold: number,
  oversoldThreshold: number
): Signal {
  const rsiValues = calculateRSI(closePrices, periodRSI);
  const lastIdx = rsiValues.length - 1;
  const currentRSI = rsiValues[lastIdx];

  if (currentRSI > overboughtThreshold) {
    return Signal.Sell;
  } else if (currentRSI < oversoldThreshold) {
    return Signal.Buy;
  } else {
    return Signal.Hold;
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
