import { parseAbi } from 'viem'

export const ERC20_ABI = parseAbi([
    'function balanceOf(address owner) view returns (uint256)'
] as const)
