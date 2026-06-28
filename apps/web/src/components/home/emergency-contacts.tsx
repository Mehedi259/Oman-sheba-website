import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { getEmergencyContacts } from '@/lib/api'

// Colorful flat icon per emergency category
const iconMap: Record<string, string> = {
  'Police': '/icons/emergency/police.svg',
  'Medical': '/icons/emergency/medical.svg',
  'Fire': '/icons/emergency/fire.svg',
  'Embassy': '/icons/emergency/embassy.svg',
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
            const iconSrc = iconMap[contact.category];

            return (
              <Card key={contact.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center">
                    {iconSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={iconSrc} alt="" className="h-12 w-12" />
                    ) : (
                      <Phone className="h-12 w-12 text-red-600" />
                    )}
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
