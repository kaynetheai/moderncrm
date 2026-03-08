import { Logo } from '@/components/common/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      {children}
    </div>
  )
}
