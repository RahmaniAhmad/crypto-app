import {
  Signal,
  periodRSI,
  overboughtThreshold,
  oversoldThreshold,
} from "@/const";
import { calculateSMA } from "./sma";

export function calculateRSI(closePrices: number[], period: number): number {
  const prices = closePrices.slice(
    closePrices.length - period,
    closePrices.length
  );
  const changes: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }

  const gains: number[] = [0];
  const losses: number[] = [0];

  for (let i = 0; i < changes.length; i++) {
    if (changes[i] > 0) {
      gains.push(changes[i]);
    } else {
      gains.push(0);
    }

    if (changes[i] < 0) {
      losses.push(Math.abs(changes[i]));
    } else {
      losses.push(0);
    }
  }
  const avgGain = calculateSMA(gains, period);
  const avgLoss = calculateSMA(losses, period);

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
