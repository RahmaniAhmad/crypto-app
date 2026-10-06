"use client";

import { TradeCalculatorForm, TradeCalculatorResults } from "./components";
import { useTradeCalculator } from "./useTradeCalculator";

export default function TradeCalculator() {
  const calculator = useTradeCalculator();

  return (
    <div className="w-full px-6 py-4">
      <p className="mb-6 text-sm text-muted-foreground">
        Estimate entry levels, position size, risk/reward, and potential P&amp;L
        based on your trade setup.
      </p>

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
