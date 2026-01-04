import { ReactNode } from 'react';

interface PaperProps {
    children: ReactNode;
    className?: string;
}

export function Paper({ children, className = '' }: PaperProps) {
    return (
        <div className={`rounded-xl bg-surface p-8 shadow-sm ${className}`}>
            {children}
        </div>
    );
}
