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

const listings = [
  {
    id: 1,
    title: 'iPhone 13 Pro - চমৎকার অবস্থায়',
    titleBn: 'iPhone 13 Pro - চমৎকার অবস্থায়',
    price: 280,
    currency: 'OMR',
    category: 'ইলেকট্রনিক্স',
    location: 'মাস্কাট, আল খুয়াইর',
    condition: 'ব্যবহৃত - ভাল',
    posted: '২ ঘন্টা আগে',
    image: '📱',
    negotiable: true,
  },
  {
    id: 2,
    title: 'Dell Laptop i7 16GB RAM',
    titleBn: 'Dell ল্যাপটপ i7 16GB RAM',
    price: 180,
    currency: 'OMR',
    category: 'কম্পিউটার',
    location: 'মাস্কাট, রুয়ি',
    condition: 'ব্যবহৃত - ভাল',
    posted: '৫ ঘন্টা আগে',
    image: '💻',
    negotiable: true,
  },
  {
    id: 3,
    title: 'সোফা সেট - ৩ পিস',
    titleBn: 'সোফা সেট - ৩ পিস',
    price: 120,
    currency: 'OMR',
    category: 'ফার্নিচার',
    location: 'মাস্কাট, বোশার',
    condition: 'নতুনের মত',
    posted: '১ দিন আগে',
    image: '🛋️',
    negotiable: true,
  },
  {
    id: 4,
    title: 'শিশুর খেলনা সেট',
    titleBn: 'শিশুর খেলনা সেট',
    price: 15,
    currency: 'OMR',
    category: 'শিশু সামগ্রী',
    location: 'সোহার',
    condition: 'নতুন',
    posted: '২ দিন আগে',
    image: '🧸',
    negotiable: false,
  },
  {
    id: 5,
    title: 'Samsung Smart TV 55 inch',
    titleBn: 'Samsung Smart TV 55 inch',
    price: 200,
    currency: 'OMR',
    category: 'ইলেকট্রনিক্স',
    location: 'মাস্কাট, কুরুম',
    condition: 'ব্যবহৃত - চমৎকার',
    posted: '৩ দিন আগে',
    image: '📺',
    negotiable: true,
  },
  {
    id: 6,
    title: 'ডাইনিং টেবিল সেট',
    titleBn: 'ডাইনিং টেবিল সেট',
    price: 80,
    currency: 'OMR',
    category: 'ফার্নিচার',
    location: 'মাস্কাট, আল হাইল',
    condition: 'ব্যবহৃত - ভাল',
    posted: '৪ দিন আগে',
    image: '🪑',
    negotiable: true,
  },
];

export default function ClassifiedsPage() {
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
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="পণ্য খুঁজুন..."
                  className="pl-10 h-12 bg-white text-black"
                />
              </div>
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Plus className="mr-2 h-5 w-5" />
                বিজ্ঞাপন দিন
              </Button>
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
              return (
                <Link
                  key={category.id}
                  href={`/classifieds/category/${category.id}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">সর্বশেষ বিজ্ঞাপন</h2>
            <p className="text-muted-foreground">মোট {listings.length} টি বিজ্ঞাপন পাওয়া গেছে</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">সর্বশেষ</Button>
            <Button variant="outline" size="sm">কম দাম</Button>
            <Button variant="outline" size="sm">বেশি দাম</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-6xl">{item.image}</span>
                {item.negotiable && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    দরদাম সম্ভব
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  {item.condition}
                </div>
              </div>
              <CardHeader className="pb-3">
                <Link href={`/classifieds/${item.id}`}>
                  <h3 className="font-bold text-lg hover:text-primary cursor-pointer line-clamp-1">
                    {item.titleBn}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-primary">
                    {item.price} রিয়াল
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 mr-2" />
                  {item.category}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {item.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {item.posted}
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

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="outline">পূর্ববর্তী</Button>
          <Button variant="outline">১</Button>
          <Button>২</Button>
          <Button variant="outline">৩</Button>
          <Button variant="outline">পরবর্তী</Button>
        </div>
      </div>
    </div>
  );
}
