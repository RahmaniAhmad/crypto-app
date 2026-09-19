import { MarketProvider } from "./marketProvider";
import { BinanceMarketProvider } from "./providers";

export function createMarketProvider(): MarketProvider {
  return new BinanceMarketProvider();
}

export const marketProvider = createMarketProvider();
