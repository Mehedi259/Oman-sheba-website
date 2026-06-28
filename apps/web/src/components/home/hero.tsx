'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      
      <div className="container relative py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            ওমান বাংলাদেশীদের
            <br />
            <span className="text-yellow-300">বিশ্বস্ত সেবা প্ল্যাটফর্ম</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-blue-100 animate-slide-up">
            চাকরি, বাসা ভাড়া, গাড়ি, স্বাস্থ্যসেবা, আইনগত সহায়তা এবং আরো অনেক কিছু এক জায়গায়
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 shadow-2xl flex gap-2 animate-scale-in">
            <Input
              type="text"
              placeholder="চাকরি, বাসা, গাড়ি বা যেকোনো সেবা খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 text-gray-900 placeholder:text-gray-500"
            />
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-5 w-5 mr-2" />
              খুঁজুন
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">50,000+</div>
              <div className="text-sm text-blue-100">সদস্য</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">5,000+</div>
              <div className="text-sm text-blue-100">চাকরি</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">3,000+</div>
              <div className="text-sm text-blue-100">বাসা</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  )
}
