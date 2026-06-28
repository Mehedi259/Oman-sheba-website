import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Phone, ArrowRight, Shield } from 'lucide-react'

const services = [
  {
    id: '1',
    name: 'আল নূর হাসপাতাল',
    category: 'স্বাস্থ্যসেবা',
    location: 'মাস্কাট',
    rating: 4.8,
    reviews: 156,
    verified: true,
    phone: '+968 2478 9012',
    icon: '🏥'
  },
  {
    id: '2',
    name: 'ভিসা সেবা কেন্দ্র',
    category: 'ভিসা সেবা',
    location: 'রুয়ি',
    rating: 4.6,
    reviews: 89,
    verified: true,
    phone: '+968 2412 3456',
    icon: '📄'
  },
  {
    id: '3',
    name: 'লিগ্যাল কনসালটেন্সি',
    category: 'আইনি সেবা',
    location: 'মাস্কাট',
    rating: 4.9,
    reviews: 203,
    verified: true,
    phone: '+968 2434 5678',
    icon: '⚖️'
  },
  {
    id: '4',
    name: 'ট্রাভেল এজেন্সি',
    category: 'ভ্রমণ সেবা',
    location: 'বোশার',
    rating: 4.7,
    reviews: 124,
    verified: true,
    phone: '+968 2456 7890',
    icon: '✈️'
  }
]

export function FeaturedServices() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{service.icon}</div>
                  {service.verified && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      যাচাইকৃত
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{service.category}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {service.location}
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold mr-1">{service.rating}</span>
                  <span className="text-muted-foreground">({service.reviews} রিভিউ)</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {service.phone}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/services/${service.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">বিস্তারিত</Button>
                </Link>
                <Button className="flex-1">যোগাযোগ</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
