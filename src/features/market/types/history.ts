export interface MarketHistory {
  symbol: string;
  close: number[];
  volume: number[];
}

export interface MultiTimeframeHistory {
  higher: MarketHistory;
  primary: MarketHistory;
  entry: MarketHistory;
}
