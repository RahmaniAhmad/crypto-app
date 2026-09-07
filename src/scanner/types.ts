import { IndicatorResult } from "@/indicators/types";

export type ScannerSignal =
  | "STRONG_BUY"
  | "BUY"
  | "NEUTRAL"
  | "SELL"
  | "STRONG_SELL";

export interface CryptoScanResult {
  symbol: string;

  score: number;

  signal: ScannerSignal;

  indicators: IndicatorResult[];
}
