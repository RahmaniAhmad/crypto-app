export enum Signal {
  buy = "BUY",
  sell = "SELL",
  neutral = "NEUTRAL",
}

export enum MarketType {
  usdt = "USDT",
  irt = "IRT",
}

// Candle timeframe
export const resolution = "5m";
export const candleLimit = 500;

// =====================
// SMA
// =====================

// Fast trend
export const shortPeriodSMA = 20;

// Slow trend
export const longPeriodSMA = 50;

// =====================
// Bollinger Bands
// =====================

export const periodBB = 20;

export const stdDevMultiplier = 2;

// =====================
// MACD
// =====================

export const shortPeriod = 12;

export const longPeriod = 26;

export const signalPeriod = 9;

// =====================
// RSI
// =====================

export const periodRSI = 14;

export const overboughtThreshold = 70;

export const oversoldThreshold = 30;
