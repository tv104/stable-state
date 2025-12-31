import { describe, it, expect } from 'bun:test'
import { formatAddress } from './format-address'

describe('formatAddress', () => {
    it('should return empty string for null or undefined', () => {
        expect(formatAddress(null)).toBe('')
        expect(formatAddress(undefined)).toBe('')
    })

    it('should return empty string for non-string input', () => {
        // @ts-ignore
        expect(formatAddress(123)).toBe('')
    })

    it('should return original address if shorter than threshold', () => {
        expect(formatAddress('0x123')).toBe('0x123')
    })

    it('should format address correctly with default chars', () => {
        const address = '0x1234567890abcdef1234567890abcdef12345678'
        expect(formatAddress(address)).toBe('0x1234...5678')
    })
})
