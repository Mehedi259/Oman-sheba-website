import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react'
import { getFeaturedNews } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export async function NewsSection() {
  let articles: any[] = [];
  try {
    const data = await getFeaturedNews(3);
    // Handle both paginated and direct array responses
    articles = Array.isArray(data) ? data : (data as any).results || [];
  } catch (e) {
    // If API fails, show empty state
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">সর্বশেষ সংবাদ</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">ওমান ও বাংলাদেশ থেকে আপডেট</p>
          </div>
          <Link href="/news" className="shrink-0 mt-1 sm:mt-0">
            <Button variant="outline" size="sm" className="h-8 sm:h-10 text-xs sm:text-sm">
              সব সংবাদ
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {articles.map((article: any) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow hover-lift overflow-hidden h-full flex flex-col">
              <div className="relative h-28 sm:h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shrink-0">
                {article.featured_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.featured_image}
                    alt={article.title_bn || article.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-4xl sm:text-6xl">📰</div>
                )}
                {article.featured && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 font-medium">
                    <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3" />
                    গুরুত্বপূর্ণ
                  </div>
                )}
              </div>
              <CardHeader className="p-3 sm:p-6 pb-1 sm:pb-3">
                <h3 className="font-bold text-sm sm:text-lg line-clamp-2 leading-tight min-h-[2.4rem] sm:min-h-[2.8rem]">{article.title_bn || article.title}</h3>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 flex-grow flex flex-col">
                <p className="text-[10px] sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-2 flex-1">
                  {article.excerpt_bn || article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t">
                  <div className="flex items-center text-[10px] sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {formatDate(article.published_at || article.created_at)}
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                    {article.views || 0} ভিউ
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-6 pt-0 mt-auto hidden sm:flex">
                <Link href={`/news/${article.slug}`}>
                  <Button variant="link" className="p-0 text-xs sm:text-sm">
                    বিস্তারিত পড়ুন
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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
