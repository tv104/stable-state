# Stable State

Demo dashboard tracking stablecoin balances across Mainnet, Arbitrum, and Base. Built to demonstrate architectural patterns for high-reliability Web3 frontends. It prioritizes **type safety**, **graceful degradation**, and **audit-readiness** over feature density.

## Key Technologies
- **Framework:** Next.js 15
- **Web3:** Wagmi v3 + Viem (Type-safe interactions)
- **State:** TanStack Query (Async state & caching)
- **Styling:** Tailwind CSS
- **CI/CD:** GitHub Actions (Deployments & Secrets)

## Key Architectural Decisions

### 1. Strict Type Safety
- **No `any`**: Full TypeScript coverage for contract interactions.
- **Wagmi v3**: Leverages latest hooks (`useReadContracts`) for batched, typed multicalls.

### 2. Graceful Degradation & UX
- **Hydration Safety**: Custom `useMounted` hook prevents SSR/Client mismatches for wallet connections.
- **Error Boundaries**: Global `error.tsx` + Toast notifications for non-fatal data fetch failures.
- **EIP-6963**: Native support for multi-injected provider discovery (no wallet conflicts).

### 3. Performance
- **Static Export**: Configured for `output: export` (IPFS/GitHub Pages ready).
- **Visual Stability**: Skeleton loaders minimize Cumulative Layout Shift (CLS) during async data fetching.
- **Batched RPC Calls**: `useReadContracts` aggregates `balanceOf` calls to minimize network requests.

## Development

```bash
bun install
bun dev
```

Copy `.env.example` to `.env.local` and add:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (WalletConnect Cloud)
- `NEXT_PUBLIC_ALCHEMY_API_KEY` (Alchemy Dashboard)


