'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export function ClassifiedPostForm() {
  return (
    <div className="space-y-6">
      {/* পণ্যের শিরোনাম */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          পণ্যের শিরোনাম *
        </label>
        <Input placeholder="যেমন: স্যামসাং ফ্রিজ বিক্রয়" />
      </div>

      {/* ক্যাটাগরি */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          ক্যাটাগরি *
        </label>
        <select className="w-full p-3 border rounded-md bg-background">
          <option value="">নির্বাচন করুন</option>
          <option value="electronics">ইলেকট্রনিক্স</option>
          <option value="furniture">ফার্নিচার</option>
          <option value="clothing">পোশাক</option>
          <option value="mobile">মোবাইল ও ট্যাবলেট</option>
          <option value="computer">কম্পিউটার ও ল্যাপটপ</option>
          <option value="appliances">গৃহস্থালী সামগ্রী</option>
          <option value="books">বই ও ম্যাগাজিন</option>
          <option value="sports">খেলাধুলা</option>
          <option value="baby">শিশুদের জিনিসপত্র</option>
          <option value="other">অন্যান্য</option>
        </select>
      </div>

      {/* বিস্তারিত বিবরণ */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          পণ্যের বিস্তারিত বিবরণ *
        </label>
        <textarea
          className="w-full min-h-32 p-3 border rounded-md"
          placeholder="পণ্যের অবস্থা, ব্র্যান্ড, মডেল, ব্যবহারের সময়কাল ইত্যাদি বিস্তারিত লিখুন..."
        />
      </div>

      {/* পণ্যের অবস্থা */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          পণ্যের অবস্থা *
        </label>
        <select className="w-full p-3 border rounded-md bg-background">
          <option value="">নির্বাচন করুন</option>
          <option value="NEW">নতুন</option>
          <option value="LIKE_NEW">প্রায় নতুন</option>
          <option value="GOOD">ভালো</option>
          <option value="FAIR">মোটামুটি</option>
          <option value="POOR">খারাপ</option>
        </select>
      </div>

      {/* মূল্য */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            মূল্য (টাকা) *
          </label>
          <Input type="number" placeholder="যেমন: ১৫০০০" />
        </div>
        <div className="flex items-center pt-8">
          <input type="checkbox" id="classified-negotiable" className="mr-2" />
          <label htmlFor="classified-negotiable" className="text-sm">
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
            এলাকা
          </label>
          <Input placeholder="যেমন: আল খুয়াইর, রুয়ি" />
        </div>
      </div>

      {/* যোগাযোগ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            বিক্রেতার নাম *
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
          পণ্যের ছবি আপলোড করুন *
        </label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            ক্লিক করে বা ড্র্যাগ করে ছবি যোগ করুন
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            সর্বনিম্ন ২টি, সর্বোচ্চ ৮টি ছবি (প্রতিটি ৫MB পর্যন্ত)
          </p>
        </div>
      </div>
    </div>
  );
}
