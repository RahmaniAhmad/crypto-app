import { MarketHistory } from "@/market";

import { generateBollingerSignal } from "./bollinger";
import { generateMacdSignal } from "./macd";
import { generatePriceIndicator } from "./price";
import { generateRSISignal } from "./rsi";
import { generateSmaSignal } from "./sma";
import { generateSupportResistanceSignals } from "./supportResistanceBreakouts";
import { IndicatorResult } from "./types";
import { generateVolumeSignal } from "./Volume";

export function runIndicators(history: MarketHistory): IndicatorResult[] {
  return [
    generatePriceIndicator(history.symbol, history.close),

    generateSmaSignal(history.symbol, history.close),

    generateRSISignal(history.symbol, history.close),

    generateMacdSignal(history.symbol, history.close),

    generateBollingerSignal(history.symbol, history.close),

    generateVolumeSignal(history.symbol, history.close, history.volume),

    ...generateSupportResistanceSignals(history.symbol, history.close),
  ];
}
