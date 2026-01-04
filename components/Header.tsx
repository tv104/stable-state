import Image from 'next/image';
import { ConnectButton } from './ConnectButton';
import { MockDataControls } from './MockDataControls';

export function Header() {
    return (
        <header className="w-full border-b border-gray-200">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-between">
                <div className="flex items-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-full.webp`}
                        alt="Stable State Logo"
                        width={673}
                        height={256}
                        priority
                        className="h-10 w-auto"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <MockDataControls />
                    <ConnectButton />
                </div>
            </div>
        </header>
    );
}
