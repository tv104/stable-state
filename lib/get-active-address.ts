import { type Config } from 'wagmi'
import { type Address, isAddress } from 'viem'

export function getActiveAddress(config: Config): Address | undefined {
    const { state } = config
    const { current, connections } = state

    if (!current) return undefined

    const connection = connections.get(current)
    const account = connection?.accounts[0]

    if (account && isAddress(account)) {
        return account
    }

    return undefined
}
