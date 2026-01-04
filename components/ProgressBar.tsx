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

    const textStyle = {
        left: `${percentage}%`,
        transform: `translateX(-${percentage}%)`,
    };
    const textContent = `${percentage.toFixed(1)}%`;
    const textClasses = "absolute top-0 flex h-full items-center px-2 text-xs font-bold whitespace-nowrap transition-all duration-500 ease-out";

    return (
        <div className={`relative h-8 w-full rounded-full ${background}`}>
            <div className="absolute inset-0 overflow-hidden rounded-full">
                <span
                    className={`${textClasses} text-gray-600`}
                    style={textStyle}
                >
                    {textContent}
                </span>
            </div>
            <div
                className={`absolute left-0 top-0 h-full overflow-hidden rounded-full ${foreground} transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
            >
                <span
                    className={`${textClasses} text-white`}
                    style={{
                        left: '100%',
                        transform: `translateX(-${percentage}%)`,
                    }}
                >
                    {textContent}
                </span>
            </div>
        </div>
    );
}
