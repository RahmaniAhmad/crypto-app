"use client";

import { TradingResolution } from "@/features/market/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";

const resolutions: {
  value: TradingResolution;
  label: string;
}[] = [
  { value: "5m", label: "5m" },
  { value: "15m", label: "15m" },
  { value: "1h", label: "1H" },
  { value: "4h", label: "4H" },
];

interface Props {
  resolution: TradingResolution;
}

export default function ResolutionSelector({ resolution }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [pendingResolution, setPendingResolution] =
    useState<TradingResolution | null>(null);

  const handleChange = (value: TradingResolution) => {
    if (value === resolution || isPending) {
      return;
    }

    setPendingResolution(value);

    const params = new URLSearchParams(searchParams.toString());

    params.set("resolution", value);

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className="mb-6 flex gap-2">
      {resolutions.map((item) => {
        const isSelected = resolution === item.value;
        const isLoading = isPending && pendingResolution === item.value;

        return (
          <button
            key={item.value}
            onClick={() => handleChange(item.value)}
            disabled={isPending}
            className={`rounded-md px-4 font-medium transition-colors ${
              isSelected
                ? "bg-default-100 text-foreground shadow-sm"
                : "text-default-500 hover:bg-default-50 hover:text-foreground"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {item.label}
              </span>
            ) : (
              item.label
            )}
          </button>
        );
      })}
    </div>
  );
}
