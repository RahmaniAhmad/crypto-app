"use server";

import { getChartHistory } from "../services/getChartHistory";
import { TradingResolution } from "@/features/market/types";

export async function loadChart(symbol: string, resolution: TradingResolution) {
  return getChartHistory(symbol, resolution);
}
