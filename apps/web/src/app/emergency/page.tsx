export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, AlertTriangle, Shield, Heart, Flame, Building, Anchor, Plane } from 'lucide-react'

const emergencyContacts = [
  {
    id: 1,
    name: 'রয়্যাল ওমান পুলিশ',
    nameEn: 'Royal Oman Police',
    phone: '9999',
    category: 'পুলিশ',
    icon: Shield,
    color: 'bg-blue-600',
    description: 'জরুরী পুলিশ সেবা, দুর্ঘটনা, চুরি, নিরাপত্তা সংক্রান্ত সমস্যা',
  },
  {
    id: 2,
    name: 'অ্যাম্বুলেন্স সেবা',
    nameEn: 'Ambulance Service',
    phone: '9999',
    category: 'চিকিৎসা',
    icon: Heart,
    color: 'bg-red-600',
    description: 'জরুরী চিকিৎসা সেবা, অ্যাম্বুলেন্স',
  },
  {
    id: 3,
    name: 'ফায়ার সার্ভিস',
    nameEn: 'Fire Service (Civil Defence)',
    phone: '9999',
    category: 'অগ্নি নির্বাপণ',
    icon: Flame,
    color: 'bg-orange-600',
    description: 'আগুন সংক্রান্ত জরুরী সেবা',
  },
  {
    id: 4,
    name: 'বাংলাদেশ দূতাবাস, মাস্কাট',
    nameEn: 'Bangladesh Embassy, Muscat',
    phone: '+968 2469 8989',
    alternatePhone: '+968 2469 7373',
    category: 'দূতাবাস',
    icon: Building,
    color: 'bg-green-700',
    description: 'পাসপোর্ট, ভিসা, কনসুলার সেবা, জরুরী সহায়তা',
  },
  {
    id: 5,
    name: 'কোস্ট গার্ড',
    nameEn: 'Coast Guard',
    phone: '1555',
    category: 'উদ্ধার',
    icon: Anchor,
    color: 'bg-cyan-700',
    description: 'সমুদ্রে জরুরী উদ্ধার সেবা',
  },
  {
    id: 6,
    name: 'বিমানবন্দর তথ্য',
    nameEn: 'Muscat International Airport',
    phone: '+968 2435 3333',
    category: 'বিমানবন্দর',
    icon: Plane,
    color: 'bg-indigo-600',
    description: 'ফ্লাইট তথ্য, বিমানবন্দর সেবা',
  },
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="h-10 w-10" />
            <h1 className="text-4xl font-bold">জরুরী নম্বরসমূহ</h1>
          </div>
          <p className="text-red-200 text-lg max-w-2xl">
            ওমানে জরুরী পরিস্থিতিতে সাহায্যের জন্য নিচের নম্বরগুলো ব্যবহার করুন। সকল নম্বর ২৪/৭ সক্রিয়।
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Emergency Call Banner */}
        <Card className="border-2 border-red-300 bg-red-50 mb-8">
          <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-4 rounded-full">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-800">জরুরী কল: 9999</h2>
                <p className="text-red-600">পুলিশ, অ্যাম্বুলেন্স, ফায়ার সার্ভিস — একটি নম্বরেই সব সেবা</p>
              </div>
            </div>
            <a href="tel:9999">
              <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                <Phone className="h-5 w-5 mr-2" />
                এখনই কল করুন
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon
            return (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`${contact.color} p-3 rounded-xl`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{contact.nameEn}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  <div className="space-y-2">
                    <a href={`tel:${contact.phone}`}>
                      <Button variant="outline" className="w-full justify-start text-lg font-semibold">
                        <Phone className="h-4 w-4 mr-2" />
                        {contact.phone}
                      </Button>
                    </a>
                    {contact.alternatePhone && (
                      <a href={`tel:${contact.alternatePhone}`}>
                        <Button variant="outline" className="w-full justify-start">
                          <Phone className="h-4 w-4 mr-2" />
                          {contact.alternatePhone}
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Important Tips */}
        <Card className="mt-8 border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              জরুরী পরিস্থিতিতে মনে রাখুন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                শান্ত থাকুন এবং পরিস্থিতি মূল্যায়ন করুন
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                ৯৯৯৯ নম্বরে কল করে আপনার অবস্থান জানান
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                আপনার পাসপোর্ট এবং আইডি কার্ড সবসময় সাথে রাখুন
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                বাংলাদেশ দূতাবাসের নম্বর সংরক্ষণ করে রাখুন
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
