'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, Briefcase, Home, Car, Wrench, Tag } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'সব', icon: Search },
    { id: 'jobs', name: 'চাকরি', icon: Briefcase },
    { id: 'properties', name: 'প্রপার্টি', icon: Home },
    { id: 'vehicles', name: 'গাড়ি', icon: Car },
    { id: 'services', name: 'সেবা', icon: Wrench },
    { id: 'classifieds', name: 'ক্লাসিফাইড', icon: Tag },
  ];

  const mockResults = [
    {
      id: 1,
      type: 'job',
      title: 'সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার',
      description: 'টেক সলিউশন্স ওমান',
      location: 'মাস্কাট',
      price: '800-1200 OMR',
      icon: '💼',
    },
    {
      id: 2,
      type: 'property',
      title: '২ বেডরুম অ্যাপার্টমেন্ট',
      description: 'আল খুয়াইর',
      location: 'মাস্কাট',
      price: '350 OMR/মাসিক',
      icon: '🏠',
    },
    {
      id: 3,
      type: 'vehicle',
      title: 'Toyota Corolla 2020',
      description: 'চমৎকার অবস্থায়',
      location: 'মাস্কাট',
      price: '5500 OMR',
      icon: '🚗',
    },
  ];

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
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="চাকরি, বাসা, গাড়ি বা সেবা খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-black text-lg"
              />
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
              {mockResults.length} টি ফলাফল পাওয়া গেছে
            </p>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            ফিল্টার
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResults.map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-6xl">{result.icon}</span>
              </div>
              <CardHeader>
                <h3 className="font-bold text-lg">{result.title}</h3>
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {result.location}
                </div>
                <p className="text-xl font-bold text-primary">{result.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">বিস্তারিত দেখুন</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
