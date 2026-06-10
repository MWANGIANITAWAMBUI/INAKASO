import SidebarNav from '@/components/seller/sidebar-nav'
import BottomNav from '@/components/seller/bottom-nav'

export const metadata = {
  title: 'Seller Dashboard - Inakaso',
  description: 'Manage your items, outfits, and earnings',
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 md:ml-0">
        <div className="p-6 md:p-8 pb-24 md:pb-8">
          {children}
        </div>
        <BottomNav />
      </main>
    </div>
  )
}
