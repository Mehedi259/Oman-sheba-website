'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronLeft, ChevronRight, Briefcase, Home, HeartPulse } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    icon: Briefcase,
    title: 'ওমান বাংলাদেশীদের',
    highlight: 'বিশ্বস্ত সেবা প্ল্যাটফর্ম',
    subtitle:
      'চাকরি, বাসা ভাড়া, গাড়ি, স্বাস্থ্যসেবা, আইনগত সহায়তা এবং আরো অনেক কিছু এক জায়গায়',
    image: '/hero/slide-platform.jpg',
    gradient: 'from-blue-700/55 via-blue-800/45 to-purple-800/55',
  },
  {
    icon: Home,
    title: 'আপনার পছন্দের',
    highlight: 'বাসা ও রুম খুঁজুন',
    subtitle:
      'মাস্কাট থেকে সালালাহ — সারা ওমানে ফ্ল্যাট, রুম শেয়ার ও বেড স্পেস এক ক্লিকে',
    image: '/hero/slide-housing.jpg',
    gradient: 'from-emerald-700/55 via-green-800/45 to-teal-800/55',
  },
  {
    icon: HeartPulse,
    title: 'যাচাইকৃত',
    highlight: 'সেবা প্রদানকারী',
    subtitle:
      'মেডিকেল, ভিসা, ট্রাভেল ও আইনি সহায়তা — সব যাচাইকৃত প্রতিষ্ঠানের কাছ থেকে',
    image: '/hero/slide-services.jpg',
    gradient: 'from-orange-600/55 via-rose-700/45 to-purple-800/55',
  },
]

const AUTOPLAY_MS = 5000

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [current])

  const active = slides[current]

  return (
    <section className="relative overflow-hidden text-white">
      {/* Sliding image backgrounds with tinted gradient overlay */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background photo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Color tint keeps the brand look + makes text readable */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      ))}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container relative py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Slides */}
          <div className="relative min-h-[200px] md:min-h-[240px]">
            {slides.map((slide, i) => {
              const Icon = slide.icon
              return (
                <div
                  key={i}
                  className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ${
                    i === current
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Icon className="h-7 w-7 text-yellow-300" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    {slide.title}
                    <br />
                    <span className="text-yellow-300">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-blue-50/90 max-w-2xl">
                    {slide.subtitle}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="আগের স্লাইড"
            className="absolute left-0 top-24 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition hover:bg-white/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            aria-label="পরের স্লাইড"
            className="absolute right-0 top-24 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition hover:bg-white/30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`স্লাইড ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? 'w-8 bg-yellow-300' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 shadow-2xl flex gap-2 mt-8 animate-scale-in">
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
