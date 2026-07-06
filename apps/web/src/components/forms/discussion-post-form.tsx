'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export function DiscussionPostForm() {
  return (
    <div className="space-y-6">
      {/* আলোচনার শিরোনাম */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          আলোচনার শিরোনাম *
        </label>
        <Input placeholder="যেমন: ওমানে ড্রাইভিং লাইসেন্স নবায়ন সম্পর্কে জানতে চাই" />
      </div>

      {/* ক্যাটাগরি */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          ক্যাটাগরি *
        </label>
        <select className="w-full p-3 border rounded-md bg-background">
          <option value="">নির্বাচন করুন</option>
          <option value="visa">ভিসা সম্পর্কিত</option>
          <option value="job">চাকরি সম্পর্কিত</option>
          <option value="housing">বাসস্থান সম্পর্কিত</option>
          <option value="legal">আইনি পরামর্শ</option>
          <option value="medical">চিকিৎসা সেবা</option>
          <option value="education">শিক্ষা</option>
          <option value="travel">ভ্রমণ</option>
          <option value="lifestyle">জীবনযাত্রা</option>
          <option value="general">সাধারণ</option>
        </select>
      </div>

      {/* বিস্তারিত প্রশ্ন/আলোচনা */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          বিস্তারিত লিখুন *
        </label>
        <textarea
          className="w-full min-h-40 p-3 border rounded-md"
          placeholder="আপনার প্রশ্ন বা আলোচনার বিষয় বিস্তারিত লিখুন..."
        />
      </div>

      {/* ট্যাগ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          ট্যাগ (ঐচ্ছিক)
        </label>
        <Input placeholder="যেমন: ভিসা, লাইসেন্স, ওয়ার্ক পারমিট (কমা দিয়ে আলাদা করুন)" />
        <p className="text-xs text-muted-foreground mt-1">
          প্রাসঙ্গিক ট্যাগ যোগ করুন যাতে অন্যরা সহজে খুঁজে পায়
        </p>
      </div>

      {/* ছবি (ঐচ্ছিক) */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          ছবি আপলোড করুন (ঐচ্ছিক)
        </label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            প্রয়োজনে স্ক্রিনশট বা সংশ্লিষ্ট ছবি যোগ করুন
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            সর্বোচ্চ ৩টি ছবি (প্রতিটি ৫MB পর্যন্ত)
          </p>
        </div>
      </div>

      {/* নোটিফিকেশন */}
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" defaultChecked />
          <span className="text-sm">উত্তর পেলে আমাকে ইমেইল/নোটিফিকেশন পাঠান</span>
        </label>
      </div>
    </div>
  );
}
