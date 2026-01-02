'use client'

import { useState } from 'react'
import { useConnection, useConnect, useDisconnect, useConnectors } from 'wagmi'
import { Button } from './Button'
import { Modal } from './Modal'
import { formatAddress } from '@/lib/format-address'
import { useMounted } from '@/hooks/useMounted'

function hasUid(connector: unknown): connector is { uid: string } {
    return !!connector && typeof connector === 'object' && 'uid' in connector
}

export function ConnectButton() {
    const [isOpen, setIsOpen] = useState(false)
    const mounted = useMounted()
    const account = useConnection()
    const allConnectors = useConnectors()
    const { mutate: connect, isPending, error, variables, reset } = useConnect()
    const { mutate: disconnect } = useDisconnect()

    const isConnecting = (connectorId: string) =>
        isPending && hasUid(variables?.connector) && variables.connector.uid === connectorId

    // If we detect specific wallets (e.g. "MetaMask" via EIP-6963), hide the generic "Injected" fallback
    const connectors = allConnectors.filter((c) => {
        if (c.id === 'injected') {
            const hasSpecificWallets = allConnectors.some(
                (other) => other.id !== 'injected' && other.type === 'injected'
            )
            return !hasSpecificWallets
        }
        return true
    })

    if (!mounted) return <Button disabled>Loading...</Button>

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
            <Button onClick={() => {
                reset()
                setIsOpen(true)
            }}>Connect Wallet</Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Connect Wallet"
            >
                <div className="flex flex-col gap-2">
                    {connectors.map((connector) => (
                        <Button
                            key={connector.uid}
                            onClick={() => connect({ connector }, {
                                onSuccess: () => setIsOpen(false)
                            })}
                            disabled={isPending}
                            className="w-full justify-start gap-2"
                        >
                            {connector.icon ? (
                                <img
                                    src={connector.icon}
                                    alt={connector.name}
                                    className="w-6 h-6 rounded"
                                />
                            ) : connector.id === 'walletConnect' ? (
                                <img
                                    src="/walletconnect.svg"
                                    alt={connector.name}
                                    className="w-6 h-6 rounded"
                                />
                            ) : (
                                <div className="w-6 h-6 bg-zinc-200 rounded" />
                            )}
                            <span>
                                {connector.id === 'injected' ? 'Browser Wallet' : connector.name}
                                {isConnecting(connector.uid) && " (Connecting...)"}
                            </span>
                        </Button>
                    ))}
                    {error && (
                        <div className="text-red-500 text-sm mt-2 px-2">
                            {error.name === 'UserRejectedRequestError'
                                ? 'Connection rejected by user.'
                                : error.message}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}
