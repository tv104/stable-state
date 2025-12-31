export function formatAddress(address: string | undefined | null, chars = 4): string {
    if (typeof address !== "string") return ''

    if (address.length < chars * 2 + 2) return address

    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}
