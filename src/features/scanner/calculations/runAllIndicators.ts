import { MarketHistory, TradingResolution } from "@/features/market/types";
import { runIndicators } from "./runIndicators";
import { CryptoAnalysis } from "./types";

export function runAllIndicators(
  histories: MarketHistory[],
  resolution: TradingResolution,
): CryptoAnalysis[] {
  return histories.map((history) => ({
    symbol: history.symbol,
    indicators: runIndicators(history, resolution),
  }));
}
