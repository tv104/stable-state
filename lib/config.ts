import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { mainnet, arbitrum, base } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
    chains: [mainnet, arbitrum, base],
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: false,
    connectors: [
        injected(),
        walletConnect({
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
            metadata: {
                name: 'Stable State',
                description: 'Demo app for displaying ETH and selected stablecoin balances on mainnet and Arbitrum',
                url: 'https://tv104.github.io/stable-state',
                icons: ['https://avatars.githubusercontent.com/u/1164786']
            }
        }),
    ],
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    },
})