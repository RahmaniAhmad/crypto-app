"use client";

import { Tabs, Tab } from "@nextui-org/react";

import CryptoScanner from "./scanner/CryptoScanner";
import CryptoList from "./crypto/CryptoList";

import { IndicatorResult } from "@/indicators/types";
import { CryptoScanResult } from "@/scanner/types";
import ResolutionSelector from "./ResolutionSelector";
import { TradingResolution } from "@/types";

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
          <CryptoScanner data={scanned} />
        </Tab>

        <Tab key="analysis" title="Market Analysis">
          <CryptoList data={analysis} />
        </Tab>
      </Tabs>
    </div>
  );
}
