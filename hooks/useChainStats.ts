import { useMemo } from 'react';
import { CHAIN_METADATA, SUPPORTED_CHAINS, SupportedChainId } from '@/lib/constants/chains';
import { ChainBalances } from './useTokenStats';

export interface ChainStat {
    chainId: SupportedChainId;
    name: string;
    balance: number;
    allocation: number;
}

export function useChainStats(balances: ChainBalances) {
    return useMemo(() => {
        const totals = SUPPORTED_CHAINS.reduce((acc, chain) => {
            acc[chain.id] = 0;
            return acc;
        }, {} as Record<SupportedChainId, number>);

        let totalBalance = 0;

        SUPPORTED_CHAINS.forEach((chain) => {
            const chainTokens = balances[chain.id];
            if (chainTokens) {
                const chainTotal = Object.values(chainTokens).reduce((sum, val) => sum + Number(val || 0), 0);
                totals[chain.id] = chainTotal;
                totalBalance += chainTotal;
            }
        });

        return SUPPORTED_CHAINS.map((chain) => ({
            chainId: chain.id,
            name: CHAIN_METADATA[chain.id].name,
            balance: totals[chain.id],
            allocation: totalBalance > 0 ? (totals[chain.id] / totalBalance) * 100 : 0
        }));
    }, [balances]);
}
