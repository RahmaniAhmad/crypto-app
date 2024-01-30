export function calculateEMA(data: number[], period: number): number[] {
  const emaValues: number[] = [];
  const multiplier = 2 / (period + 1);

  emaValues[0] = data[0]; // Initial value is the same as the first data point

  for (let i = 1; i < data.length; i++) {
    emaValues[i] = (data[i] - emaValues[i - 1]) * multiplier + emaValues[i - 1];
  }

  return emaValues;
}
