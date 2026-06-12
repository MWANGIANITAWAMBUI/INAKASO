'use client'

import { useState } from 'react'
import { X, RefreshCw, CheckCircle } from 'lucide-react'

interface PhotoItem {
  dataUrl: string
  name: string
  price: string
  status: 'checking' | 'ok' | 'rejected'
}

interface OutfitItem {
  name: string
  price: number
  dataUrl: string
}

interface Suggestion {
  id: number
  outfitName: string
  occasion: string
  items: OutfitItem[]
  approved: boolean | null
  isRestyling: boolean
}

interface UploadStepPreviewProps {
  photos: PhotoItem[]
}

export default function UploadStepPreview({ photos }: UploadStepPreviewProps) {
  const approvedPhotos = photos.filter(p => p.status === 'ok')

  // Build suggestions using the actual uploaded photos
  const buildSuggestions = (): Suggestion[] => {
    if (approvedPhotos.length === 0) return []

    // Create pairings from available photos — cycle through them
    const suggestions: Suggestion[] = []
    const occasions = [
      { name: 'Office Ready', occasion: 'Office / Formal' },
      { name: 'Weekend Casual', occasion: 'Casual' },
      { name: 'Evening Out', occasion: 'Night out' },
    ]

    const count = Math.min(3, Math.ceil(approvedPhotos.length / 1))

    for (let i = 0; i < count; i++) {
      // Pick 2-3 items per outfit, cycling through uploaded photos
      const itemCount = Math.min(approvedPhotos.length, i === 0 ? 3 : 2)
      const items: OutfitItem[] = []
      for (let j = 0; j < itemCount; j++) {
        const photo = approvedPhotos[(i + j) % approvedPhotos.length]
        items.push({
          name: photo.name,
          price: Number(photo.price) || 0,
          dataUrl: photo.dataUrl,
        })
      }
      suggestions.push({
        id: i + 1,
        outfitName: occasions[i].name,
        occasion: occasions[i].occasion,
        items,
        approved: null,
        isRestyling: false,
      })
    }
    return suggestions
  }

  const [suggestions, setSuggestions] = useState<Suggestion[]>(buildSuggestions)

  const approve = (id: number) =>
    setSuggestions(s => s.map(sg => sg.id === id ? { ...sg, approved: true } : sg))

  const reject = (id: number) =>
    setSuggestions(s => s.map(sg => sg.id === id ? { ...sg, approved: false } : sg))

  const removeItem = (suggestionId: number, itemName: string) => {
    setSuggestions(s => s.map(sg => {
      if (sg.id !== suggestionId) return sg
      const newItems = sg.items.filter(i => i.name !== itemName)
      return newItems.length < 2 ? sg : { ...sg, items: newItems }
    }))
  }

  const restyleOne = (id: number) => {
    setSuggestions(s => s.map(sg => sg.id === id ? { ...sg, isRestyling: true, approved: null } : sg))
    setTimeout(() => {
      setSuggestions(s => s.map(sg => {
        if (sg.id !== id) return sg
        // Shuffle items for restyle simulation
        const shuffled = [...approvedPhotos].sort(() => Math.random() - 0.5)
        const itemCount = Math.min(approvedPhotos.length, 2 + Math.floor(Math.random() * 2))
        const newItems = shuffled.slice(0, itemCount).map(p => ({
          name: p.name, price: Number(p.price) || 0, dataUrl: p.dataUrl
        }))
        return { ...sg, isRestyling: false, items: newItems }
      }))
    }, 2000)
  }

  const restyleAll = () => {
    const toRestyle = suggestions.filter(s => s.approved !== true).map(s => s.id)
    setSuggestions(s => s.map(sg => toRestyle.includes(sg.id) ? { ...sg, isRestyling: true, approved: null } : sg))
    setTimeout(() => {
      setSuggestions(s => s.map(sg => {
        if (!toRestyle.includes(sg.id)) return sg
        const shuffled = [...approvedPhotos].sort(() => Math.random() - 0.5)
        const newItems = shuffled.slice(0, 2).map(p => ({
          name: p.name, price: Number(p.price) || 0, dataUrl: p.dataUrl
        }))
        return { ...sg, isRestyling: false, items: newItems }
      }))
    }, 2000)
  }

  const approvedCount = suggestions.filter(s => s.approved === true).length
  const pendingCount = suggestions.filter(s => s.approved === null && !s.isRestyling).length
  const rejectedCount = suggestions.filter(s => s.approved === false).length

  if (approvedPhotos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium mb-2">No approved photos yet</p>
        <p className="text-sm">Go back and upload at least one item photo to see AI outfit suggestions.</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">AI outfit suggestions</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Review each styled outfit. Approve what you like, restyle what you don&apos;t. Remove individual items using ✕.
      </p>

      {/* Summary */}
      <div className="flex gap-4 mb-5 p-3 bg-muted rounded-lg text-sm">
        <span className="text-green-600 font-semibold">{approvedCount} approved</span>
        <span className="text-muted-foreground">{pendingCount} pending</span>
        {rejectedCount > 0 && <span className="text-red-500">{rejectedCount} rejected</span>}
      </div>

      {/* Restyle all unapproved */}
      {(pendingCount + rejectedCount) > 0 && (
        <button
          onClick={restyleAll}
          className="mb-6 flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 font-semibold text-sm transition hover:bg-muted"
          style={{ borderColor: '#7F77DD', color: '#7F77DD' }}
        >
          <RefreshCw className="w-4 h-4" />
          Restyle all unapproved ({pendingCount + rejectedCount})
        </button>
      )}

      <div className="space-y-6">
        {suggestions.map((sg) => {
          const total = sg.items.reduce((sum, i) => sum + i.price, 0)

          return (
            <div
              key={sg.id}
              className={`border rounded-2xl overflow-hidden transition-all ${
                sg.approved === true ? 'border-green-400 bg-green-50/40' :
                sg.approved === false ? 'border-border opacity-60' :
                'border-border bg-background'
              }`}
            >
              {/* Outfit photo strip — actual uploaded images */}
              <div className="relative">
                {sg.isRestyling ? (
                  <div className="flex items-center justify-center gap-3 py-16 bg-muted text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    AI is restyling this outfit…
                  </div>
                ) : (
                  <div className={`grid gap-0.5 bg-border ${sg.items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {sg.items.map((item) => (
                      <div key={item.name} className="relative group">
                        <img
                          src={item.dataUrl}
                          alt={item.name}
                          className="w-full h-48 object-cover object-top"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        {/* Price tag */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-white/90 rounded-lg px-2 py-1.5 shadow-sm">
                            <p className="text-[10px] text-muted-foreground truncate">{item.name}</p>
                            <p className="text-xs font-bold text-foreground">KSh {item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        {/* Remove button — only show if more than 2 items and not approved */}
                        {sg.items.length > 2 && sg.approved !== true && (
                          <button
                            onClick={() => removeItem(sg.id, item.name)}
                            className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                          >
                            <X className="w-3 h-3 text-red-500" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* AI badge */}
                {!sg.isRestyling && (
                  <div className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-2 py-1 rounded-full shadow-sm" style={{ color: '#7F77DD' }}>
                    AI styled ✦
                  </div>
                )}
              </div>

              {/* Info row */}
              {!sg.isRestyling && (
                <>
                  <div className="flex items-center justify-between px-5 py-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-foreground">{sg.outfitName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{sg.occasion} · {sg.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: '#D85A30' }}>KSh {total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">outfit total</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-4">
                    {sg.approved === true ? (
                      <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Approved — will be listed when you publish
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button onClick={() => restyleOne(sg.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                          <RefreshCw className="w-4 h-4" /> Restyle
                        </button>
                        <button onClick={() => reject(sg.id)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                          Reject
                        </button>
                        <button onClick={() => approve(sg.id)} className="flex-1 px-4 py-2 rounded-lg text-sm font-bold text-white hover:opacity-90 transition-colors" style={{ backgroundColor: '#D85A30' }}>
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Publish CTA */}
      {approvedCount > 0 && (
        <div className="mt-8 p-5 rounded-xl border-2 text-center" style={{ borderColor: '#D85A30' }}>
          <p className="font-semibold text-foreground mb-1">
            {approvedCount} outfit{approvedCount > 1 ? 's' : ''} ready to publish
          </p>
          <p className="text-sm text-muted-foreground mb-4">These will go live on the Inakaso feed immediately</p>
          <button className="w-full py-3 rounded-xl font-bold text-white text-base hover:opacity-90 transition" style={{ backgroundColor: '#D85A30' }}>
            Publish {approvedCount} outfit{approvedCount > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}
