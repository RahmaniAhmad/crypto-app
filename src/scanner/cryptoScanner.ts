import { CryptoAnalysis } from "@/indicators/types";
import { CryptoScanResult, ScannerSignal } from "./types";

const WEIGHTS = {
  SMA: 25,
  MACD: 35,
  RSI: 20,
  BOLLINGER: 20,
};

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

    const buySignals = crypto.indicators.filter(
      (x) => x.signal === "BUY",
    ).length;

    const sellSignals = crypto.indicators.filter(
      (x) => x.signal === "SELL",
    ).length;

    let signal: ScannerSignal = "NEUTRAL";

    if (buySignals >= 4 && score >= 75) {
      signal = "STRONG BUY";
    } else if (sellSignals >= 4 && score <= -75) {
      signal = "STRONG SELL";
    }

    // Normal signals
    else if (buySignals >= 3 && score >= 50) {
      signal = "BUY";
    } else if (sellSignals >= 3 && score <= -50) {
      signal = "SELL";
    }

    return {
      symbol: crypto.symbol,
      score,
      signal,
      indicators: crypto.indicators,
    };
  });
}
