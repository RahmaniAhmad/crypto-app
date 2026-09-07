import { candleLimit, resolution } from "@/const";
import { MarketHistory } from "../market/types";

const BINANCE_FUTURES_API = "https://fapi.binance.com";

async function fetchWithTimeout(url: string, timeoutMs = 5000) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function get(binanceSymbol: string): Promise<MarketHistory> {
  try {
    const response = await fetchWithTimeout(
      `${BINANCE_FUTURES_API}/fapi/v1/klines?symbol=${binanceSymbol}&interval=${resolution}&limit=${candleLimit}`,
    );

    if (!response.ok) {
      const body = await response.text();

      console.error(
        `Binance klines failed for ${binanceSymbol}: ${response.status} ${body}`,
      );

      return {
        symbol: binanceSymbol.replace("USDT", ""),
        close: [],
      };
    }

    const candles = await response.json();

    return {
      symbol: binanceSymbol.replace("USDT", ""),
      close: candles.map((candle: any[]) => Number(candle[4])),
    };
  } catch (error) {
    console.error(`Failed to fetch candles for ${binanceSymbol}:`, error);

    return {
      symbol: binanceSymbol.replace("USDT", ""),
      close: [],
    };
  }
}

export async function getHistory(symbols: string[]): Promise<MarketHistory[]> {
  const histories = await Promise.all(symbols.map((symbol) => get(symbol)));

  return histories.filter((history) => history.close.length > 0);
}
