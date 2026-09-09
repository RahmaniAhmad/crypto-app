import { TRADING_CONFIG } from "@/config";

import { MarketProvider } from "../marketProvider";
import { MarketHistory } from "../types";
import { BinanceClient } from "./client";

export class BinanceMarketProvider implements MarketProvider {
  constructor(private readonly client = new BinanceClient()) {}

  async getSymbols(
    limit = TRADING_CONFIG.marketSymbolLimit ?? 50,
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

  async getHistory(symbols: string[]): Promise<MarketHistory[]> {
    const histories = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const candles = await this.client.getKlines(
            symbol,
            TRADING_CONFIG.resolution,
            TRADING_CONFIG.candleLimit,
          );

          const close = candles.map((candle) => Number(candle[4]));

          if (close.length === 0) {
            return null;
          }

          return {
            symbol: symbol.replace("USDT", ""),
            close,
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
}
