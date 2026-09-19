import { marketProvider } from "@/features/market";
import { MARKET_CONFIG } from "@/features/market/config/market";
import { TradingResolution } from "@/features/market/types";
import { runAllIndicators } from "@/features/scanner/calculations/runAllIndicators";
import { MultiTimeframeMap } from "../types";
import { analyzeMultiTimeframe } from "../calculations/multiTimeframe";
import { scanCryptos } from "../calculations/cryptoScanner";

export async function analyzeMarket(resolution: TradingResolution) {
  const symbols = await marketProvider.getSymbols(
    MARKET_CONFIG.marketSymbolLimit ?? 50,
  );

  const histories = await marketProvider.getHistory(symbols, resolution);

  const analysis = runAllIndicators(histories, resolution);

  // -----------------------------
  // Multi timeframe
  // -----------------------------

  const multiTimeframeHistory =
    await marketProvider.getMultiTimeframeHistory(symbols);

  const multiTimeframes: MultiTimeframeMap = {};

  for (const symbol of symbols) {
    const normalizedSymbol = symbol.replace("USDT", "");

    const history = multiTimeframeHistory[normalizedSymbol];

    if (!history) {
      continue;
    }

    const higherAnalysis = runAllIndicators([history.higher], "4h")[0];

    const primaryAnalysis = runAllIndicators([history.primary], "1h")[0];

    const entryAnalysis = runAllIndicators([history.entry], "15m")[0];

    multiTimeframes[normalizedSymbol] = analyzeMultiTimeframe(
      higherAnalysis.indicators,
      primaryAnalysis.indicators,
      entryAnalysis.indicators,
    );
  }

  const scanned = scanCryptos(analysis, multiTimeframes);

  return {
    analysis,
    scanned,
  };
}
