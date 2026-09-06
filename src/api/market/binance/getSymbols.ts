const BINANCE_FUTURES_API = "https://fapi.binance.com";

export async function getBinanceSymbols(): Promise<string[]> {
  const response = await fetch(`${BINANCE_FUTURES_API}/fapi/v1/exchangeInfo`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Binance symbols");
  }

  const data = await response.json();

  return data.symbols
    .filter(
      (item: any) => item.status === "TRADING" && item.quoteAsset === "USDT",
    )
    .map((item: any) => item.symbol);
}
