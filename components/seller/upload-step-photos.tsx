'use client'

import { useState } from 'react'
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react'

interface PhotoItem {
  dataUrl: string
  name: string
  price: string
  status: 'checking' | 'ok' | 'rejected'
  rejectReason?: string
}

interface UploadStepPhotosProps {
  photos: PhotoItem[]
  setPhotos: React.Dispatch<React.SetStateAction<PhotoItem[]>>
}

function checkImageQuality(file: File): Promise<{ ok: boolean; reason?: string }> {
  return new Promise((resolve) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      if (img.width < 300 || img.height < 300) {
        resolve({ ok: false, reason: 'Image too small — use at least 300×300px' })
      } else if (file.size < 20000) {
        resolve({ ok: false, reason: 'Image too low quality — use a clearer photo' })
      } else {
        resolve({ ok: true })
      }
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve({ ok: false, reason: 'Could not read image' }) }
    img.src = url
  })
}

export default function UploadStepPhotos({ photos, setPhotos }: UploadStepPhotosProps) {
  const [isDragging, setIsDragging] = useState(false)

  const processFiles = async (files: File[]) => {
    if (files.length + photos.length > 10) { alert('Maximum 10 items allowed'); return }

    for (const file of files) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        if (!event.target?.result) return
        const dataUrl = event.target.result as string
        const newItem: PhotoItem = { dataUrl, name: file.name.replace(/\.[^.]+$/, ''), price: '', status: 'checking' }

        setPhotos((prev) => [...prev, newItem])

        const check = await checkImageQuality(file)
        setPhotos((prev) =>
          prev.map((p) =>
            p.dataUrl === dataUrl
              ? { ...p, status: check.ok ? 'ok' : 'rejected', rejectReason: check.reason }
              : p
          )
        )
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')))
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.currentTarget.files || []))
    e.currentTarget.value = ''
  }

  const removePhoto = (idx: number) => setPhotos((prev) => prev.filter((_, i) => i !== idx))
  const updatePrice = (idx: number, price: string) =>
    setPhotos((prev) => prev.map((p, i) => i === idx ? { ...p, price } : p))
  const updateName = (idx: number, name: string) =>
    setPhotos((prev) => prev.map((p, i) => i === idx ? { ...p, name } : p))

  const okCount = photos.filter(p => p.status === 'ok').length

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">Upload your items</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Upload each clothing item separately — one photo per item. Add a name and price for each piece. The AI will style them into outfits after upload.
      </p>

      {/* Drag-drop zone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors mb-8 ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border bg-muted/40 hover:bg-muted'
        }`}
      >
        <Upload className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="font-medium text-foreground mb-1">Drag & drop photos here</p>
        <p className="text-sm text-muted-foreground mb-3">or click to browse</p>
        <p className="text-xs text-muted-foreground">One item per photo · Clear lighting · JPG or PNG</p>
        <input type="file" multiple accept="image/jpeg,image/png" onChange={handleFileInput} className="hidden" />
      </label>

      {/* Items list */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">
            {photos.length} item{photos.length > 1 ? 's' : ''} uploaded
            {okCount > 0 && <span className="text-green-600 ml-2">· {okCount} approved</span>}
          </p>

          {photos.map((photo, idx) => (
            <div
              key={idx}
              className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                photo.status === 'rejected' ? 'border-red-300 bg-red-50' :
                photo.status === 'checking' ? 'border-border bg-muted/30' :
                'border-green-200 bg-green-50/40'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                <img src={photo.dataUrl} alt={`Item ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-1 right-1">
                  {photo.status === 'checking' && (
                    <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                  )}
                  {photo.status === 'ok' && <CheckCircle className="w-5 h-5 text-green-500 drop-shadow" />}
                  {photo.status === 'rejected' && <AlertCircle className="w-5 h-5 text-red-500 drop-shadow" />}
                </div>
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-2">
                {photo.status === 'rejected' ? (
                  <div>
                    <p className="text-sm font-semibold text-red-600">Photo rejected</p>
                    <p className="text-xs text-red-500 mt-1">{photo.rejectReason}</p>
                    <p className="text-xs text-muted-foreground mt-2">Please upload a clearer photo of this item</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Item name</label>
                      <input
                        type="text"
                        value={photo.name}
                        onChange={(e) => updateName(idx, e.target.value)}
                        placeholder="e.g. Blue linen shirt"
                        className="w-full mt-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Price (KSh)</label>
                      <input
                        type="number"
                        value={photo.price}
                        onChange={(e) => updatePrice(idx, e.target.value)}
                        placeholder="e.g. 2500"
                        className="w-full mt-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Remove */}
              <button onClick={() => removePhoto(idx)} className="self-start p-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {okCount > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          ✦ Continue to let AI style your {okCount} approved item{okCount > 1 ? 's' : ''} into outfits
        </p>
      )}
    </div>
  )
}
