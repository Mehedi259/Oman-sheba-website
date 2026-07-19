import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, Home, Bath, Maximize, ArrowLeft, Shield, 
  Phone, MessageSquare, Calendar, CheckCircle, DollarSign,
  Building, Layers, Star
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPropertyById } from '@/lib/api'
import { FavoriteButton } from '@/components/ui/favorite-button'

export const dynamic = 'force-dynamic'

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let property: any
  try {
    property = await getPropertyById(id)
  } catch (error) {
    notFound()
  }

  if (!property) {
    notFound()
  }

  const purposeMap: Record<string, string> = {
    'RENT': 'ভাড়া',
    'SALE': 'বিক্রয়',
  }
  const furnishedMap: Record<string, string> = {
    'FURNISHED': 'সম্পূর্ণ সজ্জিত',
    'SEMI_FURNISHED': 'আংশিক সজ্জিত',
    'UNFURNISHED': 'অসজ্জিত',
  }
  const categoryMap: Record<string, string> = {
    'APARTMENT': 'অ্যাপার্টমেন্ট',
    'VILLA': 'ভিলা',
    'BED_SPACE': 'বেড স্পেস',
    'ROOM': 'রুম',
    'HOUSE': 'বাসা',
    'FLAT': 'ফ্ল্যাট',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12">
        <div className="container">
          <Link href="/properties" className="inline-flex items-center text-green-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব সম্পত্তি দেখুন
          </Link>
          <div className="flex items-start gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-5xl shrink-0">
              🏠
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-500/30 text-green-100 px-3 py-1 rounded-full text-sm font-medium">
                  {purposeMap[property.purpose] || property.purpose || ''}
                </span>
                <span className="bg-white/10 text-green-100 px-3 py-1 rounded-full text-sm">
                  {categoryMap[property.category] || property.category || ''}
                </span>
                {property.verified && (
                  <span className="bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" /> যাচাইকৃত
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title_bn || property.title}</h1>
              <p className="text-green-200 text-lg mb-3">{property.title}</p>
              <div className="flex items-center gap-2 text-green-200">
                <MapPin className="h-4 w-4" />
                <span>{property.area ? `${property.area}, ` : ''}{property.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.bedrooms != null && (
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Home className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">শয়নকক্ষ</p>
                  </CardContent>
                </Card>
              )}
              {property.bathrooms != null && (
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">বাথরুম</p>
                  </CardContent>
                </Card>
              )}
              {property.size && (
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Maximize className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{property.size}</p>
                    <p className="text-sm text-muted-foreground">{property.size_unit || 'sqft'}</p>
                  </CardContent>
                </Card>
              )}
              {property.floor && (
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Layers className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{property.floor}{property.total_floors ? `/${property.total_floors}` : ''}</p>
                    <p className="text-sm text-muted-foreground">তলা</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">বিবরণ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{property.description_bn || property.description}</p>
                {property.description_bn && property.description && property.description !== property.description_bn && (
                  <p className="text-muted-foreground leading-relaxed mt-2">{property.description}</p>
                )}
              </CardContent>
            </Card>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">সুবিধাসমূহ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">মূল্য</p>
                  <p className="text-3xl font-bold text-green-700">
                    {property.currency || 'OMR'} {property.price ? Number(property.price).toLocaleString() : 'আলোচনা সাপেক্ষে'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {property.purpose === 'RENT' ? 'প্রতি মাসে' : 'মোট মূল্য'}
                    {property.price_negotiable && ' • আলোচনাসাপেক্ষ'}
                  </p>
                </div>
                <hr />
                <div className="space-y-3">
                  {property.furnished && (
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">সজ্জা</p>
                        <p className="font-medium">{furnishedMap[property.furnished] || property.furnished}</p>
                      </div>
                    </div>
                  )}
                  {property.available_from && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">উপলব্ধ তারিখ</p>
                        <p className="font-medium">{new Date(property.available_from).toLocaleDateString('bn-BD')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">যোগাযোগ করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {property.contact_name && <p className="font-semibold text-lg">{property.contact_name}</p>}
                {property.contact_phone && (
                  <a href={`tel:${property.contact_phone}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      {property.contact_phone}
                    </Button>
                  </a>
                )}
                {property.contact_whatsapp && (
                  <a href={`https://wa.me/${property.contact_whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="block mb-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp-এ যোগাযোগ করুন
                    </Button>
                  </a>
                )}
                <div className="flex justify-end pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">পছন্দের তালিকায় রাখুন:</span>
                    <FavoriteButton type="property" id={property.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
