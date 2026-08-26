'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createJobSeekerProfile, uploadClassifiedImage } from '@/lib/api';

export default function CreateProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    professional_title: '',
    years_of_experience: 0,
    education_level: '',
    summary: '',
    expected_salary: '',
    skillsStr: '',
    phone: '',
    city: '',
    area: ''
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const skills = formData.skillsStr.split(',').map(s => s.trim()).filter(s => s);
      const dataToSubmit = {
        professional_title: formData.professional_title,
        years_of_experience: Number(formData.years_of_experience),
        education_level: formData.education_level,
        summary: formData.summary,
        expected_salary: formData.expected_salary ? Number(formData.expected_salary) : null,
        skills,
        phone: formData.phone,
        city: formData.city,
        area: formData.area
      };
      
      const response = await createJobSeekerProfile(dataToSubmit);
      
      if (files.length > 0 && response.id) {
        await Promise.all(
          files.map((file, index) => 
            uploadClassifiedImage(file, 'others', response.id, index === 0)
          )
        );
      }
      
      alert('আপনার প্রোফাইল সফলভাবে তৈরি হয়েছে!');
      router.push('/jobs/candidates');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'প্রোফাইল তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-700">চাকরিপ্রার্থী প্রোফাইল তৈরি করুন</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">পেশা বা টাইটেল <span className="text-red-500">*</span></label>
              <Input 
                name="professional_title" 
                placeholder="যেমন: সিনিয়র প্লাম্বার, ডাটা এন্ট্রি অপারেটর" 
                value={formData.professional_title}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">অভিজ্ঞতা (বছর) <span className="text-red-500">*</span></label>
                <Input 
                  name="years_of_experience" 
                  type="number" 
                  min="0"
                  value={formData.years_of_experience}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">শিক্ষাগত যোগ্যতা</label>
                <Input 
                  name="education_level" 
                  placeholder="যেমন: এস.এস.সি, এইচ.এস.সি"
                  value={formData.education_level}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">দক্ষতা (কমা দিয়ে আলাদা করুন)</label>
              <Input 
                name="skillsStr" 
                placeholder="প্লাম্বিং, ইলেকট্রিক্যাল কাজ, ড্রাইভিং..."
                value={formData.skillsStr}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">যেমন: প্লাম্বিং, এসি রিপেয়ার, কারপেন্ট্রি</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">আপনার সম্পর্কে (Summary)</label>
              <Textarea 
                name="summary" 
                placeholder="আপনার কাজের অভিজ্ঞতা এবং দক্ষতা সম্পর্কে বিস্তারিত লিখুন..." 
                rows={4}
                value={formData.summary}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">প্রত্যাশিত বেতন (OMR)</label>
              <Input 
                name="expected_salary" 
                type="number" 
                min="0"
                placeholder="যেমন: 200"
                value={formData.expected_salary}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">ফোন নম্বর</label>
                <Input 
                  name="phone" 
                  type="tel"
                  placeholder="আপনার ফোন নম্বর"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">লোকেশন (শহর)</label>
                <Input 
                  name="city" 
                  placeholder="যেমন: মাস্কাট"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">লোকেশন (এলাকা/Area)</label>
              <Input 
                name="area" 
                placeholder="যেমন: রুই, সিব"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">সার্টিফিকেট / আইডি / কাজের ছবি</label>
              <Input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                className="cursor-pointer file:text-blue-700"
              />
              {files.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">{files.length} টি ফাইল নির্বাচন করা হয়েছে</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'প্রোফাইল তৈরি হচ্ছে...' : 'প্রোফাইল তৈরি করুন'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
