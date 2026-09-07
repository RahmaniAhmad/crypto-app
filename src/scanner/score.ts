import { IndicatorResult, IndicatorSignal } from "@/indicators/types";

export function calculateScore(indicators: IndicatorResult[]): number {
  let score = 0;

  for (const indicator of indicators) {
    switch (indicator.signal) {
      case IndicatorSignal.BUY:
        score += 1;
        break;

      case IndicatorSignal.SELL:
        score -= 1;
        break;
    }
  }

  return score;
}
