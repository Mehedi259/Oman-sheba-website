'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createJob } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const JOB_TYPES = [
  { value: 'FULL_TIME', label: 'ফুল টাইম' },
  { value: 'PART_TIME', label: 'পার্ট টাইম' },
  { value: 'CONTRACT', label: 'চুক্তিভিত্তিক' },
  { value: 'TEMPORARY', label: 'অস্থায়ী' },
  { value: 'INTERNSHIP', label: 'ইন্টার্নশিপ' },
];

const CITIES = [
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Rustaq'
];

export function JobPostForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title_bn: '',
    title_en: '',
    description_bn: '',
    description_en: '',
    job_type: '',
    city: '',
    area: '',
    salary_min: '',
    salary_max: '',
    salary_currency: 'OMR',
    requirements_bn: '',
    requirements_en: '',
    benefits_bn: '',
    benefits_en: '',
    contact_phone: '',
    contact_email: '',
    company_name_bn: '',
    company_name_en: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createJob({
        ...formData,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : null,
      });
      
      toast({
        title: 'সফল!',
        description: 'আপনার চাকরির পোস্ট সফলভাবে জমা হয়েছে।',
      });
      
      router.push('/jobs');
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
          <Label htmlFor="title_bn">চাকরির শিরোনাম (বাংলা) *</Label>
          <Input
            id="title_bn"
            value={formData.title_bn}
            onChange={(e) => handleChange('title_bn', e.target.value)}
            placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title_en">Job Title (English) *</Label>
          <Input
            id="title_en"
            value={formData.title_en}
            onChange={(e) => handleChange('title_en', e.target.value)}
            placeholder="e.g: Software Engineer"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company_name_bn">কোম্পানির নাম (বাংলা) *</Label>
          <Input
            id="company_name_bn"
            value={formData.company_name_bn}
            onChange={(e) => handleChange('company_name_bn', e.target.value)}
            placeholder="কোম্পানির নাম লিখুন"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company_name_en">Company Name (English) *</Label>
          <Input
            id="company_name_en"
            value={formData.company_name_en}
            onChange={(e) => handleChange('company_name_en', e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="job_type">চাকরির ধরন *</Label>
          <Select value={formData.job_type} onValueChange={(value) => handleChange('job_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salary_min">ন্যূনতম বেতন</Label>
          <Input
            id="salary_min"
            type="number"
            value={formData.salary_min}
            onChange={(e) => handleChange('salary_min', e.target.value)}
            placeholder="300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary_max">সর্বোচ্চ বেতন</Label>
          <Input
            id="salary_max"
            type="number"
            value={formData.salary_max}
            onChange={(e) => handleChange('salary_max', e.target.value)}
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary_currency">মুদ্রা</Label>
          <Select value={formData.salary_currency} onValueChange={(value) => handleChange('salary_currency', value)}>
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

      <div className="space-y-2">
        <Label htmlFor="description_bn">বিবরণ (বাংলা) *</Label>
        <Textarea
          id="description_bn"
          value={formData.description_bn}
          onChange={(e) => handleChange('description_bn', e.target.value)}
          placeholder="চাকরির বিস্তারিত বিবরণ লিখুন"
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
          placeholder="Enter detailed job description"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements_bn">যোগ্যতা (বাংলা)</Label>
        <Textarea
          id="requirements_bn"
          value={formData.requirements_bn}
          onChange={(e) => handleChange('requirements_bn', e.target.value)}
          placeholder="প্রয়োজনীয় যোগ্যতা লিখুন"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements_en">Requirements (English)</Label>
        <Textarea
          id="requirements_en"
          value={formData.requirements_en}
          onChange={(e) => handleChange('requirements_en', e.target.value)}
          placeholder="Enter job requirements"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefits_bn">সুবিধা (বাংলা)</Label>
        <Textarea
          id="benefits_bn"
          value={formData.benefits_bn}
          onChange={(e) => handleChange('benefits_bn', e.target.value)}
          placeholder="চাকরির সুবিধা লিখুন"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefits_en">Benefits (English)</Label>
        <Textarea
          id="benefits_en"
          value={formData.benefits_en}
          onChange={(e) => handleChange('benefits_en', e.target.value)}
          placeholder="Enter job benefits"
          rows={2}
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
