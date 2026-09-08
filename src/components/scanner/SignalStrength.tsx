interface Props {
  score: number;
}

export default function SignalStrength({ score }: Props) {
  const strength = Math.abs(score);

  const isBuy = score >= 0;

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-muted-foreground">Strength</span>

        <span className="font-bold">{strength}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`
            h-full rounded-full
            ${isBuy ? "bg-green-500" : "bg-red-500"}
          `}
          style={{
            width: `${Math.min(strength, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
