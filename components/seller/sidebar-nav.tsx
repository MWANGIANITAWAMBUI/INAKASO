'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Boxes, ShoppingCart, DollarSign, Settings } from 'lucide-react'

const navItems = [
  { href: '/seller', icon: LayoutDashboard, label: 'Overview' },
  { href: '/seller/my-items', icon: Package, label: 'My Items' },
  { href: '/seller/my-outfits', icon: Boxes, label: 'My Outfits' },
  { href: '/seller/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/seller/payouts', icon: DollarSign, label: 'Payouts' },
  { href: '/seller/settings', icon: Settings, label: 'Settings' },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-muted border-r border-border px-6 py-8 sticky top-0 h-screen">
      {/* Logo */}
      <Link href="/seller" className="flex items-center gap-2 mb-12">
        <span className="text-2xl font-bold" style={{ color: '#D85A30' }}>i</span>
        <span className="text-2xl font-bold" style={{ color: '#7F77DD' }}>nakaso</span>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/seller' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-foreground/60 hover:text-foreground hover:bg-background/50'
              }`}
              style={isActive ? { backgroundColor: '#D85A30' } : {}}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground font-medium mb-2">Seller Account</p>
        <p className="text-sm font-semibold text-foreground">Vintage Vibes</p>
        <p className="text-xs text-muted-foreground">Nairobi, Kenya</p>
      </div>
    </aside>
  )
}
