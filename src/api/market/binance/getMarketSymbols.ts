import { getBinanceSymbols } from "./getSymbols";
import { getTopVolumeSymbols } from "./getTopVolumeSymbols";

export async function getMarketSymbols(limit = 50): Promise<string[]> {
  const [topVolumeSymbols, availableSymbols] = await Promise.all([
    getTopVolumeSymbols(limit),
    getBinanceSymbols(),
  ]);

  const availableSet = new Set(availableSymbols);

  return topVolumeSymbols.filter((symbol) => availableSet.has(symbol));
}
