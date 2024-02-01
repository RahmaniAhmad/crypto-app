"use client";

import { Input } from "@nextui-org/react";
import ShowColumnData from "./showColumnData";
import { symboles } from "@/const";
import { getBollingerSignals } from "@/lib/bollinger";
import { getMacdSignals } from "@/lib/macd";
import { getSmaSignals } from "@/lib/sma";
import { getRSISignals } from "@/lib/rsi";
import { useEffect, useState } from "react";
interface CryptoListProps {
  histories: any[];
  reportDate: string;
}
const CryptoList = ({ histories, reportDate }: CryptoListProps) => {
  const [bollingerSignals, setBollingerSignals] = useState<string[]>([]);
  const [macdSignals, setMacdSignals] = useState<string[]>([]);
  const [smaSignals, setSmaSignals] = useState<string[]>([]);
  const [rsiSignals, setRsiSignals] = useState<string[]>([]);
  const [searchSymbole, setSearchSymbole] = useState<string | undefined>();
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [selectedSymbole, setSelectedSymbole] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bollingerSignals = await getBollingerSignals(
          searchSymbole ? searchHistory : histories
        );
        setBollingerSignals(bollingerSignals);

        const macdSignals = await getMacdSignals(
          searchSymbole ? searchHistory : histories
        );
        setMacdSignals(macdSignals);

        const smaSignals = await getSmaSignals(
          searchSymbole ? searchHistory : histories
        );
        setSmaSignals(smaSignals);

        const rsiSignals = await getRSISignals(
          searchSymbole ? searchHistory : histories
        );
        setRsiSignals(rsiSignals);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [histories, searchSymbole, searchHistory]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchSymbole(value);
    const indexOfItem = symboles.indexOf(value);

    if (indexOfItem > -1) {
      setSelectedSymbole(value);
      setSearchHistory([histories[indexOfItem]]);
    } else {
      setSelectedSymbole(undefined);
    }
  };

  const handleClearSearch = () => {
    setSearchSymbole("");
    setSelectedSymbole(undefined);
    setSearchHistory([]);
  };
  const getCryptoName = (): string[] => {
    if (selectedSymbole) return [selectedSymbole];
    if (searchSymbole && !selectedSymbole) return [];
    return symboles;
  };

  return (
    <div>
      <div className="py-2">
        <Input
          isClearable
          placeholder="Search..."
          name="filter"
          value={searchSymbole}
          onChange={handleSearch}
          onClear={handleClearSearch}
        />
      </div>
      <div className="py-2 text-center">{reportDate}</div>
      <div className="grid grid-cols-5">
        <ShowColumnData title="Name" data={getCryptoName()} />
        <ShowColumnData title="Bollinger" data={bollingerSignals} />
        <ShowColumnData title="MACD" data={macdSignals} />
        <ShowColumnData title="SMA" data={smaSignals} />
        <ShowColumnData title="RSI" data={rsiSignals} />
      </div>
    </div>
  );
};

export default CryptoList;
