import Link from 'next/link';
import { Car, MapPin, DollarSign, ArrowRight, Gauge, Fuel } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const vehicles = [
  {
    id: 1,
    title: 'Toyota Corolla 2020',
    titleBn: 'টয়োটা করোলা ২০২০',
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    price: 1225000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    mileage: 45000,
    transmission: 'অটোমেটিক',
    fuelType: 'পেট্রোল',
    condition: 'ব্যবহৃত - ভালো',
  },
  {
    id: 2,
    title: 'Nissan Patrol 2019',
    titleBn: 'নিসান প্যাট্রল ২০১৯',
    make: 'Nissan',
    model: 'Patrol',
    year: 2019,
    price: 2975000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500',
    mileage: 60000,
    transmission: 'অটোমেটিক',
    fuelType: 'পেট্রোল',
    condition: 'ব্যবহৃত - ভালো',
  },
  {
    id: 3,
    title: 'Honda Civic 2021',
    titleBn: 'হন্ডা সিভিক ২০২১',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 1470000,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500',
    mileage: 35000,
    transmission: 'অটোমেটিক',
    fuelType: 'পেট্রোল',
    condition: 'প্রায় নতুন',
  },
];

export function FeaturedVehicles() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">গাড়ি কিনুন বা বিক্রি করুন</h2>
            <p className="text-muted-foreground">সেরা দামে গাড়ি খুঁজুন</p>
          </div>
          <Link href="/vehicles">
            <Button variant="outline" className="gap-2">
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.titleBn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {vehicle.year}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                    {vehicle.titleBn}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      {vehicle.mileage.toLocaleString()} কিমি
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      {vehicle.fuelType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Car className="h-4 w-4" />
                    <span>{vehicle.transmission}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-1 text-purple-600 font-bold text-xl">
                      ৳ {vehicle.price.toLocaleString('bn-BD')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
