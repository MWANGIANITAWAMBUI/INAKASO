export async function POST(request: Request) {
  const body = await request.json()
  const { category, brand, size, condition } = body

  // Mock AI description generation
  // In production, this would call an actual AI service
  const descriptions: Record<string, string> = {
    'topsDefault': `Beautiful ${brand} ${category.toLowerCase()} in ${condition} condition. Size ${size}. Perfect piece for your wardrobe with excellent quality and style. Gently worn and well-maintained.`,
    'dressesDefault': `Stunning ${brand} dress in ${condition} condition, size ${size}. A versatile piece that works for multiple occasions. High-quality fabric and impeccable tailoring.`,
    'bottomsDefault': `Classic ${brand} ${category.toLowerCase()} in ${condition} condition, size ${size}. Timeless style with great comfort. Well-preserved and ready to wear.`,
  }

  const key = category.toLowerCase() === 'tops' ? 'topsDefault' : category.toLowerCase() === 'dresses' ? 'dressesDefault' : 'bottomsDefault'
  const description = descriptions[key] || descriptions['topsDefault']

  return Response.json({
    success: true,
    description,
  })
}
