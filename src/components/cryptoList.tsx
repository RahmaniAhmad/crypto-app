"use client";

import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

import { IndicatorResult } from "@/indicators/types";
import { Signal } from "@/const";
import StateMessage from "./ui/StateMessage";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface CryptoListProps {
  data: CryptoAnalysis[];
}

export default function CryptoList({ data }: CryptoListProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((x) => x.symbol.startsWith(search.toUpperCase()));
  }, [data, search]);

  const getIndicator = (indicators: IndicatorResult[], name: string) => {
    return indicators.find((x) => x.indicator === name);
  };

  const getValue = (indicators: IndicatorResult[], name: string) => {
    const item = getIndicator(indicators, name);

    return item?.value !== undefined ? item.value.toFixed(4) : "-";
  };

  const getSignal = (indicators: IndicatorResult[], name: string) => {
    return getIndicator(indicators, name)?.signal ?? "-";
  };

  const signalColor = (signal: string) => {
    if (signal === Signal.buy) {
      return "text-green-500 font-bold";
    }

    if (signal === Signal.sell) {
      return "text-red-500 font-bold";
    }

    if (signal === Signal.neutral) {
      return "text-gray-400 dark:text-gray-500";
    }

    return "text-foreground";
  };

  if (!data.length) {
    return (
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-bold">Market Overview</h2>

        <p className="mt-2 text-muted-foreground">
          Binance Futures market analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Market Overview</h2>

          <p className="text-sm text-muted-foreground">
            Binance Futures market analysis
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {filteredData.length} markets
        </span>
      </div>
      <Input
        isClearable
        placeholder="Search crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
      />

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-default-100">
              <th className="p-3 text-left">Symbol</th>

              <th className="p-3">Price</th>

              <th className="p-3">RSI</th>

              <th className="p-3">MACD</th>

              <th className="p-3">SMA</th>

              <th className="p-3">Bollinger</th>

              <th className="p-3">Support</th>

              <th className="p-3">Resistance</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => {
              const rsi = getSignal(item.indicators, "RSI");

              const macd = getSignal(item.indicators, "MACD");

              const sma = getSignal(item.indicators, "SMA");

              const bollinger = getSignal(item.indicators, "BOLLINGER");

              return (
                <tr
                  key={item.symbol}
                  className="
                    border-t
                    hover:bg-default-100
                    transition
                  "
                >
                  <td className="p-3 font-semibold">{item.symbol}</td>

                  <td className="p-3">{getValue(item.indicators, "PRICE")}</td>

                  <td className={`p-3 ${signalColor(rsi)}`}>{rsi}</td>

                  <td className={`p-3 ${signalColor(macd)}`}>{macd}</td>

                  <td className={`p-3 ${signalColor(sma)}`}>{sma}</td>

                  <td className={`p-3 ${signalColor(bollinger)}`}>
                    {bollinger}
                  </td>

                  <td className="p-3">
                    {getValue(item.indicators, "SUPPORT")}
                  </td>

                  <td className="p-3">
                    {getValue(item.indicators, "RESISTANCE")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
