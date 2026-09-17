import { IndicatorResult } from "@/indicators/types";

export type ScannerSignal =
  | "STRONG BUY"
  | "BUY"
  | "NEUTRAL"
  | "SELL"
  | "STRONG SELL";

export type Signal = "HIGH" | "MEDIUM" | "LOW";

export type TimeframeSignal = "BUY" | "SELL" | "NEUTRAL";

export interface MultiTimeframeAnalysis {
  higher: TimeframeSignal; // 4H
  primary: TimeframeSignal; // 1H
  entry: TimeframeSignal; // 15M
}

export interface CryptoScanResult {
  symbol: string;
  score: number;
  signal: ScannerSignal;
  indicators: IndicatorResult[];
  multiTimeframe: MultiTimeframeAnalysis;
}

export type MultiTimeframeMap = Record<string, MultiTimeframeAnalysis>;
