export function mapToBinanceSymbols(
  symbols: string[],
  availableSymbols: string[],
) {
  return symbols
    .map((symbol) => `${symbol}USDT`)
    .filter((symbol) => availableSymbols.includes(symbol));
}
