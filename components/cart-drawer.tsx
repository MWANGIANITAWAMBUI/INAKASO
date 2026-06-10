'use client'

import { X, Plus, Minus, Trash2 } from 'lucide-react'

interface CartItem {
  outfitId: string
  outfitName: string
  price: number
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onUpdateQuantity: (outfitId: string, quantity: number) => void
  onRemoveItem: (outfitId: string) => void
}

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 500 : 0
  const total = subtotal + shipping

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-muted-foreground mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add outfits to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.outfitId}
                  className="flex gap-3 p-3 bg-muted rounded-lg"
                >
                  {/* Item Info */}
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">
                      {item.outfitName}
                    </p>
                    <p className="text-primary font-bold mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.outfitId, item.quantity - 1)}
                      className="p-1 hover:bg-background rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.outfitId, item.quantity + 1)}
                      className="p-1 hover:bg-background rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemoveItem(item.outfitId)}
                    className="p-1 hover:bg-background rounded transition-colors text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">KSh {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">KSh {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
              <span>Total</span>
              <span className="text-primary">KSh {total.toLocaleString()}</span>
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
