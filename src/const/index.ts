export enum Signal {
  buy = "BUY",
  sell = "SELL",
  neutral = "NEUTRAL",
}

export enum MarketType {
  usdt = "USDT",
  irt = "IRT",
}
export const periodPoint = 180;
export const resolution = 240; //60, 180, 240, 360, 720, D, 2D, 3D

export const periodSMA = 180; //number of time units (e.g., days) , 30 days * 24 hours/4 = 180 periods
export const periodBB = 180; // the number of time units
export const stdDevMultiplier = 2; //the number of standard deviations used to calculate the width of the Bollinger Bands

export const shortPeriod = 12; //the shorter time period used to calculate the Exponential Moving Average
export const longPeriod = 26; //the longer time period used to calculate the Exponential Moving Average
export const signalPeriod = 9; //the time period used to calculate the signal line

export const periodRSI = 120; // 120 4-hour candles in 30 days
export const overboughtThreshold = 70;
export const oversoldThreshold = 30;

export const cryptos = [
  "BTC",
  "ETH",
  "ETC",
  "DOGE",
  "ADA",
  "BCH",
  "LTC",
  "BNB",
  "EOS",
  "XLM",
  "XRP",
  "TRX",
  "UNI",
  "LINK",
  "DAI",
  "DOT",
  "SHIB",
  "AAVE",
  "FTM",
  "MATIC",
  "AXS",
  "MANA",
  "SAND",
  "AVAX",
  "USDC",
  "GMT",
  "MKR",
  "SOL",
  "ATOM",
  "GRT",
  "BAT",
  "NEAR",
  "APE",
  "QNT",
  "CHZ",
  "XMR",
  "EGALA",
  "ALGO",
  "HBAR",
  "1INCH",
  "YFI",
  "FLOW",
  "SNX",
  "ENJ",
  "CRV",
  "FIL",
  "WBTC",
  "LDO",
  "DYDX",
  "APT",
  "MASK",
  "COMP",
  "BAL",
  "LRC",
  "LPT",
  "ENS",
  "SUSHI",
  "API3",
  "ONE",
  "GLM",
  "DAO",
  "CVC",
  "NMR",
  "STORJ",
  "SNT",
  "ANT",
  "ZRX",
  "SLP",
  "EGLD",
  "IMX",
  "BLUR",
  "100K_FLOKI",
  "1B_BABYDOGE",
  "1M_NFT",
  "1M_BTT",
  "T",
  "CELR",
  "ARB",
  "MAGIC",
  "GMX",
  "BAND",
  "CVX",
  "TON",
  "SSV",
  "MDT",
  "OMG",
  "WLD",
  "RDNT",
  "JST",
  "BICO",
  "RNDR",
  "WOO",
  "SKL",
  "GAL",
  "AGIX",
  "FET",
];
