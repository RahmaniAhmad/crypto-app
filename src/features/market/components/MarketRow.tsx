import { getSignal } from "@/features/scanner/helpers/indicator";
import { IndicatorResult } from "@/features/scanner/calculations/indicators/types";
import { getIndicatorValue, signalColor } from "../helpers/indicatorDisplay";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface Props {
  item: CryptoAnalysis;
}

export function MarketRow({ item }: Props) {
  const rsi = getSignal(item.indicators, "RSI");

  const macd = getSignal(item.indicators, "MACD");

  const sma = getSignal(item.indicators, "SMA");

  const bollinger = getSignal(item.indicators, "BOLLINGER");

  const price = getIndicatorValue(item.indicators, "PRICE");

  const volume = getIndicatorValue(item.indicators, "VOLUME");

  const support = getIndicatorValue(item.indicators, "SUPPORT");

  const resistance = getIndicatorValue(item.indicators, "RESISTANCE");

  return (
    <tr
      className="
        border-t
        transition
        hover:bg-default-100
      "
    >
      <td className="p-3 font-semibold">{item.symbol}</td>

      <td className={`p-3 ${signalColor(rsi)}`}>{rsi}</td>

      <td className={`p-3 ${signalColor(macd)}`}>{macd}</td>

      <td className={`p-3 ${signalColor(sma)}`}>{sma}</td>

      <td className={`p-3 ${signalColor(bollinger)}`}>{bollinger}</td>

      <td className="p-3">{price}</td>

      <td className="p-3">{volume}</td>

      <td className="p-3">{support}</td>

      <td className="p-3">{resistance}</td>
    </tr>
  );
}
