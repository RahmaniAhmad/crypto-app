"use client";

import { useState } from "react";
import { TRADING_CONFIG } from "@/config";
import { CryptoScanResult } from "@/scanner/types";
import SignalCard from "./SignalCard";

interface Props {
  data: CryptoScanResult[];
}

export default function CryptoScanner({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(
    TRADING_CONFIG.topSignalsToDisplay,
  );

  const filteredData = [...data]
    .filter((item) => item.signal !== "NEUTRAL")
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score));

  const displayedData = filteredData.slice(0, visibleCount);

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
    <div>
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
          <SignalCard key={item.symbol} item={item} rank={index + 1} />
        ))}
      </div>

      {visibleCount < filteredData.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() =>
              setVisibleCount(
                (prev) => prev + TRADING_CONFIG.topSignalsToDisplay,
              )
            }
            className="
              rounded-lg
              border
              px-5
              py-2
              text-sm
              font-medium
              hover:bg-muted
            "
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
