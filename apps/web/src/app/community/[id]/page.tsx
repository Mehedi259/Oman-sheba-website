import { getCommunityPostById } from '@/lib/api'
import { formatRelativeTime } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Calendar, MessageSquare, Tag, ThumbsUp, Heart, Share2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function CommunityPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let post: any
  try {
    post = await getCommunityPostById(id)
  } catch (error) {
    notFound()
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-white py-12">
        <div className="container max-w-4xl">
          <Link href="/community" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            কমিউনিটিতে ফিরে যান
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category?.nameBn || post.category?.name || 'আলোচনা'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.titleBn || post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
              <span>{post.author?.name || 'অজ্ঞাত'}</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatRelativeTime(post.createdAt || post.created_at)}</span>
            <span className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> {(post.comments_count || post.replies || 0)} টি মন্তব্য</span>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-8 space-y-8">
        {/* Main Post Content */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-8 pb-6">
            <div className="prose max-w-none">
              {(post.contentBn || post.content || '').split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 whitespace-pre-line text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t flex flex-wrap items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                <ThumbsUp className="h-4 w-4 mr-2" />
                {(post.likes || post.likes_count || 0)} লাইক
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                <Share2 className="h-4 w-4 mr-2" />
                শেয়ার
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">মন্তব্যসমূহ ({(post.comments_count || post.replies || 0)})</h3>
          
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map((comment: any, idx: number) => (
                <Card key={idx} className="bg-slate-50 border-slate-100">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                        {comment.author?.name ? comment.author.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-semibold text-slate-800">{comment.author?.name || 'অজ্ঞাত ব্যবহারকারী'}</span>
                          <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt || comment.created_at)}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-50 border-dashed">
              <CardContent className="py-12 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি করুন!</p>
              </CardContent>
            </Card>
          )}

          {/* Comment Form (Visual Only for now) */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 text-lg">আপনার মতামত দিন</h4>
              <textarea 
                className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-50 transition-all"
                placeholder="এখানে আপনার মন্তব্য লিখুন..."
              ></textarea>
              <div className="mt-4 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  পোস্ট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
