import { IndicatorResult } from "@/features/scanner/calculations/indicators/types";
import { Signal } from "../types";

export function getIndicator(indicators: IndicatorResult[], name: string) {
  return indicators.find((x) => x.indicator === name);
}

export function getSignal(indicators: IndicatorResult[], name: string) {
  return getIndicator(indicators, name)?.signal ?? Signal.NEUTRAL;
}
