import { TRADING_RESOLUTIONS, TradingResolution } from "../types";

export function isTradingResolution(
  value: string | undefined,
): value is TradingResolution {
  return (
    value !== undefined &&
    TRADING_RESOLUTIONS.includes(value as TradingResolution)
  );
}
