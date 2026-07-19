import { getCommunityPostById, getForumComments } from '@/lib/api';
import { formatRelativeTime, getMediaUrl } from '@/lib/utils';
import { MessageSquare, Clock, Eye, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ForumCommentForm, ForumLikeButton } from './ForumInteractions';

export default async function ForumPostDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await getCommunityPostById(params.id);
  
  if (!post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">পোস্টটি পাওয়া যায়নি</h2>
          <Link href="/forum">
            <Button variant="outline">ফোরামে ফিরে যান</Button>
          </Link>
        </div>
      </div>
    );
  }

  const commentsData = await getForumComments(params.id);
  const comments = Array.isArray(commentsData) ? commentsData : (commentsData as any).results || [];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="mb-6">
          <Link href="/forum" className="text-violet-600 hover:underline text-sm font-medium">
            &larr; ফোরামে ফিরে যান
          </Link>
        </div>

        {/* Post Content */}
        <div className="bg-card rounded-lg shadow-sm border p-6 md:p-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.category && (
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                {post.category?.nameBn || post.category?.name || post.category}
              </span>
            )}
            {post.pinned && (
              <span className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-medium">
                📌 পিন করা
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 border-b pb-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                {(post.authorName || post.author_name || post.author || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-foreground">{post.authorName || post.author_name || post.author}</span>
            </div>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {formatRelativeTime(post.createdAt || post.created_at)}</span>
            <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {post.views || 0} বার দেখা হয়েছে</span>
          </div>

          <div className="prose max-w-none mb-8 whitespace-pre-wrap">
            {post.content}
          </div>

          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getMediaUrl(post.image)} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4 mt-6">
            <ForumLikeButton postId={post.id} initialLikes={post.likes || 0} />
            <div className="text-sm text-muted-foreground">
              {comments.length} টি উত্তর
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-card rounded-lg shadow-sm border p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-violet-600" />
            উত্তরসমূহ ({comments.length})
          </h2>

          <div className="space-y-6 mb-8">
            {comments.length === 0 ? (
              <p className="text-muted-foreground italic text-center py-4">এখনো কোনো উত্তর নেই। প্রথম উত্তরটি দিন!</p>
            ) : (
              comments.map((comment: any) => (
                <div key={comment.id} className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold">
                      {(comment.authorName || comment.author_name || comment.author || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{comment.authorName || comment.author_name || comment.author}</div>
                      <div className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt || comment.created_at)}</div>
                    </div>
                  </div>
                  <div className="pl-11 whitespace-pre-wrap text-gray-800">
                    {comment.content}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">আপনার মতামত দিন</h3>
            <ForumCommentForm postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
