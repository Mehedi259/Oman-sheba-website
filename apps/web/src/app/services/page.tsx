import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Star, Phone, Shield } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'স্বাস্থ্যসেবা', slug: 'healthcare', icon: '🏥', count: 45 },
  { name: 'আইনি সেবা', slug: 'legal', icon: '⚖️', count: 23 },
  { name: 'পাসপোর্ট সেবা', slug: 'passport', icon: '📄', count: 12 },
  { name: 'ভিসা সেবা', slug: 'visa', icon: '📋', count: 18 },
  { name: 'ভ্রমণ সেবা', slug: 'travel', icon: '✈️', count: 34 },
  { name: 'শিক্ষা', slug: 'education', icon: '🎓', count: 28 },
]

const services = [
  {
    id: '1',
    name: 'আল নূর হাসপাতাল',
    category: 'স্বাস্থ্যসেবা',
    location: 'মাস্কাট, রুয়ি',
    rating: 4.8,
    reviews: 156,
    verified: true,
    phone: '+968 2478 9012',
    icon: '🏥',
    services: ['জরুরী সেবা', 'সার্জারি', 'পরীক্ষাগার']
  },
  {
    id: '2',
    name: 'লিগ্যাল কনসালটেন্সি',
    category: 'আইনি সেবা',
    location: 'মাস্কাট',
    rating: 4.9,
    reviews: 203,
    verified: true,
    phone: '+968 2434 5678',
    icon: '⚖️',
    services: ['ভিসা সেবা', 'লেবার কোর্ট', 'ডকুমেন্টেশন']
  },
  {
    id: '3',
    name: 'ভিসা সেবা কেন্দ্র',
    category: 'ভিসা সেবা',
    location: 'রুয়ি, মাস্কাট',
    rating: 4.6,
    reviews: 89,
    verified: true,
    phone: '+968 2412 3456',
    icon: '📄',
    services: ['নতুন ভিসা', 'রিনিউয়াল', 'ফ্যামিলি ভিসা']
  },
  {
    id: '4',
    name: 'ট্রাভেল এজেন্সি',
    category: 'ভ্রমণ সেবা',
    location: 'বোশার, মাস্কাট',
    rating: 4.7,
    reviews: 124,
    verified: true,
    phone: '+968 2456 7890',
    icon: '✈️',
    services: ['ফ্লাইট টিকেট', 'হোটেল বুকিং', 'ট্যুর প্যাকেজ']
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">সেবা প্রদানকারী</h1>
          <p className="text-lg text-purple-100">বিশ্বস্ত এবং যাচাইকৃত সেবা প্রদানকারী খুঁজুন</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">সেবার ধরন</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold mb-1">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.count}টি সেবা</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Service Providers */}
        <div>
          <h2 className="text-2xl font-bold mb-6">জনপ্রিয় সেবা প্রদানকারী</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{service.icon}</div>
                    {service.verified && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-1" />
                        যাচাইকৃত
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
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
                  <div className="flex flex-wrap gap-2 mt-3">
                    {service.services.map((s, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/services/${service.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">বিস্তারিত</Button>
                  </Link>
                  <Button className="flex-1">যোগাযোগ করুন</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
