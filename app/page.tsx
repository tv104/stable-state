"use client";
import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { TokenBreakdown } from "@/components/TokenBreakdown";
import { ChainBreakdown } from "@/components/ChainBreakdown";
import { Toast } from "@/components/Toast";
import { useStableBalances } from '@/hooks/useStableBalances';
import { useMounted } from '@/hooks/useMounted';
import { useTokenStats } from '@/hooks/useTokenStats';
import { useChainStats } from '@/hooks/useChainStats';

export default function Home() {
  const mounted = useMounted();
  const { isLoading, error, balances } = useStableBalances();
  const formattedBalances = useTokenStats(balances);
  const chainStats = useChainStats(balances);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

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
        />
        <ChainBreakdown
          stats={mounted ? chainStats : []}
          isLoading={mounted ? isLoading : false}
        />
      </main>
      {mounted && showToast && error && (
        <Toast
          message={`Error loading balances: ${error.message}`}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}