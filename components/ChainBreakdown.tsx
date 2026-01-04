import Image from 'next/image';
import { Paper } from './Paper';
import { ProgressBar } from './ProgressBar';
import { Skeleton } from './Skeleton';
import { formatCurrency } from '@/lib/format-currency';
import { CHAIN_METADATA, SupportedChainId } from '@/lib/constants/chains';
import { ChainStat } from '@/hooks/useChainStats';

interface ChainBreakdownProps {
    stats: ChainStat[];
    isLoading?: boolean;
    error?: Error | null;
}

export function ChainBreakdown({ stats, isLoading, error }: ChainBreakdownProps) {
    const getChainIcon = (chainId: SupportedChainId) => {
        return CHAIN_METADATA[chainId].icon;
    };

    const zeroRows = (Object.keys(CHAIN_METADATA).map(Number) as SupportedChainId[]).map(chainId => ({
        chainId,
        name: CHAIN_METADATA[chainId].name,
        balance: 0,
        allocation: 0
    }));

    const dataToRender = isLoading || stats.length === 0 ? zeroRows : stats;

    return (
        <Paper className="w-full">
            <h3 className="mb-6">Chain Breakdown</h3>

            <div className="w-full overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="w-36">Chain</th>
                            <th className="w-32">Balance</th>
                            <th>Allocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToRender.map((chain) => (
                            <tr key={chain.chainId} className="group">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-50 p-2">
                                            <Image
                                                src={getChainIcon(chain.chainId)}
                                                alt={chain.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="font-medium">{chain.name}</span>
                                    </div>
                                </td>
                                <td className="font-mono text-sm">
                                    {isLoading ? (
                                        <Skeleton className="h-5 w-28" />
                                    ) : (
                                        formatCurrency(chain.balance)
                                    )}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <ProgressBar
                                            value={chain.allocation}
                                            classes={CHAIN_METADATA[chain.chainId].classes}
                                        />
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
