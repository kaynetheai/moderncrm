'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertMessage } from '@/components/common/AlertMessage'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useApiProcessor } from '@/hooks/useApiProcessor'
import { ACT_ID } from '@/types/api'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const { execute, isLoading, error, reset } = useApiProcessor()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    reset()
    const result = await execute(ACT_ID.FORGOT_PASSWORD, { email })
    if (result.code === 0) {
      setSuccess(true)
    }
  }

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Enter your email address and we&apos;ll send you a reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isLoading || success}
            />
          </div>
          {error && <AlertMessage type="error" message={error} />}
          {success && (
            <AlertMessage
              type="success"
              message="Reset email sent! Check your inbox."
            />
          )}
          <Button type="submit" className="w-full" disabled={isLoading || success}>
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/login"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  )
}
