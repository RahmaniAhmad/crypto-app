const BINANCE_FUTURES_API = "https://fapi.binance.com";

export class BinanceClient {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BINANCE_FUTURES_API}${endpoint}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const body = await response.text();

        throw new Error(`Binance API error: ${response.status} ${body}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Binance request failed: ${error.message}`, {
          cause: error,
        });
      }

      throw new Error("Binance request failed", {
        cause: error,
      });
    }
  }

  async getExchangeInfo() {
    return this.request<any>("/fapi/v1/exchangeInfo");
  }

  async get24hrTicker() {
    return this.request<any[]>("/fapi/v1/ticker/24hr");
  }

  async getKlines(symbol: string, interval: string, limit: number) {
    const params = new URLSearchParams({
      symbol,
      interval,
      limit: String(limit),
    });

    return this.request<any[][]>(`/fapi/v1/klines?${params.toString()}`);
  }
}
