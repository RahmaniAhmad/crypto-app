import CryptoDashboard from "@/features/dashboard/components/CryptoDashboard";
import { MARKET_CONFIG } from "@/features/market/config/market";
import { isTradingResolution } from "@/features/market/helpers";
import { analyzeMarket } from "@/features/scanner/services/analyzeMarket";

interface Props {
  searchParams: Promise<{
    resolution?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const { resolution: resolutionParam } = await searchParams;

  const resolution = isTradingResolution(resolutionParam)
    ? resolutionParam
    : MARKET_CONFIG.resolution;

  const { analysis, scanned } = await analyzeMarket(resolution);

  return (
    <CryptoDashboard
      analysis={analysis}
      scanned={scanned}
      resolution={resolution}
    />
  );
}
