// Shared outfit catalog — single source of truth used by /browse, board detail pages,
// and anywhere else outfits need to be looked up by id.

export interface OutfitItem {
  id: string
  name: string
  price: number
}

export interface Outfit {
  id: string
  items: OutfitItem[]
  seller: string
  city: string
  category: string
  featured?: boolean
  isNew?: boolean
}

export const mockOutfits: Outfit[] = [
  {
    id: 'out1',
    featured: true,
    isNew: true,
    items: [
      { id: 'i1', name: 'Zara wrap dress', price: 2400 },
      { id: 'i2', name: 'Leather belt', price: 800 },
      { id: 'i3', name: 'Ankle boots', price: 3200 },
    ],
    seller: 'Vintage Vibes',
    city: 'Nairobi',
    category: 'Office',
  },
  {
    id: 'out2',
    isNew: true,
    items: [
      { id: 'i4', name: 'Linen shirt', price: 1800 },
      { id: 'i5', name: 'Canvas pants', price: 2000 },
    ],
    seller: 'Eco Threads',
    city: 'Kampala',
    category: 'Casual',
  },
  {
    id: 'out3',
    items: [
      { id: 'i6', name: 'Silk blouse', price: 3500 },
      { id: 'i7', name: 'Tailored blazer', price: 4200 },
      { id: 'i8', name: 'Dress pants', price: 2800 },
    ],
    seller: 'Modern Mix',
    city: 'Lagos',
    category: 'Formal',
  },
  {
    id: 'out4',
    isNew: true,
    items: [
      { id: 'i9', name: 'Printed bohemian dress', price: 2600 },
      { id: 'i10', name: 'Woven sandals', price: 1200 },
      { id: 'i11', name: 'Shell necklace', price: 600 },
    ],
    seller: 'Boho Soul',
    city: 'Dar es Salaam',
    category: 'Boho',
  },
  {
    id: 'out5',
    items: [
      { id: 'i12', name: 'Oversized hoodie', price: 2200 },
      { id: 'i13', name: 'Cargo pants', price: 2400 },
      { id: 'i14', name: 'Sneakers', price: 2800 },
    ],
    seller: 'City Style',
    city: 'Accra',
    category: 'Streetwear',
  },
  {
    id: 'out6',
    items: [
      { id: 'i15', name: 'Black bodysuit', price: 1600 },
      { id: 'i16', name: 'Sequin skirt', price: 3100 },
      { id: 'i17', name: 'Heeled boots', price: 3800 },
    ],
    seller: 'Vintage Vibes',
    city: 'Nairobi',
    category: 'Night out',
  },
  {
    id: 'out7',
    items: [
      { id: 'i18', name: 'Denim jacket', price: 2300 },
      { id: 'i19', name: 'White tee', price: 800 },
      { id: 'i20', name: 'Blue jeans', price: 2100 },
    ],
    seller: 'Eco Threads',
    city: 'Kampala',
    category: 'Casual',
  },
  {
    id: 'out8',
    items: [
      { id: 'i21', name: 'Maxi dress', price: 3800 },
      { id: 'i22', name: 'Linen shawl', price: 1500 },
      { id: 'i23', name: 'Embroidered clutch', price: 2200 },
    ],
    seller: 'Modern Mix',
    city: 'Lagos',
    category: 'Formal',
  },
  {
    id: 'out9',
    items: [
      { id: 'i24', name: 'Tie-dye crop top', price: 1300 },
      { id: 'i25', name: 'Linen shorts', price: 1600 },
      { id: 'i26', name: 'Flip flops', price: 600 },
    ],
    seller: 'Boho Soul',
    city: 'Dar es Salaam',
    category: 'Casual',
  },
]

export const outfitPhotoMap: Record<string, string> = {
  out1: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
  out2: 'https://images.unsplash.com/photo-1617952236317-0bd127407984?w=800&q=80',
  out3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
  out4: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=800&q=80',
  out5: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
  out6: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80',
  out7: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80',
  out8: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  out9: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
}

export function getOutfitById(id: string): Outfit | undefined {
  return mockOutfits.find((o) => o.id === id)
}