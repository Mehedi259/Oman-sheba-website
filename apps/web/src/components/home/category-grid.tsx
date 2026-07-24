'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const categories = [
  { nameBn: 'চাকরি', href: '/jobs', image: '/images/categories/jobs.jpg', color: 'bg-gradient-to-br from-blue-50 to-blue-100' },
  { nameBn: 'বাসা ভাড়া', href: '/properties', image: '/images/categories/properties.jpg', color: 'bg-gradient-to-br from-emerald-50 to-green-100' },
  { nameBn: 'গাড়ি', href: '/vehicles', image: '/images/categories/vehicles.jpg', color: 'bg-gradient-to-br from-purple-50 to-violet-100' },
  { nameBn: 'মার্কেট', href: '/classifieds', image: '/images/categories/classifieds.jpg', color: 'bg-gradient-to-br from-orange-50 to-amber-100' },
  { nameBn: 'কমিউনিটি', href: '/community', image: '/images/categories/community.jpg', color: 'bg-gradient-to-br from-indigo-50 to-blue-100' },
  { nameBn: 'ওমান - বাংলাদেশ দূতাবাস', href: '/services/embassy', image: '/images/categories/embassy.jpg', color: 'bg-gradient-to-br from-slate-50 to-gray-100' },
  { nameBn: 'বিশেষজ্ঞ ডাক্তার', href: '/services/doctors', image: '/images/categories/doctors.jpg', color: 'bg-gradient-to-br from-red-50 to-pink-100' },
  { nameBn: 'হাসপাতাল', href: '/services/hospitals', image: '/images/categories/hospitals.jpg', color: 'bg-gradient-to-br from-rose-50 to-red-100' },
  { nameBn: 'অ্যাম্বুলেন্স', href: '/services/ambulance', image: '/images/categories/ambulance.jpg', color: 'bg-gradient-to-br from-red-100 to-red-200' },
  { nameBn: 'আইনজীবী', href: '/services/lawyers', image: '/images/categories/lawyers.jpg', color: 'bg-gradient-to-br from-amber-50 to-yellow-100' },
  { nameBn: 'ট্রাভেল এজেন্সি', href: '/services/travel-agency', image: '/images/categories/travel.jpg', color: 'bg-gradient-to-br from-sky-50 to-cyan-100' },
  { nameBn: 'হোটেল', href: '/services/hotels', image: '/images/categories/hotels.jpg', color: 'bg-gradient-to-br from-purple-50 to-fuchsia-100' },
  { nameBn: 'মানি এক্সচেঞ্জ', href: '/services/money-exchange', image: '/images/categories/money.jpg', color: 'bg-gradient-to-br from-teal-50 to-emerald-100' },
  { nameBn: 'মক্তব সানাদ', href: '/services/maktab', image: '/images/categories/maktab.jpg', color: 'bg-gradient-to-br from-indigo-50 to-blue-100' },
  { nameBn: 'দর্শনীয় স্থান', href: '/services/tourist-places', image: '/images/categories/tourist.jpg', color: 'bg-gradient-to-br from-green-50 to-emerald-100' },
  { nameBn: 'পুলিশ স্টেশন', href: '/services/police', image: '/images/categories/police.jpg', color: 'bg-gradient-to-br from-blue-100 to-indigo-100' },
  { nameBn: 'জরুরী নম্বর', href: '/emergency', image: '/images/categories/emergency.jpg', color: 'bg-gradient-to-br from-rose-50 to-pink-100' },
  { nameBn: 'সংবাদ', href: '/news', image: '/images/categories/news.jpg', color: 'bg-gradient-to-br from-gray-50 to-slate-100' },
  { nameBn: 'হ্যালো ওমান', href: '#', image: '/images/categories/hello_oman.jpg', color: 'bg-gradient-to-br from-yellow-50 to-amber-100' },
]

export function CategoryGrid() {
  const [showAll, setShowAll] = useState(false)

  const visibleCategories = showAll ? categories : categories.slice(0, 11)

  return (
    <section className="py-6 sm:py-8 bg-background">
      <div className="container">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl md:text-4xl font-bold">আমাদের সেবাসমূহ</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {visibleCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col rounded-2xl border bg-card hover:shadow-xl transition-all hover:-translate-y-1.5 duration-300 overflow-hidden"
            >
              <div className="relative w-full h-28 sm:h-36 overflow-hidden bg-muted">
                <Image 
                  src={category.image} 
                  alt={category.nameBn} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-3 sm:p-4 flex items-center justify-center flex-grow bg-card">
                <span className="text-sm sm:text-base font-bold text-center leading-tight group-hover:text-primary transition-colors">
                  {category.nameBn}
                </span>
              </div>
            </Link>
          ))}
          
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="group flex flex-col rounded-2xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all hover:-translate-y-1.5 duration-300 overflow-hidden"
            >
              <div className="relative w-full h-28 sm:h-36 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
              <div className="p-3 sm:p-4 flex items-center justify-center flex-grow">
                <span className="text-sm sm:text-base font-bold text-center leading-tight text-primary">
                  আরও সেবা
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
