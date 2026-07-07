'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const banners = [
  {
    image: '/hero/slide-platform.jpg',
    overlay: 'from-blue-950/85 via-blue-900/55 to-transparent',
    title: 'ওমানে বাংলাদেশীদের নির্ভরযোগ্য সেবা প্ল্যাটফর্ম',
    subtitle: 'চাকরি • বাসা • গাড়ি • স্বাস্থ্যসেবা — সব এক ঠিকানায়',
    cta: 'এক্সপ্লোর করুন',
    href: '/',
    external: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
    overlay: 'from-cyan-950/85 via-blue-900/55 to-transparent',
    title: 'মুসাফলাই - আপনার বিশ্বস্ত ট্রাভেল পার্টনার',
    subtitle: 'সাশ্রয়ী মূল্যে ফ্লাইট টিকেট • হোটেল বুকিং • ট্যুর প্যাকেজ',
    cta: 'বিস্তারিত দেখুন',
    href: 'https://musafly-website.vercel.app/',
    external: true,
  },
  {
    image: '/hero/slide-housing.jpg',
    overlay: 'from-emerald-950/85 via-emerald-900/55 to-transparent',
    title: 'পছন্দের বাসা ও রুম খুঁজুন',
    subtitle: 'সারা ওমানে ফ্ল্যাট • রুম শেয়ার • বেড স্পেস',
    cta: 'বাসা দেখুন',
    href: '/properties',
    external: false,
  },
  {
    image: '/hero/slide-services.jpg',
    overlay: 'from-orange-950/85 via-rose-900/55 to-transparent',
    title: 'যাচাইকৃত সেবা প্রদানকারী',
    subtitle: 'মেডিকেল • ভিসা • ট্রাভেল • আইনি সহায়তা',
    cta: 'সেবা নিন',
    href: '/services',
    external: false,
  },
  {
    image: '/hero/slide-health.jpg',
    overlay: 'from-sky-950/85 via-sky-900/55 to-transparent',
    title: 'স্বাস্থ্যসেবা এখন হাতের নাগালে',
    subtitle: 'বিশ্বস্ত ডাক্তার, ক্লিনিক ও হাসপাতাল',
    cta: 'বিস্তারিত',
    href: '/services/healthcare',
    external: false,
  },
]

const AUTOPLAY_MS = 4000

export function Hero() {
  const [current, setCurrent] = useState(0)

  // Auto-advance the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [current])

  return (
    <section className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-4 md:px-6">
      <div className="relative h-36 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:h-44 md:h-56 md:rounded-3xl">
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            banner.external ? (
              <a
                key={banner.image}
                href={banner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-full w-full shrink-0"
              >
                {/* Background photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Readability gradient (text sits on the left) */}
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.overlay}`} />

                {/* Ad copy */}
                <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12">
                  <h2 className="max-w-[80%] text-base font-bold leading-snug text-white drop-shadow sm:max-w-[70%] sm:text-xl md:text-2xl">
                    {banner.title}
                  </h2>
                  <p className="mt-1 max-w-[80%] text-[11px] text-white/90 sm:text-sm">
                    {banner.subtitle}
                  </p>
                  <span className="mt-2.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-900 shadow-sm sm:text-xs">
                    {banner.cta}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </a>
            ) : (
              <Link
                key={banner.image}
                href={banner.href}
                className="relative block h-full w-full shrink-0"
              >
              {/* Background photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={banner.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Readability gradient (text sits on the left) */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.overlay}`} />

              {/* Ad copy */}
              <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12">
                <h2 className="max-w-[80%] text-base font-bold leading-snug text-white drop-shadow sm:max-w-[70%] sm:text-xl md:text-2xl">
                  {banner.title}
                </h2>
                <p className="mt-1 max-w-[80%] text-[11px] text-white/90 sm:text-sm">
                  {banner.subtitle}
                </p>
                <span className="mt-2.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-900 shadow-sm sm:text-xs">
                  {banner.cta}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
            )
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 right-4 z-10 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`স্লাইড ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
