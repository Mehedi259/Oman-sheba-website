import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MapPin, Briefcase, Home, Car, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const favorites = [
  {
    id: 1,
    type: 'job',
    title: 'সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার',
    company: 'টেক সলিউশন্স ওমান',
    location: 'মাস্কাট',
    price: '৳ ২৮০,০০০-৪২০,০০০',
    saved: '২ দিন আগে',
    icon: '💼',
    category: 'চাকরি',
  },
  {
    id: 2,
    type: 'property',
    title: '২ বেডরুম অ্যাপার্টমেন্ট',
    company: 'আল খুয়াইর',
    location: 'মাস্কাট',
    price: '৳ ১২২,৫০০/মাসিক',
    saved: '৫ দিন আগে',
    icon: '🏠',
    category: 'প্রপার্টি',
  },
  {
    id: 3,
    type: 'vehicle',
    title: 'Toyota Corolla 2020',
    company: 'চমৎকার অবস্থায়',
    location: 'মাস্কাট',
    price: '৳ ১৯,২৫,০০০',
    saved: '১ সপ্তাহ আগে',
    icon: '🚗',
    category: 'গাড়ি',
  },
  {
    id: 4,
    type: 'service',
    title: 'আল নূর মেডিকেল সেন্টার',
    company: 'স্বাস্থ্যসেবা',
    location: 'মাস্কাট, আল খুয়াইর',
    price: 'রেটিং: 4.5/5',
    saved: '৩ দিন আগে',
    icon: '🏥',
    category: 'সেবা',
  },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">পছন্দের তালিকা</h1>
              <p className="text-pink-100">আপনার সংরক্ষিত আইটেম ({favorites.length})</p>
            </div>
            <Heart className="h-16 w-16 opacity-50 fill-white" />
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="default">সব ({favorites.length})</Button>
          <Button variant="outline">চাকরি</Button>
          <Button variant="outline">প্রপার্টি</Button>
          <Button variant="outline">গাড়ি</Button>
          <Button variant="outline">সেবা</Button>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow group">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{item.icon}</span>
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/90 hover:bg-red-100"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                <CardHeader>
                  <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.location}
                  </div>
                  <p className="text-lg font-bold text-primary">{item.price}</p>
                  <p className="text-xs text-muted-foreground">সংরক্ষিত: {item.saved}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link href={`/${item.type}s/${item.id}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      দেখুন
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-16">
            <CardContent className="text-center">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">কোন পছন্দের আইটেম নেই</h3>
              <p className="text-muted-foreground mb-4">
                আপনার পছন্দের আইটেম এখানে সংরক্ষিত থাকবে
              </p>
              <Button asChild>
                <Link href="/">ব্রাউজ শুরু করুন</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
