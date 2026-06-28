import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

const news = [
  {
    id: '1',
    title: 'ওমানে নতুন ভিসা নীতি ঘোষণা',
    excerpt: 'ওমান সরকার নতুন ভিসা নীতি ঘোষণা করেছে যা প্রবাসীদের জন্য সুবিধাজনক হবে...',
    category: 'ভিসা সংবাদ',
    date: '১৫ জানুয়ারি, ২০২৪',
    image: '📰'
  },
  {
    id: '2',
    title: 'বাংলাদেশ দূতাবাসের নতুন সেবা',
    excerpt: 'মাস্কাটে বাংলাদেশ দূতাবাস নতুন অনলাইন সেবা চালু করেছে...',
    category: 'দূতাবাস',
    date: '১২ জানুয়ারি, ২০২৪',
    image: '🏛️'
  },
  {
    id: '3',
    title: 'ওমানে চাকরির বাজার উন্নতি',
    excerpt: 'চলতি বছর ওমানে চাকরির বাজারে ব্যাপক উন্নতি হবে বলে আশা করা হচ্ছে...',
    category: 'চাকরি সংবাদ',
    date: '১০ জানুয়ারি, ২০২৪',
    image: '💼'
  }
]

export function NewsSection() {
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
          {news.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow hover-lift">
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <span className="text-6xl">{article.image}</span>
                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  {article.category}
                </div>
              </div>
              <CardHeader>
                <h3 className="font-bold text-lg line-clamp-2">{article.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {article.date}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/news/${article.id}`}>
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
