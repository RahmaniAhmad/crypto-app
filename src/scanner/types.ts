import { IndicatorResult } from "@/indicators/types";

export type ScannerSignal =
  | "STRONG BUY"
  | "BUY"
  | "NEUTRAL"
  | "SELL"
  | "STRONG SELL";

export type SignalConfidence = "HIGH" | "MEDIUM" | "LOW";

export interface CryptoScanResult {
  symbol: string;

  score: number;

  signal: ScannerSignal;

  confidence: SignalConfidence;

  indicators: IndicatorResult[];
}
