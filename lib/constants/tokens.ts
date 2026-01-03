import { type Address } from 'viem'
import { mainnet, arbitrum } from 'wagmi/chains'
import { type SupportedChainId } from './chains'

type tokens = Record<
    SupportedChainId,
    Record<string, { address: Address; decimals: number }>
>

export const TOKENS: tokens = {
    [mainnet.id]: {
        USDC: { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
        USDT: { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
        USDe: { address: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3', decimals: 18 },
    },
    [arbitrum.id]: {
        USDC: { address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6 },
        USDT: { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6 },
        USDe: { address: '0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34', decimals: 18 },
    }
}
