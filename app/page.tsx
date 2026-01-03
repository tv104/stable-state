"use client";
import { Header } from "@/components/Header";
import { useStableBalances } from '@/hooks/useStableBalances';

export default function Home() {
  const { isLoading, error, balances } = useStableBalances();
  console.log('useStableBalances()', { isLoading, error, balances })

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex flex-1 flex-col items-center px-4 py-12">
        <div className="w-full max-w-3xl rounded-xl bg-surface p-8 shadow-sm">
          <h1>Stable State</h1>
          <h2>Demo app for displaying ETH and selected stablecoin balances</h2>
        </div>
      </main>
    </div>
  );
}