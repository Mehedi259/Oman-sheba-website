import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react'
import { getFeaturedNews } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export async function NewsSection() {
  const news = await getFeaturedNews(3);
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">সর্বশেষ সংবাদ</h2>
            <p className="text-muted-foreground">ওমান ও বাংলাদেশ থেকে আপডেট</p>
          </div>
          <Link href="/news">
            <Button variant="outline">
              সব সংবাদ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((article: any) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow hover-lift overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-6xl">📰</div>
                {article.featured && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                    <TrendingUp className="h-3 w-3" />
                    গুরুত্বপূর্ণ
                  </div>
                )}
              </div>
              <CardHeader>
                <h3 className="font-bold text-lg line-clamp-2">{article.titleBn}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerptBn || article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {article.views} ভিউ
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/news/${article.slug}`}>
                  <Button variant="link" className="p-0">
                    বিস্তারিত পড়ুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
