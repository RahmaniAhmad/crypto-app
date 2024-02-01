"use client";

import { Signal } from "@/const";

interface ShowColumnDataProps {
  title?: string;
  data: string[];
}
export default function ShowColumnData({ title, data }: ShowColumnDataProps) {
  const getColor = (signal: string) => {
    if (signal === Signal.buy) return "text-green-600 dark:text-green-400";
    if (signal === Signal.sell) return "text-red-600 dark:text-red-400";
    if (signal === Signal.neutral) return "text-gray-500 dark:text-gray-500";

    return "white";
  };
  return (
    <div className="text-center">
      <div className="sticky top-14 bg-blue-500 py-2">{title}</div>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={`flex space-x-3 w-full py-1 items-center justify-center ${getColor(
              item
            )}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
