"use client";

interface ShowColumnBreakoutDataProps {
  title?: string;
  data: any[];
}
export default function ShowColumnBreakoutData({
  title,
  data,
}: ShowColumnBreakoutDataProps) {
  const getColor = (type: any) => {
    if (type === "SUPPORT") return "text-blue-600 dark:text-blue-400";
    if (type === "RESISTANCE") return "text-red-600 dark:text-red-400";
    if (type === "NEUTRAL") return "text-gray-500 dark:text-gray-500";

    return "white";
  };

  return (
    <div className="text-center">
      <div className="sticky top-14 bg-blue-500 py-2">{title}</div>
      {data.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={`flex space-x-3 w-full py-1 items-center justify-center ${getColor(
                item.type
              )}`}
            >
              {item.type}, {item.level}
            </div>
          </>
        );
      })}
    </div>
  );
}
