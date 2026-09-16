import { CryptoAnalysis } from "@/indicators/types";

import { calculateSignalConfidence } from "./signalConfidence";
import { CryptoScanResult, ScannerSignal } from "./types";

const WEIGHTS = {
  SMA: 25,
  MACD: 35,
  RSI: 20,
  BOLLINGER: 20,
};

const VOLUME_BONUS = 10;

export function scanCryptos(cryptos: CryptoAnalysis[]): CryptoScanResult[] {
  return cryptos.map((crypto) => {
    let score = 0;

    for (const indicator of crypto.indicators) {
      const weight = WEIGHTS[indicator.indicator as keyof typeof WEIGHTS] ?? 0;

      if (indicator.signal === "BUY") {
        score += weight;
      }

      if (indicator.signal === "SELL") {
        score -= weight;
      }
    }

    const volumeIndicator = crypto.indicators.find(
      (x) => x.indicator === "VOLUME",
    );

    if (volumeIndicator?.signal === "BUY" && score > 0) {
      score += VOLUME_BONUS;
    }

    if (volumeIndicator?.signal === "SELL" && score < 0) {
      score -= VOLUME_BONUS;
    }

    score = Math.max(-100, Math.min(100, score));

    const directionalIndicators = crypto.indicators.filter(
      (x) => x.indicator !== "VOLUME" && x.indicator !== "PRICE",
    );

    const buySignals = directionalIndicators.filter(
      (x) => x.signal === "BUY",
    ).length;

    const sellSignals = directionalIndicators.filter(
      (x) => x.signal === "SELL",
    ).length;

    let signal: ScannerSignal = "NEUTRAL";

    if (buySignals >= 4 && score >= 75) {
      signal = "STRONG BUY";
    } else if (sellSignals >= 4 && score <= -75) {
      signal = "STRONG SELL";
    } else if (buySignals >= 3 && score >= 50) {
      signal = "BUY";
    } else if (sellSignals >= 3 && score <= -50) {
      signal = "SELL";
    }

    const confidence = calculateSignalConfidence(buySignals, sellSignals);

    return {
      symbol: crypto.symbol,
      score,
      signal,
      confidence,
      indicators: crypto.indicators,
    };
  });
}
