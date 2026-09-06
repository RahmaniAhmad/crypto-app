import { mapToBinanceSymbols } from "../market";
import { getBinanceSymbols } from "../market/binance/getSymbols";

const BINANCE_FUTURES_API = "https://fapi.binance.com";

async function get(binanceSymbol: string) {
  const response = await fetch(
    `${BINANCE_FUTURES_API}/fapi/v1/klines?symbol=${binanceSymbol}&interval=5m&limit=500`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const body = await response.text();

    console.error(
      `Binance API failed for ${binanceSymbol}: ${response.status} ${body}`,
    );

    return {
      symbol: binanceSymbol.replace("USDT", ""),
      c: [],
    };
  }

  const candles = await response.json();

  return {
    symbol: binanceSymbol.replace("USDT", ""),
    c: candles.map((candle: any[]) => Number(candle[4])),
  };
}

export async function getHistory(symbols: string[]) {
  const availableBinanceSymbols = await getBinanceSymbols();

  const binanceSymbols = mapToBinanceSymbols(symbols, availableBinanceSymbols);

  return Promise.all(binanceSymbols.map((symbol) => get(symbol)));
}
