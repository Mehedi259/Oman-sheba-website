import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Phone, ArrowRight, Shield, CheckCircle2 } from 'lucide-react'
import { getFeaturedServices } from '@/lib/api'

// Colorful flat icon per service category (reuses the approved grid icons)
const serviceIcons: Record<string, string> = {
  'চিকিৎসা': '/icons/healthcare.svg',
  'ভিসা সেবা': '/icons/visa.svg',
  'ট্রাভেল এজেন্সি': '/icons/travel.svg',
  'আইনি সেবা': '/icons/legal.svg',
  'শিক্ষা': '/icons/education.svg',
}

const getServiceIcon = (service: any) =>
  serviceIcons[service.category?.nameBn] || '/icons/provider.svg'

export async function FeaturedServices() {
  const services = await getFeaturedServices(3);
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">সেবা প্রদানকারী</h2>
            <p className="text-muted-foreground">বিশ্বস্ত এবং যাচাইকৃত সেবা</p>
          </div>
          <Link href="/services">
            <Button variant="outline">
              সব দেখুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 rounded-lg bg-muted/50 flex items-center justify-center p-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getServiceIcon(service)} alt="" className="h-9 w-9" />
                  </div>
                  {service.verified && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center text-xs font-medium">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      যাচাইকৃত
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{service.nameBn}</CardTitle>
                <p className="text-sm text-muted-foreground">{service.category.nameBn}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {service.city}, {service.area}
                </div>
                {service.rating && (
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold mr-1">{service.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({service.reviewCount} রিভিউ)</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {service.phone}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/services/${service.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">বিস্তারিত</Button>
                </Link>
                <a href={`tel:${service.phone}`} className="flex-1">
                  <Button className="w-full">যোগাযোগ</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
