export const ACT_ID = {
  LOGIN: 100,
  FORGOT_PASSWORD: 101,
} as const

export type ActId = (typeof ACT_ID)[keyof typeof ACT_ID]

export interface ProcessorRequest {
  act_id: number
  data: Record<string, unknown>
}

export interface ProcessorResponse<T = unknown> {
  code: number
  message: string
  data: T[]
}

export interface LoginRequestData {
  user_id: string
  password: string
}

export interface LoginResponseData {
  user_id: string
  name: string
}

export interface ForgotPasswordRequestData {
  email: string
}
