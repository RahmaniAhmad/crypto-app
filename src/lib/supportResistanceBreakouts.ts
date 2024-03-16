export interface SupportResistanceLevel {
  level: number;
  type: "SUPPORT" | "RESISTANCE" | "NEUTRAL";
}

function calculateTolerance(currentPrice: number, percentage: number): number {
  // Calculate tolerance as a percentage of the current price
  return (currentPrice * percentage) / 100;
}

function calculateSensitivity(
  currentPrice: number,
  sensitivityPercentage: number
): number {
  // Calculate sensitivity as a percentage of the current price
  return (currentPrice * sensitivityPercentage) / 100;
}

function detectBreakout(
  currentPrice: number,
  levels: SupportResistanceLevel[]
): SupportResistanceLevel {
  const tolerance = calculateTolerance(currentPrice, 5);

  for (const level of levels) {
    if (level.type === "SUPPORT" && currentPrice < level.level - tolerance) {
      return level;
    } else if (
      level.type === "RESISTANCE" &&
      currentPrice > level.level + tolerance
    ) {
      return level;
    }
  }
  return { type: "NEUTRAL", level: 0 };
}

function detectNearestLevel(
  currentPrice: number,
  levels: SupportResistanceLevel[]
): SupportResistanceLevel {
  let nearestLevel: SupportResistanceLevel = { type: "NEUTRAL", level: 0 };
  let minDistance = Number.MAX_VALUE;

  for (const level of levels) {
    const distance = Math.abs(level.level - currentPrice);
    if (distance < minDistance) {
      minDistance = distance;
      nearestLevel = level;
    } else if (
      distance === minDistance &&
      level.level < currentPrice &&
      level.level > nearestLevel.level
    ) {
      nearestLevel = level;
    }
  }

  return nearestLevel;
}

function calculateSupportResistanceLevels(
  closePrices: number[],
  sensitivity: number
): SupportResistanceLevel[] {
  const levels: SupportResistanceLevel[] = [];
  let lastHigh: number | null = null;
  let lastLow: number | null = null;
  for (let i = 1; i < closePrices.length - 1; i++) {
    const prevPrice = closePrices[i - 1];
    const currentPrice = closePrices[i];
    const nextPrice = closePrices[i + 1];

    if (currentPrice > prevPrice && currentPrice > nextPrice) {
      // Local maximum (swing high)
      lastHigh = currentPrice;
    } else if (currentPrice < prevPrice && currentPrice < nextPrice) {
      // Local minimum (swing low)
      lastLow = currentPrice;
    }

    // Check if there is a significant swing high or swing low
    if (lastHigh !== null && lastLow !== null) {
      const range = lastHigh - lastLow;
      if (range >= sensitivity) {
        // Significant swing high as resistance
        levels.push({ level: lastHigh, type: "RESISTANCE" });
      } else if (range <= sensitivity) {
        // Significant swing low as support
        levels.push({ level: lastLow, type: "SUPPORT" });
      }
      // Reset last high and low
      lastHigh = null;
      lastLow = null;
    }
  }

  return levels;
}

export const getSupportBreakouts = async (histories: any[]) => {
  const breakouts: SupportResistanceLevel[] = [];

  try {
    histories.forEach((history) => {
      const currentPrice = history.c[history.c.length - 1]; // Current close price
      const sensitivity = calculateSensitivity(currentPrice, 10);
      const levels = calculateSupportResistanceLevels(history.c, sensitivity); // Support/resistance levels for the current cryptocurrency

      const supportLevels = levels.filter((level) => level.type === "SUPPORT");

      const nearestSupport = detectNearestLevel(currentPrice, supportLevels);

      breakouts.push(nearestSupport);
    });
  } catch (error) {
    console.error(error);
  }
  return breakouts;
};

export const getReistanceBreakouts = async (histories: any[]) => {
  const breakouts: SupportResistanceLevel[] = [];
  try {
    histories.forEach((history) => {
      const currentPrice = history.c[history.c.length - 1]; // Current close price
      const sensitivity = calculateSensitivity(currentPrice, 10);
      const levels = calculateSupportResistanceLevels(history.c, 3); // Support/resistance levels for the current cryptocurrency

      const resistanceLevels = levels.filter(
        (level) => level.type === "RESISTANCE"
      );

      const nearestResistance = detectNearestLevel(
        currentPrice,
        resistanceLevels
      );

      breakouts.push(nearestResistance);
    });
  } catch (error) {
    console.error(error);
  }
  return breakouts;
};
