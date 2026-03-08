import { NextResponse } from 'next/server'
import type { ProcessorRequest } from '@/types/api'

// Dummy credentials for Phase 1 — replace with real auth in production
const DUMMY_USERS = [{ user_id: 'john', password: 'abc123', name: 'John Lau' }]

export async function POST(request: Request) {
  let body: ProcessorRequest
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ code: 9997, message: 'Invalid JSON body', data: [] })
  }

  const { act_id, data } = body

  switch (act_id) {
    case 100: {
      // LOGIN
      const { user_id, password } = data as { user_id: string; password: string }
      const user = DUMMY_USERS.find(
        (u) => u.user_id === user_id && u.password === password
      )
      if (user) {
        return NextResponse.json({
          code: 0,
          message: 'Success',
          data: [{ user_id: user.user_id, name: user.name }],
        })
      }
      return NextResponse.json({
        code: 1001,
        message: 'Invalid credentials',
        data: [],
      })
    }

    case 101: {
      // FORGOT PASSWORD
      return NextResponse.json({
        code: 0,
        message: 'Reset email sent',
        data: [],
      })
    }

    default:
      return NextResponse.json({
        code: 9999,
        message: 'Unknown action',
        data: [],
      })
  }
}
