import Image from 'next/image';
import { ConnectButton } from './ConnectButton';
import { MockDataControls } from './MockDataControls';

export function Header() {
    return (
        <header className="w-full border-b border-gray-200">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <Image
                        src="/logo-full.webp"
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
