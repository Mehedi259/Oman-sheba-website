import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Search,
  ThumbsUp,
  MessageCircle,
  Eye,
  Calendar,
  Tag
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'সাধারণ আলোচনা', nameBn: 'সাধারণ আলোচনা', count: 234, icon: MessageSquare },
  { id: 2, name: 'চাকরি সহায়তা', nameBn: 'চাকরি সহায়তা', count: 156, icon: Users },
  { id: 3, name: 'বাসা ভাড়া', nameBn: 'বাসা ভাড়া', count: 189, icon: TrendingUp },
  { id: 4, name: 'ভিসা সহায়তা', nameBn: 'ভিসা সহায়তা', count: 278, icon: MessageSquare },
];

const trendingTopics = [
  {
    id: 1,
    title: 'ওমানে নতুন ভিসা নিয়ম সম্পর্কে জানতে চাই',
    author: 'করিম আহমেদ',
    category: 'ভিসা সহায়তা',
    replies: 45,
    views: 1234,
    likes: 89,
    time: '২ ঘন্টা আগে',
    tags: ['ভিসা', 'নিয়ম', 'আপডেট']
  },
  {
    id: 2,
    title: 'মাস্কাটে ভালো বাংলাদেশী রেস্টুরেন্টের তালিকা',
    author: 'রহিম উদ্দিন',
    category: 'সাধারণ আলোচনা',
    replies: 67,
    views: 2341,
    likes: 134,
    time: '৫ ঘন্টা আগে',
    tags: ['খাবার', 'রেস্টুরেন্ট', 'মাস্কাট']
  },
  {
    id: 3,
    title: 'সোহারে ভাল চাকরির সুযোগ আছে কি?',
    author: 'সাকিব হোসেন',
    category: 'চাকরি সহায়তা',
    replies: 23,
    views: 876,
    likes: 45,
    time: '১ দিন আগে',
    tags: ['চাকরি', 'সোহার', 'সুযোগ']
  },
  {
    id: 4,
    title: 'রুয়িতে কম খরচে রুম শেয়ার করার কেউ আছেন?',
    author: 'নাজমুল ইসলাম',
    category: 'বাসা ভাড়া',
    replies: 34,
    views: 1567,
    likes: 67,
    time: '৩ দিন আগে',
    tags: ['রুম', 'শেয়ার', 'রুয়ি']
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">কমিউনিটি ফোরাম</h1>
            <p className="text-xl mb-8 text-blue-100">
              প্রশ্ন করুন, উত্তর দিন এবং অভিজ্ঞতা শেয়ার করুন
            </p>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="আলোচনা খুঁজুন..."
                  className="pl-10 h-12 bg-white text-black"
                />
              </div>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MessageSquare className="mr-2 h-5 w-5" />
                নতুন পোস্ট
              </Button>
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
                <CardTitle>ক্যাটাগরি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.id}
                      href={`/community/category/${category.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <span>{category.nameBn}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>সম্প্রদায়ের পরিসংখ্যান</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">মোট সদস্য</span>
                  <span className="font-bold">১২,৩৪৫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">মোট পোস্ট</span>
                  <span className="font-bold">৮,৯৬৭</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">আজকের পোস্ট</span>
                  <span className="font-bold">১৮৯</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">ট্রেন্ডিং আলোচনা</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">সর্বশেষ</Button>
                <Button variant="outline" size="sm">জনপ্রিয়</Button>
                <Button variant="outline" size="sm">সবচেয়ে বেশি উত্তর</Button>
              </div>
            </div>

            <div className="space-y-4">
              {trendingTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link href={`/community/topic/${topic.id}`}>
                          <CardTitle className="text-xl hover:text-primary cursor-pointer">
                            {topic.title}
                          </CardTitle>
                        </Link>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>দ্বারা {topic.author}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {topic.time}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {topic.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{topic.replies} উত্তর</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{topic.views} দেখা হয়েছে</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{topic.likes} লাইক</span>
                    </div>
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
          </main>
        </div>
      </div>
    </div>
  );
}
