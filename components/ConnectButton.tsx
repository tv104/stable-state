'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useConnection, useConnect, useDisconnect, useConnectors } from 'wagmi'
import { Button } from './Button'
import { Modal } from './Modal'
import { formatAddress } from '@/lib/format-address'
import { useMounted } from '@/hooks/useMounted'
import { useToast } from './ToastProvider'

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
    const { showToast } = useToast()

    useEffect(() => {
        if (error) {
            const message = error.name === 'UserRejectedRequestError'
                ? 'Connection rejected by user.'
                : error.message
            showToast(message, 'error')
        }
    }, [error, showToast])

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
                <div className="flex flex-col gap-3">
                    {connectors.map((connector) => (
                        <Button
                            key={connector.uid}
                            onClick={() => connect({ connector }, {
                                onSuccess: () => setIsOpen(false)
                            })}
                            disabled={isPending}
                            className="w-full justify-start gap-3"
                        >
                            {connector.icon ? (
                                <Image
                                    src={connector.icon.trim()}
                                    alt={connector.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                />
                            ) : connector.id === 'walletConnect' ? (
                                <Image
                                    src="/walletconnect.svg"
                                    alt={connector.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
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
                </div>
            </Modal>
        </>
    )
}
