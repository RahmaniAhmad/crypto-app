import {
  IndicatorResult,
  IndicatorSignal,
} from "@/features/scanner/calculations/indicators/types";
import { MultiTimeframeAnalysis, TimeframeSignal } from "../types";

function getDirectionalSignal(indicators: IndicatorResult[]): TimeframeSignal {
  const directionalIndicators = indicators.filter(
    (indicator) =>
      indicator.indicator !== "VOLUME" && indicator.indicator !== "PRICE",
  );

  const buySignals = directionalIndicators.filter(
    (indicator) => indicator.signal === IndicatorSignal.BUY,
  ).length;

  const sellSignals = directionalIndicators.filter(
    (indicator) => indicator.signal === IndicatorSignal.SELL,
  ).length;

  if (buySignals > sellSignals) {
    return "BUY";
  }

  if (sellSignals > buySignals) {
    return "SELL";
  }

  return "NEUTRAL";
}

export function analyzeMultiTimeframe(
  higherIndicators: IndicatorResult[],
  primaryIndicators: IndicatorResult[],
  entryIndicators: IndicatorResult[],
): MultiTimeframeAnalysis {
  return {
    higher: getDirectionalSignal(higherIndicators),
    primary: getDirectionalSignal(primaryIndicators),
    entry: getDirectionalSignal(entryIndicators),
  };
}
