import { TradingResolution } from "@/types";

import { MarketHistory, MultiTimeframeHistory } from "./types";

export interface MarketProvider {
  getSymbols(limit?: number): Promise<string[]>;

  getHistory(
    symbols: string[],
    resolution: TradingResolution,
  ): Promise<MarketHistory[]>;

  getMultiTimeframeHistory(
    symbols: string[],
  ): Promise<Record<string, MultiTimeframeHistory>>;
}
