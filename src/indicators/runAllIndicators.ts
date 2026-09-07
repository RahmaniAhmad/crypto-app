import { MarketHistory } from "@/api/market/types";
import { runIndicators } from "./runIndicators";

export function runAllIndicators(histories: MarketHistory[]) {
  return histories.map((history) => ({
    symbol: history.symbol,
    indicators: runIndicators(history),
  }));
}
