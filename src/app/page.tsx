import {
  calculateBollingerBands,
  identifyBollingerSignals,
} from "../lib/bolinger";

async function getHistory() {
  let currentDate = new Date();
  const fromDate = Math.round(
    currentDate.setDate(currentDate.getDate() - 1) / 1000
  );
  const toDate = Math.floor(new Date().getTime() / 1000);
  const api = `https://api.nobitex.ir/market/udf/history?symbol=BTCUSDT&resolution=60&from=${fromDate}&to=${toDate}`;
  const data = fetch(api).then((res) => res.json());

  return data;
}

export default async function Home() {
  const history = await getHistory().then((data) => {
    return data;
  });
  const closes: number[] = history.c;
  const period: number = 5;
  const numStdDev: number = 2;

  const bollingerBands = calculateBollingerBands(closes, period, numStdDev);
  const bollingerSignals = identifyBollingerSignals(closes, bollingerBands);

  console.log("Bollinger Bands Signals:", bollingerSignals);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(history.c)}
      {JSON.stringify(bollingerSignals)}
    </main>
  );
}
