export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Bed, Bath, Home, Square } from 'lucide-react'
import Link from 'next/link'

import { getProperties } from '@/lib/api'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export default async function PropertiesPage() {
  const data = await getProperties();
  const properties = Array.isArray(data) ? data : data.results || [];
  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">বাসা ভাড়া</h1>
          <div className="bg-white rounded-lg p-2 flex gap-2">
            <Input
              type="text"
              placeholder="লোকেশন বা এলাকা..."
              className="border-0 text-gray-900"
            />
            <select className="border-0 bg-white text-gray-900 rounded px-3">
              <option>সব ধরনের</option>
              <option>ফ্ল্যাট</option>
              <option>ভিলা</option>
              <option>রুম</option>
              <option>বেড স্পেস</option>
            </select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Search className="h-5 w-5 mr-2" />
              খুঁজুন
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">{properties.length}টি বাসা পাওয়া গেছে</p>
          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>সর্বশেষ</option>
              <option>ভাড়া: নিম্ন থেকে উচ্চ</option>
              <option>ভাড়া: উচ্চ থেকে নিম্ন</option>
            </select>
          </div>
        </div>

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
                  <img src={getMediaUrl(property.images[0])} alt={property.titleBn || property.title} className="w-full h-full object-cover" />
                ) : (
                  <Home className="h-16 w-16 text-muted-foreground/30" />
                )}
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg">{property.titleBn || property.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.city}, {property.area}
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
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="outline">পূর্ববর্তী</Button>
          <Button variant="outline">১</Button>
          <Button>২</Button>
          <Button variant="outline">৩</Button>
          <Button variant="outline">পরবর্তী</Button>
        </div>
      </div>
    </div>
  )
}
