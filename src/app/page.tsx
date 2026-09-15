import CryptoDashboard from "@/components/CryptoDashboard";
import { TRADING_CONFIG } from "@/config";
import { isTradingResolution } from "@/utils/tradingResolution";
import { analyzeMarket } from "@/analysis";

interface Props {
  searchParams: Promise<{
    resolution?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const { resolution: resolutionParam } = await searchParams;

  const resolution = isTradingResolution(resolutionParam)
    ? resolutionParam
    : TRADING_CONFIG.resolution;

  const { analysis, scanned } = await analyzeMarket(resolution);

  return (
    <CryptoDashboard
      analysis={analysis}
      scanned={scanned}
      resolution={resolution}
    />
  );
}
