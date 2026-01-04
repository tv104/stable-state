import { mainnet, arbitrum, base } from 'wagmi/chains'

export const SUPPORTED_CHAINS = [mainnet, arbitrum, base] as const
export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]['id']
