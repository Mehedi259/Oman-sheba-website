import Link from 'next/link';
import { Car, MapPin, DollarSign, ArrowRight, Gauge, Fuel } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getFeaturedVehicles } from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';

export async function FeaturedVehicles() {
  const vehicles = await getFeaturedVehicles(3);
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container">
        <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">গাড়ি কিনুন বা বিক্রি করুন</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">সেরা দামে গাড়ি খুঁজুন</p>
          </div>
          <Link href="/vehicles" className="shrink-0 mt-1 sm:mt-0">
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
              সব দেখুন <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {vehicles.map((vehicle: any) => (
            <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
                <div className="relative h-28 sm:h-48 bg-muted overflow-hidden shrink-0">
                  <img
                    src={getMediaUrl(vehicle.images?.[0]) || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'}
                    alt={vehicle.title_bn || vehicle.titleBn || vehicle.title || 'গাড়ি'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-purple-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                    {vehicle.year}
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-xs sm:text-lg mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
                    {vehicle.title_bn || vehicle.titleBn || vehicle.title || 'গাড়ি'}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-sm text-muted-foreground mb-1 sm:mb-3">
                    <span className="flex items-center gap-1">
                      <Gauge className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="line-clamp-1">{vehicle.mileage ? vehicle.mileage.toLocaleString() : 0} কিমি</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="line-clamp-1">{vehicle.fuelType || vehicle.fuel_type || 'N/A'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    <Car className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{vehicle.transmission || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t mt-auto">
                    <div className="flex items-center gap-1 text-purple-600 font-bold text-sm sm:text-xl line-clamp-1">
                      {vehicle.price ? vehicle.price.toLocaleString() : 0} {vehicle.currency || 'রিয়াল'}
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
