import { MarketHistory } from "@/api/market/types";
import { runIndicators } from "./runIndicators";
import { CryptoAnalysis } from "./types";

export function runAllIndicators(histories: MarketHistory[]): CryptoAnalysis[] {
  return histories.map((history) => ({
    symbol: history.symbol,
    indicators: runIndicators(history),
  }));
}
