"use client";

import { CryptoScanResult } from "@/scanner/types";

interface Props {
  data: CryptoScanResult[];
}

export default function CryptoScanner({ data }: Props) {
  const filteredData = [...data]
    .filter((item) => item.signal !== "NEUTRAL")
    .sort((a, b) => b.score - a.score);

  if (!filteredData.length) {
    return (
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-bold">Market Scanner</h2>

        <p className="mt-2 text-muted-foreground">
          No trading opportunities found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Market Scanner</h2>

          <p className="text-sm text-muted-foreground">
            Top trading opportunities
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {filteredData.length} signals
        </span>
      </div>

      <div className="grid grid-cols-1 border rounded-xl p-6 gap-4 md:grid-cols-3">
        {filteredData.slice(0, 10).map((item, index) => {
          const isBuy = item.signal.includes("BUY");

          return (
            <div
              key={item.symbol}
              className={`
                rounded-xl
                border
                p-4
                transition
                hover:shadow-md
                ${
                  isBuy
                    ? `
                      border-green-500/30
                      bg-green-500/10
                    `
                    : `
                      border-red-500/30
                      bg-red-500/10
                    `
                }
              `}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">#{index + 1}</p>

                  <h3 className="text-lg font-bold">{item.symbol}</h3>
                </div>

                <span
                  className={`
                    rounded-full
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    ${
                      isBuy
                        ? `
                          bg-green-500/20
                          text-green-600
                          dark:text-green-400
                        `
                        : `
                          bg-red-500/20
                          text-red-600
                          dark:text-red-400
                        `
                    }
                  `}
                >
                  {item.signal}
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>

                  <span className="font-bold">{item.score}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`
                      h-full rounded-full
                      ${isBuy ? "bg-green-500" : "bg-red-500"}
                    `}
                    style={{
                      width: `${Math.min(item.score, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
