'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, PlusCircle, Bell, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'হোম', icon: Home },
  { href: '/services', label: 'ক্যাটাগরি', icon: LayoutGrid },
  { href: '/post/create', label: 'পোস্ট', icon: PlusCircle, isCenter: true },
  { href: '/notifications', label: 'নোটিফিকেশন', icon: Bell },
  { href: '/profile', label: 'প্রোফাইল', icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-[env(safe-area-inset-bottom)] md:hidden">
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        const Icon = item.icon

        if (item.isCenter) {
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center">
              <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Icon className="h-6 w-6" />
              </span>
            </Link>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
