import { create } from 'zustand';
import { SUPPORTED_CHAIN_IDS, getChainTokenEntries, type TokenSymbol } from '@/lib/constants';

type Balances = Record<number, Partial<Record<TokenSymbol, string | null>>>;

interface MockDataState {
    isMockDataEnabled: boolean;
    mockBalances: Balances;
    toggleMockData: () => void;
    regenerateMockData: () => void;
}

const generateBalances = (): Balances => {
    const result: Balances = {};
    SUPPORTED_CHAIN_IDS.forEach((chainId) => {
        result[chainId] = {};
        const chainTokens = getChainTokenEntries(chainId);
        chainTokens.forEach(([symbol]) => {
            result[chainId]![symbol] = (Math.random() * 100000).toFixed(2);
        });
    });
    return result;
};

export const useMockDataStore = create<MockDataState>((set) => ({
    isMockDataEnabled: false,
    mockBalances: generateBalances(),
    toggleMockData: () => set((state) => ({ isMockDataEnabled: !state.isMockDataEnabled })),
    regenerateMockData: () => set({ mockBalances: generateBalances() }),
}));
