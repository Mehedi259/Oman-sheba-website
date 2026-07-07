import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Calendar, Eye, Tag, Clock, Share2, 
  Facebook, Bookmark
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Inline news data matching the news listing page structure
const newsArticles = [
  {
    id: '1',
    title: 'ওমানে নতুন ওয়ার্ক ভিসা নিয়ম ২০২৬',
    excerpt: 'শ্রম মন্ত্রণালয় নতুন ওয়ার্ক ভিসা নিয়ম ঘোষণা করেছে যা ২০২৬ সাল থেকে কার্যকর হবে...',
    content: `শ্রম মন্ত্রণালয় নতুন ওয়ার্ক ভিসা নিয়ম ঘোষণা করেছে যা ২০২৬ সাল থেকে কার্যকর হবে। নতুন নিয়ম অনুযায়ী, সকল প্রবাসী কর্মীদের জন্য ডিজিটাল ওয়ার্ক পারমিট বাধ্যতামূলক করা হয়েছে।

মূল পরিবর্তনসমূহ:
• ডিজিটাল ওয়ার্ক পারমিট সিস্টেম চালু
• ভিসা প্রসেসিং সময় ৩০ দিন থেকে কমিয়ে ১৫ দিন
• অনলাইন আবেদন প্রক্রিয়া সহজীকরণ
• নতুন ফি কাঠামো প্রবর্তন

এই পরিবর্তনগুলো সকল সেক্টরের প্রবাসী কর্মীদের জন্য প্রযোজ্য হবে। নতুন সিস্টেমে আবেদনকারীরা অনলাইনে তাদের আবেদনের স্ট্যাটাস ট্র্যাক করতে পারবেন।

বিস্তারিত তথ্যের জন্য ওমান শ্রম মন্ত্রণালয়ের ওয়েবসাইট ভিজিট করুন অথবা নিকটস্থ শ্রম অফিসে যোগাযোগ করুন।`,
    category: 'ভিসা সংবাদ',
    date: '২৮ জুন, ২০২৬',
    views: 1234,
    featured: true,
    tags: ['ভিসা', 'নিয়ম', 'ওমান'],
    readTime: '৫ মিনিট',
  },
  {
    id: '2',
    title: 'বাংলাদেশ দূতাবাস নতুন সেবা চালু করেছে',
    excerpt: 'মাস্কাটে বাংলাদেশ দূতাবাস অনলাইন পাসপোর্ট নবায়ন সেবা চালু করেছে...',
    content: `মাস্কাটে বাংলাদেশ দূতাবাস অনলাইন পাসপোর্ট নবায়ন সেবা চালু করেছে। এই নতুন সেবার মাধ্যমে প্রবাসীরা ঘরে বসেই পাসপোর্ট নবায়নের আবেদন করতে পারবেন।

নতুন সেবাসমূহ:
• অনলাইন পাসপোর্ট নবায়ন আবেদন
• ই-পেমেন্ট সুবিধা
• হোম ডেলিভারি সার্ভিস
• অনলাইন অ্যাপয়েন্টমেন্ট বুকিং

আবেদন প্রক্রিয়া:
১. দূতাবাসের ওয়েবসাইটে লগইন করুন
২. প্রয়োজনীয় ডকুমেন্ট আপলোড করুন
৩. ফি পরিশোধ করুন
৪. অ্যাপয়েন্টমেন্ট নিন (প্রয়োজনে)

যোগাযোগ: +968 2469 8989`,
    category: 'দূতাবাস',
    date: '২৬ জুন, ২০২৬',
    views: 987,
    featured: true,
    tags: ['দূতাবাস', 'পাসপোর্ট', 'সেবা'],
    readTime: '৪ মিনিট',
  },
  {
    id: '3',
    title: 'মাস্কাটে নতুন চাকরির বাজার সম্প্রসারণ',
    excerpt: 'বিভিন্ন সেক্টরে নতুন চাকরির সুযোগ তৈরি হচ্ছে মাস্কাট অঞ্চলে...',
    content: `বিভিন্ন সেক্টরে নতুন চাকরির সুযোগ তৈরি হচ্ছে মাস্কাট অঞ্চলে। ২০২৬ সালের প্রথমার্ধে আইটি, হেলথকেয়ার এবং কনস্ট্রাকশন সেক্টরে উল্লেখযোগ্য নিয়োগ বৃদ্ধি পেয়েছে।

চাহিদাযুক্ত সেক্টরসমূহ:
• তথ্য প্রযুক্তি (IT) - ৩৫% বৃদ্ধি
• স্বাস্থ্যসেবা - ২৮% বৃদ্ধি
• নির্মাণ - ২২% বৃদ্ধি
• আতিথেয়তা - ১৮% বৃদ্ধি

বিশেষজ্ঞদের মতে, ওমানের Vision 2040 প্রকল্পের আওতায় আগামী বছরগুলোতে আরো বেশি কর্মসংস্থান সৃষ্টি হবে।`,
    category: 'চাকরি সংবাদ',
    date: '২৫ জুন, ২০২৬',
    views: 756,
    featured: false,
    tags: ['চাকরি', 'মাস্কাট', 'সুযোগ'],
    readTime: '৩ মিনিট',
  },
  {
    id: '4',
    title: 'ওমান সরকারের নতুন স্বাস্থ্য বীমা নীতি',
    excerpt: 'সকল প্রবাসীদের জন্য বাধ্যতামূলক স্বাস্থ্য বীমার নতুন নিয়ম আসছে...',
    content: `সকল প্রবাসীদের জন্য বাধ্যতামূলক স্বাস্থ্য বীমার নতুন নিয়ম আসছে। ওমান সরকার ঘোষণা করেছে যে আগামী বছর থেকে সকল প্রবাসী কর্মীর জন্য স্বাস্থ্য বীমা বাধ্যতামূলক করা হবে।

মূল বৈশিষ্ট্যসমূহ:
• সকল প্রবাসীর জন্য বাধ্যতামূলক
• ন্যূনতম কভারেজ ৳ ৩৫,০০,০০০
• জরুরি চিকিৎসা সেবা অন্তর্ভুক্ত
• দাঁতের চিকিৎসা এবং চক্ষু চিকিৎসা অন্তর্ভুক্ত

নিয়োগকর্তাদের দায়িত্ব:
• বীমা প্রিমিয়াম পরিশোধ
• কর্মীদের বীমা কার্ড প্রদান
• বার্ষিক নবায়ন নিশ্চিত করা`,
    category: 'ওমান সংবাদ',
    date: '২৪ জুন, ২০২৬',
    views: 1456,
    featured: false,
    tags: ['স্বাস্থ্য', 'বীমা', 'নীতি'],
    readTime: '৪ মিনিট',
  },
  {
    id: '5',
    title: 'প্রবাসীদের জন্য নতুন ব্যাংকিং সুবিধা',
    excerpt: 'ওমানের ব্যাংকগুলো প্রবাসীদের জন্য বিশেষ সুবিধা চালু করছে...',
    content: `ওমানের ব্যাংকগুলো প্রবাসীদের জন্য বিশেষ সুবিধা চালু করছে। নতুন প্যাকেজে কম সার্ভিস চার্জে বাংলাদেশে রেমিট্যান্স পাঠানোর সুবিধা রয়েছে।

নতুন সুবিধাসমূহ:
• কম ট্রান্সফার ফি
• তাৎক্ষণিক রেমিট্যান্স ট্রান্সফার
• মোবাইল ব্যাংকিং অ্যাপ
• ফ্রি ডেবিট কার্ড

অংশগ্রহণকারী ব্যাংকসমূহ:
• Bank Muscat
• National Bank of Oman
• Bank Dhofar`,
    category: 'বাংলাদেশ সংবাদ',
    date: '২৩ জুন, ২০২৬',
    views: 678,
    featured: false,
    tags: ['ব্যাংকিং', 'রেমিট্যান্স', 'প্রবাসী'],
    readTime: '৩ মিনিট',
  },
]

