import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface AlertMessageProps {
  type: 'error' | 'success' | 'warning' | 'info'
  message: string
  className?: string
}

const config = {
  error:   { icon: AlertCircle,   variant: 'destructive' as const, color: '' },
  success: { icon: CheckCircle2,  variant: 'default' as const,     color: 'border-green-500 text-green-700 bg-green-50' },
  warning: { icon: AlertTriangle, variant: 'default' as const,     color: 'border-yellow-500 text-yellow-700 bg-yellow-50' },
  info:    { icon: Info,          variant: 'default' as const,     color: 'border-blue-500 text-blue-700 bg-blue-50' },
}

export function AlertMessage({ type, message, className }: AlertMessageProps) {
  const { icon: Icon, variant, color } = config[type]
  return (
    <Alert variant={variant} className={cn(color, className)}>
      <Icon className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
