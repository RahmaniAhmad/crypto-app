import { periodPoint, resolution } from "@/const";

async function get(symbol: string) {
  let currentDate = new Date();
  const fromDate = Math.round(
    currentDate.setDate(currentDate.getDate() - periodPoint) / 1000
  );
  const toDate = Math.floor(new Date().getTime() / 1000);
  const api = `https://api.nobitex.ir/market/udf/history?symbol=${symbol}usdt&resolution=${resolution}&from=${fromDate}&to=${toDate}`;
  const data = fetch(api).then((res) => res.json());

  return data;
}
export async function getHistory(symbols: string[]) {
  const historyPromises = symbols.map(async (symbol) => {
    const history = await get(symbol);
    return history;
  });

  const historyResults = await Promise.all(historyPromises);

  return historyResults;
}
