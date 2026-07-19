import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Calendar, Eye, Tag, Clock, Share2, 
  Facebook, Bookmark
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getNewsById, getNews } from '@/lib/api'
import { formatRelativeTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let article: any
  try {
    article = await getNewsById(id)
  } catch (error) {
    notFound()
  }

  if (!article) {
    notFound()
  }

  // Fetch some latest news for the sidebar
  let allNews: any = []
  try {
    const data = await getNews({ limit: 5 })
    allNews = Array.isArray(data) ? data : data.results || []
  } catch (error) {
    // Ignore error for related news
  }
  
  const relatedArticles = allNews.filter((a: any) => a.id !== article.id).slice(0, 3)

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
                {article.category?.nameBn || article.category?.name || 'সংবাদ'}
              </span>
              {article.featured && (
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  ফিচার্ড
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.titleBn || article.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatRelativeTime(article.createdAt || article.created_at)}</span>
              <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{(article.views || 0).toLocaleString()} বার পড়া হয়েছে</span>
              {article.readTime && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime} পড়তে সময় লাগবে</span>}
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
                  {(article.contentBn || article.content || '').split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {article.tags.map((tag: string, i: number) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
                  relatedArticles.map((related: any) => (
                    <Link key={related.id} href={`/news/${related.id}`} className="block group">
                      <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                          {related.titleBn || related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{formatRelativeTime(related.createdAt || related.created_at)}</p>
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
                {allNews.filter((a: any) => a.id !== article.id).slice(0, 4).map((news: any) => (
                  <Link key={news.id} href={`/news/${news.id}`} className="block group">
                    <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                        {news.titleBn || news.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatRelativeTime(news.createdAt || news.created_at)}</span>
                        <span>•</span>
                        <span>{(news.views || 0).toLocaleString()} views</span>
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
