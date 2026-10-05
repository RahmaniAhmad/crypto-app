interface ResultRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function ResultRow({
  label,
  value,
  valueClassName = "",
}: ResultRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className={`text-sm font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
}
