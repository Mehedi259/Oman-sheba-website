'use client';

export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MapPin, Trash2, ExternalLink, Briefcase, Home, Car, Wrench, Tag } from 'lucide-react';
import Link from 'next/link';
import { getFavorites, removeFavorite } from '@/lib/api';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/components/ui/use-toast';

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      if (Array.isArray(data)) {
        setFavorites(data);
      }
    } catch (err) {
      console.error('Error fetching favorites', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter(f => f.id !== id));
      toast({ title: 'সফল', description: 'পছন্দের তালিকা থেকে মুছে ফেলা হয়েছে।' });
    } catch (err) {
      toast({ title: 'ত্রুটি', description: 'মুছে ফেলতে সমস্যা হয়েছে।', variant: 'destructive' });
    }
  };

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(f => f.favorite_type === filter);

  const getCategoryName = (type: string) => {
    const map: Record<string, string> = {
      'job': 'চাকরি',
      'property': 'প্রপার্টি',
      'vehicle': 'গাড়ি',
      'service': 'সেবা',
      'classified': 'মার্কেট',
    };
    return map[type] || type;
  };

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
        {!isAuthenticated ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">লগইন প্রয়োজন</h3>
              <p className="text-muted-foreground mb-4">
                পছন্দের তালিকা দেখতে অনুগ্রহ করে লগইন করুন।
              </p>
            </CardContent>
          </Card>
        ) : loading ? (
          <div className="text-center py-16 text-muted-foreground">লোড হচ্ছে...</div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>সব ({favorites.length})</Button>
              <Button variant={filter === 'job' ? 'default' : 'outline'} onClick={() => setFilter('job')}>চাকরি</Button>
              <Button variant={filter === 'property' ? 'default' : 'outline'} onClick={() => setFilter('property')}>প্রপার্টি</Button>
              <Button variant={filter === 'vehicle' ? 'default' : 'outline'} onClick={() => setFilter('vehicle')}>গাড়ি</Button>
              <Button variant={filter === 'service' ? 'default' : 'outline'} onClick={() => setFilter('service')}>সেবা</Button>
              <Button variant={filter === 'classified' ? 'default' : 'outline'} onClick={() => setFilter('classified')}>মার্কেট</Button>
            </div>

            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((item) => {
                  const details = item.item_details;
                  if (!details) return null; // Skip if item was deleted
                  
                  return (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow group flex flex-col h-full">
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-6xl">{details.icon}</span>
                        <div className="absolute top-2 right-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => handleRemove(item.id)}
                            className="rounded-full bg-white/90 hover:bg-red-100"
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          {getCategoryName(item.favorite_type)}
                        </div>
                      </div>
                      <CardHeader>
                        <h3 className="font-bold text-lg line-clamp-1">{details.title_bn || details.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{details.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-2 flex-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {details.location || 'অজানা স্থান'}
                        </div>
                        {details.price && <p className="text-lg font-bold text-primary">{details.price} রিয়াল</p>}
                        <p className="text-xs text-muted-foreground">সংরক্ষিত: {new Date(item.created_at).toLocaleDateString()}</p>
                      </CardContent>
                      <CardFooter className="flex gap-2 mt-auto">
                        <Button className="flex-1" asChild>
                          <Link href={`/${item.favorite_type}s/${item.favorite_id}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            দেখুন
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleRemove(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="py-16">
                <CardContent className="text-center">
                  <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
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
          </>
        )}
      </div>
    </div>
  );
}
