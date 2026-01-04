import { useMemo } from 'react';
import { CHAIN_METADATA, SUPPORTED_CHAIN_IDS, SupportedChainId } from '@/lib/constants/chains';
import { ChainBalances } from './useTokenStats';

export interface ChainStat {
    chainId: SupportedChainId;
    name: string;
    balance: number;
    allocation: number;
}

export function useChainStats(balances: ChainBalances) {
    return useMemo(() => {
        const totals = SUPPORTED_CHAIN_IDS.reduce((acc, chainId) => {
            acc[chainId] = 0;
            return acc;
        }, {} as Record<SupportedChainId, number>);

        let totalBalance = 0;

        SUPPORTED_CHAIN_IDS.forEach((chainId) => {
            const chainTokens = balances[chainId];
            if (chainTokens) {
                const chainTotal = Object.values(chainTokens).reduce((sum, val) => sum + Number(val || 0), 0);
                totals[chainId] = chainTotal;
                totalBalance += chainTotal;
            }
        });

        return SUPPORTED_CHAIN_IDS.map((chainId) => {
            return {
                chainId,
                name: CHAIN_METADATA[chainId].name,
                balance: totals[chainId],
                allocation: totalBalance > 0 ? (totals[chainId] / totalBalance) * 100 : 0
            };
        });
    }, [balances]);
}
