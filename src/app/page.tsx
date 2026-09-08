import { getHistory } from "@/api";
import { getMarketSymbols } from "@/api/market/binance/getMarketSymbols";
import CryptoDashboard from "@/components/CryptoDashboard";
import { TRADING_CONFIG } from "@/config";
import { runAllIndicators } from "@/indicators/runAllIndicators";
import { scanCryptos } from "@/scanner/cryptoScanner";

export default async function Home() {
  const symbols = await getMarketSymbols(
    TRADING_CONFIG.marketSymbolLimit || 50,
  );

  const histories = await getHistory(symbols);

  const analysis = runAllIndicators(histories);

  const scanned = scanCryptos(analysis);

  return <CryptoDashboard analysis={analysis} scanned={scanned} />;
}
