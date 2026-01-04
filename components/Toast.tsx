import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    type?: 'error' | 'success' | 'info';
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type = 'info', onClose, duration = 5000 }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColors = {
        error: 'bg-red-50 text-red-600 border-red-200',
        success: 'bg-green-50 text-green-600 border-green-200',
        info: 'bg-blue-50 text-blue-600 border-blue-200',
    };

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${bgColors[type]} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
        >
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-2 rounded-full p-1 hover:bg-black/5"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
