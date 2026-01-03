import { useConnection, useReadContracts } from 'wagmi'
import { formatUnits } from 'viem'
import { useMemo } from 'react'
import { TOKENS, ERC20_ABI, SUPPORTED_CHAINS } from '@/lib/constants'

export function useStableBalances() {
    const { address } = useConnection()

    const { contracts, meta } = useMemo(() => {
        if (!address) {
            return {
                contracts: [],
                meta: []
            }
        }

        const contracts = []
        const meta = []

        for (const chain of SUPPORTED_CHAINS) {
            const chainId = chain.id
            const chainTokens = TOKENS[chainId]

            for (const [symbol, token] of Object.entries(chainTokens)) {
                contracts.push({
                    address: token.address,
                    abi: ERC20_ABI,
                    functionName: 'balanceOf',
                    args: [address],
                    chainId,
                })

                meta.push({ chainId, symbol, decimals: token.decimals })
            }
        }
        return { contracts, meta }
    }, [address])

    const { data, isLoading, error, refetch } = useReadContracts({
        contracts,
        query: {
            enabled: !!address && contracts.length > 0,
            staleTime: 30_000,
        }
    })

    const balances = useMemo(() => {
        if (!data) return {}

        const result: Record<number, Record<string, string | null>> = {}

        data.forEach((res, index) => {
            const { chainId, symbol, decimals } = meta[index]

            if (!result[chainId]) result[chainId] = {}

            if (res.status === 'success' && typeof res.result === 'bigint') {
                result[chainId][symbol] = formatUnits(res.result, decimals)
            } else {
                result[chainId][symbol] = null
            }
        })

        return result
    }, [data, meta])

    return {
        balances,
        isLoading,
        error,
        refetch
    }
}
