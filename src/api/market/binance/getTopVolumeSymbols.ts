const BINANCE_FUTURES_API = "https://fapi.binance.com";

export async function getTopVolumeSymbols(limit = 50): Promise<string[]> {
  try {
    const response = await fetch(`${BINANCE_FUTURES_API}/fapi/v1/ticker/24hr`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text();

      console.error(`Binance ticker failed: ${response.status} ${body}`);

      return [];
    }

    const data = await response.json();

    return data
      .filter((item: any) => item.symbol.endsWith("USDT"))
      .sort((a: any, b: any) => Number(b.quoteVolume) - Number(a.quoteVolume))
      .slice(0, limit)
      .map((item: any) => item.symbol);
  } catch (error) {
    console.error("Failed loading volume symbols:", error);

    return [];
  }
}
