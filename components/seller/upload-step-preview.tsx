export default function UploadStepPreview() {
  const suggestions = [
    {
      id: 1,
      items: ['Vintage Ankara Shirt', 'New uploaded item', 'Canvas boots'],
      price: 4200,
    },
    {
      id: 2,
      items: ['Wide-leg trousers', 'New uploaded item', 'Belt'],
      price: 3800,
    },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">AI pairing suggestions</h3>
      <p className="text-sm text-muted-foreground mb-6">Accept suggested outfits to list them</p>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-medium text-foreground mb-2">Suggested outfit {suggestion.id}</p>
                <div className="space-y-1">
                  {suggestion.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">• {item}</p>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">KSh {suggestion.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total outfit</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors">
                Reject
              </button>
              <button
                className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: '#D85A30' }}
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
