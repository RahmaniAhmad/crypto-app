import { IndicatorResult } from "@/indicators/types";
import { getSignal, getValue, signalColor } from "./utils/indicatorUtils";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface Props {
  item: CryptoAnalysis;
}

export default function CryptoRow({ item }: Props) {
  const rsi = getSignal(item.indicators, "RSI");

  const macd = getSignal(item.indicators, "MACD");

  const sma = getSignal(item.indicators, "SMA");

  const bollinger = getSignal(item.indicators, "BOLLINGER");

  const price = getValue(item.indicators, "PRICE");

  const support = getValue(item.indicators, "SUPPORT");

  const resistance = getValue(item.indicators, "RESISTANCE");

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

      <td className="p-3">{getValue(item.indicators, "PRICE")}</td>

      <td className="p-3">{getValue(item.indicators, "SUPPORT")}</td>

      <td className="p-3">{getValue(item.indicators, "RESISTANCE")}</td>
    </tr>
  );
}
