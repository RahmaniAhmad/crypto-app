import { Signal, shortPeriodSMA, longPeriodSMA } from "@/const";

export function calculateSMA(closePrices: number[], period: number): number {
  const sum = closePrices
    .slice(closePrices.length - period, closePrices.length)
    .reduce((acc, val) => acc + val, 0);
  return sum / period;
}

export function generateSmaSignal(closePrices: number[]): Signal {
  const longSMA = calculateSMA(closePrices, longPeriodSMA);
  const shortSMA = calculateSMA(closePrices, shortPeriodSMA);

  if (longSMA > shortSMA) {
    return Signal.sell;
  } else if (longSMA < shortSMA) {
    return Signal.buy;
  } else {
    return Signal.neutral;
  }
}

export const getSmaSignals = async (histories: any[]) => {
  const signals: string[] = [];
  try {
    histories.forEach((history) => {
      const signal = generateSmaSignal(history.c);
      signals.push(signal);
    });
  } catch (error) {
    console.error(error);
  }

  return signals;
};
