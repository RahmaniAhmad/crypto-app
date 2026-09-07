export function calculateEMA(data: number[], period: number): number[] {
  if (data.length < period) {
    return [];
  }

  const multiplier = 2 / (period + 1);

  const ema: number[] = [];

  const firstSMA =
    data.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  ema.push(firstSMA);

  for (let i = period; i < data.length; i++) {
    const value =
      (data[i] - ema[ema.length - 1]) * multiplier + ema[ema.length - 1];

    ema.push(value);
  }

  return ema;
}
