import { IndicatorResult } from "../calculations";
import { ScannerSignal } from "./signal";
import { MultiTimeframeAnalysis } from "./timeframe";

export interface CryptoScanResult {
  symbol: string;
  score: number;
  signal: ScannerSignal;
  indicators: IndicatorResult[];
  multiTimeframe: MultiTimeframeAnalysis;
}
