import { MarketHistory } from "@/api/market/types";
import { IndicatorResult, IndicatorSignal } from "./types";

export type SupportResistanceType = "SUPPORT" | "RESISTANCE";

export interface SupportResistanceLevel {
  level: number;
  type: SupportResistanceType;
  touches: number;
}

export type BreakoutType = "BREAKOUT_UP" | "BREAKOUT_DOWN" | "NONE";

export interface BreakoutResult {
  type: BreakoutType;
  level?: SupportResistanceLevel;
}

const LEVEL_TOLERANCE_PERCENT = 0.5;
const BREAKOUT_CONFIRMATION_PERCENT = 0.5;

/**
 * Find local highs and lows
 */
function findSwingLevels(closePrices: number[]): SupportResistanceLevel[] {
  const levels: SupportResistanceLevel[] = [];

  for (let i = 1; i < closePrices.length - 1; i++) {
    const previous = closePrices[i - 1];
    const current = closePrices[i];
    const next = closePrices[i + 1];

    if (!Number.isFinite(current)) {
      continue;
    }

    if (current > previous && current > next) {
      levels.push({
        level: current,
        type: "RESISTANCE",
        touches: 1,
      });
    }

    if (current < previous && current < next) {
      levels.push({
        level: current,
        type: "SUPPORT",
        touches: 1,
      });
    }
  }

  return levels;
}

/**
 * Merge close levels into zones
 */
function mergeLevels(
  levels: SupportResistanceLevel[],
  tolerancePercent = LEVEL_TOLERANCE_PERCENT,
): SupportResistanceLevel[] {
  const merged: SupportResistanceLevel[] = [];

  for (const level of levels) {
    const existing = merged.find((item) => {
      const difference = Math.abs(item.level - level.level);

      const percentage = (difference / item.level) * 100;

      return percentage <= tolerancePercent;
    });

    if (existing) {
      existing.level = (existing.level + level.level) / 2;

      existing.touches += 1;
    } else {
      merged.push({
        ...level,
      });
    }
  }

  return merged;
}

/**
 * Calculate support/resistance zones
 */
function calculateSupportResistanceLevels(
  closePrices: number[],
): SupportResistanceLevel[] {
  const swingLevels = findSwingLevels(closePrices);

  return mergeLevels(swingLevels);
}

/**
 * Find closest support below price
 */
function findNearestSupport(
  currentPrice: number,
  levels: SupportResistanceLevel[],
): SupportResistanceLevel | undefined {
  return levels
    .filter((level) => level.type === "SUPPORT" && level.level < currentPrice)
    .sort((a, b) => b.level - a.level)[0];
}

/**
 * Find closest resistance above price
 */
function findNearestResistance(
  currentPrice: number,
  levels: SupportResistanceLevel[],
): SupportResistanceLevel | undefined {
  return levels
    .filter(
      (level) => level.type === "RESISTANCE" && level.level > currentPrice,
    )
    .sort((a, b) => a.level - b.level)[0];
}

/**
 * Detect confirmed breakout
 */
function detectBreakout(
  currentPrice: number,
  levels: SupportResistanceLevel[],
): BreakoutResult {
  const resistance = findNearestResistance(currentPrice, levels);

  const support = findNearestSupport(currentPrice, levels);

  if (
    resistance &&
    currentPrice > resistance.level * (1 + BREAKOUT_CONFIRMATION_PERCENT / 100)
  ) {
    return {
      type: "BREAKOUT_UP",
      level: resistance,
    };
  }

  if (
    support &&
    currentPrice < support.level * (1 - BREAKOUT_CONFIRMATION_PERCENT / 100)
  ) {
    return {
      type: "BREAKOUT_DOWN",
      level: support,
    };
  }

  return {
    type: "NONE",
  };
}

/**
 * Get nearest support levels
 */
export function getSupportLevels(
  histories: MarketHistory[],
): SupportResistanceLevel[] {
  return histories.map((history) => {
    if (history.close.length === 0) {
      return {
        level: 0,
        type: "SUPPORT",
        touches: 0,
      };
    }

    const currentPrice = history.close[history.close.length - 1];

    const levels = calculateSupportResistanceLevels(history.close);

    return (
      findNearestSupport(currentPrice, levels) ?? {
        level: 0,
        type: "SUPPORT",
        touches: 0,
      }
    );
  });
}

/**
 * Get nearest resistance levels
 */
export function getResistanceLevels(
  histories: MarketHistory[],
): SupportResistanceLevel[] {
  return histories.map((history) => {
    if (history.close.length === 0) {
      return {
        level: 0,
        type: "RESISTANCE",
        touches: 0,
      };
    }

    const currentPrice = history.close[history.close.length - 1];

    const levels = calculateSupportResistanceLevels(history.close);

    return (
      findNearestResistance(currentPrice, levels) ?? {
        level: 0,
        type: "RESISTANCE",
        touches: 0,
      }
    );
  });
}

/**
 * Get breakout signals
 */
export function getBreakoutSignals(
  histories: MarketHistory[],
): BreakoutResult[] {
  return histories.map((history) => {
    if (history.close.length === 0) {
      return {
        type: "NONE",
      };
    }

    const currentPrice = history.close[history.close.length - 1];

    const levels = calculateSupportResistanceLevels(history.close);

    return detectBreakout(currentPrice, levels);
  });
}

export function generateSupportResistanceSignals(
  symbol: string,
  closePrices: number[],
): IndicatorResult[] {
  if (!closePrices.length) {
    return [];
  }

  const currentPrice = closePrices[closePrices.length - 1];

  const levels = calculateSupportResistanceLevels(closePrices);

  const support = findNearestSupport(currentPrice, levels);

  const resistance = findNearestResistance(currentPrice, levels);

  return [
    {
      symbol,
      indicator: "SUPPORT",
      signal: IndicatorSignal.NEUTRAL,
      strength: support?.touches ?? 0,
      value: support?.level ?? 0,
    },
    {
      symbol,
      indicator: "RESISTANCE",
      signal: IndicatorSignal.NEUTRAL,
      strength: resistance?.touches ?? 0,
      value: resistance?.level ?? 0,
    },
  ];
}
