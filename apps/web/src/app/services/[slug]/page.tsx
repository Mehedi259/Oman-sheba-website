import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, Star, Phone, Shield, ArrowLeft, Mail, 
  Globe, MessageSquare, CheckCircle, Eye
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServices, getServiceById } from '@/lib/api'

// Category definitions used on the services listing page
const serviceCategories: Record<string, { name: string; nameBn: string; icon: string; description: string }> = {
  'embassy': { name: 'Embassy', nameBn: 'ওমান - বাংলাদেশ দূতাবাস', icon: '🏛️', description: 'বাংলাদেশ দূতাবাস সেবা, কনস্যুলার সেবা এবং জরুরী সহায়তা।' },
  'ambulance': { name: 'Ambulance', nameBn: 'আম্বুলেন্স', icon: '🚑', description: 'জরুরী অ্যাম্বুলেন্স সেবা এবং মেডিকেল ট্রান্সপোর্ট।' },
  'doctors': { name: 'Doctors', nameBn: 'বিশেষজ্ঞ ডাক্তার', icon: '👨‍⚕️', description: 'বিশেষজ্ঞ চিকিৎসক, পরামর্শ এবং চেকআপ সেবা।' },
  'hospitals': { name: 'Hospitals', nameBn: 'হাসপাতাল', icon: '🏥', description: 'হাসপাতাল, ক্লিনিক এবং মেডিকেল সেন্টার।' },
  'maktab': { name: 'Maktab Certificate', nameBn: 'মক্তব সানাদ', icon: '📜', description: 'মক্তব সার্টিফিকেট, শিক্ষা সনদ এবং সংশ্লিষ্ট সেবা।' },
  'travel-agency': { name: 'Travel Agency', nameBn: 'ট্রাভেল এজেন্সি', icon: '✈️', description: 'ফ্লাইট বুকিং, হোটেল রিজার্ভেশন এবং ট্যুর প্যাকেজ।' },
  'tourist-places': { name: 'Tourist Places', nameBn: 'দর্শনীয় স্থান', icon: '🗿', description: 'ওমানের দর্শনীয় স্থান, ঐতিহাসিক স্থান এবং পর্যটন।' },
  'lawyers': { name: 'Lawyers', nameBn: 'আইনজীবী', icon: '⚖️', description: 'আইনজীবী, আইনগত পরামর্শ এবং লেবার কোর্ট সেবা।' },
  'legal': { name: 'Legal Services', nameBn: 'আইনগত সহায়তা', icon: '⚖️', description: 'আইনগত সহায়তা, পরামর্শ এবং লেবার কোর্ট সেবা।' },
  'hotels': { name: 'Hotels', nameBn: 'হোটেল', icon: '🏨', description: 'হোটেল, রেস্ট হাউস এবং আবাসন সেবা।' },
  'money-exchange': { name: 'Money Exchange', nameBn: 'মানি এক্সচেঞ্জ', icon: '💱', description: 'মানি এক্সচেঞ্জ, রেমিট্যান্স এবং ব্যাংকিং সেবা।' },
  'police': { name: 'Police Station', nameBn: 'পুলিশ স্টেশন', icon: '👮', description: 'পুলিশ স্টেশন, জরুরী সেবা এবং আইন শৃঙ্খলা।' },
  'passport': { name: 'Passport Services', nameBn: 'পাসপোর্ট সেবা', icon: '🛂', description: 'পাসপোর্ট নবায়ন, হারানো পাসপোর্ট এবং সম্পর্কিত সেবা।' },
  'visa': { name: 'Visa Services', nameBn: 'ভিসা সেবা', icon: '🛂', description: 'ভিসা প্রসেসিং, রিনিউয়াল এবং সম্পর্কিত সহায়তা।' },
  'healthcare': { name: 'Healthcare', nameBn: 'স্বাস্থ্যসেবা', icon: '🏥', description: 'স্বাস্থ্যসেবা, ক্লিনিক এবং মেডিকেল সহায়তা।' },
}

