"use client";

import { useState } from "react";
import SignalCard from "./SignalCard";
import { SCANNER_CONFIG } from "../config/scanner";
import { CryptoScanResult } from "../types";
import { ChartModal } from "./priceChart";
import { loadChart } from "../actions/chart";
import { PricePoint, TradingResolution } from "@/features/market";
import { Button } from "@nextui-org/react";

interface Props {
  data: CryptoScanResult[];
  resolution: TradingResolution;
}

export function Scanner({ data, resolution }: Props) {
  const [visibleCount, setVisibleCount] = useState(
    SCANNER_CONFIG.topSignalsToDisplay,
  );

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);

  const filteredData = [...data]
    .filter((item) => item.signal !== "NEUTRAL")
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score));

  const displayedData = filteredData.slice(0, visibleCount);

  async function handleChartClick(symbol: string) {
    setSelectedSymbol(symbol);
    setChartData([]);
    setIsChartLoading(true);

    try {
      const data = await loadChart(symbol, resolution);

      setChartData(data);
    } finally {
      setIsChartLoading(false);
    }
  }

  function closeChart() {
    setSelectedSymbol(null);
    setChartData([]);
  }

  if (!filteredData.length) {
    return (
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-bold">Market Scanner</h2>

        <p className="mt-2 text-muted-foreground">
          No trading opportunities found.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Market Scanner</h2>

          <p className="text-sm text-muted-foreground">
            Top trading opportunities
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {displayedData.length} of {filteredData.length} signals
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <SignalCard
            key={item.symbol}
            item={item}
            rank={index + 1}
            onChartClick={handleChartClick}
          />
        ))}
      </div>
      {visibleCount < filteredData.length && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="bordered"
            onPress={() =>
              setVisibleCount(
                (prev) => prev + SCANNER_CONFIG.topSignalsToDisplay,
              )
            }
          >
            Load more
          </Button>
        </div>
      )}
      {selectedSymbol && (
        <ChartModal
          symbol={selectedSymbol ?? ""}
          data={chartData}
          isOpen={!!selectedSymbol}
          isLoading={isChartLoading}
          onClose={closeChart}
        />
      )}
    </>
  );
}
