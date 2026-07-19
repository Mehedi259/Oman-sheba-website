'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { createCommunityPost, getForumCategories } from '@/lib/api';
import { Label } from '@/components/ui/label';

export function DiscussionPostForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getForumCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray((data as any).results)) {
          setCategories((data as any).results);
        }
      } catch (err) {
        console.error("Failed to load forum categories", err);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('category', formData.category);
      payload.append('content', formData.content);
      payload.append('tags', formData.tags);
      
      if (files.length > 0) {
        payload.append('image', files[0]);
      }

      await createCommunityPost(payload);
      
      toast({
        title: 'সফল!',
        description: 'আপনার আলোচনা সফলভাবে পোস্ট হয়েছে।',
      });
      
      router.push('/community');
    } catch (error: any) {
      toast({
        title: 'ত্রুটি',
        description: error.message || 'পোস্ট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* আলোচনার শিরোনাম */}
      <div className="space-y-2">
        <Label htmlFor="title">আলোচনার শিরোনাম *</Label>
        <Input 
          id="title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="যেমন: ওমানে ড্রাইভিং লাইসেন্স নবায়ন সম্পর্কে জানতে চাই" 
          required
        />
      </div>

      {/* ক্যাটাগরি */}
      <div className="space-y-2">
        <Label htmlFor="category">ক্যাটাগরি *</Label>
        <select 
          id="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full p-3 border rounded-md bg-background"
          required
        >
          <option value="">নির্বাচন করুন</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug || cat.id}>
              {cat.nameBn || cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* বিস্তারিত প্রশ্ন/আলোচনা */}
      <div className="space-y-2">
        <Label htmlFor="content">বিস্তারিত লিখুন *</Label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full min-h-40 p-3 border rounded-md"
          placeholder="আপনার প্রশ্ন বা আলোচনার বিষয় বিস্তারিত লিখুন..."
          required
        />
      </div>

      {/* ট্যাগ */}
      <div className="space-y-2">
        <Label htmlFor="tags">ট্যাগ (ঐচ্ছিক)</Label>
        <Input 
          id="tags"
          value={formData.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="যেমন: ভিসা, লাইসেন্স, ওয়ার্ক পারমিট (কমা দিয়ে আলাদা করুন)" 
        />
        <p className="text-xs text-muted-foreground mt-1">
          প্রাসঙ্গিক ট্যাগ যোগ করুন যাতে অন্যরা সহজে খুঁজে পায়
        </p>
      </div>

      {/* ছবি (ঐচ্ছিক) */}
      <div className="space-y-2">
        <Label htmlFor="image">ছবি আপলোড করুন (ঐচ্ছিক)</Label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors relative">
          <Input 
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFiles([e.target.files[0]]);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            {files.length > 0 ? files[0].name : 'প্রয়োজনে স্ক্রিনশট বা সংশ্লিষ্ট ছবি যোগ করুন'}
          </p>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
        disabled={loading}
      >
        {loading ? 'প্রকাশ হচ্ছে...' : 'পোস্ট প্রকাশ করুন'}
      </Button>
    </form>
  );
}
