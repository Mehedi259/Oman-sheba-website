import Link from 'next/link';
import { MessageSquare, ThumbsUp, MessageCircle, ArrowRight, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getFeaturedForumPosts } from '@/lib/api';
import { formatRelativeTime } from '@/lib/utils';

export async function FeaturedCommunity() {
  const discussions = await getFeaturedForumPosts(3);
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container">
        <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">কমিউনিটি আলোচনা</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">প্রবাসী জীবনের সমস্যা ও সমাধান</p>
          </div>
          <Link href="/community" className="shrink-0 mt-1 sm:mt-0">
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
              সব দেখুন <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {discussions.map((discussion: any) => (
            <Link key={discussion.id} href={`/community/${discussion.id}`}>
              <Card className="hover:shadow-lg transition-all group h-full flex flex-col">
                <CardContent className="p-3 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-pink-100 text-pink-700 rounded-full text-[10px] sm:text-xs font-medium line-clamp-1">
                      {discussion.category?.nameBn || discussion.category?.name || 'সাধারণ'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-lg mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[2.4rem] sm:min-h-[2.8rem]">
                    {discussion.title_bn || discussion.titleBn || discussion.title || 'আলোচনা'}
                  </h3>

                  <p className="text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-1 sm:line-clamp-2 flex-1">
                    {discussion.contentBn || discussion.content}
                  </p>

                  <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-4 mt-auto">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="line-clamp-1">{discussion.author?.first_name || discussion.author?.username || 'অজ্ঞাত'}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{formatRelativeTime(discussion.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4 border-t text-[10px] sm:text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{discussion.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{discussion.comments_count || 0} মন্তব্য</span>
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
