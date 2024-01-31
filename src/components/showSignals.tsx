interface SMAProps {
  title?: string;
  symboles: string[];
  signals: string[];
}
export default async function ShowSignals({
  title,
  symboles,
  signals,
}: SMAProps) {
  const getColor = (signal: string) => {
    if (signal === "buy") return "green";
    if (signal === "sell") return "red";

    return "black";
  };
  return (
    // <main className="flex min-h-screen flex-col items-start p-24">
    <div className="text-center">
      <div className="font-bold sticky top-0 bg-blue-500 px-10">{title}</div>
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
