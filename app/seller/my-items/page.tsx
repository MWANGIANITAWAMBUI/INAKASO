'use client'

import { useState } from 'react'
import UploadButton from '@/components/seller/upload-button'
import UploadModal from '@/components/seller/upload-modal'
import { Eye, Edit2, Trash2 } from 'lucide-react'

const mockItems = [
  {
    id: 1,
    name: 'Vintage Ankara Print Shirt',
    brand: 'Vintage',
    price: 2400,
    status: 'live',
    views: 124,
  },
  {
    id: 2,
    name: 'Wide-Leg Trousers',
    brand: 'Zara',
    price: 1800,
    status: 'in-outfit',
    views: 89,
  },
  {
    id: 3,
    name: 'Leather Belt',
    brand: 'Vintage',
    price: 800,
    status: 'live',
    views: 234,
  },
  {
    id: 4,
    name: 'Ankle Boots',
    brand: 'Dr. Martens',
    price: 3200,
    status: 'sold',
    views: 512,
  },
  {
    id: 5,
    name: 'Silk Blouse',
    brand: 'Gucci',
    price: 3500,
    status: 'pending-review',
    views: 0,
  },
  {
    id: 6,
    name: 'Canvas Pants',
    brand: 'Levi\'s',
    price: 2000,
    status: 'live',
    views: 156,
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    'live': { bg: 'bg-green-100', text: 'text-green-800', label: 'Live' },
    'in-outfit': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In outfit' },
    'pending-review': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending review' },
    'sold': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Sold' },
  }
  const config = statusConfig[status] || statusConfig['live']
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
}

export default function MyItemsPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My items</h1>
          <p className="text-muted-foreground mt-2">{mockItems.length} items total</p>
        </div>
        <UploadButton onClick={() => setIsUploadOpen(true)} />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockItems.map((item) => (
          <div key={item.id} className="bg-muted rounded-xl overflow-hidden border border-border hover:border-primary transition-colors">
            {/* Gradient placeholder */}
            <div
              className="h-48 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
              }}
            />

            {/* Item info */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.brand}</p>

              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-lg text-primary">KSh {item.price.toLocaleString()}</p>
                {getStatusBadge(item.status)}
              </div>

              {item.status !== 'sold' && (
                <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {item.views} views
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  )
}
