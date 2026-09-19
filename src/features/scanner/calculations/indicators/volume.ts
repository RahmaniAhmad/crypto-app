import { IndicatorResult, IndicatorSignal } from "./types";

interface VolumeConfig {
  period: number;
  threshold: number;
}

function calculateAverageVolume(volumes: number[], period: number): number {
  if (volumes.length < period) {
    return NaN;
  }

  const values = volumes.slice(-period);

  return values.reduce((sum, value) => sum + value, 0) / period;
}

export function generateVolumeSignal(
  symbol: string,
  closePrices: number[],
  volumes: number[],
  config: VolumeConfig,
): IndicatorResult {
  if (closePrices.length < 2 || volumes.length < config.period) {
    return {
      symbol,
      indicator: "VOLUME",
      signal: IndicatorSignal.NEUTRAL,
      strength: 0,
    };
  }

  const currentVolume = volumes[volumes.length - 1];

  const averageVolume = calculateAverageVolume(
    volumes.slice(0, -1),
    config.period,
  );

  if (Number.isNaN(averageVolume) || averageVolume <= 0) {
    return {
      symbol,
      indicator: "VOLUME",
      signal: IndicatorSignal.NEUTRAL,
      strength: 0,
    };
  }

  const volumeRatio = currentVolume / averageVolume;

  const currentClose = closePrices[closePrices.length - 1];
  const previousClose = closePrices[closePrices.length - 2];

  const volumeStrength = Math.min(
    ((volumeRatio - 1) / (config.threshold - 1)) * 100,
    100,
  );

  let signal = IndicatorSignal.NEUTRAL;

  if (volumeRatio >= config.threshold) {
    if (currentClose > previousClose) {
      signal = IndicatorSignal.BUY;
    } else if (currentClose < previousClose) {
      signal = IndicatorSignal.SELL;
    }
  }

  return {
    symbol,
    indicator: "VOLUME",
    signal,
    strength: Math.max(volumeStrength, 0),
    value: volumeRatio,
  };
}
