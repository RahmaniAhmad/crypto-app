"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { PricePoint } from "@/features/market/types";

interface Props {
  data: PricePoint[];
  symbol: string;
}

export function PriceChart({ data, symbol }: Props) {
  const chartData = data.map((item) => ({
    time: item.time,
    price: item.price,
  }));

  return (
    <div className="w-full px-6">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Last {data.length} candles
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              minTickGap={30}
            />

            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
            />

            <Tooltip
              labelFormatter={(value) =>
                new Date(Number(value)).toLocaleString()
              }
              formatter={(value) => [
                `$${Number(value ?? 0).toLocaleString()}`,
                "Price",
              ]}
            />

            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
