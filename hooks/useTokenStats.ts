import { useMemo } from 'react';
import { TOKEN_SYMBOLS, type TokenSymbol } from '@/lib/constants';

export type ChainBalances = Record<number, Partial<Record<TokenSymbol, string | null>>>;

export interface TokenStat {
    symbol: TokenSymbol;
    balance: number;
    allocation: number;
}

export function useTokenStats(balances: ChainBalances) {
    return useMemo(() => {
        const totals = TOKEN_SYMBOLS.reduce((acc, symbol) => {
            acc[symbol] = 0;
            return acc;
        }, {} as Record<TokenSymbol, number>);

        Object.values(balances).forEach((chainTokens) => {
            TOKEN_SYMBOLS.forEach((symbol) => {
                const balance = chainTokens[symbol];
                if (balance) {
                    totals[symbol] = (totals[symbol] || 0) + Number(balance);
                }
            });
        });

        const totalBalance = Object.values(totals).reduce((sum, val) => sum + (val || 0), 0);

        return TOKEN_SYMBOLS.map((symbol) => ({
            symbol,
            balance: totals[symbol],
            allocation: totalBalance > 0 ? (totals[symbol] / totalBalance) * 100 : 0
        }));
    }, [balances]);
}
