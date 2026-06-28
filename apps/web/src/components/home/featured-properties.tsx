import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Home, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const properties = [
  {
    id: '1',
    title: '২ বেডরুম ফ্ল্যাট',
    location: 'রুয়ি, মাস্কাট',
    price: 'OMR 300',
    period: 'মাসিক',
    bedrooms: 2,
    bathrooms: 2,
    area: '1200 sqft',
    image: '/placeholder-property.jpg',
    featured: true
  },
  {
    id: '2',
    title: 'শেয়ারড রুম',
    location: 'আল খুওয়ার, মাস্কাট',
    price: 'OMR 80',
    period: 'মাসিক',
    bedrooms: 1,
    bathrooms: 1,
    area: '300 sqft',
    image: '/placeholder-property.jpg',
    featured: false
  },
  {
    id: '3',
    title: '৩ বেডরুম ভিলা',
    location: 'আল মাওয়ালেহ',
    price: 'OMR 600',
    period: 'মাসিক',
    bedrooms: 3,
    bathrooms: 3,
    area: '2000 sqft',
    image: '/placeholder-property.jpg',
    featured: true
  },
  {
    id: '4',
    title: 'স্টুডিও অ্যাপার্টমেন্ট',
    location: 'বোশার',
    price: 'OMR 200',
    period: 'মাসিক',
    bedrooms: 1,
    bathrooms: 1,
    area: '500 sqft',
    image: '/placeholder-property.jpg',
    featured: false
  }
]

export function FeaturedProperties() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">বাসা ভাড়া</h2>
            <p className="text-muted-foreground">আপনার পছন্দের বাসা খুঁজুন</p>
          </div>
          <Link href="/properties">
            <Button variant="outline">
              সব দেখুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
              <div className="relative h-48 bg-muted">
                {property.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-10">
                    ফিচার্ড
                  </div>
                )}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Home className="h-16 w-16 text-muted-foreground/30" />
                </div>
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
                    <span>{property.bedrooms} বেডরুম</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{property.bathrooms} বাথরুম</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{property.area}</div>
                <div className="text-2xl font-bold text-primary">
                  {property.price}
                  <span className="text-sm text-muted-foreground font-normal">/{property.period}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/properties/${property.id}`} className="w-full">
                  <Button variant="outline" className="w-full">বিস্তারিত</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
