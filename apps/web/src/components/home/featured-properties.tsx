import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Home, ArrowRight, CheckCircle2 } from 'lucide-react'
import { getFeaturedProperties } from '@/lib/api'

const propertyTypeLabels: Record<string, string> = {
  'APARTMENT': 'অ্যাপার্টমেন্ট',
  'VILLA': 'ভিলা',
  'HOUSE': 'বাসা',
  'ROOM': 'রুম',
  'BED_SPACE': 'বেড স্পেস',
};

const purposeLabels: Record<string, string> = {
  'RENT': 'ভাড়া',
  'SALE': 'বিক্রয়',
};

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties(3);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
              <div className="relative h-48 bg-muted">
                {property.featured && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">
                    ফিচার্ড
                  </div>
                )}
                {property.verified && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    যাচাইকৃত
                  </div>
                )}
                {property.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={property.images[0]}
                    alt={property.titleBn}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Home className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg line-clamp-1">{property.titleBn}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.city}, {property.area}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
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
                    <div className="text-muted-foreground">
                      {property.size} {property.sizeUnit}
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {property.price} {property.currency}
                    <span className="text-sm text-muted-foreground font-normal">/মাসিক</span>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {purposeLabels[property.purpose] || property.purpose}
                  </span>
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
