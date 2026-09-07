interface StateMessageProps {
  message: string;
  type?: "error" | "loading" | "empty";
}

export default function StateMessage({
  message,
  type = "empty",
}: StateMessageProps) {
  const color =
    type === "error"
      ? "text-red-500"
      : type === "loading"
        ? "text-blue-500"
        : "text-gray-500";

  return <div className={`p-4 text-center ${color}`}>{message}</div>;
}
