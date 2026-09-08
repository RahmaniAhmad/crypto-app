import { IndicatorResult } from "@/indicators/types";

export type ScannerSignal =
  | "STRONG BUY"
  | "BUY"
  | "NEUTRAL"
  | "SELL"
  | "STRONG SELL";

export interface CryptoScanResult {
  symbol: string;

  score: number;

  signal: ScannerSignal;

  indicators: IndicatorResult[];
}
