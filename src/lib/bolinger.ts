type BollingerBands = { upper: number[]; middle: number[]; lower: number[] };

export function calculateMovingAverage(
  closes: number[],
  period: number
): number[] {
  const ma: number[] = [];

  for (let i = period - 1; i < closes.length; i++) {
    const sum = closes
      .slice(i - period + 1, i + 1)
      .reduce((acc, val) => acc + val, 0);
    ma.push(sum / period);
  }

  return ma;
}

export function calculateBollingerBands(
  closes: number[],
  period: number,
  numStdDev: number
): BollingerBands {
  const middleBand = calculateMovingAverage(closes, period);
  const squaredDeviations: number[] = [];

  for (let i = 0; i < closes.length; i++) {
    const start = Math.max(0, i - period + 1);
    const sumSquaredDeviations = closes
      .slice(start, i + 1)
      .map((price) => Math.pow(price - middleBand[i], 2))
      .reduce((sum, deviation) => sum + deviation, 0);
    const stdDev = Math.sqrt(sumSquaredDeviations / Math.min(i + 1, period));
    squaredDeviations.push(stdDev);
  }

  const upperBand = middleBand.map(
    (value, i) => value + numStdDev * squaredDeviations[i]
  );
  const lowerBand = middleBand.map(
    (value, i) => value - numStdDev * squaredDeviations[i]
  );

  return { upper: upperBand, middle: middleBand, lower: lowerBand };
}

export function identifyBollingerSignals(
  closes: number[],
  bollingerBands: BollingerBands
): { index: number; signal: string; price: number }[] {
  const signals: { index: number; signal: string; price: number }[] = [];

  for (let i = bollingerBands.upper.length - 1; i >= 0; i--) {
    const currentPrice = closes[i];
    const upperBand = bollingerBands.upper[i];
    const lowerBand = bollingerBands.lower[i];

    if (currentPrice > upperBand) {
      signals.push({ index: i, signal: "Sell", price: currentPrice });
    } else if (currentPrice < lowerBand) {
      signals.push({ index: i, signal: "Buy", price: currentPrice });
    }
  }

  return signals.reverse(); // Reverse the order to have signals in chronological order
}

// Example usage:
const closes: number[] = [100, 105, 102, 98, 110, 112, 115, 120, 118, 122];
const period: number = 5;
const numStdDev: number = 2;

const bollingerBands = calculateBollingerBands(closes, period, numStdDev);
const bollingerSignals = identifyBollingerSignals(closes, bollingerBands);

console.log("Bollinger Bands Signals:", bollingerSignals);
