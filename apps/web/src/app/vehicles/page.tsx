import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Car, MapPin, Gauge, Calendar } from 'lucide-react'
import Link from 'next/link'

const vehicles = [
  {
    id: '1',
    title: 'টয়োটা ক্যামরি ২০২০',
    price: 'OMR 6,500',
    type: 'বিক্রয়',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: '45,000',
    color: 'সাদা',
    condition: 'চমৎকার',
    location: 'মাস্কাট',
    posted: '২ দিন আগে'
  },
  {
    id: '2',
    title: 'হোন্ডা সিভিক ২০১৮',
    price: 'OMR 4,800',
    type: 'বিক্রয়',
    make: 'Honda',
    model: 'Civic',
    year: 2018,
    mileage: '68,000',
    color: 'কালো',
    condition: 'ভালো',
    location: 'মাস্কাট',
    posted: '৪ দিন আগে'
  },
  {
    id: '3',
    title: 'নিসান এক্স-ট্রেইল ২০১৯',
    price: 'OMR 5,200',
    type: 'বিক্রয়',
    make: 'Nissan',
    model: 'X-Trail',
    year: 2019,
    mileage: '52,000',
    color: 'ধূসর',
    condition: 'চমৎকার',
    location: 'সোহার',
    posted: '১ সপ্তাহ আগে'
  },
  {
    id: '4',
    title: 'হুন্ডাই এলান্ট্রা ২০২১',
    price: 'OMR 7,200',
    type: 'বিক্রয়',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2021,
    mileage: '28,000',
    color: 'লাল',
    condition: 'নতুনের মতো',
    location: 'মাস্কাট',
    posted: '৩ দিন আগে'
  }
]

export default function VehiclesPage() {
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
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
              <div className="relative h-48 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                <Car className="h-16 w-16 text-muted-foreground/30" />
              </div>
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg">{vehicle.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {vehicle.location}
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
                    <span>{vehicle.mileage} km</span>
                  </div>
                </div>
                <div className="text-sm"><span className="font-medium">রঙ:</span> {vehicle.color}</div>
                <div className="text-sm"><span className="font-medium">অবস্থা:</span> {vehicle.condition}</div>
                <div className="text-2xl font-bold text-orange-600">{vehicle.price}</div>
                <div className="text-xs text-muted-foreground">{vehicle.posted}</div>
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
