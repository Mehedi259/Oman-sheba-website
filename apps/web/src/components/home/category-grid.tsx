'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const categories = [
  { nameBn: 'চাকরি', href: '/jobs', image: '/images/categories/jobs.png', color: 'bg-gradient-to-br from-blue-50 to-blue-100' },
  { nameBn: 'বাসা ভাড়া', href: '/properties', image: '/images/categories/properties.png', color: 'bg-gradient-to-br from-emerald-50 to-green-100' },
  { nameBn: 'গাড়ি', href: '/vehicles', image: '/images/categories/vehicles.png', color: 'bg-gradient-to-br from-purple-50 to-violet-100' },
  { nameBn: 'মার্কেট', href: '/classifieds', image: '/images/categories/classifieds.png', color: 'bg-gradient-to-br from-orange-50 to-amber-100' },
  { nameBn: 'কমিউনিটি', href: '/community', image: '/images/categories/community.png', color: 'bg-gradient-to-br from-indigo-50 to-blue-100' },
  { nameBn: 'ওমান - বাংলাদেশ দূতাবাস', href: '/services/embassy', image: '/images/categories/embassy.png', color: 'bg-gradient-to-br from-slate-50 to-gray-100' },
  { nameBn: 'বিশেষজ্ঞ ডাক্তার', href: '/services/doctors', image: '/images/categories/doctors.png', color: 'bg-gradient-to-br from-red-50 to-pink-100' },
  { nameBn: 'হাসপাতাল', href: '/services/hospitals', image: '/images/categories/hospitals.png', color: 'bg-gradient-to-br from-rose-50 to-red-100' },
  { nameBn: 'অ্যাম্বুলেন্স', href: '/services/ambulance', image: '/images/categories/ambulance.png', color: 'bg-gradient-to-br from-red-100 to-red-200' },
  { nameBn: 'আইনজীবী', href: '/services/lawyers', image: '/images/categories/lawyers.png', color: 'bg-gradient-to-br from-amber-50 to-yellow-100' },
  { nameBn: 'ট্রাভেল এজেন্সি', href: '/services/travel-agency', image: '/images/categories/travel.png', color: 'bg-gradient-to-br from-sky-50 to-cyan-100' },
  { nameBn: 'হোটেল', href: '/services/hotels', image: '/images/categories/hotels.png', color: 'bg-gradient-to-br from-purple-50 to-fuchsia-100' },
  { nameBn: 'মানি এক্সচেঞ্জ', href: '/services/money-exchange', image: '/images/categories/money.png', color: 'bg-gradient-to-br from-teal-50 to-emerald-100' },
  { nameBn: 'মক্তব সানাদ', href: '/services/maktab', image: '/images/categories/maktab.png', color: 'bg-gradient-to-br from-indigo-50 to-blue-100' },
  { nameBn: 'দর্শনীয় স্থান', href: '/services/tourist-places', image: '/images/categories/tourist.png', color: 'bg-gradient-to-br from-green-50 to-emerald-100' },
  { nameBn: 'পুলিশ স্টেশন', href: '/services/police', image: '/images/categories/police.png', color: 'bg-gradient-to-br from-blue-100 to-indigo-100' },
  { nameBn: 'জরুরী নম্বর', href: '/emergency', image: '/images/categories/emergency.png', color: 'bg-gradient-to-br from-rose-50 to-pink-100' },
  { nameBn: 'সংবাদ', href: '/news', image: '/images/categories/news.png', color: 'bg-gradient-to-br from-gray-50 to-slate-100' },
  { nameBn: 'হ্যালো ওমান', href: '#', image: '/images/categories/hello_oman.jpg', color: 'bg-gradient-to-br from-yellow-50 to-amber-100' },
]

export function CategoryGrid() {
  return (
    <section className="py-6 sm:py-8 bg-background">
      <div className="container px-2 sm:px-4">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">আমাদের সেবাসমূহ</h2>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col rounded-xl border bg-card shadow-sm hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden p-2 sm:p-3"
            >
              <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center mb-2">
                <Image 
                  src={category.image} 
                  alt={category.nameBn} 
                  fill
                  className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </div>
              <div className="flex items-center justify-center flex-grow">
                <span className="text-[11px] sm:text-sm font-semibold text-center leading-tight text-black dark:text-white group-hover:text-primary transition-colors">
                  {category.nameBn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
