import OutfitCard from './outfit-card'

export default function OutfitFeed() {
  const outfits = [
    {
      id: '1',
      items: [
        { name: 'Vintage Ankara Print Shirt', price: 32 },
        { name: 'Wide-Leg Trousers', price: 28 },
      ],
      gradient: 'linear-gradient(135deg, #D85A30 0%, #E8956B 50%, #F5B87D 100%)',
    },
    {
      id: '2',
      items: [
        { name: 'Indigo Kente Wrap', price: 45 },
        { name: 'Neutral Linen Pants', price: 35 },
      ],
      gradient: 'linear-gradient(135deg, #7F77DD 0%, #9B8FFF 50%, #B8A8FF 100%)',
    },
    {
      id: '3',
      items: [
        { name: 'Mixed Print Dress', price: 38 },
        { name: 'Boubou Shawl', price: 42 },
      ],
      gradient: 'linear-gradient(135deg, #20B2AA 0%, #4DB8A8 50%, #7AC8B8 100%)',
    },
  ]

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Shop AI-Styled Looks
          </h2>
          <p className="text-lg text-foreground/75">
            Curated outfits ready to wear, or mix pieces your way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} {...outfit} />
          ))}
        </div>
      </div>
    </section>
  )
}
