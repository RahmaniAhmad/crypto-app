import { MarketHistory } from "@/api/market/types";

import { generateSmaSignal } from "./sma";
import { generateRSISignal } from "./rsi";
import { generateMacdSignal } from "./macd";

export function runIndicators(history: MarketHistory) {
  return [
    generateSmaSignal(history.symbol, history.close),

    generateRSISignal(history.symbol, history.close),

    generateMacdSignal(history.symbol, history.close),
  ];
}
