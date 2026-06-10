'use client'

import { Package, Truck, CheckCircle } from 'lucide-react'

export interface Purchase {
  id: string
  outfitName: string
  seller: string
  price: number
  date: Date
  status: 'delivered' | 'shipped' | 'pending'
  items: number
}

interface PurchaseHistoryListProps {
  purchases: Purchase[]
}

export default function PurchaseHistoryList({ purchases }: PurchaseHistoryListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <Package className="w-5 h-5 text-yellow-500" />
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">No purchases yet. Start shopping!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <div key={purchase.id} className="border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg mb-1">{purchase.outfitName}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                From{' '}
                <span className="font-medium text-foreground">{purchase.seller}</span> •{' '}
                {purchase.items} item{purchase.items > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(purchase.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-foreground">KSh {purchase.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusIcon(purchase.status)}
                  <span className="text-xs font-medium text-muted-foreground">
                    {getStatusLabel(purchase.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
