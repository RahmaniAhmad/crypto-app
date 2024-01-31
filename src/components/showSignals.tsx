"use client";
interface SMAProps {
  title?: string;
  symboles: string[];
  signals: string[];
}
export default function ShowSignals({ title, symboles, signals }: SMAProps) {
  const getColor = (signal: string) => {
    if (signal === "buy") return "green";
    if (signal === "sell") return "red";

    return "black dark:white";
  };
  return (
    <div className="text-center">
      <div className="sticky top-14 bg-blue-500 px-10 py-2">{title}</div>
      {signals.map((signal, index) => {
        return (
          <div
            key={index}
            style={{ color: getColor(signal) }}
            className="flex space-x-3 w-full py-1 items-center justify-center"
          >
            {`${symboles[index]}: ${signal}`}
          </div>
        );
      })}
    </div>
  );
}
