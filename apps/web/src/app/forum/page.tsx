export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Users, TrendingUp, Clock, ThumbsUp, Eye } from 'lucide-react'
import Link from 'next/link'
import { getCommunityPosts, getForumCategories } from '@/lib/api'
import { formatRelativeTime } from '@/lib/utils'

const forumTopics = [
  {
    id: 1,
    title: 'ওমানে নতুন লেবার ল সম্পর্কে জানতে চাই',
    author: 'রফিকুল ইসলাম',
    category: 'আইন ও নিয়ম',
    replies: 23,
    views: 456,
    likes: 15,
    time: '২ ঘণ্টা আগে',
    pinned: true,
  },
  {
    id: 2,
    title: 'মাস্কাটে ভালো বাংলাদেশী রেস্টুরেন্ট কোথায়?',
    author: 'কামাল হোসেন',
    category: 'জীবনযাপন',
    replies: 45,
    views: 789,
    likes: 32,
    time: '৫ ঘণ্টা আগে',
    pinned: false,
  },
  {
    id: 3,
    title: 'ফ্যামিলি ভিসা প্রসেসিং - অভিজ্ঞতা শেয়ার',
    author: 'আবদুল করিম',
    category: 'ভিসা',
    replies: 67,
    views: 1234,
    likes: 48,
    time: '১ দিন আগে',
    pinned: true,
  },
  {
    id: 4,
    title: 'সালালায় বেড স্পেস খুঁজছি',
    author: 'মোহাম্মদ আলী',
    category: 'বাসস্থান',
    replies: 12,
    views: 234,
    likes: 5,
    time: '১ দিন আগে',
    pinned: false,
  },
  {
    id: 5,
    title: 'ওমানে গাড়ি কেনার আগে যা জানা দরকার',
    author: 'তানভীর আহমেদ',
    category: 'গাড়ি',
    replies: 34,
    views: 567,
    likes: 21,
    time: '২ দিন আগে',
    pinned: false,
  },
  {
    id: 6,
    title: 'বাংলাদেশে টাকা পাঠানোর সবচেয়ে সহজ উপায়',
    author: 'শাহিন খান',
    category: 'ব্যাংকিং',
    replies: 56,
    views: 890,
    likes: 38,
    time: '৩ দিন আগে',
    pinned: false,
  },
]

const forumCategories = [
  { name: 'আইন ও নিয়ম', count: 45, color: 'bg-blue-100 text-blue-700' },
  { name: 'ভিসা', count: 78, color: 'bg-green-100 text-green-700' },
  { name: 'জীবনযাপন', count: 123, color: 'bg-purple-100 text-purple-700' },
  { name: 'বাসস্থান', count: 56, color: 'bg-orange-100 text-orange-700' },
  { name: 'গাড়ি', count: 34, color: 'bg-red-100 text-red-700' },
  { name: 'ব্যাংকিং', count: 29, color: 'bg-teal-100 text-teal-700' },
  { name: 'চাকরি', count: 89, color: 'bg-indigo-100 text-indigo-700' },
  { name: 'সাধারণ আলোচনা', count: 156, color: 'bg-gray-100 text-gray-700' },
]

export default async function ForumPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const [data, categoriesData] = await Promise.all([
    getCommunityPosts({
      search: searchParams.search,
      category: searchParams.category,
      sort: searchParams.sort,
      page: searchParams.page,
    }),
    getForumCategories()
  ]);

  const topics = Array.isArray(data) ? data : (data as any).results || [];
  const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData as any).results || [];

  const buildUrl = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as any);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    return `/forum?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="h-10 w-10" />
            <h1 className="text-4xl font-bold">কমিউনিটি ফোরাম</h1>
          </div>
          <p className="text-purple-200 text-lg max-w-2xl">
            ওমানে বসবাসরত বাংলাদেশী ভাই-বোনদের সাথে আলোচনা করুন, প্রশ্ন করুন, অভিজ্ঞতা শেয়ার করুন।
          </p>
          <div className="flex gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>যোগাযোগ করুন</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>{topics.length} আলোচনা</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
              <h2 className="text-2xl font-bold">সাম্প্রতিক আলোচনা</h2>
              
              <div className="flex flex-wrap items-center gap-2">
                <form action="/forum" method="GET" className="flex">
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchParams.search || ''}
                    placeholder="খুঁজুন..."
                    className="border rounded-l-md px-3 py-1.5 text-sm w-full max-w-[200px]"
                  />
                  {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
                  <Button type="submit" size="sm" className="rounded-l-none bg-violet-600 hover:bg-violet-700">খুঁজুন</Button>
                </form>
                
                <Link href="/post/create?type=discussion">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    নতুন পোস্ট করুন
                  </Button>
                </Link>
                
                {(searchParams.search || searchParams.category) && (
                  <Link href="/forum">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">মুছুন</Button>
                  </Link>
                )}
              </div>
            </div>

            {topics.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border rounded-lg bg-card">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-semibold mb-2">কোনো আলোচনা পাওয়া যায়নি</h3>
                <p>প্রথম ব্যক্তি হিসেবে একটি নতুন আলোচনা শুরু করুন!</p>
              </div>
            ) : (
              topics.map((topic: any) => (
                <Card key={topic.id} className={`hover:shadow-md transition-shadow ${topic.pinned ? 'border-l-4 border-l-violet-500' : ''}`}>
                  <CardContent className="py-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-violet-100 p-3 rounded-full shrink-0">
                        <MessageSquare className="h-5 w-5 text-violet-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {topic.pinned && (
                            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">📌 পিন করা</span>
                          )}
                          {topic.category && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{topic.category?.nameBn || topic.category?.name || topic.category}</span>
                          )}
                        </div>
                        <Link href={`/forum/${topic.id}`}>
                          <h3 className="font-semibold text-lg mb-1 hover:text-violet-600 transition-colors cursor-pointer">
                            {topic.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{topic.authorName || topic.author_name || topic.author}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatRelativeTime(topic.createdAt || topic.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{topic.commentsCount || topic.comments_count || 0} উত্তর</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{topic.views || 0} views</span>
                          <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{topic.likes || 0} লাইক</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            {/* Pagination */}
            {topics.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" disabled>পূর্ববর্তী</Button>
                <Button>১</Button>
                <Button variant="outline" disabled>পরবর্তী</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ক্যাটাগরি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link 
                  href="/forum"
                  className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors ${!searchParams.category ? 'bg-violet-50 font-medium text-violet-700' : ''}`}
                >
                  <span className="text-sm px-2 py-1">সব ক্যাটাগরি</span>
                </Link>
                {categories.map((cat: any) => (
                  <Link 
                    key={cat.id} 
                    href={buildUrl({ category: cat.slug || cat.id.toString() })}
                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors ${searchParams.category === cat.slug || searchParams.category === cat.id.toString() ? 'bg-violet-50 font-medium text-violet-700' : ''}`}
                  >
                    <span className="text-sm px-2 py-1">{cat.nameBn || cat.name}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
