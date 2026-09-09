import { marketProvider } from "@/market";
import CryptoDashboard from "@/components/CryptoDashboard";
import { TRADING_CONFIG } from "@/config";
import { runAllIndicators } from "@/indicators/runAllIndicators";
import { scanCryptos } from "@/scanner/cryptoScanner";

export default async function Home() {
  const symbols = await marketProvider.getSymbols(
    TRADING_CONFIG.marketSymbolLimit || 50,
  );

  const histories = await marketProvider.getHistory(symbols);

  const analysis = runAllIndicators(histories);

  const scanned = scanCryptos(analysis);

  return <CryptoDashboard analysis={analysis} scanned={scanned} />;
}
