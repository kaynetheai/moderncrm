'use client'

import { Users, Briefcase, CheckSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

const placeholderStats = [
  { label: 'Contacts', icon: Users,       value: '--', desc: 'Coming in Phase 2' },
  { label: 'Deals',    icon: Briefcase,   value: '--', desc: 'Coming in Phase 2' },
  { label: 'Tasks',    icon: CheckSquare, value: '--', desc: 'Coming in Phase 2' },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hello World</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome to ModernCRM{user ? `, ${user.name}` : ''}!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {placeholderStats.map(({ label, icon: Icon, value, desc }) => (
          <Card key={label} className="opacity-60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
