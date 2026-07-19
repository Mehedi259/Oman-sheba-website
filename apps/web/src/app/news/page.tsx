export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Search, TrendingUp, Eye, Tag } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'ভিসা সংবাদ', count: 45 },
  { id: 2, name: 'চাকরি সংবাদ', count: 67 },
  { id: 3, name: 'দূতাবাস', count: 34 },
  { id: 4, name: 'ওমান সংবাদ', count: 89 },
  { id: 5, name: 'বাংলাদেশ সংবাদ', count: 56 },
];

const newsArticles = [
  {
    id: 1,
    title: 'ওমানে নতুন ওয়ার্ক ভিসা নিয়ম ২০২৬',
    titleBn: 'ওমানে নতুন ওয়ার্ক ভিসা নিয়ম ২০২৬',
    excerpt: 'শ্রম মন্ত্রণালয় নতুন ওয়ার্ক ভিসা নিয়ম ঘোষণা করেছে যা ২০২৬ সাল থেকে কার্যকর হবে...',
    category: 'ভিসা সংবাদ',
    date: '২৮ জুন, ২০২৬',
    views: 1234,
    featured: true,
    tags: ['ভিসা', 'নিয়ম', 'ওমান'],
  },
  {
    id: 2,
    title: 'বাংলাদেশ দূতাবাস নতুন সেবা চালু করেছে',
    titleBn: 'বাংলাদেশ দূতাবাস নতুন সেবা চালু করেছে',
    excerpt: 'মাস্কাটে বাংলাদেশ দূতাবাস অনলাইন পাসপোর্ট নবায়ন সেবা চালু করেছে...',
    category: 'দূতাবাস',
    date: '২৬ জুন, ২০২৬',
    views: 987,
    featured: true,
    tags: ['দূতাবাস', 'পাসপোর্ট', 'সেবা'],
  },
  {
    id: 3,
    title: 'মাস্কাটে নতুন চাকরির বাজার সম্প্রসারণ',
    titleBn: 'মাস্কাটে নতুন চাকরির বাজার সম্প্রসারণ',
    excerpt: 'বিভিন্ন সেক্টরে নতুন চাকরির সুযোগ তৈরি হচ্ছে মাস্কাট অঞ্চলে...',
    category: 'চাকরি সংবাদ',
    date: '২৫ জুন, ২০২৬',
    views: 756,
    featured: false,
    tags: ['চাকরি', 'মাস্কাট', 'সুযোগ'],
  },
  {
    id: 4,
    title: 'ওমান সরকারের নতুন স্বাস্থ্য বীমা নীতি',
    titleBn: 'ওমান সরকারের নতুন স্বাস্থ্য বীমা নীতি',
    excerpt: 'সকল প্রবাসীদের জন্য বাধ্যতামূলক স্বাস্থ্য বীমার নতুন নিয়ম আসছে...',
    category: 'ওমান সংবাদ',
    date: '২৪ জুন, ২০২৬',
    views: 1456,
    featured: false,
    tags: ['স্বাস্থ্য', 'বীমা', 'নীতি'],
  },
  {
    id: 5,
    title: 'বাংলাদেশ-ওমান বাণিজ্য সম্পর্ক আরও শক্তিশালী',
    titleBn: 'বাংলাদেশ-ওমান বাণিজ্য সম্পর্ক আরও শক্তিশালী',
    excerpt: 'দুই দেশের মধ্যে নতুন বাণিজ্য চুক্তি স্বাক্ষরিত হয়েছে...',
    category: 'বাংলাদেশ সংবাদ',
    date: '২৩ জুন, ২০২৬',
    views: 634,
    featured: false,
    tags: ['বাণিজ্য', 'চুক্তি', 'সম্পর্ক'],
  },
  {
    id: 6,
    title: 'সোহার অর্থনৈতিক অঞ্চলে নতুন বিনিয়োগ',
    titleBn: 'সোহার অর্থনৈতিক অঞ্চলে নতুন বিনিয়োগ',
    excerpt: 'সোহার অঞ্চলে বড় ধরনের শিল্প বিনিয়োগ আসছে যা হাজারো চাকরি সৃষ্টি করবে...',
    category: 'ওমান সংবাদ',
    date: '২২ জুন, ২০২৬',
    views: 892,
    featured: false,
    tags: ['সোহার', 'বিনিয়োগ', 'চাকরি'],
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">সংবাদ ও আপডেট</h1>
            <p className="text-xl mb-8 text-red-100">
              ওমান ও বাংলাদেশের সর্বশেষ সংবাদ
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="সংবাদ খুঁজুন..."
                className="pl-10 h-12 bg-white text-black"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="font-bold">ক্যাটাগরি</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/news/category/${category.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-bold">জনপ্রিয় ট্যাগ</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['ভিসা', 'চাকরি', 'দূতাবাস', 'পাসপোর্ট', 'স্বাস্থ্য', 'বীমা', 'বাণিজ্য'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">সর্বশেষ সংবাদ</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">সর্বশেষ</Button>
                <Button variant="outline" size="sm">জনপ্রিয়</Button>
                <Button variant="outline" size="sm">ফিচার্ড</Button>
              </div>
            </div>

            <div className="space-y-6">
              {newsArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
                      <span className="text-6xl">📰</span>
                      {article.featured && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          গুরুত্বপূর্ণ
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {article.date}
                          </span>
                        </div>
                        <Link href={`/news/${article.id}`}>
                          <h3 className="text-xl font-bold hover:text-primary cursor-pointer">
                            {article.titleBn}
                          </h3>
                        </Link>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{article.views} ভিউ</span>
                        </div>
                        <Link href={`/news/${article.id}`}>
                          <Button variant="link">বিস্তারিত পড়ুন →</Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
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
          </main>
        </div>
      </div>
    </div>
  );
}
