import { MarketHistory } from "./types";

export interface MarketProvider {
  getHistory(symbols: string[]): Promise<MarketHistory[]>;
}
