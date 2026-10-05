"use client";

import { TradeCalculatorForm, TradeCalculatorResults } from "./components";
import { useTradeCalculator } from "./useTradeCalculator";

export default function TradeCalculator() {
  const calculator = useTradeCalculator();

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Trade Calculator</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Calculate your stop loss, take profit, position size and potential
          P&amp;L.
        </p>
      </div>

      <TradeCalculatorForm
        direction={calculator.direction}
        entryPrice={calculator.entryPrice}
        stopLossPercent={calculator.stopLossPercent}
        takeProfitPercent={calculator.takeProfitPercent}
        leverage={calculator.leverage}
        margin={calculator.margin}
        onDirectionChange={calculator.setDirection}
        onEntryPriceChange={calculator.setEntryPrice}
        onStopLossPercentChange={calculator.setStopLossPercent}
        onTakeProfitPercentChange={calculator.setTakeProfitPercent}
        onLeverageChange={calculator.setLeverage}
        onMarginChange={calculator.setMargin}
      />

      {calculator.result && (
        <TradeCalculatorResults result={calculator.result} />
      )}
    </div>
  );
}
