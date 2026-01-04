import { type Address } from 'viem'
import { mainnet, arbitrum, base } from 'wagmi/chains'
import { type SupportedChainId } from './chains'

export const TOKEN_METADATA = {
    USDC: {
        icon: '/usdc-logo.svg',
        colorVar: 'token-usdc',
        classes: {
            foreground: 'bg-token-usdc',
            background: 'bg-token-usdc/20'
        }
    },
    USDT: {
        icon: '/usdt-logo.svg',
        colorVar: 'token-usdt',
        classes: {
            foreground: 'bg-token-usdt',
            background: 'bg-token-usdt/20'
        }
    },
    USDe: {
        icon: '/usde-logo.svg',
        colorVar: 'token-usde',
        classes: {
            foreground: 'bg-token-usde',
            background: 'bg-token-usde/20'
        }
    },
} as const

export type TokenSymbol = keyof typeof TOKEN_METADATA
export const TOKEN_SYMBOLS = Object.keys(TOKEN_METADATA) as TokenSymbol[]

export const TOKENS: Record<SupportedChainId, Record<TokenSymbol, { address: Address; decimals: number }>> = {
    [mainnet.id]: {
        USDC: { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
        USDT: { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
        USDe: { address: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3', decimals: 18 },
    },
    [arbitrum.id]: {
        USDC: { address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6 },
        USDT: { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6 },
        USDe: { address: '0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34', decimals: 18 },
    },
    [base.id]: {
        USDC: { address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', decimals: 6 },
        USDT: { address: '0xfde4c96c8593536e31f229ea8f37b2ada2699bb2', decimals: 6 },
        USDe: { address: '0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34', decimals: 18 },
    },
}

export function getChainTokenEntries(chainId: SupportedChainId) {
    const tokens = TOKENS[chainId]
    return Object.entries(tokens) as [TokenSymbol, typeof tokens[TokenSymbol]][]
}
