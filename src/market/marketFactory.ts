import { BinanceMarketProvider } from "./binance";
import { MarketProvider } from "./marketProvider";

export function createMarketProvider(): MarketProvider {
  return new BinanceMarketProvider();
}

export const marketProvider = createMarketProvider();
