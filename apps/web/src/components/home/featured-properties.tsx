import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Bath, Home, ArrowRight, CheckCircle2 } from 'lucide-react'
import { getFeaturedProperties } from '@/lib/api'
import { getMediaUrl } from '@/lib/utils'

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
    <section className="py-8 sm:py-16 bg-background">
      <div className="container">
        <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">বাসা ভাড়া</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">আপনার পছন্দের বাসা খুঁজুন</p>
          </div>
          <Link href="/properties" className="shrink-0 mt-1 sm:mt-0">
            <Button variant="outline" size="sm" className="h-8 sm:h-10 text-xs sm:text-sm">
              সব দেখুন
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {properties.map((property: any) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift h-full flex flex-col">
              <div className="relative h-28 sm:h-48 bg-muted shrink-0">
                {property.featured && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full z-10 font-medium">
                    ফিচার্ড
                  </div>
                )}
                {property.verified && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full z-10 flex items-center gap-1">
                    <CheckCircle2 className="h-2 w-2 sm:h-3 sm:w-3" />
                    যাচাইকৃত
                  </div>
                )}
                {property.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getMediaUrl(property.images[0])}
                    alt={property.title_bn || property.titleBn || property.title || 'বাসা ভাড়া'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Home className="h-8 w-8 sm:h-16 sm:w-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <CardHeader className="p-3 sm:p-6 pb-1 sm:pb-3">
                <h3 className="font-bold text-xs sm:text-lg line-clamp-1 sm:line-clamp-2 leading-tight">{property.title_bn || property.titleBn || property.title || 'বাসা ভাড়া'}</h3>
                <div className="flex items-center text-[10px] sm:text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{property.city}, {property.area}</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 space-y-1.5 sm:space-y-3 flex-grow flex flex-col justify-end">
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
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
                <div className="flex items-baseline justify-between flex-wrap gap-1 mt-1 sm:mt-2">
                  <div className="text-sm sm:text-2xl font-bold text-primary">
                    {property.price} {property.currency}
                    <span className="text-[9px] sm:text-sm text-muted-foreground font-normal">/মাসিক</span>
                  </div>
                  <span className="text-[9px] sm:text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">
                    {purposeLabels[property.purpose] || property.purpose}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-6 pt-0 mt-auto hidden sm:flex">
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
