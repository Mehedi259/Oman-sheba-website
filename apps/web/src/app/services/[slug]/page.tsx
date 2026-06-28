import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, Star, Phone, Shield, ArrowLeft, Mail, 
  Globe, MessageSquare, CheckCircle, Eye
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceById, getServices } from '@hello-oman-sheba/database/mock-data'

// Category definitions used on the services listing page
const serviceCategories: Record<string, { name: string; nameBn: string; icon: string; description: string }> = {
  'healthcare': { name: 'Healthcare', nameBn: 'স্বাস্থ্যসেবা', icon: '🏥', description: 'হাসপাতাল, ক্লিনিক এবং মেডিকেল সেবা প্রদানকারী।' },
  'legal': { name: 'Legal', nameBn: 'আইনি সেবা', icon: '⚖️', description: 'আইনগত পরামর্শ, লেবার কোর্ট এবং ডকুমেন্টেশন সেবা।' },
  'passport': { name: 'Passport', nameBn: 'পাসপোর্ট সেবা', icon: '📄', description: 'পাসপোর্ট নবায়ন, নতুন পাসপোর্ট এবং সংশোধন সেবা।' },
  'visa': { name: 'Visa', nameBn: 'ভিসা সেবা', icon: '📋', description: 'ওয়ার্ক ভিসা, ফ্যামিলি ভিসা, ভিজিট ভিসা এবং ভিসা রিনিউয়াল।' },
  'travel': { name: 'Travel', nameBn: 'ভ্রমণ সেবা', icon: '✈️', description: 'ফ্লাইট বুকিং, হোটেল রিজার্ভেশন এবং ট্যুর প্যাকেজ।' },
  'education': { name: 'Education', nameBn: 'শিক্ষা', icon: '🎓', description: 'শিক্ষা প্রতিষ্ঠান, কোচিং এবং ট্রেনিং সেন্টার।' },
  'business': { name: 'Business', nameBn: 'ব্যবসা', icon: '🏢', description: 'ব্যবসায়িক পরামর্শ, কোম্পানি রেজিস্ট্রেশন এবং ট্রেড লাইসেন্স।' },
  'restaurant': { name: 'Restaurant', nameBn: 'রেস্টুরেন্ট', icon: '🍽️', description: 'বাংলাদেশি এবং আন্তর্জাতিক রেস্টুরেন্ট ও খাবার সেবা।' },
}

export function generateStaticParams() {
  return [
    // Category slugs
    { slug: 'healthcare' },
    { slug: 'legal' },
    { slug: 'passport' },
    { slug: 'visa' },
    { slug: 'travel' },
    { slug: 'education' },
    { slug: 'business' },
    { slug: 'restaurant' },
    // Service provider IDs
    { slug: 's1' },
    { slug: 's2' },
    { slug: 's3' },
    // Numeric IDs from inline data
    { slug: '1' },
    { slug: '2' },
    { slug: '3' },
    { slug: '4' },
  ]
}

function CategoryPage({ categorySlug, category }: { categorySlug: string; category: { name: string; nameBn: string; icon: string; description: string } }) {
  const allServices = getServices()
  // Filter services loosely by matching category name
  // Since our mock data has limited entries, show all services for now
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
        <h2 className="text-2xl font-bold mb-6">সেবা প্রদানকারীসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((service) => (
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
                  {service.services.map((s, i) => (
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
      </div>
    </div>
  )
}

function ServiceDetailPage({ service }: { service: NonNullable<ReturnType<typeof getServiceById>> }) {
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
                  {service.services.map((s, i) => (
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
  const service = getServiceById(slug)
  if (service) {
    return <ServiceDetailPage service={service} />
  }

  // Not found
  notFound()
}
