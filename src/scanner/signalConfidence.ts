import { SignalConfidence } from "./types";

export function calculateSignalConfidence(
  buySignals: number,
  sellSignals: number,
): SignalConfidence {
  const agreement = Math.max(buySignals, sellSignals);

  if (agreement >= 4) {
    return "HIGH";
  }

  if (agreement >= 3) {
    return "MEDIUM";
  }

  return "LOW";
}
