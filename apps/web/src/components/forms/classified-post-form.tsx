'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClassified, uploadClassifiedImage } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'electronics', label: 'ইলেকট্রনিক্স' },
  { value: 'furniture', label: 'ফার্নিচার' },
  { value: 'clothing', label: 'পোশাক' },
  { value: 'books', label: 'বই' },
  { value: 'sports', label: 'খেলাধুলা' },
  { value: 'others', label: 'অন্যান্য' },
];

const CITIES = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Rustaq'
];

export function ClassifiedPostForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title_bn: '',
    title_en: '',
    description_bn: '',
    description_en: '',
    category: '',
    price: '',
    currency: 'OMR',
    city: '',
    area: '',
    contact_phone: '',
    contact_email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createClassified({
        ...formData,
        price: parseFloat(formData.price),
      });
      
      if (files.length > 0 && response.id) {
        await Promise.all(
          files.map((file, index) => 
            uploadClassifiedImage(file, 'others', response.id, index === 0)
          )
        );
      }
      
      toast({
        title: 'সফল!',
        description: 'আপনার পোস্ট সফলভাবে জমা হয়েছে।',
      });
      
      router.push('/community/classifieds');
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'পোস্ট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title_bn">শিরোনাম (বাংলা) *</Label>
          <Input
            id="title_bn"
            value={formData.title_bn}
            onChange={(e) => handleChange('title_bn', e.target.value)}
            placeholder="যেমন: স্যামসাং ফোন বিক্রয়"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English) *</Label>
          <Input
            id="title_en"
            value={formData.title_en}
            onChange={(e) => handleChange('title_en', e.target.value)}
            placeholder="e.g: Samsung Phone for Sale"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">ক্যাটাগরি *</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">মূল্য *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="100"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">মুদ্রা</Label>
          <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OMR">OMR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="BDT">BDT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">শহর *</Label>
          <Select value={formData.city} onValueChange={(value) => handleChange('city', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">এলাকা *</Label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) => handleChange('area', e.target.value)}
            placeholder="যেমন: Al Khuwair"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_bn">বিবরণ (বাংলা) *</Label>
        <Textarea
          id="description_bn"
          value={formData.description_bn}
          onChange={(e) => handleChange('description_bn', e.target.value)}
          placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_en">Description (English) *</Label>
        <Textarea
          id="description_en"
          value={formData.description_en}
          onChange={(e) => handleChange('description_en', e.target.value)}
          placeholder="Enter detailed product description"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_phone">যোগাযোগ ফোন *</Label>
          <Input
            id="contact_phone"
            value={formData.contact_phone}
            onChange={(e) => handleChange('contact_phone', e.target.value)}
            placeholder="+968 9XXXXXXX"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_email">যোগাযোগ ইমেইল</Label>
          <Input
            id="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => handleChange('contact_email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">ছবি আপলোড করুন (একাধিক ছবি সিলেক্ট করতে পারেন)</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files));
            }
          }}
          className="cursor-pointer file:text-violet-700"
        />
        {files.length > 0 && (
          <p className="text-sm text-muted-foreground">{files.length} টি ছবি নির্বাচন করা হয়েছে</p>
        )}
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
