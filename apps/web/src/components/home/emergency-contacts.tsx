import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Shield, Heart, Building, AlertCircle } from 'lucide-react'
import { getEmergencyContacts } from '@/lib/api'

const iconMap: Record<string, any> = {
  'Police': Shield,
  'Medical': Heart,
  'Fire': AlertCircle,
  'Embassy': Building,
};

export async function EmergencyContacts() {
  const contacts = await getEmergencyContacts();
  return (
    <section className="py-16 bg-red-50 dark:bg-red-950/20">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-red-700 dark:text-red-500">জরুরী যোগাযোগ</h2>
          <p className="text-muted-foreground">জরুরী প্রয়োজনে দ্রুত যোগাযোগ করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact: any) => {
            const Icon = iconMap[contact.category] || Phone;
            const colorClass = contact.category === 'Police' ? 'text-blue-600' :
                             contact.category === 'Medical' ? 'text-red-600' :
                             contact.category === 'Fire' ? 'text-orange-600' :
                             'text-green-600';
            
            return (
              <Card key={contact.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-2 ${colorClass}`}>
                    <Icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-lg">{contact.nameBn}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-3xl font-bold">{contact.phone}</div>
                  {contact.alternatePhone && (
                    <div className="text-sm text-muted-foreground">
                      অথবা: {contact.alternatePhone}
                    </div>
                  )}
                  <a href={`tel:${contact.phone}`}>
                    <Button className="w-full" variant="outline">
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
