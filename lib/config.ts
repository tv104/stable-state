import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, base } from 'wagmi/chains'
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
                            'A demo app for displaying stablecoin balances across multiple chains',
                        url: window.location.origin,
                        icons: [`${window.location.origin}/logo.webp`],
                    },
                }),
            ]
            : []),
    ],
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    },
})