import { symboles } from "@/const";
import { getHistory } from "@/api";
import CryptoList from "@/components/cryptoList";

export default async function Home() {
  const histories = await getHistory(symboles);
  return (
    <main className="p-4">
      <CryptoList
        histories={histories}
        reportDate={new Date().toLocaleString()}
      />
    </main>
  );
}
