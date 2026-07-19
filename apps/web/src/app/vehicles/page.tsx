export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Car, MapPin, Gauge, Calendar } from 'lucide-react'
import Link from 'next/link'

import { getVehicles } from '@/lib/api'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export default async function VehiclesPage() {
  const data = await getVehicles();
  const vehicles = Array.isArray(data) ? data : data.results || [];
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">গাড়ি কিনুন ও বিক্রি করুন</h1>
          <div className="bg-white rounded-lg p-2 flex gap-2">
            <Input
              type="text"
              placeholder="ব্র্যান্ড, মডেল বা কীওয়ার্ড..."
              className="border-0 text-gray-900"
            />
            <select className="border-0 bg-white text-gray-900 rounded px-3">
              <option>সব ব্র্যান্ড</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Nissan</option>
              <option>Hyundai</option>
            </select>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Search className="h-5 w-5 mr-2" />
              খুঁজুন
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">{vehicles.length}টি গাড়ি পাওয়া গেছে</p>
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>সর্বশেষ</option>
            <option>দাম: নিম্ন থেকে উচ্চ</option>
            <option>দাম: উচ্চ থেকে নিম্ন</option>
            <option>বছর: নতুন থেকে পুরাতন</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle: any) => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
              <div className="relative h-48 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center overflow-hidden">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img src={getMediaUrl(vehicle.images[0])} alt={vehicle.titleBn || vehicle.title} className="w-full h-full object-cover" />
                ) : (
                  <Car className="h-16 w-16 text-muted-foreground/30" />
                )}
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg">{vehicle.titleBn || vehicle.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {vehicle.city}, {vehicle.area}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{vehicle.mileage ? vehicle.mileage.toLocaleString() : 0} km</span>
                  </div>
                </div>
                <div className="text-sm"><span className="font-medium">রঙ:</span> {vehicle.color || 'N/A'}</div>
                <div className="text-sm"><span className="font-medium">অবস্থা:</span> {vehicle.condition || 'N/A'}</div>
                <div className="text-2xl font-bold text-orange-600">
                  {vehicle.price ? vehicle.price.toLocaleString() : 0} {vehicle.currency || 'রিয়াল'}
                </div>
                <div className="text-xs text-muted-foreground">{formatRelativeTime(vehicle.createdAt || vehicle.created_at)}</div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/vehicles/${vehicle.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">বিস্তারিত</Button>
                </Link>
                <Button className="flex-1">যোগাযোগ</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
