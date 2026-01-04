import Image from 'next/image';
import { Paper } from './Paper';
import { ProgressBar } from './ProgressBar';
import { Skeleton } from './Skeleton';
import { formatCurrency } from '@/lib/format-currency';
import { TOKEN_METADATA, type TokenSymbol } from '@/lib/constants';

interface TokenBalance {
    symbol: TokenSymbol;
    balance: number;
    allocation: number; // Percentage 0-100
}

interface TokenBreakdownProps {
    balances: TokenBalance[];
    isLoading?: boolean;
    error?: Error | null;
}

export function TokenBreakdown({ balances, isLoading, error }: TokenBreakdownProps) {
    const getTokenIcon = (symbol: TokenSymbol) => {
        return TOKEN_METADATA[symbol].icon;
    };

    const zeroRows = (Object.keys(TOKEN_METADATA) as TokenSymbol[]).map(symbol => ({
        symbol,
        balance: 0,
        allocation: 0
    }));

    const dataToRender = isLoading || balances.length === 0 ? zeroRows : balances;

    return (
        <Paper className="w-full">
            <h3 className="mb-6">Token Breakdown</h3>

            <div className="w-full overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="w-32">Token</th>
                            <th className="w-32">Balance</th>
                            <th>Allocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToRender.map((token) => (
                            <tr key={token.symbol} className="group">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-50 p-2">
                                            <Image
                                                src={getTokenIcon(token.symbol)}
                                                alt={token.symbol}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="font-medium">{token.symbol}</span>
                                    </div>
                                </td>
                                <td className="font-mono text-sm">
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-28" />
                                    ) : (
                                        formatCurrency(token.balance)
                                    )}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <ProgressBar value={token.allocation} token={token.symbol} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    Error loading balances: {error.message}
                </div>
            )}
        </Paper>
    );
}
