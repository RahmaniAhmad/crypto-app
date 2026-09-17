import { MultiTimeframeAnalysis, TimeframeSignal } from "@/scanner/types";

interface Props {
  analysis: MultiTimeframeAnalysis;
}

const config = {
  BUY: {
    label: "BULL",
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
    icon: "↑",
  },

  SELL: {
    label: "BEAR",
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
    icon: "↓",
  },

  NEUTRAL: {
    label: "WAIT",
    className: "bg-muted text-muted-foreground",
    icon: "→",
  },
};

function Timeframe({
  label,
  signal,
}: {
  label: string;
  signal: TimeframeSignal;
}) {
  const item = config[signal];

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[11px] text-muted-foreground">{label}</span>

      <span
        className={`
          rounded-md
          px-2
          py-1
          text-xs
          font-semibold
          ${item.className}
        `}
      >
        {item.icon} {item.label}
      </span>
    </div>
  );
}

export default function MultiTimeframe({ analysis }: Props) {
  return (
    <div className="mt-4 rounded-lg border p-3">
      <div className="flex items-center justify-center mb-3">
        <span className="text-xs font-medium text-muted-foreground">
          Multi-Timeframe
        </span>
      </div>
      <div className="flex justify-around">
        <Timeframe label="4H" signal={analysis.higher} />

        <Timeframe label="1H" signal={analysis.primary} />

        <Timeframe label="15M" signal={analysis.entry} />
      </div>
    </div>
  );
}
