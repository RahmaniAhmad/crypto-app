import { generateBollingerSignal } from "./indicators/bollinger";
import { generateMacdSignal } from "./indicators/macd";
import { generatePriceIndicator } from "./indicators/price";
import { generateRSISignal } from "./indicators/rsi";
import { generateSmaSignal } from "./indicators/sma";
import { generateSupportResistanceSignals } from "./patterns/supportResistanceBreakouts";
import { IndicatorResult } from "./indicators/types";
import { generateVolumeSignal } from "./indicators/volume";
import { MarketHistory, TradingResolution } from "@/features/market/types";
import { INDICATOR_CONFIGS } from "@/features/scanner/config/indicators";

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
