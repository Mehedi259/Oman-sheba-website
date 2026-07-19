import { getClassifiedById } from '@/lib/api'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Tag, Calendar, Shield, Phone, MessageSquare, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function ClassifiedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let item: any
  try {
    item = await getClassifiedById(id)
  } catch (error) {
    notFound()
  }

  if (!item) {
    notFound()
  }

  const primaryImage = item.media?.find((m: any) => m.is_primary)?.file || item.media?.[0]?.file;
  const conditionMap: Record<string, string> = {
    'NEW': 'নতুন',
    'LIKE_NEW': 'তুলাদণ্ডে নতুন',
    'GOOD': 'ভালো',
    'FAIR': 'মোটামুটি',
    'POOR': 'খারাপ',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white py-8">
        <div className="container">
          <Link href="/classifieds" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব বিজ্ঞাপন দেখুন
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-purple-500/30 text-purple-100 px-3 py-1 rounded-full text-sm font-medium">
              {item.category?.nameBn || item.category?.name || 'সাধারণ'}
            </span>
            {item.condition && (
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                {conditionMap[item.condition] || item.condition}
              </span>
            )}
            {item.status === 'SOLD' && (
              <span className="bg-red-500/30 text-red-100 px-3 py-1 rounded-full text-sm font-medium">
                বিক্রিত
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{item.titleBn || item.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {item.location || item.area || 'ওমান'}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatRelativeTime(item.createdAt || item.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="aspect-video bg-slate-100 relative group flex items-center justify-center">
                {primaryImage ? (
                  <img 
                    src={getMediaUrl(primaryImage)} 
                    alt={item.titleBn || item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 flex flex-col items-center">
                    <Tag className="h-16 w-16 mb-2 opacity-50" />
                    <span>কোনো ছবি নেই</span>
                  </div>
                )}
              </div>
              {/* Thumbnail Gallery */}
              {item.media && item.media.length > 1 && (
                <div className="p-4 flex gap-4 overflow-x-auto bg-slate-50 border-t">
                  {item.media.map((mediaItem: any, idx: number) => (
                    <div key={idx} className={`w-20 h-20 rounded-md overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${mediaItem.is_primary ? 'border-purple-600' : 'border-transparent hover:border-purple-300'}`}>
                      <img 
                        src={getMediaUrl(mediaItem.file)} 
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Info className="h-5 w-5 text-purple-600" />
                  বিবরণ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-slate-600">
                  {(item.descriptionBn || item.description || '').split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="mb-4 last:mb-0 whitespace-pre-line leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-2 border-purple-100 bg-purple-50/50">
              <CardContent className="pt-6 text-center space-y-2">
                <p className="text-sm text-purple-600 font-medium">মূল্য</p>
                <p className="text-4xl font-bold text-slate-800">
                  {item.currency || 'OMR'} {item.price ? Number(item.price).toLocaleString() : 'আলোচনা সাপেক্ষে'}
                </p>
                {item.isNegotiable && (
                  <p className="text-sm text-slate-500 mt-2 flex items-center justify-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" /> আলোচনাসাপেক্ষ
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Seller & Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">বিক্রেতার তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xl">
                    {item.author?.name ? item.author.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{item.author?.name || 'অজ্ঞাত বিক্রেতা'}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5 text-green-500" /> যাচাইকৃত মেম্বার
                    </p>
                  </div>
                </div>

                <hr className="my-2" />

                <div className="space-y-3 pt-2">
                  {item.contactPhone && (
                    <a href={`tel:${item.contactPhone}`} className="block">
                      <Button variant="outline" className="w-full justify-start py-6 text-base border-purple-200 hover:bg-purple-50 hover:text-purple-700">
                        <Phone className="h-5 w-5 mr-3 text-purple-600" />
                        {item.contactPhone}
                      </Button>
                    </a>
                  )}
                  {item.contactWhatsapp && (
                    <a href={`https://wa.me/${item.contactWhatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base">
                        <MessageSquare className="h-5 w-5 mr-3" />
                        WhatsApp-এ মেসেজ দিন
                      </Button>
                    </a>
                  )}
                  
                  {!item.contactPhone && !item.contactWhatsapp && (
                    <Button disabled className="w-full py-6 text-base">
                      কোনো যোগাযোগ তথ্য নেই
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-orange-50 border-orange-100">
              <CardContent className="pt-6 space-y-3 text-sm">
                <div className="flex gap-2 text-orange-800 font-semibold mb-2">
                  <Shield className="h-5 w-5 shrink-0" />
                  নিরাপত্তা টিপস
                </div>
                <ul className="space-y-2 text-orange-700/80 list-disc pl-5">
                  <li>সামনাসামনি দেখা করে জিনিস কিনুন।</li>
                  <li>অগ্রিম কোনো টাকা পাঠাবেন না।</li>
                  <li>জিনিসটি ভালোভাবে চেক করে নিন।</li>
                  <li>নির্জন স্থানে দেখা করতে যাবেন না।</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
