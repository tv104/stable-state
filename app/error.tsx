'use client'

import { useEffect } from 'react'
import { Button } from '@/components/Button'
import { useToast } from '@/components/ToastProvider'
import { Paper } from '@/components/Paper'
import { Container } from '@/components/Container'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    const { showToast } = useToast()

    useEffect(() => {
        console.error(error)
        showToast(`Something went wrong: ${error.message}`, 'error')
    }, [error, showToast])

    return (
        <Container>
            <Paper className="w-full flex flex-col items-center justify-center gap-4">
                <div className="text-center space-y-2">
                    <h3 className="text-red-500">Unable to load dashboard</h3>
                    <p>
                        An unexpected error occurred while rendering the application.
                    </p>
                </div>
                <Button onClick={() => reset()}>Try again</Button>
            </Paper>
        </Container>
    )
}
