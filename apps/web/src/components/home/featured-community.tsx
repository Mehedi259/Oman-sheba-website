import Link from 'next/link';
import { MessageSquare, ThumbsUp, MessageCircle, ArrowRight, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const discussions = [
  {
    id: 1,
    title: 'ওমানে ড্রাইভিং লাইসেন্স নবায়ন কিভাবে করবো?',
    category: 'ভিসা সম্পর্কিত',
    author: 'মোঃ রহিম',
    timeAgo: '২ ঘন্টা আগে',
    likes: 24,
    comments: 12,
    excerpt: 'আমার ড্রাইভিং লাইসেন্সের মেয়াদ শেষ হয়ে গেছে। কেউ কি জানেন কিভাবে নবায়ন করতে হয়...',
  },
  {
    id: 2,
    title: 'মাস্কাটে ভালো বাংলাদেশী রেস্টুরেন্ট কোথায় পাবো?',
    category: 'জীবনযাত্রা',
    author: 'করিম আহমেদ',
    timeAgo: '৫ ঘন্টা আগে',
    likes: 18,
    comments: 23,
    excerpt: 'আল খুয়াইর এলাকায় থাকি। কাছাকাছি ভালো বাংলাদেশী খাবারের দোকান...',
  },
  {
    id: 3,
    title: 'ওয়ার্ক পারমিট রিনিউয়ালের জন্য কি কি লাগবে?',
    category: 'আইনি পরামর্শ',
    author: 'সাকিব হোসেন',
    timeAgo: '১ দিন আগে',
    likes: 35,
    comments: 18,
    excerpt: 'আমার ওয়ার্ক পারমিট আগামী মাসে শেষ হবে। রিনিউয়ালের জন্য কি কাগজপত্র...',
  },
];

export function FeaturedCommunity() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">কমিউনিটি আলোচনা</h2>
            <p className="text-muted-foreground">প্রবাসী জীবনের সমস্যা ও সমাধান</p>
          </div>
          <Link href="/community">
            <Button variant="outline" className="gap-2">
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discussions.map((discussion) => (
            <Link key={discussion.id} href={`/community/${discussion.id}`}>
              <Card className="hover:shadow-lg transition-all group h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                      {discussion.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {discussion.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {discussion.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <User className="h-4 w-4" />
                    <span>{discussion.author}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>{discussion.timeAgo}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{discussion.comments} মন্তব্য</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
