export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  MapPin,
  Clock,
  Tag,
  Smartphone,
  Laptop,
  Home as HomeIcon,
  Shirt,
  Baby,
  Wrench,
  BookOpen,
  Heart
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'ইলেকট্রনিক্স', icon: Smartphone, count: 234, color: 'text-blue-600' },
  { id: 2, name: 'কম্পিউটার', icon: Laptop, count: 156, color: 'text-purple-600' },
  { id: 3, name: 'ফার্নিচার', icon: HomeIcon, count: 189, color: 'text-green-600' },
  { id: 4, name: 'পোশাক', icon: Shirt, count: 278, color: 'text-pink-600' },
  { id: 5, name: 'শিশু সামগ্রী', icon: Baby, count: 145, color: 'text-yellow-600' },
  { id: 6, name: 'যন্ত্রপাতি', icon: Wrench, count: 98, color: 'text-orange-600' },
  { id: 7, name: 'বই', icon: BookOpen, count: 167, color: 'text-indigo-600' },
  { id: 8, name: 'অন্যান্য', icon: Heart, count: 234, color: 'text-red-600' },
];

import { getClassifieds } from '@/lib/api';
import { formatRelativeTime, getMediaUrl } from '@/lib/utils';

export default async function ClassifiedsPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const data = await getClassifieds({
    search: searchParams.search,
    category: searchParams.category,
    sort: searchParams.sort,
  });
  
  const listings = Array.isArray(data) ? data : data.results || [];
  
  const buildUrl = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as any);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    return `/classifieds?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">মার্কেট</h1>
            <p className="text-xl mb-8 text-green-100">
              কিনুন, বিক্রি করুন এবং বিনিময় করুন
            </p>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <form action="/classifieds" method="GET" className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  defaultValue={searchParams.search || ''}
                  placeholder="পণ্য খুঁজুন..."
                  className="pl-10 h-12 bg-white text-black w-full"
                />
                {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
                {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
              </form>
              <Link href="/post/create?type=classified">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 h-12">
                  <Plus className="mr-2 h-5 w-5" />
                  বিজ্ঞাপন দিন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = searchParams.category === category.id.toString();
              return (
                <Link
                  key={category.id}
                  href={buildUrl({ category: category.id.toString() })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${isActive ? 'bg-muted ring-2 ring-primary' : 'hover:bg-muted'}`}
                >
                  <Icon className={`h-8 w-8 ${category.color}`} />
                  <span className="text-sm font-medium text-center">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">সর্বশেষ বিজ্ঞাপন</h2>
            <p className="text-muted-foreground">মোট {listings.length} টি বিজ্ঞাপন পাওয়া গেছে</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={buildUrl({ sort: '-created_at' })}>
              <Button variant={searchParams.sort === '-created_at' || !searchParams.sort ? 'default' : 'outline'} size="sm">সর্বশেষ</Button>
            </Link>
            <Link href={buildUrl({ sort: 'price' })}>
              <Button variant={searchParams.sort === 'price' ? 'default' : 'outline'} size="sm">কম দাম</Button>
            </Link>
            <Link href={buildUrl({ sort: '-price' })}>
              <Button variant={searchParams.sort === '-price' ? 'default' : 'outline'} size="sm">বেশি দাম</Button>
            </Link>
            {(searchParams.search || searchParams.category || searchParams.sort) && (
              <Link href="/classifieds">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">ফিল্টার মুছুন</Button>
              </Link>
            )}
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-6xl mb-4 block">🛒</span>
            <h3 className="text-xl font-semibold mb-2">কোনো বিজ্ঞাপন পাওয়া যায়নি</h3>
            <p>আপনার খোঁজার মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item: any) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getMediaUrl(item.images[0])} alt={item.titleBn || item.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl">🛒</span>
                  )}
                  {item.price_negotiable && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      দরদাম সম্ভব
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {item.condition || 'N/A'}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <Link href={`/classifieds/${item.id}`}>
                    <h3 className="font-bold text-lg hover:text-primary cursor-pointer line-clamp-1">
                      {item.titleBn || item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold text-primary">
                      {item.price ? item.price.toLocaleString() : 0} {item.currency || 'রিয়াল'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="h-4 w-4 mr-2" />
                    {item.category?.nameBn || item.category?.name || 'সাধারণ'}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.city}{item.area ? `, ${item.area}` : ''}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatRelativeTime(item.createdAt || item.created_at)}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/classifieds/${item.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">বিস্তারিত</Button>
                  </Link>
                  <Button className="flex-1">যোগাযোগ</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination - Mocked for now */}
        {listings.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button variant="outline" disabled>পূর্ববর্তী</Button>
            <Button>১</Button>
            <Button variant="outline" disabled>পরবর্তী</Button>
          </div>
        )}
      </div>
    </div>
  );
}
