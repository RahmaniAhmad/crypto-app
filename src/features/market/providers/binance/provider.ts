import { MARKET_CONFIG } from "@/features/market/config/market";

import { BinanceClient } from "./client";
import {
  MarketHistory,
  MultiTimeframeHistory,
  TradingResolution,
} from "@/features/market/types";
import { MarketProvider } from "../../marketProvider";

export class BinanceMarketProvider implements MarketProvider {
  constructor(private readonly client = new BinanceClient()) {}

  async getSymbols(
    limit = MARKET_CONFIG.marketSymbolLimit ?? 50,
  ): Promise<string[]> {
    try {
      const [exchangeInfo, ticker] = await Promise.all([
        this.client.getExchangeInfo(),
        this.client.get24hrTicker(),
      ]);

      const availableSymbols = new Set(
        exchangeInfo.symbols
          .filter(
            (item: any) =>
              item.status === "TRADING" && item.quoteAsset === "USDT",
          )
          .map((item: any) => item.symbol),
      );

      return ticker
        .filter((item: any) => availableSymbols.has(item.symbol))
        .sort((a: any, b: any) => Number(b.quoteVolume) - Number(a.quoteVolume))
        .slice(0, limit)
        .map((item: any) => item.symbol);
    } catch (error) {
      console.error("Failed to fetch Binance symbols:", error);

      return [];
    }
  }

  async getHistory(
    symbols: string[],
    resolution: TradingResolution,
  ): Promise<MarketHistory[]> {
    const histories = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const candles = await this.client.getKlines(
            symbol,
            resolution,
            MARKET_CONFIG.candleLimit,
          );

          const close = candles.map((candle) => Number(candle[4]));
          const volume = candles.map((candle) => Number(candle[5]));

          if (close.length === 0) {
            return null;
          }

          return {
            symbol: symbol.replace("USDT", ""),
            close,
            volume,
          };
        } catch (error) {
          console.error(`Failed to fetch history for ${symbol}:`, error);

          return null;
        }
      }),
    );

    return histories.filter(
      (history): history is MarketHistory => history !== null,
    );
  }

  async getMultiTimeframeHistory(
    symbols: string[],
  ): Promise<Record<string, MultiTimeframeHistory>> {
    const [higher, primary, entry] = await Promise.all([
      this.getHistory(symbols, "4h"),
      this.getHistory(symbols, "1h"),
      this.getHistory(symbols, "15m"),
    ]);

    const higherMap = new Map(higher.map((item) => [item.symbol, item]));

    const primaryMap = new Map(primary.map((item) => [item.symbol, item]));

    const entryMap = new Map(entry.map((item) => [item.symbol, item]));

    const result: Record<string, MultiTimeframeHistory> = {};

    for (const symbol of symbols) {
      const normalizedSymbol = symbol.replace("USDT", "");

      const higherHistory = higherMap.get(normalizedSymbol);
      const primaryHistory = primaryMap.get(normalizedSymbol);
      const entryHistory = entryMap.get(normalizedSymbol);

      if (!higherHistory || !primaryHistory || !entryHistory) {
        continue;
      }

      result[normalizedSymbol] = {
        higher: higherHistory,
        primary: primaryHistory,
        entry: entryHistory,
      };
    }

    return result;
  }
}
