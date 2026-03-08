'use client'

import { useState } from 'react'
import { apiProcessor } from '@/lib/api-client'
import type { ProcessorResponse } from '@/types/api'

interface UseApiProcessorReturn<T> {
  execute: (actId: number, data: Record<string, unknown>) => Promise<ProcessorResponse<T>>
  isLoading: boolean
  error: string | null
  reset: () => void
}

export function useApiProcessor<T = unknown>(): UseApiProcessorReturn<T> {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (
    actId: number,
    data: Record<string, unknown>
  ): Promise<ProcessorResponse<T>> => {
    setIsLoading(true)
    setError(null)
    const result = await apiProcessor<T>(actId, data)
    if (result.code !== 0) {
      setError(result.message)
    }
    setIsLoading(false)
    return result
  }

  const reset = () => {
    setError(null)
    setIsLoading(false)
  }

  return { execute, isLoading, error, reset }
}
