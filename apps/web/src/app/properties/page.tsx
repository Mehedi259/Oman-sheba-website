export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Bed, Bath, Home, Square } from 'lucide-react'
import Link from 'next/link'

import { getProperties } from '@/lib/api'
import { FavoriteButton } from '@/components/ui/favorite-button'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export default async function PropertiesPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const data = await getProperties({
    search: searchParams.search,
    sort: searchParams.sort,
    page: searchParams.page,
  });
  
  const properties = Array.isArray(data) ? data : data.results || [];
  
  const buildUrl = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as any);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    return `/properties?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">বাসা ভাড়া</h1>
          <form action="/properties" method="GET" className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              name="search"
              defaultValue={searchParams.search || ''}
              placeholder="লোকেশন বা এলাকা..."
              className="border-0 text-gray-900 flex-1"
            />
            {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Search className="h-5 w-5 mr-2" />
              খুঁজুন
            </Button>
          </form>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <p className="text-muted-foreground">{properties.length}টি বাসা পাওয়া গেছে</p>
          <div className="flex flex-wrap gap-2">
            <Link href={buildUrl({ sort: '-created_at' })}>
              <Button variant={searchParams.sort === '-created_at' || !searchParams.sort ? 'default' : 'outline'} size="sm">সর্বশেষ</Button>
            </Link>
            <Link href={buildUrl({ sort: 'price' })}>
              <Button variant={searchParams.sort === 'price' ? 'default' : 'outline'} size="sm">কম ভাড়া</Button>
            </Link>
            <Link href={buildUrl({ sort: '-price' })}>
              <Button variant={searchParams.sort === '-price' ? 'default' : 'outline'} size="sm">বেশি ভাড়া</Button>
            </Link>
            {(searchParams.search || searchParams.sort) && (
              <Link href="/properties">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">ফিল্টার মুছুন</Button>
              </Link>
            )}
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-6xl mb-4 block">🏠</span>
            <h3 className="text-xl font-semibold mb-2">কোনো প্রপার্টি পাওয়া যায়নি</h3>
            <p>আপনার খোঁজার মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
                <div className="relative h-48 bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center overflow-hidden">
                  {property.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
                      ফিচার্ড
                    </div>
                  )}
                  {property.images && property.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getMediaUrl(property.images[0])} alt={property.titleBn || property.title} className="w-full h-full object-cover" />
                  ) : (
                    <Home className="h-16 w-16 text-muted-foreground/30" />
                  )}
                </div>
                <CardHeader className="pb-3">
                  <h3 className="font-bold text-lg">{property.titleBn || property.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.city}{property.area ? `, ${property.area}` : ''}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{property.bathrooms}</span>
                      </div>
                    )}
                    {property.size && (
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{property.size} {property.sizeUnit || 'sqft'}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{property.furnishing || 'N/A'}</div>
                  <div className="text-2xl font-bold text-green-600">
                    {property.price ? property.price.toLocaleString() : 0} {property.currency || 'রিয়াল'}
                    {property.purpose === 'RENT' && <span className="text-sm text-muted-foreground font-normal">/মাসিক</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{formatRelativeTime(property.createdAt || property.created_at)}</div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/properties/${property.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">বিস্তারিত</Button>
                  </Link>
                  <Button className="flex-1">যোগাযোগ</Button>
                  <FavoriteButton type="property" id={property.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {properties.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button variant="outline" disabled>পূর্ববর্তী</Button>
            <Button>১</Button>
            <Button variant="outline" disabled>পরবর্তী</Button>
          </div>
        )}
      </div>
    </div>
  )
}
