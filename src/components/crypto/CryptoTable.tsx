"use client";

import { useMemo, useState } from "react";
import { IndicatorResult } from "@/indicators/types";
import CryptoRow from "./CryptoRow";
import SortableHeader from "./components/SortableHeader";
import { getSortValue } from "./utils/sortUtils";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface Props {
  data: CryptoAnalysis[];
}

type SortColumn =
  | "symbol"
  | "price"
  | "rsi"
  | "macd"
  | "sma"
  | "bollinger"
  | "support"
  | "resistance";

type SortDirection = "default" | "asc" | "desc";

export default function CryptoTable({ data }: Props) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);

  const [sortDirection, setSortDirection] = useState<SortDirection>("default");

  const handleSort = (column: SortColumn) => {
    // clicking same column
    if (sortColumn === column) {
      if (sortDirection === "default") {
        setSortDirection("asc");
      } else if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortColumn(null);
        setSortDirection("default");
      }

      return;
    }

    // new column
    setSortColumn(column);
    setSortDirection("asc");
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || sortDirection === "default") {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = getSortValue(a, sortColumn);

      const bValue = getSortValue(b, sortColumn);

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-default-100 text-left">
            <SortableHeader
              title="Symbol"
              column="symbol"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              title="RSI"
              column="rsi"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              title="MACD"
              column="macd"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              title="SMA"
              column="sma"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              title="BB"
              column="bollinger"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              title="Price"
              column="price"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              title="Support"
              column="support"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              title="Resistance"
              column="resistance"
              activeColumn={sortColumn}
              direction={sortDirection}
              onSort={handleSort}
            />
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item) => (
            <CryptoRow key={item.symbol} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
