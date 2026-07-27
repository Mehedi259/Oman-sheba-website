import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Shield, Heart, Flame, Building } from 'lucide-react'

const emergencyContacts = [
  {
    id: 1,
    nameBn: 'রয়্যাল ওমান পুলিশ',
    phone: '9999',
    icon: Shield,
    color: 'bg-blue-100 text-blue-600',
    borderColor: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300'
  },
  {
    id: 2,
    nameBn: 'অ্যাম্বুলেন্স সেবা',
    phone: '9999',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    borderColor: 'border-red-100',
    hoverBorder: 'hover:border-red-300'
  },
  {
    id: 3,
    nameBn: 'ফায়ার সার্ভিস',
    phone: '9999',
    icon: Flame,
    color: 'bg-orange-100 text-orange-600',
    borderColor: 'border-orange-100',
    hoverBorder: 'hover:border-orange-300'
  },
  {
    id: 4,
    nameBn: 'বাংলাদেশ দূতাবাস',
    phone: '+968 2469 8989',
    alternatePhone: '+968 2469 7373',
    icon: Building,
    color: 'bg-green-100 text-green-700',
    borderColor: 'border-green-100',
    hoverBorder: 'hover:border-green-300'
  },
]

export function EmergencyContacts() {
  return (
    <section className="py-12 md:py-16 bg-red-50 dark:bg-red-950/20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-red-700 dark:text-red-500">জরুরী যোগাযোগ</h2>
          <p className="text-muted-foreground">জরুরী প্রয়োজনে দ্রুত যোগাযোগ করুন</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon;

            return (
              <Card key={contact.id} className={`bg-white dark:bg-gray-800 hover:shadow-lg transition-all hover:-translate-y-1 border-2 ${contact.borderColor} ${contact.hoverBorder}`}>
                <CardHeader className="text-center p-3 sm:p-6 pb-2">
                  <div className={`mx-auto mb-2 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full ${contact.color}`}>
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <CardTitle className="text-sm sm:text-lg font-bold">{contact.nameBn}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <div className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{contact.phone}</div>
                    {contact.alternatePhone && (
                      <div className="text-sm text-muted-foreground font-medium">
                        অথবা: {contact.alternatePhone}
                      </div>
                    )}
                  </div>
                  <a href={`tel:${contact.phone}`} className="block w-full">
                    <Button className="w-full font-bold" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      কল করুন
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}
