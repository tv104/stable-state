'use client'

import { useState } from 'react'
import { useConnection, useConnect, useDisconnect, useConnectors } from 'wagmi'
import { Button } from './Button'
import { formatAddress } from '@/lib/format-address'
import { useMounted } from '@/hooks/useMounted'

export function ConnectButton() {
    const [isOpen, setIsOpen] = useState(false)
    const mounted = useMounted()
    const account = useConnection()
    const connectors = useConnectors()
    const { mutate: connect } = useConnect()
    const { mutate: disconnect } = useDisconnect()

    if (!mounted) {
        return <Button disabled>Initializing...</Button>
    }

    if (account.isConnected) {
        return (
            <div className="flex items-center gap-4">
                <div className="text-sm font-mono">{formatAddress(account.address)}</div>
                <Button
                    onClick={() => disconnect()}
                    variant="destructive"
                >
                    Disconnect
                </Button>
            </div>
        )
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                            <h2 className="font-semibold text-lg">Connect Wallet</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            {connectors.map((connector) => (
                                <Button
                                    key={connector.uid}
                                    onClick={() => {
                                        connect({ connector })
                                        setIsOpen(false)
                                    }}
                                    className="w-full"
                                >
                                    {connector.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
