'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Briefcase, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, active: true },
  { label: 'Contacts',  href: '#',          icon: Users,           active: false },
  { label: 'Deals',     href: '#',          icon: Briefcase,       active: false },
  { label: 'Reports',   href: '#',          icon: BarChart3,       active: false },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <nav className="flex flex-col gap-1 p-4 pt-6">
        {navItems.map(({ label, href, icon: Icon, active }) => {
          const isCurrentPage = pathname === href
          const isDisabled = !active
          return (
            <Link
              key={label}
              href={href}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isCurrentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                isDisabled && 'pointer-events-none opacity-50'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {isDisabled && (
                <span className="ml-auto text-xs opacity-60">Soon</span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
