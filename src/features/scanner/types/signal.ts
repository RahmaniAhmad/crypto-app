export enum Signal {
  BUY = "BUY",
  SELL = "SELL",
  NEUTRAL = "NEUTRAL",
}

export type ScannerSignal =
  | "STRONG BUY"
  | "BUY"
  | "NEUTRAL"
  | "SELL"
  | "STRONG SELL";
