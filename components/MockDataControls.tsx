"use client"

import { useMockDataStore } from '@/lib/store';
import { Button } from './Button';

export function MockDataControls() {
    const { isMockDataEnabled, toggleMockData, regenerateMockData } = useMockDataStore();

    return (
        <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                    type="checkbox"
                    checked={isMockDataEnabled}
                    onChange={toggleMockData}
                    className="rounded border-gray-300 accent-zinc-800 w-4 h-4"
                />
                Mock Data
            </label>
            {isMockDataEnabled && (
                <Button
                    onClick={regenerateMockData}
                >
                    Regenerate Data
                </Button>
            )}
        </div>
    );
}
