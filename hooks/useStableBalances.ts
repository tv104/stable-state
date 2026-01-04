import { useConnection, useReadContracts } from 'wagmi'
import { formatUnits, erc20Abi } from 'viem'
import { useMemo } from 'react'
import { SUPPORTED_CHAIN_IDS, type TokenSymbol, getChainTokenEntries } from '@/lib/constants'
import { useMockDataStore } from '@/lib/store'

export function useStableBalances() {
    const { address } = useConnection()
    const { isMockDataEnabled, mockBalances } = useMockDataStore()

    const { contracts, meta } = useMemo(() => {
        if (!address && !isMockDataEnabled) {
            return {
                contracts: [],
                meta: []
            }
        }

        const contracts = []
        const meta: { chainId: number; symbol: TokenSymbol; decimals: number }[] = []

        for (const chainId of SUPPORTED_CHAIN_IDS) {
            const chainTokens = getChainTokenEntries(chainId)

            for (const [symbol, token] of chainTokens) {
                contracts.push({
                    address: token.address,
                    abi: erc20Abi,
                    functionName: 'balanceOf',
                    args: [address],
                    chainId,
                })

                meta.push({ chainId, symbol, decimals: token.decimals })
            }
        }
        return { contracts, meta }
    }, [address, isMockDataEnabled])

    const { data, isLoading, error, refetch } = useReadContracts({
        contracts,
        query: {
            enabled: (!!address || isMockDataEnabled) && contracts.length > 0,
            staleTime: 30_000,
        }
    })

    const balances = useMemo(() => {
        if (isMockDataEnabled) {
            return mockBalances
        }

        if (!data) return {}

        const result: Record<number, Partial<Record<TokenSymbol, string | null>>> = {}

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
    }, [data, meta, isMockDataEnabled, mockBalances])

    return {
        balances,
        isLoading: isMockDataEnabled ? false : isLoading,
        error: isMockDataEnabled ? null : error,
        refetch
    }
}
