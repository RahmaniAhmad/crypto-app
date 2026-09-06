import { MarketHistory } from "../types";

const BASE_URL = "https://fapi.binance.com";

export async function getBinanceHistory(
  symbol: string,
): Promise<MarketHistory> {
  const response = await fetch(
    `${BASE_URL}/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=500`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Binance error: ${symbol}`);
  }

  const candles = await response.json();

  return {
    symbol: symbol.replace("USDT", ""),
    close: candles.map((candle: any[]) => Number(candle[4])),
  };
}
