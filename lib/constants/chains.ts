import { mainnet, arbitrum } from 'wagmi/chains'

export const SUPPORTED_CHAINS = [mainnet, arbitrum] as const
export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]['id']
