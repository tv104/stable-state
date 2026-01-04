interface ProgressBarProps {
    value: number; // 0 to 100
    classes: {
        foreground: string;
        background: string;
    };
}

export function ProgressBar({ value, classes }: ProgressBarProps) {
    const { foreground, background } = classes;
    const percentage = Math.min(Math.max(value, 0), 100);
    const showInside = percentage > 60;
    const textContent = `${percentage.toFixed(1)}%`;

    return (
        <div className={`relative h-8 w-full rounded-full ${background}`}>
            <div
                className={`absolute left-0 top-0 h-full overflow-hidden rounded-full ${foreground} transition-all duration-500 ease-out flex items-center justify-end px-2`}
                style={{ width: `${percentage}%` }}
            >
                {showInside && (
                    <span className="text-xs font-bold text-white whitespace-nowrap">
                        {textContent}
                    </span>
                )}
            </div>

            {!showInside && (
                <div
                    className="absolute top-0 h-full flex items-center px-2 transition-all duration-500 ease-out"
                    style={{ left: `${percentage}%`, transform: 'translateX(0)' }}
                >
                    <span className={`text-xs font-bold text-gray-600 whitespace-nowrap ${percentage === 0 ? 'ml-3' : 'ml-1'}`}>
                        {textContent}
                    </span>
                </div>
            )}
        </div>
    );
}
