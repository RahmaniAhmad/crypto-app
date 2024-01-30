async function get(symbol: string) {
  let currentDate = new Date();
  const fromDate = Math.round(
    currentDate.setDate(currentDate.getDate() - 30) / 1000
  );
  const toDate = Math.floor(new Date().getTime() / 1000);
  const api = `https://api.nobitex.ir/market/udf/history?symbol=${symbol}usdt&resolution=60&from=${fromDate}&to=${toDate}`;
  const data = fetch(api).then((res) => res.json());

  return data;
}
export async function getHistory(symbols: string[]): Promise<any[]> {
  const historyPromises = symbols.map(async (symbol) => {
    const history = await get(symbol);
    return history;
  });

  const historyResults = await Promise.all(historyPromises);

  return historyResults;
}
