"use client";

import { Input } from "@nextui-org/react";
import ShowSignals from "./showSignals";
import { symboles } from "@/const";
import { getBollingerSignals } from "@/lib/bollinger";
import { getMacdSignals } from "@/lib/macd";
import { getSmaSignals } from "@/lib/sma";
import { getRSISignals } from "@/lib/rsi";
import { useEffect, useState } from "react";
interface CryptoListProps {
  histories: any[];
}
const CryptoList = ({ histories }: CryptoListProps) => {
  const [bollingerSignals, setBollingerSignals] = useState<string[]>([]);
  const [macdSignals, setMacdSignals] = useState<string[]>([]);
  const [smaSignals, setSmaSignals] = useState<string[]>([]);
  const [rsiSignals, setRsiSignals] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [searchSymbole, setSearchSymbole] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bollingerSignals = await getBollingerSignals(
          search ? searchHistory : histories
        );
        setBollingerSignals(bollingerSignals);

        const macdSignals = await getMacdSignals(
          search ? searchHistory : histories
        );
        setMacdSignals(macdSignals);

        const smaSignals = await getSmaSignals(
          search ? searchHistory : histories
        );
        setSmaSignals(smaSignals);

        const rsiSignals = await getRSISignals(
          search ? searchHistory : histories
        );
        setRsiSignals(rsiSignals);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [histories, search, searchHistory]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    const indexOfItem = symboles.indexOf(value);

    if (indexOfItem > -1) {
      setSearchSymbole([value]);
      setSearchHistory([histories[indexOfItem]]);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchSymbole(undefined);
    setSearchHistory([]);
  };
  return (
    <div>
      <div className="py-2">
        <Input
          isClearable
          placeholder="Search..."
          name="filter"
          value={search}
          onChange={handleSearch}
          onClear={handleClearSearch}
        />
      </div>
      <div className="grid grid-cols-4">
        <ShowSignals
          title="Bollinger"
          symboles={searchSymbole ?? symboles}
          signals={bollingerSignals}
        />
        <ShowSignals
          title="MACD"
          symboles={searchSymbole ?? symboles}
          signals={macdSignals}
        />
        <ShowSignals
          title="SMA"
          symboles={searchSymbole ?? symboles}
          signals={smaSignals}
        />
        <ShowSignals
          title="RSI"
          symboles={searchSymbole ?? symboles}
          signals={rsiSignals}
        />
      </div>
    </div>
  );
};

export default CryptoList;
