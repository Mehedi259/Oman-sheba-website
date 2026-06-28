import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, Car, Gauge, Calendar, Fuel, Settings, ArrowLeft, 
  Shield, Phone, MessageSquare, CheckCircle, Users, DoorOpen
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVehicleById } from '@hello-oman-sheba/database/mock-data'

export function generateStaticParams() {
  return [
    { id: 'v1' },
    { id: 'v2' },
  ]
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  const conditionMap: Record<string, string> = {
    'NEW': 'নতুন',
    'USED_EXCELLENT': 'ব্যবহৃত - চমৎকার',
    'USED_GOOD': 'ব্যবহৃত - ভালো',
    'USED_FAIR': 'ব্যবহৃত - মোটামুটি',
  }
  const transmissionMap: Record<string, string> = {
    'AUTOMATIC': 'অটোমেটিক',
    'MANUAL': 'ম্যানুয়াল',
  }
  const fuelMap: Record<string, string> = {
    'PETROL': 'পেট্রোল',
    'DIESEL': 'ডিজেল',
    'ELECTRIC': 'ইলেকট্রিক',
    'HYBRID': 'হাইব্রিড',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-700 text-white py-12">
        <div className="container">
          <Link href="/vehicles" className="inline-flex items-center text-orange-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব গাড়ি দেখুন
          </Link>
          <div className="flex items-start gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-5xl shrink-0">
              🚗
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-500/30 text-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                  {vehicle.purpose === 'SALE' ? 'বিক্রয়' : 'ভাড়া'}
                </span>
                {vehicle.verified && (
                  <span className="bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" /> যাচাইকৃত
                  </span>
                )}
                {vehicle.sold && (
                  <span className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-sm">বিক্রিত</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{vehicle.titleBn}</h1>
              <p className="text-orange-200 text-lg mb-3">{vehicle.title}</p>
              <div className="flex flex-wrap gap-3 text-sm text-orange-200">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{vehicle.area}, {vehicle.city}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{vehicle.year}</span>
                <span className="flex items-center gap-1"><Gauge className="h-4 w-4" />{vehicle.mileage.toLocaleString()} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{vehicle.year}</p>
                  <p className="text-sm text-muted-foreground">সাল</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Gauge className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{(vehicle.mileage / 1000).toFixed(0)}k</p>
                  <p className="text-sm text-muted-foreground">কিলোমিটার</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Settings className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-lg font-bold">{transmissionMap[vehicle.transmission]}</p>
                  <p className="text-sm text-muted-foreground">ট্রান্সমিশন</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Fuel className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-lg font-bold">{fuelMap[vehicle.fuelType]}</p>
                  <p className="text-sm text-muted-foreground">জ্বালানি</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">গাড়ির বিবরণ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{vehicle.descriptionBn}</p>
                <p className="text-muted-foreground leading-relaxed mt-2">{vehicle.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">বিস্তারিত তথ্য</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Car className="h-5 w-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">ব্র্যান্ড / মডেল</p>
                      <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="h-5 w-5 rounded-full shrink-0" style={{ backgroundColor: vehicle.color.toLowerCase() === 'white' ? '#e5e7eb' : vehicle.color.toLowerCase() === 'black' ? '#1f2937' : '#9ca3af' }} />
                    <div>
                      <p className="text-xs text-muted-foreground">রঙ</p>
                      <p className="font-medium">{vehicle.color}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Settings className="h-5 w-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">ইঞ্জিন</p>
                      <p className="font-medium">{vehicle.engineCapacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Users className="h-5 w-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">আসন</p>
                      <p className="font-medium">{vehicle.seats} জন</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <DoorOpen className="h-5 w-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">দরজা</p>
                      <p className="font-medium">{vehicle.doors} টি</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">অবস্থা</p>
                      <p className="font-medium">{conditionMap[vehicle.condition] || vehicle.condition}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance */}
            {vehicle.insurance && (
              <Card className="border-green-200 bg-green-50/30">
                <CardContent className="pt-6 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">বীমা সক্রিয়</p>
                    <p className="text-sm text-green-600">
                      মেয়াদ: {new Date(vehicle.insuranceExpiry).toLocaleDateString('bn-BD')} পর্যন্ত
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-2 border-orange-200 bg-orange-50/30">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">মূল্য</p>
                  <p className="text-3xl font-bold text-orange-700">
                    {vehicle.currency} {vehicle.price.toLocaleString()}
                  </p>
                  {vehicle.priceNegotiable && (
                    <p className="text-sm text-orange-600 mt-1">আলোচনাসাপেক্ষ</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">বিক্রেতার সাথে যোগাযোগ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold text-lg">{vehicle.contactName}</p>
                <a href={`tel:${vehicle.contactPhone}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {vehicle.contactPhone}
                  </Button>
                </a>
                {vehicle.contactWhatsapp && (
                  <a href={`https://wa.me/${vehicle.contactWhatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp-এ যোগাযোগ করুন
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
