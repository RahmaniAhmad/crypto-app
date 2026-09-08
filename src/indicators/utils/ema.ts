export function calculateEMA(data: number[], period: number): number[] {
  if (data.length < period || period <= 0) {
    return [];
  }

  const multiplier = 2 / (period + 1);

  const ema: number[] = [];

  // First EMA value starts with SMA
  const firstSMA =
    data.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  ema.push(firstSMA);

  // Calculate remaining EMA values
  for (let i = period; i < data.length; i++) {
    const previousEMA = ema[ema.length - 1];

    const currentEMA = (data[i] - previousEMA) * multiplier + previousEMA;

    ema.push(currentEMA);
  }

  return ema;
}
