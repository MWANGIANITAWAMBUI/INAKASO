'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, Boxes, ShoppingCart, DollarSign, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { href: '/seller', icon: LayoutDashboard, label: 'Overview' },
  { href: '/seller/my-items', icon: Package, label: 'Items' },
  { href: '/seller/my-outfits', icon: Boxes, label: 'Outfits' },
  { href: '/seller/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/seller/payouts', icon: DollarSign, label: 'Payouts' },
  { href: '/seller/settings', icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border flex items-center justify-between px-1 py-2 overflow-x-auto">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/seller' && pathname.startsWith(item.href))
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-lg transition-colors min-w-[52px] ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
      <button
        onClick={handleLogout}
        className="flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-lg transition-colors text-muted-foreground min-w-[52px]"
      >
        <LogOut className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Log out</span>
      </button>
    </nav>
  )
}
