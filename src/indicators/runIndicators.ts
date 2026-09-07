import { MarketHistory } from "@/api/market/types";

import { generateSmaSignal } from "./sma";
import { generateRSISignal } from "./rsi";
import { generateMacdSignal } from "./macd";
import { generateBollingerSignal } from "./bollinger";
import { generatePriceIndicator } from "./price";
import { generateSupportResistanceSignals } from "./supportResistanceBreakouts";

export function runIndicators(history: MarketHistory) {
  return [
    generatePriceIndicator(history.symbol, history.close),

    generateSmaSignal(history.symbol, history.close),

    generateRSISignal(history.symbol, history.close),

    generateMacdSignal(history.symbol, history.close),

    generateBollingerSignal(history.symbol, history.close),

    ...generateSupportResistanceSignals(history.symbol, history.close),
  ];
}
