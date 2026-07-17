'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createProperty, uploadClassifiedImage } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const PROPERTY_TYPES = [
  { value: 'APARTMENT', label: 'অ্যাপার্টমেন্ট' },
  { value: 'VILLA', label: 'ভিলা' },
  { value: 'HOUSE', label: 'বাসা' },
  { value: 'ROOM', label: 'রুম' },
  { value: 'BED_SPACE', label: 'বেড স্পেস' },
  { value: 'COMMERCIAL', label: 'কমার্শিয়াল' },
];

const PURPOSES = [
  { value: 'RENT', label: 'ভাড়া' },
  { value: 'SALE', label: 'বিক্রয়' },
];

const CITIES = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Rustaq'
];

export function PropertyPostForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title_bn: '',
    description_bn: '',
    property_type: '',
    purpose: '',
    city: '',
    area: '',
    price: '',
    currency: 'OMR',
    bedrooms: '',
    bathrooms: '',
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
        category: formData.property_type,
        type: formData.property_type === 'COMMERCIAL' ? 'COMMERCIAL' : 'RESIDENTIAL',
        status: 'PUBLISHED',
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      };
      
      const response = await createProperty(payload);
      
      if (files.length > 0 && response.id) {
        await Promise.all(
          files.map((file, index) => 
            uploadClassifiedImage(file, 'property', response.id, index === 0)
          )
        );
      }
      
      toast({
        title: 'সফল!',
        description: 'আপনার প্রপার্টি পোস্ট সফলভাবে জমা হয়েছে।',
      });
      
      router.push('/properties');
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
      <div className="space-y-2">
        <Label htmlFor="title_bn">শিরোনাম *</Label>
        <Input
          id="title_bn"
          value={formData.title_bn}
          onChange={(e) => handleChange('title_bn', e.target.value)}
          placeholder="যেমন: ২ বেডরুমের অ্যাপার্টমেন্ট"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property_type">প্রপার্টির ধরন *</Label>
          <Select value={formData.property_type} onValueChange={(value) => handleChange('property_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">উদ্দেশ্য *</Label>
          <Select value={formData.purpose} onValueChange={(value) => handleChange('purpose', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {PURPOSES.map((purpose) => (
                <SelectItem key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </SelectItem>
              ))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">মূল্য *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="300"
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
          <Label htmlFor="bedrooms">বেডরুম</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
            placeholder="2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">বাথরুম</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleChange('bathrooms', e.target.value)}
            placeholder="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_bn">বিবরণ *</Label>
        <Textarea
          id="description_bn"
          value={formData.description_bn}
          onChange={(e) => handleChange('description_bn', e.target.value)}
          placeholder="প্রপার্টির বিস্তারিত বিবরণ লিখুন"
          rows={4}
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
