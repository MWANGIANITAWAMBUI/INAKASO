interface Details {
  category: string
  brand: string
  size: string
  condition: string
  price: string
  description: string
}

interface UploadStepDetailsProps {
  details: Details
  setDetails: (details: Details) => void
}

export default function UploadStepDetails({ details, setDetails }: UploadStepDetailsProps) {
  const categories = ['Tops', 'Dresses', 'Bottoms', 'Shoes', 'Bags', 'Accessories']
  const conditions = ['Mint', 'Good', 'Fair']

  const handleGenerateDescription = async () => {
    try {
      const response = await fetch('/api/seller/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: details.category,
          brand: details.brand,
          size: details.size,
          condition: details.condition,
        }),
      })
      const data = await response.json()
      setDetails({ ...details, description: data.description })
    } catch (error) {
      console.error('Failed to generate description:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Item details</h3>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Category</label>
        <select
          value={details.category}
          onChange={(e) => setDetails({ ...details, category: e.target.value })}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Brand</label>
        <input
          type="text"
          value={details.brand}
          onChange={(e) => setDetails({ ...details, brand: e.target.value })}
          placeholder="e.g., Zara, H&M, Vintage"
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Size</label>
        <input
          type="text"
          value={details.size}
          onChange={(e) => setDetails({ ...details, size: e.target.value })}
          placeholder="e.g., S, M, L, 10"
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Condition</label>
        <div className="flex gap-4">
          {conditions.map((cond) => (
            <label key={cond} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={cond.toLowerCase()}
                checked={details.condition === cond.toLowerCase()}
                onChange={(e) => setDetails({ ...details, condition: e.target.value })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground">{cond}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Your price (KSh)</label>
        <input
          type="number"
          value={details.price}
          onChange={(e) => setDetails({ ...details, price: e.target.value })}
          placeholder="e.g., 2500"
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">Description (optional)</label>
          <button
            onClick={handleGenerateDescription}
            className="text-xs font-medium text-primary hover:text-primary/80"
          >
            ✦ Generate with AI
          </button>
        </div>
        <textarea
          value={details.description}
          onChange={(e) => setDetails({ ...details, description: e.target.value })}
          placeholder="Describe the item, fit, material, care instructions..."
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  )
}
