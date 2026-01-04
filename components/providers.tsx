'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/config'
import { useState } from 'react'
import { ToastProvider } from './ToastProvider'

export function Providers({
    children,
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
