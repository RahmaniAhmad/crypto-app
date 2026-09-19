import {
  MarketHistory,
  MultiTimeframeHistory,
  TradingResolution,
} from "@/features/market/types";

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
