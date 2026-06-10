'use client'

import { Upload } from 'lucide-react'

interface UploadButtonProps {
  onClick: () => void
}

export default function UploadButton({ onClick }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition transform hover:scale-105 shadow-lg"
      style={{ backgroundColor: '#D85A30' }}
    >
      <Upload className="w-5 h-5" />
      <span>Upload item</span>
    </button>
  )
}
