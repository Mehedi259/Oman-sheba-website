'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  Home, 
  Car, 
  Tag, 
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { JobPostForm } from '@/components/forms/job-post-form';
import { PropertyPostForm } from '@/components/forms/property-post-form';
import { VehiclePostForm } from '@/components/forms/vehicle-post-form';
import { ClassifiedPostForm } from '@/components/forms/classified-post-form';
import { DiscussionPostForm } from '@/components/forms/discussion-post-form';

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
              <CardHeader className="border-b">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory('')}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    পেছনে যান
                  </Button>
                  <div>
                    <CardTitle>
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      সকল তথ্য সঠিকভাবে পূরণ করুন
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Render appropriate form based on category */}
                {selectedCategory === 'job' && <JobPostForm />}
                {selectedCategory === 'property' && <PropertyPostForm />}
                {selectedCategory === 'vehicle' && <VehiclePostForm />}
                {selectedCategory === 'classified' && <ClassifiedPostForm />}
                {selectedCategory === 'discussion' && <DiscussionPostForm />}

                {/* Actions */}
                <div className="flex gap-4 pt-8 mt-8 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedCategory('')}
                  >
                    বাতিল করুন
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                    পোস্ট প্রকাশ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
