'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createVehicle, uploadClassifiedImage } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const VEHICLE_TYPES = [
  { value: 'CAR', label: 'গাড়ি' },
  { value: 'SUV', label: 'এসইউভি' },
  { value: 'TRUCK', label: 'ট্রাক' },
  { value: 'VAN', label: 'ভ্যান' },
  { value: 'MOTORCYCLE', label: 'মোটরসাইকেল' },
  { value: 'BUS', label: 'বাস' },
];

const CONDITIONS = [
  { value: 'NEW', label: 'নতুন' },
  { value: 'USED', label: 'ব্যবহৃত' },
  { value: 'EXCELLENT', label: 'চমৎকার' },
  { value: 'GOOD', label: 'ভাল' },
  { value: 'FAIR', label: 'মোটামুটি' },
];

const FUEL_TYPES = [
  { value: 'PETROL', label: 'পেট্রোল' },
  { value: 'DIESEL', label: 'ডিজেল' },
  { value: 'ELECTRIC', label: 'বৈদ্যুতিক' },
  { value: 'HYBRID', label: 'হাইব্রিড' },
];

const TRANSMISSIONS = [
  { value: 'AUTOMATIC', label: 'অটোমেটিক' },
  { value: 'MANUAL', label: 'ম্যানুয়াল' },
];

const CITIES = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Rustaq'
];

const VEHICLE_PURPOSES = [
  { value: 'SALE', label: 'বিক্রয়' },
  { value: 'RENT', label: 'ভাড়া' },
];

export function VehiclePostForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title_bn: '',
    description_bn: '',
    purpose: '',
    vehicle_type: '',
    brand: '',
    model: '',
    year: '',
    condition: '',
    fuel_type: '',
    transmission: '',
    mileage: '',
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
        purpose: formData.purpose,
        type: formData.vehicle_type,
        make: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        status: 'PUBLISHED',
        mileage: formData.mileage ? parseInt(formData.mileage) : null,
        price: parseFloat(formData.price),
        contact_name: formData.contact_name,
      };
      
      const response = await createVehicle(payload);
      
      if (files.length > 0 && response.id) {
        await Promise.all(
          files.map((file, index) => 
            uploadClassifiedImage(file, 'vehicle', response.id, index === 0)
          )
        );
      }
      
      toast({
        title: 'সফল!',
        description: 'আপনার গাড়ির পোস্ট সফলভাবে জমা হয়েছে।',
      });
      
      router.push('/vehicles');
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
          placeholder="যেমন: টয়োটা কামরি ২০২০"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">উদ্দেশ্য *</Label>
        <Select value={formData.purpose} onValueChange={(value) => handleChange('purpose', value)}>
          <SelectTrigger>
            <SelectValue placeholder="নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {VEHICLE_PURPOSES.map((purpose) => (
              <SelectItem key={purpose.value} value={purpose.value}>
                {purpose.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle_type">গাড়ির ধরন *</Label>
          <Select value={formData.vehicle_type} onValueChange={(value) => handleChange('vehicle_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">ব্র্যান্ড *</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="যেমন: Toyota"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">মডেল *</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="যেমন: Camry"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">বছর *</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
            placeholder="2020"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">অবস্থা *</Label>
          <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {CONDITIONS.map((condition) => (
                <SelectItem key={condition.value} value={condition.value}>
                  {condition.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuel_type">জ্বালানির ধরন *</Label>
          <Select value={formData.fuel_type} onValueChange={(value) => handleChange('fuel_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {FUEL_TYPES.map((fuel) => (
                <SelectItem key={fuel.value} value={fuel.value}>
                  {fuel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmission">ট্রান্সমিশন *</Label>
          <Select value={formData.transmission} onValueChange={(value) => handleChange('transmission', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {TRANSMISSIONS.map((transmission) => (
                <SelectItem key={transmission.value} value={transmission.value}>
                  {transmission.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mileage">মাইলেজ (km)</Label>
          <Input
            id="mileage"
            type="number"
            value={formData.mileage}
            onChange={(e) => handleChange('mileage', e.target.value)}
            placeholder="50000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">মূল্য *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="5000"
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
        <Label htmlFor="description_bn">বিবরণ *</Label>
        <Textarea
          id="description_bn"
          value={formData.description_bn}
          onChange={(e) => handleChange('description_bn', e.target.value)}
          placeholder="গাড়ির বিস্তারিত বিবরণ লিখুন"
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
