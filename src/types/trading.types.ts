export const TRADING_RESOLUTIONS = ["5m", "15m", "1h", "4h"] as const;

export type TradingResolution = (typeof TRADING_RESOLUTIONS)[number];

export enum Signal {
  BUY = "BUY",
  SELL = "SELL",
  NEUTRAL = "NEUTRAL",
}

export enum MarketType {
  USDT = "USDT",
  IRT = "IRT",
}
