'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export function VehiclePostForm() {
  return (
    <div className="space-y-6">
      {/* গাড়ির শিরোনাম */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          গাড়ির শিরোনাম *
        </label>
        <Input placeholder="যেমন: Toyota Corolla 2020 বিক্রয়" />
      </div>

      {/* গাড়ির ধরন */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            গাড়ির ধরন *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="CAR">গাড়ি</option>
            <option value="MOTORCYCLE">মোটরসাইকেল</option>
            <option value="TRUCK">ট্রাক</option>
            <option value="VAN">ভ্যান</option>
            <option value="BUS">বাস</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">
            উদ্দেশ্য *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="SALE">বিক্রয়</option>
            <option value="RENT">ভাড়া</option>
          </select>
        </div>
      </div>

      {/* ব্র্যান্ড ও মডেল */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            ব্র্যান্ড/মেক *
          </label>
          <Input placeholder="যেমন: Toyota, Nissan, Honda" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            মডেল *
          </label>
          <Input placeholder="যেমন: Corolla, Patrol, Civic" />
        </div>
      </div>

      {/* বছর ও রঙ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            মডেল বছর *
          </label>
          <Input type="number" placeholder="যেমন: 2020" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            রঙ
          </label>
          <Input placeholder="যেমন: সাদা, কালো, রূপালী" />
        </div>
      </div>

      {/* বিস্তারিত বিবরণ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          গাড়ির বিস্তারিত বিবরণ *
        </label>
        <textarea
          className="w-full min-h-32 p-3 border rounded-md"
          placeholder="গাড়ির অবস্থা, ফিচার, সার্ভিস হিস্ট্রি, দুর্ঘটনার ইতিহাস ইত্যাদি বিস্তারিত লিখুন..."
        />
      </div>

      {/* মাইলেজ ও অবস্থা */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            মাইলেজ (কিলোমিটার)
          </label>
          <Input type="number" placeholder="যেমন: ৫০০০০" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            গাড়ির অবস্থা *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="NEW">নতুন</option>
            <option value="USED_LIKE_NEW">প্রায় নতুন</option>
            <option value="USED_GOOD">ব্যবহৃত - ভালো</option>
            <option value="USED_FAIR">ব্যবহৃত - মোটামুটি</option>
            <option value="NEEDS_REPAIR">মেরামত প্রয়োজন</option>
          </select>
        </div>
      </div>

      {/* ট্রান্সমিশন ও ফুয়েল */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            ট্রান্সমিশন *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="AUTOMATIC">অটোমেটিক</option>
            <option value="MANUAL">ম্যানুয়াল</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            ফুয়েল টাইপ *
          </label>
          <select className="w-full p-3 border rounded-md bg-background">
            <option value="">নির্বাচন করুন</option>
            <option value="PETROL">পেট্রোল</option>
            <option value="DIESEL">ডিজেল</option>
            <option value="ELECTRIC">ইলেকট্রিক</option>
            <option value="HYBRID">হাইব্রিড</option>
          </select>
        </div>
      </div>

      {/* ইঞ্জিন ক্যাপাসিটি */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            ইঞ্জিন ক্যাপাসিটি
          </label>
          <Input placeholder="যেমন: 2.0L, 1.8L" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            সিট সংখ্যা
          </label>
          <Input type="number" placeholder="যেমন: ৫" />
        </div>
      </div>

      {/* ইন্স্যুরেন্স */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center pt-8">
          <input type="checkbox" id="insurance" className="mr-2" />
          <label htmlFor="insurance" className="text-sm">
            ইন্স্যুরেন্স আছে
          </label>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            ইন্স্যুরেন্স মেয়াদ শেষ
          </label>
          <Input type="date" />
        </div>
      </div>

      {/* মূল্য */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            মূল্য (OMR) *
          </label>
          <Input type="number" placeholder="যেমন: ৩৫০০" />
        </div>
        <div className="flex items-center pt-8">
          <input type="checkbox" id="vehicle-negotiable" className="mr-2" />
          <label htmlFor="vehicle-negotiable" className="text-sm">
            দর দাম আলোচনা সাপেক্ষ
          </label>
        </div>
      </div>

      {/* রেজিস্ট্রেশন */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          রেজিস্ট্রেশন নম্বর (ঐচ্ছিক)
        </label>
        <Input placeholder="গাড়ির প্লেট নম্বর" />
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
          গাড়ির ছবি আপলোড করুন *
        </label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            ক্লিক করে বা ড্র্যাগ করে ছবি যোগ করুন
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            সর্বনিম্ন ৪টি, সর্বোচ্চ ১০টি ছবি (প্রতিটি ৫MB পর্যন্ত)
          </p>
        </div>
      </div>
    </div>
  );
}
