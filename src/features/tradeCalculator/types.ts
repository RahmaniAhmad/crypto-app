export type Direction = "LONG" | "SHORT";

export interface TradeCalculatorInput {
  direction: Direction;
  entryPrice: number;
  stopLossPercent: number;
  takeProfitPercent: number;
  leverage: number;
  margin: number;
}

export interface TradeCalculatorResult {
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  positionSize: number;
  potentialLoss: number;
  potentialProfit: number;
  riskReward: number;
  roiAtStopLoss: number;
  roiAtTakeProfit: number;
}
