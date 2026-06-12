'use client'

import { useState } from 'react'
import StatCards from '@/components/seller/stat-cards'
import RecentOrdersTable from '@/components/seller/recent-orders-table'
import UploadModal from '@/components/seller/upload-modal'
import { Upload, Camera, Sparkles } from 'lucide-react'

const mockOrders = [
  { id: '#ORD-001', itemName: 'Vintage Ankara Shirt', date: 'Dec 12, 2024', status: 'delivered' as const, amount: 2400 },
  { id: '#ORD-002', itemName: 'Linen Pants', date: 'Dec 10, 2024', status: 'shipped' as const, amount: 2000 },
  { id: '#ORD-003', itemName: 'Leather Belt', date: 'Dec 8, 2024', status: 'delivered' as const, amount: 800 },
  { id: '#ORD-004', itemName: 'Ankle Boots', date: 'Dec 5, 2024', status: 'delivered' as const, amount: 3200 },
  { id: '#ORD-005', itemName: 'Silk Blouse', date: 'Dec 2, 2024', status: 'pending' as const, amount: 3500 },
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Vintage Vibes</p>
        </div>
      </div>

      {/* Big upload CTA banner */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden cursor-pointer hover:opacity-95 transition"
        style={{ background: 'linear-gradient(135deg, #D85A30 0%, #7F77DD 100%)' }}
        onClick={() => setIsUploadOpen(true)}
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-80 mb-1">Ready to sell?</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Upload your clothes</h2>
              <p className="text-sm opacity-80 max-w-sm">
                Take photos of each item individually. Our AI will style them into outfits for buyers to browse.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center gap-3 text-white/60 text-xs">
              <Camera className="w-8 h-8" />
              <span>↓</span>
              <Upload className="w-8 h-8" />
              <span>↓</span>
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); setIsUploadOpen(true) }}
              className="flex items-center gap-2 px-6 py-3 bg-white font-bold rounded-xl transition hover:bg-white/90"
              style={{ color: '#D85A30' }}
            >
              <Upload className="w-5 h-5" />
              Start uploading
            </button>
            <div className="flex items-center gap-4 text-sm opacity-75 px-2">
              <span>📸 Photo each item</span>
              <span>🤖 AI styles outfits</span>
              <span>✓ You approve</span>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 -bottom-12 w-56 h-56 rounded-full bg-white/5" />
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

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  )
}
