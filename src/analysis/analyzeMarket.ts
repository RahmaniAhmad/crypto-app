import { TRADING_CONFIG } from "@/config";
import { runAllIndicators } from "@/indicators/runAllIndicators";
import { marketProvider } from "@/market";
import { scanCryptos } from "@/scanner/cryptoScanner";
import { analyzeMultiTimeframe } from "@/scanner/multiTimeframe";
import { MultiTimeframeMap } from "@/scanner/types";
import { TradingResolution } from "@/types";

export async function analyzeMarket(resolution: TradingResolution) {
  const symbols = await marketProvider.getSymbols(
    TRADING_CONFIG.marketSymbolLimit ?? 50,
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
