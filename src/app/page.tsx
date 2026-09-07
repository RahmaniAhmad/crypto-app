import { getHistory } from "@/api";
import CryptoList from "@/components/cryptoList";
import { cryptos } from "@/const/cryptos";
import { runAllIndicators } from "@/indicators/runAllIndicators";

export default async function Home() {
  const histories = await getHistory(cryptos);
  const analysis = runAllIndicators(histories);

  return (
    <main className="p-4">
      <CryptoList data={analysis} />
    </main>
  );
}
