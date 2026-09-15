import { TradingResolution } from "@/types";
import { MarketHistory } from "./types";

export interface MarketProvider {
  getSymbols(limit?: number): Promise<string[]>;

  getHistory(
    symbols: string[],
    resolution: TradingResolution,
  ): Promise<MarketHistory[]>;
}
