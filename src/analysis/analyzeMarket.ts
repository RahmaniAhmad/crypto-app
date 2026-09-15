import { TRADING_CONFIG } from "@/config";
import { runAllIndicators } from "@/indicators/runAllIndicators";
import { marketProvider } from "@/market";
import { scanCryptos } from "@/scanner/cryptoScanner";
import { TradingResolution } from "@/types";

export async function analyzeMarket(resolution: TradingResolution) {
  const symbols = await marketProvider.getSymbols(
    TRADING_CONFIG.marketSymbolLimit ?? 50,
  );

  const histories = await marketProvider.getHistory(symbols, resolution);

  const analysis = runAllIndicators(histories, resolution);

  const scanned = scanCryptos(analysis);

  return {
    analysis,
    scanned,
  };
}
