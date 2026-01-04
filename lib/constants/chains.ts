import { mainnet, arbitrum, base } from 'wagmi/chains'

export const SUPPORTED_CHAINS = [mainnet, arbitrum, base] as const
export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]['id']

export const CHAIN_METADATA: Record<SupportedChainId, { name: string; icon: string; colorVar: string; classes: { foreground: string; background: string } }> = {
    [mainnet.id]: {
        name: 'Ethereum',
        icon: '/ethereum-logo.svg',
        colorVar: 'chain-mainnet',
        classes: {
            foreground: 'bg-chain-mainnet',
            background: 'bg-chain-mainnet/20'
        }
    },
    [arbitrum.id]: {
        name: 'Arbitrum',
        icon: '/arbitrum-logo.svg',
        colorVar: 'chain-arbitrum',
        classes: {
            foreground: 'bg-chain-arbitrum',
            background: 'bg-chain-arbitrum/20'
        }
    },
    [base.id]: {
        name: 'Base',
        icon: '/base-logo.svg',
        colorVar: 'chain-base',
        classes: {
            foreground: 'bg-chain-base',
            background: 'bg-chain-base/20'
        }
    }
}
