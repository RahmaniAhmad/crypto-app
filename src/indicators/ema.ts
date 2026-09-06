import { calculateSMA } from "./sma";

export const calculateEMA = (data: number[], period: number): number[] => {
  const emaValues: number[] = [];
  const multiplier = 2 / (period + 1);

  const sma = calculateSMA(data, period);
  emaValues[0] = sma;

  for (let i = 1; i < period; i++) {
    const emaValue =
      (data[i] - emaValues[i - 1]) * multiplier + emaValues[i - 1];
    emaValues.push(emaValue);
  }

  return emaValues;
};
