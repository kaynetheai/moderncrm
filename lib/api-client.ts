import type { ProcessorResponse } from '@/types/api'

export async function apiProcessor<T = unknown>(
  actId: number,
  data: Record<string, unknown>
): Promise<ProcessorResponse<T>> {
  try {
    const res = await fetch('/api/processor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ act_id: actId, data }),
    })
    const json: ProcessorResponse<T> = await res.json()
    return json
  } catch {
    return { code: 9998, message: 'Network error. Please try again.', data: {} as T }
  }
}
