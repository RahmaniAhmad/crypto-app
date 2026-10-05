"use client";

import { Direction } from "../types";

interface TradeCalculatorFormProps {
  direction: Direction;
  entryPrice: string;
  stopLossPercent: string;
  takeProfitPercent: string;
  leverage: string;
  margin: string;

  onDirectionChange: (value: Direction) => void;
  onEntryPriceChange: (value: string) => void;
  onStopLossPercentChange: (value: string) => void;
  onTakeProfitPercentChange: (value: string) => void;
  onLeverageChange: (value: string) => void;
  onMarginChange: (value: string) => void;
}

export function TradeCalculatorForm({
  direction,
  entryPrice,
  stopLossPercent,
  takeProfitPercent,
  leverage,
  margin,
  onDirectionChange,
  onEntryPriceChange,
  onStopLossPercentChange,
  onTakeProfitPercentChange,
  onLeverageChange,
  onMarginChange,
}: TradeCalculatorFormProps) {
  return (
    <div className="grid gap-4">
      {/* Direction */}
      <div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onDirectionChange("LONG")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              direction === "LONG"
                ? "border-green-500 bg-green-500/10 text-green-600"
                : "hover:bg-muted"
            }`}
          >
            Long
          </button>

          <button
            type="button"
            onClick={() => onDirectionChange("SHORT")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              direction === "SHORT"
                ? "border-red-500 bg-red-500/10 text-red-600"
                : "hover:bg-muted"
            }`}
          >
            Short
          </button>
        </div>
      </div>

      {/* Entry Price */}
      <div>
        <label className="mb-2 block text-sm font-medium">Entry Price</label>

        <div className="relative">
          <input
            type="number"
            min="0"
            step="any"
            value={entryPrice}
            onChange={(e) => onEntryPriceChange(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 pr-16 outline-none focus:ring-2 focus:ring-primary"
          />

          <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
            USDT
          </span>
        </div>
      </div>

      {/* Stop Loss / Take Profit */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Stop Loss %</label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              value={stopLossPercent}
              onChange={(e) => onStopLossPercentChange(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 pr-8 outline-none focus:ring-2 focus:ring-primary"
            />

            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Take Profit %
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              value={takeProfitPercent}
              onChange={(e) => onTakeProfitPercentChange(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 pr-8 outline-none focus:ring-2 focus:ring-primary"
            />

            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Leverage / Margin */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Leverage</label>

          <div className="relative">
            <input
              type="number"
              min="1"
              step="1"
              value={leverage}
              onChange={(e) => onLeverageChange(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 pr-8 outline-none focus:ring-2 focus:ring-primary"
            />

            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
              x
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Margin <span className="text-muted-foreground">(optional)</span>
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              value={margin}
              onChange={(e) => onMarginChange(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 pr-16 outline-none focus:ring-2 focus:ring-primary"
            />

            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
              USDT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
