import { VOLUME_CONFIG } from "@/config";
import { IndicatorResult, IndicatorSignal } from "./types";

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
): IndicatorResult {
  if (closePrices.length < 2 || volumes.length < VOLUME_CONFIG.period) {
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
    VOLUME_CONFIG.period,
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
    ((volumeRatio - 1) / (VOLUME_CONFIG.threshold - 1)) * 100,
    100,
  );

  let signal = IndicatorSignal.NEUTRAL;

  if (volumeRatio >= VOLUME_CONFIG.threshold) {
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
