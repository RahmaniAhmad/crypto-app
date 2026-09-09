import { MarketHistory } from "./types";

export interface MarketProvider {
  getSymbols(limit?: number): Promise<string[]>;

  getHistory(symbols: string[]): Promise<MarketHistory[]>;
}
