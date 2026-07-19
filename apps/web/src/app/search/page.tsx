'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, Briefcase, Home, Car, Wrench, Tag } from 'lucide-react';
import Link from 'next/link';
import { getGlobalSearch } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'সব', icon: Search },
    { id: 'job', name: 'চাকরি', icon: Briefcase },
    { id: 'property', name: 'প্রপার্টি', icon: Home },
    { id: 'vehicle', name: 'গাড়ি', icon: Car },
    { id: 'service', name: 'সেবা', icon: Wrench },
    { id: 'classified', name: 'মার্কেট', icon: Tag },
  ];

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const data = await getGlobalSearch(query);
      setResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(r => r.type === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">সার্চ করুন</h1>
            <p className="text-xl mb-8 text-blue-100">
              আপনার প্রয়োজনীয় সব কিছু এক জায়গায়
            </p>
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="চাকরি, বাসা, গাড়ি বা সেবা খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-12 h-14 bg-white text-black text-lg w-full"
                />
              </div>
              <Button 
                onClick={() => handleSearch(searchQuery)} 
                className="h-14 px-8 text-lg bg-black hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? 'খুঁজছে...' : 'খুঁজুন'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">সার্চ ফলাফল</h2>
            <p className="text-muted-foreground">
              {filteredResults.length} টি ফলাফল পাওয়া গেছে
            </p>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result, i) => (
              <Card key={`${result.id}-${i}`} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0">
                  <span className="text-6xl">{result.icon}</span>
                </div>
                <CardHeader>
                  <h3 className="font-bold text-lg line-clamp-1">{result.title_bn || result.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    {result.location || 'অজানা স্থান'}
                  </div>
                  {result.price && <p className="text-xl font-bold text-primary">{result.price} রিয়াল</p>}
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full" asChild>
                    <Link href={`/${result.type}s/${result.id}`}>বিস্তারিত দেখুন</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">কোন ফলাফল পাওয়া যায়নি</h3>
            <p className="text-muted-foreground">অন্য কোন শব্দ দিয়ে আবার চেষ্টা করুন</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>}>
      <SearchContent />
    </Suspense>
  );
}
