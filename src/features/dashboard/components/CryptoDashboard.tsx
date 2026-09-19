"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { IndicatorResult } from "@/features/scanner/calculations/indicators/types";
import ResolutionSelector from "./ResolutionSelector";
import { Scanner } from "@/features/scanner/components";
import { MarketList } from "@/features/market/components";
import { TradingResolution } from "@/features/market/types";
import { CryptoScanResult } from "@/features/scanner/types";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface Props {
  analysis: CryptoAnalysis[];
  scanned: CryptoScanResult[];
  resolution: TradingResolution;
}

export default function CryptoDashboard({
  analysis,
  scanned,
  resolution,
}: Props) {
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Crypto Scanner</h1>

          <p className="text-default-500">Binance Futures</p>
        </div>
        <ResolutionSelector resolution={resolution} />
      </div>

      <Tabs aria-label="Crypto dashboard" variant="solid">
        <Tab key="scanner" title="Scanner">
          <Scanner data={scanned} />
        </Tab>

        <Tab key="analysis" title="Market Analysis">
          <MarketList data={analysis} />
        </Tab>
      </Tabs>
    </div>
  );
}
