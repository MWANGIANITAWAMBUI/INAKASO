'use client'

import { Upload } from 'lucide-react'
import Image from 'next/image'

interface UploadStepPhotosProps {
  photos: string[]
  setPhotos: (photos: string[]) => void
}

export default function UploadStepPhotos({ photos, setPhotos }: UploadStepPhotosProps) {
  const handleDragDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length + photos.length > 4) {
      alert('Maximum 4 photos allowed')
      return
    }
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos([...photos, event.target.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Upload photos</h3>
      <p className="text-sm text-muted-foreground mb-6">Add at least 2 photos — front and back</p>

      {/* Drag-drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDragDrop}
        className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/50 mb-6 hover:bg-muted transition-colors"
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-foreground mb-1">Drag and drop photos here</p>
        <p className="text-sm text-muted-foreground">or click to browse</p>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          onChange={(e) => {
            const files = Array.from(e.currentTarget.files || [])
            if (files.length + photos.length > 4) {
              alert('Maximum 4 photos allowed')
              return
            }
            files.forEach((file) => {
              const reader = new FileReader()
              reader.onload = (event) => {
                if (event.target?.result) {
                  setPhotos([...photos, event.target.result as string])
                }
              }
              reader.readAsDataURL(file)
            })
          }}
          className="absolute opacity-0"
        />
      </div>

      {/* Photo preview */}
      {photos.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Photos ({photos.length}/4)</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative group">
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={photo}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removePhoto(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { X } from 'lucide-react'
