import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'destructive'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
    const baseStyles = "px-4 py-2 text-white rounded transition-colors flex justify-center text-center cursor-pointer"
    const variantStyles = {
        primary: "bg-blue-500 hover:bg-blue-600",
        destructive: "bg-red-500 hover:bg-red-600"
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
