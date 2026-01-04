"use client";
import { useEffect } from 'react';
import { TokenBreakdown } from "@/components/TokenBreakdown";
import { ChainBreakdown } from "@/components/ChainBreakdown";
import { useStableBalances } from '@/hooks/useStableBalances';
import { useMounted } from '@/hooks/useMounted';
import { useTokenStats } from '@/hooks/useTokenStats';
import { useChainStats } from '@/hooks/useChainStats';
import { useToast } from '@/components/ToastProvider';
import { Container } from '@/components/Container';

export default function Home() {
  const mounted = useMounted();
  const { isLoading, error, balances } = useStableBalances();
  const formattedBalances = useTokenStats(balances);
  const chainStats = useChainStats(balances);
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(`Error loading balances: ${error.message}`, 'error');
    }
  }, [error, showToast]);

  console.log('useStableBalances()', { isLoading, error, balances })

  return (
    <Container>
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
    </Container>
  );
}