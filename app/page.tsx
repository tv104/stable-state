"use client";
import { ConnectButton } from "@/components/ConnectButton";
import { useStableBalances } from '@/hooks/useStableBalances';

export default function Home() {
  const { isLoading, error, balances } = useStableBalances();
  console.log('useStableBalances()', { isLoading, error, balances })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ConnectButton />
        <h1>Stable State</h1>
        <h2>Demo app for displaying ETH and selected stablecoin balances</h2>
      </main>
    </div>
  );
}