export const dynamic = 'force-dynamic';

async function CategoryPage({ categorySlug, category }: { categorySlug: string; category: { name: string; nameBn: string; icon: string; description: string } }) {
  const categoryServices = await getServices({ category: categorySlug });
  
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white py-12">
        <div className="container">
          <Link href="/services" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব সেবা দেখুন
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.nameBn}</h1>
              <p className="text-purple-200 text-lg">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <h2 className="text-2xl font-bold mb-6">
          {categoryServices.length > 0 ? `${categoryServices.length}টি সেবা প্রদানকারী` : 'সেবা প্রদানকারী'}
        </h2>
        
        {categoryServices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">এই ক্যাটাগরিতে এখনো কোন সেবা যোগ করা হয়নি।</p>
            <Link href="/services">
              <Button>সব সেবা দেখুন</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryServices.map((service: any) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{service.nameBn}</CardTitle>
                      <p className="text-sm text-muted-foreground">{service.name}</p>
                    </div>
                    {service.verified && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center text-sm shrink-0">
                        <Shield className="h-4 w-4 mr-1" />
                        যাচাইকৃত
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">{service.descriptionBn}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {service.area}, {service.city}
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold mr-1">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviewCount} রিভিউ)</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {service.phone}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.services.slice(0, 4).map((s: string, i: number) => (
                      <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link href={`/services/${service.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">বিস্তারিত</Button>
                    </Link>
                    <a href={`tel:${service.phone}`} className="flex-1">
                      <Button className="w-full">যোগাযোগ করুন</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ServiceDetailPage({ service }: { service: any }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white py-12">
        <div className="container">
          <Link href="/services" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব সেবা দেখুন
          </Link>
          <div className="flex items-start gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-5xl shrink-0">
              🏢
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-purple-500/30 text-purple-100 px-3 py-1 rounded-full text-sm font-medium">
                  {service.category.nameBn}
                </span>
                {service.verified && (
                  <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" /> যাচাইকৃত
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{service.nameBn}</h1>
              <p className="text-purple-200 text-lg mb-3">{service.name}</p>
              <div className="flex flex-wrap gap-3 text-sm text-purple-200">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{service.area}, {service.city}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {service.rating} ({service.reviewCount} রিভিউ)
                </span>
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{service.views} বার দেখা হয়েছে</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">সেবার বিবরণ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.descriptionBn}</p>
                <p className="text-muted-foreground leading-relaxed mt-2">{service.description}</p>
              </CardContent>
            </Card>

            {/* Services Offered */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">প্রদত্ত সেবাসমূহ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.services.map((s: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-500 shrink-0" />
                      <span className="font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">ঠিকানা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{service.address}</p>
                    <p className="text-muted-foreground">{service.area}, {service.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Card */}
            <Card className="border-2 border-purple-200 bg-purple-50/30">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-6 w-6 ${star <= Math.floor(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-3xl font-bold text-purple-700">{service.rating}</p>
                <p className="text-sm text-muted-foreground">{service.reviewCount} রিভিউ</p>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">যোগাযোগ করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href={`tel:${service.phone}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {service.phone}
                  </Button>
                </a>
                {service.email && (
                  <a href={`mailto:${service.email}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      {service.email}
                    </Button>
                  </a>
                )}
                {service.whatsapp && (
                  <a href={`https://wa.me/${service.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                )}
                {service.website && (
                  <a href={service.website} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      ওয়েবসাইট ভিজিট করুন
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function ServicesDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Check if it's a category slug
  if (serviceCategories[slug]) {
    return <CategoryPage categorySlug={slug} category={serviceCategories[slug]} />
  }

  // Otherwise, treat as a service provider ID
  const service = await getServiceById(slug)
  if (service) {
    return <ServiceDetailPage service={service} />
  }

  // Not found
  notFound()
}