export function generateStaticParams() {
  return newsArticles.map(article => ({ id: article.id }))
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = newsArticles.find(a => a.id === id)

  if (!article) {
    notFound()
  }

  // Get related articles (same category, different id)
  const relatedArticles = newsArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-gray-900 text-white py-12">
        <div className="container">
          <Link href="/news" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব সংবাদ দেখুন
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              {article.featured && (
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  ফিচার্ড
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{article.date}</span>
              <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{article.views.toLocaleString()} বার পড়া হয়েছে</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime} পড়তে সময় লাগবে</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Article Content */}
            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="prose max-w-none">
                  {article.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {article.tags.map((tag, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Share2 className="h-4 w-4" /> শেয়ার করুন:
                  </span>
                  <Button variant="outline" size="sm">
                    <Facebook className="h-4 w-4 mr-1" /> Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-1" /> সংরক্ষণ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">সম্পর্কিত সংবাদ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((related) => (
                    <Link key={related.id} href={`/news/${related.id}`} className="block group">
                      <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors mb-1">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{related.date}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">এই ক্যাটাগরিতে আর কোনো সংবাদ নেই</p>
                )}
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">সর্বশেষ সংবাদ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsArticles.filter(a => a.id !== article.id).slice(0, 4).map((news) => (
                  <Link key={news.id} href={`/news/${news.id}`} className="block group">
                    <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors mb-1">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{news.date}</span>
                        <span>•</span>
                        <span>{news.views.toLocaleString()} views</span>
                      </div>
                    </div>
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
