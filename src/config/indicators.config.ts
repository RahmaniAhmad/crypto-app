export const INDICATOR_CONFIGS = {
  "5m": {
    SMA: {
      shortPeriod: 9,
      longPeriod: 21,
    },
    BOLLINGER: {
      period: 20,
      stdDevMultiplier: 2,
    },
    MACD: {
      shortPeriod: 12,
      longPeriod: 26,
      signalPeriod: 9,
    },
    RSI: {
      period: 14,
    },
    VOLUME: {
      period: 20,
      threshold: 1.5,
    },
  },

  "15m": {
    SMA: {
      shortPeriod: 20,
      longPeriod: 50,
    },
    BOLLINGER: {
      period: 20,
      stdDevMultiplier: 2,
    },
    MACD: {
      shortPeriod: 12,
      longPeriod: 26,
      signalPeriod: 9,
    },
    RSI: {
      period: 14,
    },
    VOLUME: {
      period: 20,
      threshold: 1.5,
    },
  },

  "1h": {
    SMA: {
      shortPeriod: 20,
      longPeriod: 50,
    },
    BOLLINGER: {
      period: 20,
      stdDevMultiplier: 2,
    },
    MACD: {
      shortPeriod: 12,
      longPeriod: 26,
      signalPeriod: 9,
    },
    RSI: {
      period: 14,
    },
    VOLUME: {
      period: 20,
      threshold: 1.5,
    },
  },

  "4h": {
    SMA: {
      shortPeriod: 20,
      longPeriod: 50,
    },
    BOLLINGER: {
      period: 20,
      stdDevMultiplier: 2,
    },
    MACD: {
      shortPeriod: 12,
      longPeriod: 26,
      signalPeriod: 9,
    },
    RSI: {
      period: 14,
    },
    VOLUME: {
      period: 20,
      threshold: 1.5,
    },
  },
} as const;
