import { IndicatorResult } from "./indicators/types";

export interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}
