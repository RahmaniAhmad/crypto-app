import { SignalConfidence } from "@/scanner/types";

interface Props {
  confidence: SignalConfidence;
}

export default function ConfidenceBadge({ confidence }: Props) {
  const styles = {
    HIGH: "text-green-600 dark:text-green-400",
    MEDIUM: "text-yellow-600 dark:text-yellow-400",
    LOW: "text-red-600 dark:text-red-400",
  };

  return (
    <span
      className={`
        text-xs
        font-semibold
        ${styles[confidence]}
      `}
    >
      Confidence: {confidence}
    </span>
  );
}
