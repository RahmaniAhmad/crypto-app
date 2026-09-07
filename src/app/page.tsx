import { getHistory } from "@/api";
import { getMarketSymbols } from "@/api/market/binance/getMarketSymbols";
import CryptoDashboard from "@/components/CryptoDashboard";
import { runAllIndicators } from "@/indicators/runAllIndicators";
import { scanCryptos } from "@/scanner/cryptoScanner";

export default async function Home() {
  const symbols = await getMarketSymbols(50);

  const histories = await getHistory(symbols);

  const analysis = runAllIndicators(histories);

  const scanned = scanCryptos(analysis);
  console.log(
    scanned.reduce(
      (acc, item) => {
        acc[item.signal] = (acc[item.signal] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );
  return <CryptoDashboard analysis={analysis} scanned={scanned} />;
}
