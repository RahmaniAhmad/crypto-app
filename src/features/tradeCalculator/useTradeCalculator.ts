"use client";

import { useMemo, useState } from "react";
import { Direction, TradeCalculatorResult } from "./types";

export function useTradeCalculator() {
  const [direction, setDirection] = useState<Direction>("LONG");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPercent, setStopLossPercent] = useState("2");
  const [takeProfitPercent, setTakeProfitPercent] = useState("4");
  const [leverage, setLeverage] = useState("2");
  const [margin, setMargin] = useState("");

  const result = useMemo<TradeCalculatorResult | null>(() => {
    const entry = Number(entryPrice);
    const slPercent = Number(stopLossPercent);
    const tpPercent = Number(takeProfitPercent);
    const lev = Number(leverage);
    const marginAmount = Number(margin);

    if (
      !entry ||
      entry <= 0 ||
      slPercent < 0 ||
      tpPercent < 0 ||
      lev <= 0 ||
      marginAmount < 0
    ) {
      return null;
    }

    const isLong = direction === "LONG";

    const stopLoss = isLong
      ? entry * (1 - slPercent / 100)
      : entry * (1 + slPercent / 100);

    const takeProfit = isLong
      ? entry * (1 + tpPercent / 100)
      : entry * (1 - tpPercent / 100);

    const positionSize = marginAmount * lev;

    const potentialLoss = positionSize * (slPercent / 100);

    const potentialProfit = positionSize * (tpPercent / 100);

    const riskReward = slPercent > 0 ? tpPercent / slPercent : 0;

    const roiAtStopLoss = slPercent * lev;

    const roiAtTakeProfit = tpPercent * lev;

    return {
      entryPrice: entry,
      stopLoss,
      takeProfit,
      positionSize,
      potentialLoss,
      potentialProfit,
      riskReward,
      roiAtStopLoss,
      roiAtTakeProfit,
    };
  }, [
    direction,
    entryPrice,
    stopLossPercent,
    takeProfitPercent,
    leverage,
    margin,
  ]);

  return {
    direction,
    entryPrice,
    stopLossPercent,
    takeProfitPercent,
    leverage,
    margin,

    result,

    setDirection,
    setEntryPrice,
    setStopLossPercent,
    setTakeProfitPercent,
    setLeverage,
    setMargin,
  };
}
