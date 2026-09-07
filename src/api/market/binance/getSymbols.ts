const BINANCE_FUTURES_API = "https://fapi.binance.com";

export async function getBinanceSymbols(): Promise<string[]> {
  try {
    const response = await fetch(
      `${BINANCE_FUTURES_API}/fapi/v1/exchangeInfo`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const body = await response.text();

      console.error(`Binance exchangeInfo failed: ${response.status} ${body}`);

      return [];
    }

    const data = await response.json();

    return data.symbols
      .filter(
        (item: any) =>
          item.status === "TRADING" &&
          item.quoteAsset === "USDT" &&
          item.contractType === "PERPETUAL",
      )
      .map((item: any) => item.symbol);
  } catch (error) {
    console.error("Failed to fetch Binance symbols:", error);

    return [];
  }
}
