export enum Signal {
  buy = "BUY",
  sell = "SELL",
  neutral = "NEUTRAL",
}

export enum MarketType {
  usdt = "USDT",
  irt = "IRT",
}
export const periodPoint = 14; //days Short-Term Trading:7 or 14 days, Medium-Term Trading 30 or 60 days. Long-Term Investing 90 or 180 days
export const resolution = 60; //60, 180, 240, 360, 720, D, 2D, 3D

export const shortPeriodSMA = 168; //number of time units (e.g., days) , 30 days * 24 hours/4 = 180 periods
export const longPeriodSMA = 336; //number of time units (e.g., days) , 30 days * 24 hours/4 = 180 periods

export const periodBB = 336; // the number of time units
export const stdDevMultiplier = 2; //the number of standard deviations used to calculate the width of the Bollinger Bands

export const shortPeriod = 12; //the shorter time period used to calculate the Exponential Moving Average
export const longPeriod = 26; //the longer time period used to calculate the Exponential Moving Average
export const signalPeriod = 9; //the time period used to calculate the signal line

export const periodRSI = 336; // the number of candles, 1 day
export const overboughtThreshold = 60;
export const oversoldThreshold = 40;
