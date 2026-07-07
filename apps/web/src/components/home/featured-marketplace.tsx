import Link from 'next/link';
import { Tag, DollarSign, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const items = [
  {
    id: 1,
    title: 'স্যামসাং ফ্রিজ বিক্রয়',
    category: 'গৃহস্থালী সামগ্রী',
    price: 29750,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500',
    condition: 'ভালো',
    location: 'মাস্কাট, আল খুয়াইর',
    negotiable: true,
  },
  {
    id: 2,
    title: 'আইফোন ১৩ প্রো',
    category: 'মোবাইল',
    price: 98000,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500',
    condition: 'প্রায় নতুন',
    location: 'মাস্কাট, রুয়ি',
    negotiable: false,
  },
  {
    id: 3,
    title: 'সোফা সেট (৫ সিটার)',
    category: 'ফার্নিচার',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    condition: 'ভালো',
    location: 'মাস্কাট, আল মাবেলা',
    negotiable: true,
  },
];

export function FeaturedMarketplace() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">মার্কেট</h2>
            <p className="text-muted-foreground">কিনুন, বিক্রি করুন সহজেই</p>
          </div>
          <Link href="/classifieds">
            <Button variant="outline" className="gap-2">
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/classifieds/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </div>
                  {item.negotiable && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                      দর আলোচনা সাপেক্ষ
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Tag className="h-4 w-4" />
                    <span>অবস্থা: {item.condition}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-1 text-orange-600 font-bold text-xl">
                      ৳ {item.price.toLocaleString('bn-BD')}
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
