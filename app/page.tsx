"use client";
import { Header } from "@/components/Header";
import { TokenBreakdown } from "@/components/TokenBreakdown";
import { ChainBreakdown } from "@/components/ChainBreakdown";
import { useStableBalances } from '@/hooks/useStableBalances';
import { useMounted } from '@/hooks/useMounted';
import { useTokenStats } from '@/hooks/useTokenStats';
import { useChainStats } from '@/hooks/useChainStats';

export default function Home() {
  const mounted = useMounted();
  const { isLoading, error, balances } = useStableBalances();
  const formattedBalances = useTokenStats(balances);
  const chainStats = useChainStats(balances);
  console.log('useStableBalances()', { isLoading, error, balances })

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-12 max-w-3xl mx-auto">
        <div className="w-full rounded-xl bg-surface p-8 shadow-sm">
          <h1>Stable State</h1>
          <h2>Demo app for displaying ETH and selected stablecoin balances</h2>
        </div>
        <TokenBreakdown
          balances={mounted ? formattedBalances : []}
          isLoading={mounted ? isLoading : false}
          error={mounted ? error : null}
        />
        <ChainBreakdown
          stats={mounted ? chainStats : []}
          isLoading={mounted ? isLoading : false}
          error={mounted ? error : null}
        />
      </main>
    </div>
  );
}