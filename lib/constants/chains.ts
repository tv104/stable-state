import { mainnet, arbitrum, base, type Chain } from 'wagmi/chains'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const CHAIN_METADATA = {
    [mainnet.id]: {
        chain: mainnet,
        name: 'Ethereum',
        icon: `${basePath}/ethereum-logo.svg`,
        classes: {
            foreground: 'bg-chain-mainnet',
            background: 'bg-chain-mainnet/20'
        }
    },
    [arbitrum.id]: {
        chain: arbitrum,
        name: 'Arbitrum',
        icon: `${basePath}/arbitrum-logo.svg`,
        classes: {
            foreground: 'bg-chain-arbitrum',
            background: 'bg-chain-arbitrum/20'
        }
    },
    [base.id]: {
        chain: base,
        name: 'Base',
        icon: `${basePath}/base-logo.svg`,
        classes: {
            foreground: 'bg-chain-base',
            background: 'bg-chain-base/20'
        }
    }
} as const

export type SupportedChainId = keyof typeof CHAIN_METADATA

export const SUPPORTED_CHAIN_IDS = Object.keys(CHAIN_METADATA).map(Number) as SupportedChainId[]

export const SUPPORTED_CHAINS = Object.values(CHAIN_METADATA).map((meta) => meta.chain) as unknown as [Chain, ...Chain[]]
