'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { createForumComment, likeForumPost } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function ForumLikeButton({ postId, initialLikes }: { postId: number, initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      setLoading(true);
      const res = await likeForumPost(postId);
      setLikes(res.likes !== undefined ? res.likes : likes + 1);
      
      const messageMap: Record<string, string> = {
        'Forum post liked': 'পোস্টটি লাইক করা হয়েছে।',
        'Forum post unliked': 'পোস্টটি থেকে লাইক সরানো হয়েছে।'
      };
      
      toast({ title: 'সফল', description: messageMap[res.message] || res.message || 'সফলভাবে সম্পন্ন হয়েছে।' });
    } catch (err: any) {
      toast({ title: 'ত্রুটি', description: 'লগইন করুন অথবা আবার চেষ্টা করুন।', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLike} disabled={loading} className="gap-2">
      <ThumbsUp className="h-4 w-4" /> 
      <span>{likes} লাইক</span>
    </Button>
  );
}

export function ForumCommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      await createForumComment(postId, content);
      toast({ title: 'সফল', description: 'আপনার মতামত প্রকাশ করা হয়েছে।' });
      setContent('');
      router.refresh();
    } catch (err: any) {
      toast({ title: 'ত্রুটি', description: 'লগইন করুন অথবা আবার চেষ্টা করুন।', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Textarea
        placeholder="আপনার মতামত বা উত্তর লিখুন..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
      />
      <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-700">
        <Send className="h-4 w-4 mr-2" />
        {loading ? 'প্রকাশ হচ্ছে...' : 'উত্তর দিন'}
      </Button>
    </form>
  );
}
