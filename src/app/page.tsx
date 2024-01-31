import { symboles } from "@/const";
import { getBollingerSignals } from "@/lib/bollinger";
import { getSmaSignals } from "@/lib/sma";
import { getMacdSignals } from "@/lib/macd";
import ShowSignals from "@/components/showSignals";
import { getRSISignals } from "@/lib/rsi";
import { getHistory } from "@/api";

export default async function Home() {
  const histories = await getHistory(symboles);
  const bollingerSignals = await getBollingerSignals(histories);
  const macdSignals = await getMacdSignals(histories);
  const smaSignals = await getSmaSignals(histories);
  const rsiSignals = await getRSISignals(histories);

  return (
    <main className="grid grid-cols-4">
      <div>
        <ShowSignals
          title="Bollinger"
          symboles={symboles}
          signals={bollingerSignals}
        />
      </div>
      {/* <div>
        <ShowSignals title="MACD" symboles={symboles} signals={macdSignals} />
      </div> */}
      <div>
        <ShowSignals title="SMA" symboles={symboles} signals={smaSignals} />
      </div>
      <div>
        <ShowSignals title="RSI" symboles={symboles} signals={rsiSignals} />
      </div>
    </main>
  );
}
