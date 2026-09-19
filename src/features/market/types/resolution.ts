export const TRADING_RESOLUTIONS = ["5m", "15m", "1h", "4h"] as const;

export type TradingResolution = (typeof TRADING_RESOLUTIONS)[number];
