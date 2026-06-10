'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import UploadStepPhotos from './upload-step-photos'
import UploadStepDetails from './upload-step-details'
import UploadStepPreview from './upload-step-preview'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState<string[]>([])
  const [details, setDetails] = useState({
    category: '',
    brand: '',
    size: '',
    condition: 'good',
    price: '',
    description: '',
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleClose = () => {
    setStep(1)
    setPhotos([])
    setDetails({
      category: '',
      brand: '',
      size: '',
      condition: 'good',
      price: '',
      description: '',
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-background">
          <h2 className="text-xl font-bold text-foreground">Upload item</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b border-border flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
              <p className="text-xs font-medium mt-2 text-muted-foreground">
                {s === 1 ? 'Photos' : s === 2 ? 'Details' : 'Preview'}
              </p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {step === 1 && <UploadStepPhotos photos={photos} setPhotos={setPhotos} />}
          {step === 2 && <UploadStepDetails details={details} setDetails={setDetails} />}
          {step === 3 && <UploadStepPreview />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex gap-3 justify-end bg-muted">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-background transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={step === 3 ? handleClose : handleNext}
            disabled={step === 1 && photos.length < 2}
            className="px-6 py-2 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#D85A30' }}
          >
            {step === 3 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
