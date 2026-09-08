import { ScannerSignal } from "@/scanner/types";

interface Props {
  signal: ScannerSignal;
}

export default function SignalBadge({ signal }: Props) {
  const isBuy = signal.includes("BUY");

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold

        ${
          isBuy
            ? "bg-green-500/20 text-green-600 dark:text-green-400"
            : "bg-red-500/20 text-red-600 dark:text-red-400"
        }
      `}
    >
      {signal}
    </span>
  );
}
