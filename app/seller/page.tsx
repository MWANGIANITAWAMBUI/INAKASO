'use client'

import { useState } from 'react'
import StatCards from '@/components/seller/stat-cards'
import RecentOrdersTable from '@/components/seller/recent-orders-table'
import UploadButton from '@/components/seller/upload-button'
import UploadModal from '@/components/seller/upload-modal'

const mockOrders = [
  {
    id: '#ORD-001',
    itemName: 'Vintage Ankara Shirt',
    date: 'Dec 12, 2024',
    status: 'delivered' as const,
    amount: 2400,
  },
  {
    id: '#ORD-002',
    itemName: 'Linen Pants',
    date: 'Dec 10, 2024',
    status: 'shipped' as const,
    amount: 2000,
  },
  {
    id: '#ORD-003',
    itemName: 'Leather Belt',
    date: 'Dec 8, 2024',
    status: 'delivered' as const,
    amount: 800,
  },
  {
    id: '#ORD-004',
    itemName: 'Ankle Boots',
    date: 'Dec 5, 2024',
    status: 'delivered' as const,
    amount: 3200,
  },
  {
    id: '#ORD-005',
    itemName: 'Silk Blouse',
    date: 'Dec 2, 2024',
    status: 'pending' as const,
    amount: 3500,
  },
]

export default function SellerOverview() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const stats = [
    { label: 'Total Earnings', value: 'KSh 45,600', color: 'coral' as const },
    { label: 'Items Listed', value: '8', color: 'purple' as const },
    { label: 'Outfits Live', value: '4', color: 'coral' as const },
    { label: 'Orders Pending', value: '2', color: 'purple' as const },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Vintage Vibes</p>
        </div>
        <UploadButton onClick={() => setIsUploadOpen(true)} />
      </div>

      {/* Stats */}
      <StatCards stats={stats} />

      {/* Recent Orders */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent orders</h2>
        <div className="bg-muted rounded-xl overflow-hidden">
          <RecentOrdersTable orders={mockOrders} />
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  )
}
