'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export function JobPostForm() {
  return (
    <div className="space-y-6">
      {/* চাকরির শিরোনাম */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          চাকরির শিরোনাম *
        </label>
        <Input placeholder="যেমন: রেস্টুরেন্ট ম্যানেজার প্রয়োজন" />
      </div>

      {/* কোম্পানির নাম */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          কোম্পানির নাম *
        </label>
        <Input placeholder="যেমন: আল-বারাকা রেস্টুরেন্ট" />
      </div>

      {/* চাকরির ধরন */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            চাকরির ধরন *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="FULL_TIME">ফুল টাইম</option>
            <option value="PART_TIME">পার্ট টাইম</option>
            <option value="CONTRACT">কন্ট্রাক্ট</option>
            <option value="TEMPORARY">অস্থায়ী</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">
            চাকরির ক্যাটাগরি *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="restaurant">রেস্টুরেন্ট/হোটেল</option>
            <option value="construction">নির্মাণ কাজ</option>
            <option value="driver">ড্রাইভার</option>
            <option value="sales">বিক্রয়</option>
            <option value="office">অফিস কাজ</option>
            <option value="cleaning">পরিষ্কার-পরিচ্ছন্নতা</option>
            <option value="security">নিরাপত্তা</option>
            <option value="other">অন্যান্য</option>
          </select>
        </div>
      </div>

      {/* বিস্তারিত বিবরণ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          চাকরির বিস্তারিত বিবরণ *
        </label>
        <textarea
          className="w-full min-h-32 p-3 border rounded-md"
          placeholder="চাকরির দায়িত্ব, যোগ্যতা, কাজের সময় ইত্যাদি বিস্তারিত লিখুন..."
        />
      </div>

      {/* অভিজ্ঞতা ও শিক্ষা */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            প্রয়োজনীয় অভিজ্ঞতা
          </label>
          <Input placeholder="যেমন: ২-৩ বছর" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            শিক্ষাগত যোগ্যতা
          </label>
          <Input placeholder="যেমন: এসএসসি/এইচএসসি" />
        </div>
      </div>

      {/* বেতন */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            সর্বনিম্ন বেতন (OMR)
          </label>
          <Input type="number" placeholder="যেমন: ১৫০" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            সর্বোচ্চ বেতন (OMR)
          </label>
          <Input type="number" placeholder="যেমন: ২০০" />
        </div>
      </div>

      {/* শহর ও এলাকা */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            শহর *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="Muscat">মাস্কাট</option>
            <option value="Salalah">সালালাহ</option>
            <option value="Sohar">সোহার</option>
            <option value="Nizwa">নিজওয়া</option>
            <option value="Sur">সুর</option>
            <option value="Ibri">ইবরি</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            এলাকা
          </label>
          <Input placeholder="যেমন: আল খুয়াইর, রুয়ি" />
        </div>
      </div>

      {/* পদের সংখ্যা */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          পদের সংখ্যা
        </label>
        <Input type="number" placeholder="যেমন: ২" defaultValue="1" />
      </div>

      {/* আবেদনের শেষ তারিখ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          আবেদনের শেষ তারিখ
        </label>
        <Input type="date" />
      </div>

      {/* যোগাযোগ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            যোগাযোগের ফোন নম্বর *
          </label>
          <Input placeholder="+968 XXXX XXXX" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            ইমেইল (ঐচ্ছিক)
          </label>
          <Input type="email" placeholder="company@example.com" />
        </div>
      </div>

      {/* WhatsApp */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)
        </label>
        <Input placeholder="+968 XXXX XXXX" />
      </div>

      {/* কোম্পানি লোগো */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          কোম্পানি লোগো আপলোড করুন (ঐচ্ছিক)
        </label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            ক্লিক করে বা ড্র্যাগ করে ছবি যোগ করুন
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG (সর্বোচ্চ ২MB)
          </p>
        </div>
      </div>

      {/* সুবিধাসমূহ (ঐচ্ছিক) */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          অতিরিক্ত সুবিধাসমূহ (ঐচ্ছিক)
        </label>
        <textarea
          className="w-full min-h-24 p-3 border rounded-md"
          placeholder="যেমন: থাকা-খাওয়ার ব্যবস্থা, ওভারটাইম, বোনাস ইত্যাদি"
        />
      </div>
    </div>
  );
}
