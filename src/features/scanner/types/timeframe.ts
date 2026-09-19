export type TimeframeSignal = "BUY" | "SELL" | "NEUTRAL";

export interface MultiTimeframeAnalysis {
  higher: TimeframeSignal; // 4H
  primary: TimeframeSignal; // 1H
  entry: TimeframeSignal; // 15M
}

export type MultiTimeframeMap = Record<string, MultiTimeframeAnalysis>;
