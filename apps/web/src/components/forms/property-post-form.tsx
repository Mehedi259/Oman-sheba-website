'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export function PropertyPostForm() {
  return (
    <div className="space-y-6">
      {/* প্রপার্টির শিরোনাম */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          প্রপার্টির শিরোনাম *
        </label>
        <Input placeholder="যেমন: ২ বেডরুমের ফ্ল্যাট ভাড়া দেওয়া হবে" />
      </div>

      {/* প্রপার্টির ধরন */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            প্রপার্টির ধরন *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="FLAT">ফ্ল্যাট/অ্যাপার্টমেন্ট</option>
            <option value="HOUSE">বাড়ি</option>
            <option value="VILLA">ভিলা</option>
            <option value="ROOM">রুম</option>
            <option value="BED_SPACE">বেড স্পেস</option>
            <option value="SHOP">দোকান</option>
            <option value="OFFICE">অফিস</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">
            উদ্দেশ্য *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="RENT">ভাড়া</option>
            <option value="SALE">বিক্রয়</option>
          </select>
        </div>
      </div>

      {/* বিস্তারিত বিবরণ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          প্রপার্টির বিস্তারিত বিবরণ *
        </label>
        <textarea
          className="w-full min-h-32 p-3 border rounded-md"
          placeholder="প্রপার্টির অবস্থা, সুবিধা, আশেপাশের পরিবেশ ইত্যাদি বিস্তারিত লিখুন..."
        />
      </div>

      {/* বেডরুম ও বাথরুম */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            বেডরুম সংখ্যা
          </label>
          <Input type="number" placeholder="যেমন: ২" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            বাথরুম সংখ্যা
          </label>
          <Input type="number" placeholder="যেমন: ১" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            ফ্লোর নম্বর
          </label>
          <Input type="number" placeholder="যেমন: ২" />
        </div>
      </div>

      {/* সাইজ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            প্রপার্টির আকার (বর্গফুট)
          </label>
          <Input type="number" placeholder="যেমন: ১২০০" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            ফার্নিশিং অবস্থা
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="FURNISHED">সম্পূর্ণ ফার্নিশড</option>
            <option value="SEMI_FURNISHED">আংশিক ফার্নিশড</option>
            <option value="UNFURNISHED">আনফার্নিশড</option>
          </select>
        </div>
      </div>

      {/* মূল্য */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            মাসিক ভাড়া/মূল্য (OMR) *
          </label>
          <Input type="number" placeholder="যেমন: ১৫০" />
        </div>
        <div className="flex items-center pt-8">
          <input type="checkbox" id="negotiable" className="mr-2" />
          <label htmlFor="negotiable" className="text-sm">
            দর দাম আলোচনা সাপেক্ষ
          </label>
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
            এলাকা *
          </label>
          <Input placeholder="যেমন: আল খুয়াইর, রুয়ি" />
        </div>
      </div>

      {/* ঠিকানা */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          সম্পূর্ণ ঠিকানা
        </label>
        <Input placeholder="বিল্ডিং নাম, রাস্তার নাম, ওয়ে নাম্বার ইত্যাদি" />
      </div>

      {/* উপলব্ধ থেকে */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          কখন থেকে উপলব্ধ
        </label>
        <Input type="date" />
      </div>

      {/* সুবিধাসমূহ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          সুবিধাসমূহ (প্রযোজ্য গুলো টিক করুন)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">এসি</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">পার্কিং</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">লিফট</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">বালকনি</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">সিকিউরিটি</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">জিম</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">সুইমিং পুল</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">ইন্টারনেট</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">রান্নাঘর</span>
          </label>
        </div>
      </div>

      {/* যোগাযোগ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            মালিকের নাম *
          </label>
          <Input placeholder="আপনার নাম লিখুন" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            যোগাযোগের ফোন নম্বর *
          </label>
          <Input placeholder="+968 XXXX XXXX" />
        </div>
      </div>

      {/* হোয়াটসঅ্যাপ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)
        </label>
        <Input placeholder="+968 XXXX XXXX" />
      </div>

      {/* ছবি */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          প্রপার্টির ছবি আপলোড করুন *
        </label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            ক্লিক করে বা ড্র্যাগ করে ছবি যোগ করুন
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            সর্বনিম্ন ৩টি, সর্বোচ্চ ১০টি ছবি (প্রতিটি ৫MB পর্যন্ত)
          </p>
        </div>
      </div>
    </div>
  );
}
