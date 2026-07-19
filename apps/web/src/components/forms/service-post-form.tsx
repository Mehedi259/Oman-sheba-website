'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createService, uploadClassifiedImage } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'AC_REPAIR', label: 'এসি মেরামত' },
  { value: 'PLUMBING', label: 'প্লাম্বিং' },
  { value: 'ELECTRICAL', label: 'ইলেকট্রিক্যাল' },
  { value: 'CLEANING', label: 'ক্লিনিং' },
  { value: 'CARPENTRY', label: 'কাঠের কাজ' },
  { value: 'PAINTING', label: 'রংয়ের কাজ' },
  { value: 'APPLIANCE_REPAIR', label: 'অ্যাপ্লায়েন্স মেরামত' },
  { value: 'OTHER', label: 'অন্যান্য' },
];

const CITIES = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Rustaq'
];

export function ServicePostForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title_bn: '',
    description_bn: '',
    category: '',
    service_type: '',
    availability: '',
    price: '',
    currency: 'OMR',
    city: '',
    area: '',
    contact_name: '',
    contact_phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        title: formData.title_bn,
        title_bn: formData.title_bn,
        description: formData.description_bn,
        description_bn: formData.description_bn,
        status: 'PUBLISHED',
        price: parseFloat(formData.price),
      };
      
      const response = await createService(payload);
      
      if (files.length > 0 && response.id) {
        await Promise.all(
          files.map((file, index) => 
            uploadClassifiedImage(file, 'service', response.id, index === 0)
          )
        );
      }
      
      toast({
        title: 'সফল!',
        description: 'আপনার সার্ভিস পোস্ট সফলভাবে জমা হয়েছে।',
      });
      
      // router.push('/services'); // Update when you have a services page
      router.push('/');
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
      <div className="space-y-2">
        <Label htmlFor="title_bn">শিরোনাম *</Label>
        <Input
          id="title_bn"
          value={formData.title_bn}
          onChange={(e) => handleChange('title_bn', e.target.value)}
          placeholder="যেমন: প্রফেশনাল এসি মেরামত"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">সার্ভিস ক্যাটাগরি *</Label>
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
          <Label htmlFor="service_type">সার্ভিসের ধরন *</Label>
          <Input
            id="service_type"
            value={formData.service_type}
            onChange={(e) => handleChange('service_type', e.target.value)}
            placeholder="যেমন: মেরামত, ইন্সটলেশন"
            required
          />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">বেস ফি / মূল্য *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="10"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">কখন এভেইলেবল?</Label>
          <Input
            id="availability"
            value={formData.availability}
            onChange={(e) => handleChange('availability', e.target.value)}
            placeholder="যেমন: শনি-বৃহস্পতি, সকাল ৯টা - রাত ৮টা"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_bn">বিস্তারিত বিবরণ *</Label>
        <Textarea
          id="description_bn"
          value={formData.description_bn}
          onChange={(e) => handleChange('description_bn', e.target.value)}
          placeholder="আপনার সার্ভিসের বিস্তারিত বিবরণ লিখুন"
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_name">যোগাযোগের নাম *</Label>
          <Input
            id="contact_name"
            value={formData.contact_name}
            onChange={(e) => handleChange('contact_name', e.target.value)}
            placeholder="আপনার নাম"
            required
          />
        </div>

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
