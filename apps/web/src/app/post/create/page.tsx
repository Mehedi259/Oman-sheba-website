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
import { useAuth } from '@/components/auth/auth-provider';
import { AuthModal } from '@/components/auth/auth-modal';
import { useRouter } from 'next/navigation';
import { JobPostForm } from '@/components/forms/job-post-form';
import { PropertyPostForm } from '@/components/forms/property-post-form';
import { VehiclePostForm } from '@/components/forms/vehicle-post-form';
import { ClassifiedPostForm } from '@/components/forms/classified-post-form';
import { DiscussionPostForm } from '@/components/forms/discussion-post-form';
import { ServicePostForm } from '@/components/forms/service-post-form';
import { Wrench } from 'lucide-react';

const categories = [
  { id: 'job', name: 'চাকরি পোস্ট', icon: Briefcase, color: 'bg-blue-500' },
  { id: 'property', name: 'প্রপার্টি', icon: Home, color: 'bg-green-500' },
  { id: 'vehicle', name: 'গাড়ি', icon: Car, color: 'bg-purple-500' },
  { id: 'classified', name: 'মার্কেট', icon: Tag, color: 'bg-orange-500' },
  { id: 'service', name: 'সেবা প্রদানকারী', icon: Wrench, color: 'bg-teal-500' },
  { id: 'discussion', name: 'আলোচনা', icon: MessageSquare, color: 'bg-pink-500' },
];

export default function CreatePostPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { isAuthenticated, isLoading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  if (!isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">লগইন প্রয়োজন</h2>
        <p className="text-muted-foreground mb-6">পোস্ট করার জন্য আপনাকে প্রথমে লগইন করতে হবে।</p>
        <Button onClick={() => setAuthModalOpen(true)}>লগইন করুন</Button>
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => {
            setAuthModalOpen(false);
            if (!isAuthenticated) router.push('/');
          }} 
        />
      </div>
    );
  }

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
                {selectedCategory === 'service' && <ServicePostForm />}
                {selectedCategory === 'discussion' && <DiscussionPostForm />}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
