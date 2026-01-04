import { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
    className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
    return (
        <main className={`flex flex-1 flex-col items-center gap-12 px-4 py-12 max-w-6xl mx-auto w-full ${className}`}>
            {children}
        </main>
    )
}
