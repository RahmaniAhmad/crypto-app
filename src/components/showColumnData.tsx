"use client";
interface ShowColumnDataProps {
  title?: string;
  data: string[];
}
export default function ShowColumnData({ title, data }: ShowColumnDataProps) {
  const getColor = (signal: string) => {
    if (signal === "buy") return "green";
    if (signal === "sell") return "red";

    return "black dark:white";
  };
  return (
    <div className="text-center">
      <div className="sticky top-14 bg-blue-500 py-2">{title}</div>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{ color: getColor(item) }}
            className="flex space-x-3 w-full py-1 items-center justify-center"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
