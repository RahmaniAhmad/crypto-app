"use client";

import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

import { IndicatorResult } from "@/indicators/types";
import CryptoTable from "./CryptoTable";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface Props {
  data: CryptoAnalysis[];
}

export default function CryptoList({ data }: Props) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) {
      return data;
    }

    return data.filter((item) =>
      item.symbol.toUpperCase().includes(search.toUpperCase()),
    );
  }, [data, search]);

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

      <CryptoTable data={filteredData} />
    </div>
  );
}
