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
          {discussions.map((discussion: any) => (
            <Link key={discussion.id} href={`/community/${discussion.id}`}>
              <Card className="hover:shadow-lg transition-all group h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                      {discussion.category?.nameBn || discussion.category?.name || 'সাধারণ'}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {discussion.titleBn || discussion.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {discussion.contentBn || discussion.content}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 mt-auto">
                    <User className="h-4 w-4" />
                    <span>{discussion.author?.first_name || discussion.author?.username || 'অজ্ঞাত'}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>{formatRelativeTime(discussion.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
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
