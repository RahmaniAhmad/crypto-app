export enum IndicatorSignal {
  BUY = "BUY",
  SELL = "SELL",
  NEUTRAL = "NEUTRAL",
}

export interface IndicatorResult {
  symbol: string;
  indicator: string;
  signal: IndicatorSignal;
  strength: number;
  value?: number;
}

export interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}
