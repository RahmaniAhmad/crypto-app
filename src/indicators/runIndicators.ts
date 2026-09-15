import { MarketHistory } from "@/market";

import { generateBollingerSignal } from "./bollinger";
import { generateMacdSignal } from "./macd";
import { generatePriceIndicator } from "./price";
import { generateRSISignal } from "./rsi";
import { generateSmaSignal } from "./sma";
import { generateSupportResistanceSignals } from "./supportResistanceBreakouts";
import { IndicatorResult } from "./types";
import { generateVolumeSignal } from "./Volume";
import { TradingResolution } from "@/types";
import { INDICATOR_CONFIGS } from "@/config";

export function runIndicators(
  history: MarketHistory,
  resolution: TradingResolution,
): IndicatorResult[] {
  const config = INDICATOR_CONFIGS[resolution];
  return [
    generatePriceIndicator(history.symbol, history.close),

    generateSmaSignal(history.symbol, history.close, config.SMA),

    generateRSISignal(history.symbol, history.close, config.RSI),

    generateMacdSignal(history.symbol, history.close, config.MACD),

    generateBollingerSignal(history.symbol, history.close, config.BOLLINGER),

    generateVolumeSignal(
      history.symbol,
      history.close,
      history.volume,
      config.VOLUME,
    ),

    ...generateSupportResistanceSignals(history.symbol, history.close),
  ];
}
