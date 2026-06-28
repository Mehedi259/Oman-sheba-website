'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, 
  Home, 
  Car, 
  Tag, 
  MessageSquare,
  Upload,
  MapPin,
  DollarSign
} from 'lucide-react';

const categories = [
  { id: 'job', name: 'চাকরি পোস্ট', icon: Briefcase, color: 'bg-blue-500' },
  { id: 'property', name: 'প্রপার্টি', icon: Home, color: 'bg-green-500' },
  { id: 'vehicle', name: 'গাড়ি', icon: Car, color: 'bg-purple-500' },
  { id: 'classified', name: 'ক্লাসিফাইড', icon: Tag, color: 'bg-orange-500' },
  { id: 'discussion', name: 'আলোচনা', icon: MessageSquare, color: 'bg-pink-500' },
];

export default function CreatePostPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">নতুন পোস্ট করুন</h1>
          <p className="text-violet-100">
            আপনার চাকরি, প্রপার্টি, গাড়ি বা অন্যান্য বিজ্ঞাপন দিন
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {!selectedCategory ? (
            <>
              <h2 className="text-2xl font-bold mb-6">ক্যাটাগরি নির্বাচন করুন</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg">{category.name}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  {categories.find((c) => c.id === selectedCategory)?.name} পোস্ট তৈরি করুন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium mb-2 block">শিরোনাম *</label>
                  <Input placeholder="আপনার পোস্টের শিরোনাম লিখুন" />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">বিস্তারিত বিবরণ *</label>
                  <textarea
                    className="w-full min-h-32 p-3 border rounded-md"
                    placeholder="বিস্তারিত তথ্য লিখুন..."
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">শহর *</label>
                    <Input placeholder="যেমন: মাস্কাট" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">এলাকা</label>
                    <Input placeholder="যেমন: আল খুয়াইর" />
                  </div>
                </div>

                {/* Price */}
                {selectedCategory !== 'discussion' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">মূল্য (OMR)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                )}

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">ফোন নম্বর *</label>
                    <Input placeholder="+968 XXXX XXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">ইমেইল</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="text-sm font-medium mb-2 block">ছবি আপলোড করুন</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      ক্লিক করে বা ড্র্যাগ করে ছবি যোগ করুন
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      সর্বোচ্চ ৫টি ছবি (প্রতিটি ৫MB পর্যন্ত)
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedCategory('')}
                  >
                    পেছনে যান
                  </Button>
                  <Button className="flex-1">পোস্ট প্রকাশ করুন</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
