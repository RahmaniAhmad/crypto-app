import { symboles } from "@/const";
import { getBollingerSignals } from "@/lib/bollinger";
import { getSmaSignals } from "@/lib/sma";
import { getMacdSignals } from "@/lib/macd";
import ShowSignals from "@/components/showSignals";
import { getRSISignals } from "@/lib/rsi";

export default async function Home() {
  const bollingerSignals = await getBollingerSignals();
  const macdSignals = await getMacdSignals();
  const smaSignals = await getSmaSignals();
  const rsiSignals = await getRSISignals();

  return (
    <main className="grid grid-cols-4 gap-4">
      <div>
        <ShowSignals
          title="Bollinger"
          symboles={symboles}
          signals={bollingerSignals}
        />
      </div>
      <div>
        <ShowSignals title="MACD" symboles={symboles} signals={macdSignals} />
      </div>
      <div>
        <ShowSignals title="SMA" symboles={symboles} signals={smaSignals} />
      </div>
      <div>
        <ShowSignals title="RSI" symboles={symboles} signals={rsiSignals} />
      </div>
    </main>
  );
}
