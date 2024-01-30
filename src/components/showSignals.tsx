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

    return "white";
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <label>{title} </label>
      <hr />
      {signals.map((signal, index) => {
        return (
          <div key={index}>
            <h1
              style={{ color: getColor(signal) }}
            >{`${symboles[index]}: ${signal}`}</h1>
          </div>
        );
      })}
    </main>
  );
}
