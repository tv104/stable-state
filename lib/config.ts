import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { SUPPORTED_CHAINS } from '@/lib/constants'

export const config = createConfig({
    chains: SUPPORTED_CHAINS,
    ssr: false,
    connectors: [
        injected(),
        ...(typeof window !== 'undefined'
            ? [
                walletConnect({
                    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
                    metadata: {
                        name: 'Stable State',
                        description:
                            'Demo app for displaying ETH and selected stablecoin balances on mainnet and Arbitrum',
                        url: window.location.origin,
                        icons: ['https://avatars.githubusercontent.com/u/1164786'],
                    },
                }),
            ]
            : []),
    ],
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    },
})