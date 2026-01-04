'use client'

import { useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-sm border border-zinc-200 shadow-xl overflow-hidden">
                <div className="p-5 border-b border-zinc-200 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-700 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
