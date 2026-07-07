import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Bed, Bath, Home, Square } from 'lucide-react'
import Link from 'next/link'

const properties = [
  {
    id: '1',
    title: '২ বেডরুম ফ্ল্যাট',
    location: 'রুয়ি, মাস্কাট',
    price: '৳ ১,০৫,০০০',
    period: 'মাসিক',
    bedrooms: 2,
    bathrooms: 2,
    area: '1200',
    furnished: 'ফার্নিশড',
    posted: '২ দিন আগে',
    featured: true
  },
  {
    id: '2',
    title: 'শেয়ারড রুম (শুধুমাত্র বাংলাদেশী)',
    location: 'আল খুওয়ার',
    price: '৳ ২৮,০০০',
    period: 'মাসিক',
    bedrooms: 1,
    bathrooms: 1,
    area: '300',
    furnished: 'ফার্নিশড',
    posted: '১ দিন আগে',
    featured: false
  },
  {
    id: '3',
    title: '৩ বেডরুম ভিলা',
    location: 'আল মাওয়ালেহ',
    price: '৳ ২,১০,০০০',
    period: 'মাসিক',
    bedrooms: 3,
    bathrooms: 3,
    area: '2000',
    furnished: 'সেমি-ফার্নিশড',
    posted: '৩ দিন আগে',
    featured: true
  },
  {
    id: '4',
    title: 'স্টুডিও অ্যাপার্টমেন্ট',
    location: 'বোশার',
    price: '৳ ৭০,০০০',
    period: 'মাসিক',
    bedrooms: 1,
    bathrooms: 1,
    area: '500',
    furnished: 'ফার্নিশড',
    posted: '৫ দিন আগে',
    featured: false
  },
  {
    id: '5',
    title: 'বেড স্পেস (বাংলাদেশী পছন্দনীয়)',
    location: 'রুয়ি',
    price: '৳ ১৭,৫০০',
    period: 'মাসিক',
    bedrooms: 1,
    bathrooms: 1,
    area: '150',
    furnished: 'ফার্নিশড',
    posted: '১ দিন আগে',
    featured: false
  },
  {
    id: '6',
    title: '৪ বেডরুম পেন্টহাউজ',
    location: 'আল কুরুম',
    price: '৳ ৩,১৫,০০০',
    period: 'মাসিক',
    bedrooms: 4,
    bathrooms: 4,
    area: '3000',
    furnished: 'ফুল ফার্নিশড',
    posted: '১ সপ্তাহ আগে',
    featured: true
  }
]

export default function PropertiesPage() {
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
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
              <div className="relative h-48 bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
                {property.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
                    ফিচার্ড
                  </div>
                )}
                <Home className="h-16 w-16 text-muted-foreground/30" />
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg">{property.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{property.furnished}</div>
                <div className="text-2xl font-bold text-green-600">
                  {property.price}
                  <span className="text-sm text-muted-foreground font-normal">/{property.period}</span>
                </div>
                <div className="text-xs text-muted-foreground">{property.posted}</div>
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
