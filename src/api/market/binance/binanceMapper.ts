export function toBinanceSymbols(symbols: string[], available: string[]) {
  return symbols.map((x) => `${x}USDT`).filter((x) => available.includes(x));
}
