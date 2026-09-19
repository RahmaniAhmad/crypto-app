import { marketProvider } from "@/features/market";
import { TradingResolution } from "@/features/market/types";

export async function getChartHistory(
  symbol: string,
  resolution: TradingResolution,
) {
  return marketProvider.getPriceHistory(symbol, resolution);
}
