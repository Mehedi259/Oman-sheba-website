import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Phone, ArrowRight, Shield, CheckCircle2 } from 'lucide-react'
import { getFeaturedServices } from '@/lib/api'
import { getMediaUrl } from '@/lib/utils'

// Colorful flat icon per service category
const serviceIcons: Record<string, string> = {
  'AC_REPAIR': '/icons/healthcare.svg', // using available icons temporarily
  'PLUMBING': '/icons/provider.svg',
  'ELECTRICAL': '/icons/provider.svg',
  'CLEANING': '/icons/provider.svg',
  'CARPENTRY': '/icons/provider.svg',
  'PAINTING': '/icons/provider.svg',
  'APPLIANCE_REPAIR': '/icons/provider.svg',
  'OTHER': '/icons/provider.svg',
  'চিকিৎসা': '/icons/healthcare.svg',
  'ভিসা সেবা': '/icons/visa.svg',
  'ট্রাভেল এজেন্সি': '/icons/travel.svg',
  'আইনি সেবা': '/icons/legal.svg',
  'শিক্ষা': '/icons/education.svg',
}

const getServiceIcon = (service: any) => {
  const cat = typeof service.category === 'object' ? service.category?.nameBn : service.category;
  return serviceIcons[cat] || '/icons/provider.svg'
}

// Map english category keys to Bangla labels if needed
const categoryLabels: Record<string, string> = {
  'AC_REPAIR': 'এসি মেরামত',
  'PLUMBING': 'প্লাম্বিং',
  'ELECTRICAL': 'ইলেকট্রিক্যাল',
  'CLEANING': 'ক্লিনিং',
  'CARPENTRY': 'কাঠের কাজ',
  'PAINTING': 'রংয়ের কাজ',
  'APPLIANCE_REPAIR': 'অ্যাপ্লায়েন্স মেরামত',
  'OTHER': 'অন্যান্য',
};

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service: any) => {
            const title = service.nameBn || service.title_bn || service.title || 'শিরোনাম নেই';
            const catName = typeof service.category === 'object' ? service.category?.nameBn : (categoryLabels[service.category as string] || service.category || 'ক্যাটাগরি নেই');
            const phone = service.phone || service.contact_phone || 'নম্বর নেই';

            return (
              <Card key={service.id || service.slug || Math.random()} className="hover:shadow-lg transition-shadow hover-lift h-full flex flex-col overflow-hidden">
                <div className="relative h-28 sm:h-48 bg-muted shrink-0">
                  <img
                    src={service.images?.[0] ? getMediaUrl(service.images[0]) : getServiceIcon(service)}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                  {service.verified && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full z-10 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-2 w-2 sm:h-3 sm:w-3" />
                      যাচাইকৃত
                    </div>
                  )}
                </div>
                <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
                  <CardTitle className="text-sm sm:text-lg line-clamp-1 leading-tight">{title}</CardTitle>
                  <p className="text-[10px] sm:text-sm text-muted-foreground line-clamp-1 mt-1">{catName}</p>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 space-y-2 sm:space-y-3 flex-grow">
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{service.city || 'শহর'}, {service.area || 'এলাকা'}</span>
                  </div>
                  {service.rating && (
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold mr-1">{service.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({service.reviewCount || 0} রিভিউ)</span>
                    </div>
                  )}
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{phone}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-6 pt-0 flex flex-col sm:flex-row gap-2 mt-auto">
                  <Link href={`/services/${service.slug || service.id}`} className="w-full sm:flex-1">
                    <Button variant="outline" className="w-full text-xs sm:text-sm h-8 sm:h-10">বিস্তারিত</Button>
                  </Link>
                  <a href={`tel:${phone}`} className="w-full sm:flex-1">
                    <Button className="w-full text-xs sm:text-sm h-8 sm:h-10">যোগাযোগ</Button>
                  </a>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
