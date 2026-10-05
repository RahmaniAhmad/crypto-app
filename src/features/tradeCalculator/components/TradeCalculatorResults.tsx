import { TradeCalculatorResult } from "../types";
import { ResultRow } from "./ResultRow";

interface TradeCalculatorResultsProps {
  result: TradeCalculatorResult;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value);
}

function formatMoney(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} USDT`;
}

export function TradeCalculatorResults({
  result,
}: TradeCalculatorResultsProps) {
  return (
    <div className="mt-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Results
      </h3>

      <div className="grid gap-2">
        <ResultRow
          label="Entry Price"
          value={`${formatPrice(result.entryPrice)} USDT`}
        />

        <ResultRow
          label="Stop Loss"
          value={`${formatPrice(result.stopLoss)} USDT`}
          valueClassName="text-red-500"
        />

        <ResultRow
          label="Take Profit"
          value={`${formatPrice(result.takeProfit)} USDT`}
          valueClassName="text-green-500"
        />

        <ResultRow
          label="Risk / Reward"
          value={`1 : ${result.riskReward.toFixed(2)}`}
        />

        {result.positionSize > 0 && (
          <>
            <div className="my-2 border-t" />

            <ResultRow
              label="Position Size"
              value={formatMoney(result.positionSize)}
            />

            <ResultRow
              label="Potential Loss"
              value={`-${formatMoney(result.potentialLoss)}`}
              valueClassName="text-red-500"
            />

            <ResultRow
              label="Potential Profit"
              value={`+${formatMoney(result.potentialProfit)}`}
              valueClassName="text-green-500"
            />

            <ResultRow
              label="ROI at Stop Loss"
              value={`-${result.roiAtStopLoss.toFixed(2)}%`}
              valueClassName="text-red-500"
            />

            <ResultRow
              label="ROI at Take Profit"
              value={`+${result.roiAtTakeProfit.toFixed(2)}%`}
              valueClassName="text-green-500"
            />
          </>
        )}
      </div>
    </div>
  );
}
