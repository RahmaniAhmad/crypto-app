"use client";

import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

import ShowColumnData from "./showColumnData";
import StateMessage from "./ui/StateMessage";

import { IndicatorResult } from "@/indicators/types";

interface CryptoAnalysis {
  symbol: string;
  indicators: IndicatorResult[];
}

interface CryptoListProps {
  data: CryptoAnalysis[];
  reportDate?: string;
}

const CryptoList = ({ data, reportDate }: CryptoListProps) => {
  const [searchCrypto, setSearchCrypto] = useState("");

  const filteredData = useMemo(() => {
    if (!searchCrypto) {
      return data;
    }

    return data.filter((item) =>
      item.symbol.startsWith(searchCrypto.toUpperCase()),
    );
  }, [data, searchCrypto]);

  const getIndicatorColumn = (indicatorName: string) => {
    return filteredData.map((item) => {
      const indicator = item.indicators.find(
        (x) => x.indicator === indicatorName,
      );

      return indicator?.signal ?? "-";
    });
  };

  const getCryptos = () => {
    return filteredData.map((item) => item.symbol);
  };

  const getIndicatorValue = (indicatorName: string) => {
    return filteredData.map((item) => {
      const indicator = item.indicators.find(
        (x) => x.indicator === indicatorName,
      );

      if (indicator?.value === undefined) {
        return "-";
      }

      return indicator.value.toFixed(4);
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCrypto(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchCrypto("");
  };

  if (!data.length) {
    return <StateMessage message="No market data available." />;
  }

  return (
    <div>
      <div className="py-2">
        <Input
          isClearable
          placeholder="Search..."
          value={searchCrypto}
          onChange={handleSearch}
          onClear={handleClearSearch}
        />
      </div>

      {reportDate && <div className="py-2 text-center">{reportDate}</div>}

      <div className="grid grid-cols-8">
        <ShowColumnData title="Name" data={getCryptos()} />

        <ShowColumnData
          title="Bollinger"
          data={getIndicatorColumn("BOLLINGER")}
        />

        <ShowColumnData title="MACD" data={getIndicatorColumn("MACD")} />

        <ShowColumnData title="SMA" data={getIndicatorColumn("SMA")} />

        <ShowColumnData title="RSI" data={getIndicatorColumn("RSI")} />

        <ShowColumnData title="Price" data={getIndicatorValue("PRICE")} />

        <ShowColumnData title="SUPPORT" data={getIndicatorValue("SUPPORT")} />

        <ShowColumnData
          title="RESISTANCE"
          data={getIndicatorValue("RESISTANCE")}
        />
      </div>
    </div>
  );
};

export default CryptoList;
