import Link from 'next/link';
import { Tag, DollarSign, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getFeaturedClassifieds } from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';

export async function FeaturedMarketplace() {
  const items = await getFeaturedClassifieds(3);
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container">
        <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">মার্কেট</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">কিনুন, বিক্রি করুন সহজেই</p>
          </div>
          <Link href="/classifieds" className="shrink-0 mt-1 sm:mt-0">
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
              সব দেখুন <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {items.map((item: any) => (
            <Link key={item.id} href={`/classifieds/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
                <div className="relative h-28 sm:h-48 bg-muted overflow-hidden shrink-0">
                  <img
                    src={getMediaUrl(item.images?.[0]) || 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500'}
                    alt={item.title_bn || item.titleBn || item.title || 'পণ্য'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                    {item.category?.nameBn || item.category?.name || 'সাধারণ'}
                  </div>
                  {item.price_negotiable && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-medium">
                      দর আলোচনা সাপেক্ষ
                    </div>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {item.title_bn || item.titleBn || item.title || 'পণ্য'}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-muted-foreground mb-1.5 sm:mb-3">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="line-clamp-1">অবস্থা: {item.condition || 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="line-clamp-1">{item.city}{item.area ? `, ${item.area}` : ''}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t mt-auto">
                    <div className="flex items-center gap-1 text-orange-600 font-bold text-sm sm:text-xl line-clamp-1">
                      {item.price ? item.price.toLocaleString() : 0} {item.currency || 'রিয়াল'}
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
