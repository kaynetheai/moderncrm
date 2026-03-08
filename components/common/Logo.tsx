import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { icon: 'h-5 w-5', text: 'text-lg' },
  md: { icon: 'h-6 w-6', text: 'text-xl' },
  lg: { icon: 'h-8 w-8', text: 'text-2xl' },
}

export function Logo({ size = 'md', className }: LogoProps) {
  const { icon, text } = sizeMap[size]
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Building2 className={cn('text-primary', icon)} />
      <span className={cn('font-bold tracking-tight', text)}>ModernCRM</span>
    </div>
  )
}
