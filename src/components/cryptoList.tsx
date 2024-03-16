"use client";

import { Input } from "@nextui-org/react";
import ShowColumnData from "./showColumnData";
import { cryptos } from "@/const";
import { getBollingerSignals } from "@/lib/bollinger";
import { getMacdSignals } from "@/lib/macd";
import { getSmaSignals } from "@/lib/sma";
import { getRSISignals } from "@/lib/rsi";
import { useEffect, useState } from "react";
import ShowColumnBreakoutData from "./showColumnBreakoutData";
import {
  getReistanceBreakouts,
  getSupportBreakouts,
} from "@/lib/supportResistanceBreakouts";
interface CryptoListProps {
  histories: any[];
  reportDate: string;
}
const CryptoList = ({ histories, reportDate }: CryptoListProps) => {
  const [bollingerSignals, setBollingerSignals] = useState<string[]>([]);
  const [macdSignals, setMacdSignals] = useState<string[]>([]);
  const [smaSignals, setSmaSignals] = useState<string[]>([]);
  const [rsiSignals, setRsiSignals] = useState<string[]>([]);
  const [supportBreakouts, setSupportBreakouts] = useState<any[]>([]);
  const [resistanceBreakouts, setResistanceBreakouts] = useState<any[]>([]);
  const [searchCrypto, setSearchCrypto] = useState<string | undefined>();
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [selectedCryptos, setSelectedCryptos] = useState<
    string[] | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bollingerSignals = await getBollingerSignals(
          searchCrypto ? searchHistory : histories
        );
        setBollingerSignals(bollingerSignals);

        const macdSignals = await getMacdSignals(
          searchCrypto ? searchHistory : histories
        );
        setMacdSignals(macdSignals);

        const smaSignals = await getSmaSignals(
          searchCrypto ? searchHistory : histories
        );
        setSmaSignals(smaSignals);

        const rsiSignals = await getRSISignals(
          searchCrypto ? searchHistory : histories
        );
        setRsiSignals(rsiSignals);

        const supportBreakouts = await getSupportBreakouts(
          searchCrypto ? searchHistory : histories
        );
        setSupportBreakouts(supportBreakouts);

        const resistanceBreakouts = await getReistanceBreakouts(
          searchCrypto ? searchHistory : histories
        );
        setResistanceBreakouts(resistanceBreakouts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [histories, searchCrypto, searchHistory]);

  const getIndexesStartingWithSearchValue = (
    arr: string[],
    targetChar: string
  ): number[] => {
    const indexes: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].startsWith(targetChar)) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  function getItemsByIndexes(arr: any[], indexes: number[]): any[] {
    return indexes.map((index) => arr[index]);
  }

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchCrypto(value);
    const indexes = getIndexesStartingWithSearchValue(
      cryptos,
      value.toUpperCase()
    );

    if (indexes.length > 0) {
      const searchHistories = getItemsByIndexes(histories, indexes);
      const searchSymbols = getItemsByIndexes(cryptos, indexes);
      setSelectedCryptos(searchSymbols);
      setSearchHistory(searchHistories);
    } else {
      setSelectedCryptos(undefined);
      setSearchHistory([]);
    }
  };

  const handleClearSearch = () => {
    setSearchCrypto("");
    setSelectedCryptos(undefined);
    setSearchHistory([]);
  };
  const getCryptos = () => {
    if (selectedCryptos) return selectedCryptos;
    if (searchCrypto) return [];
    return cryptos;
  };

  return (
    <div>
      <div className="py-2">
        <Input
          isClearable
          placeholder="Search..."
          name="filter"
          value={searchCrypto}
          onChange={handleSearch}
          onClear={handleClearSearch}
        />
      </div>
      <div className="py-2 text-center">{reportDate}</div>
      <div className="grid grid-cols-7">
        <ShowColumnData title="Name" data={getCryptos()} />
        <ShowColumnData title="Bollinger" data={bollingerSignals} />
        <ShowColumnData title="MACD" data={macdSignals} />
        <ShowColumnData title="SMA" data={smaSignals} />
        <ShowColumnData title="RSI" data={rsiSignals} />
        <ShowColumnBreakoutData title="SUPPORT" data={supportBreakouts} />
        <ShowColumnBreakoutData title="RESISTANCE" data={resistanceBreakouts} />
      </div>
    </div>
  );
};

export default CryptoList;
