import { getHistory } from "@/api";
import { Signal, periodSMA, symboles } from "@/const";

export function calculateSMA(closePrices: number[], period: number): number[] {
  const smaValues: number[] = [];

  for (let i = 0; i < closePrices.length; i++) {
    if (i < period - 1) {
      smaValues.push(1); // Not enough data for the initial period
    } else {
      const sum = closePrices
        .slice(i - period + 1, i + 1)
        .reduce((acc, val) => acc + val, 0);
      smaValues.push(sum / period);
    }
  }

  return smaValues;
}

export function generateSmaSignal(
  closePrices: number[],
  periodSMA: number
): Signal {
  const smaValues = calculateSMA(closePrices, periodSMA);

  const lastIdx = closePrices.length - 1;
  const currentClose = closePrices[lastIdx];
  const currentSMA = smaValues[lastIdx];

  if (currentClose > currentSMA) {
    return Signal.Sell;
  } else if (currentClose < currentSMA) {
    return Signal.Buy;
  } else {
    return Signal.Hold;
  }
}

export const getSmaSignals = async () => {
  const signals: string[] = [];

  await getHistory(symboles)
    .then((results) => {
      results.map((result) => {
        const signal = generateSmaSignal(result.c, periodSMA);
        signals.push(signal);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  return signals;
};
