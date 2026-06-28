import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Shield, Heart, Building } from 'lucide-react'

const emergencyContacts = [
  { name: 'পুলিশ', number: '9999', icon: Shield, color: 'text-blue-600' },
  { name: 'অ্যাম্বুলেন্স', number: '9999', icon: Heart, color: 'text-red-600' },
  { name: 'ফায়ার সার্ভিস', number: '9999', icon: Shield, color: 'text-orange-600' },
  { name: 'বাংলাদেশ দূতাবাস', number: '24698969', icon: Building, color: 'text-green-600' }
]

export function EmergencyContacts() {
  return (
    <section className="py-16 bg-red-50 dark:bg-red-950/20">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-red-700 dark:text-red-500">জরুরী যোগাযোগ</h2>
          <p className="text-muted-foreground">জরুরী প্রয়োজনে দ্রুত যোগাযোগ করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon
            return (
              <Card key={contact.name} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-2 ${contact.color}`}>
                    <Icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-3xl font-bold">{contact.number}</div>
                  <a href={`tel:${contact.number}`}>
                    <Button className="w-full" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      কল করুন
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
