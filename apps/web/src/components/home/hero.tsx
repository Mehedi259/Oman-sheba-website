'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SliderItem {
  id: number;
  title: string;
  title_bn: string;
  subtitle: string;
  subtitle_bn: string;
  image: string | null;
  cta_text: string;
  link: string;
  is_external: boolean;
  overlay_gradient: string;
}

// Fallback banners when API returns empty
const fallbackBanners: SliderItem[] = [
  {
    id: 0,
    title: 'Reliable Service Platform for Bangladeshis in Oman',
    title_bn: 'ওমানে বাংলাদেশীদের নির্ভরযোগ্য সেবা প্ল্যাটফর্ম',
    subtitle: 'Jobs • Housing • Vehicles • Healthcare',
    subtitle_bn: 'চাকরি • বাসা • গাড়ি • স্বাস্থ্যসেবা — সব এক ঠিকানায়',
    image: '/hero/slide-platform.jpg',
    cta_text: 'এক্সপ্লোর করুন',
    link: '/',
    is_external: false,
    overlay_gradient: 'from-blue-950/85 via-blue-900/55 to-transparent',
  },
]

const AUTOPLAY_MS = 4000

export function HeroSlider({ sliders }: { sliders: SliderItem[] }) {
  const banners = sliders.length > 0 ? sliders : fallbackBanners
  const [current, setCurrent] = useState(0)

  // Auto-advance the slider
  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [current, banners.length])

  // Helper to get the image source — use backend URL or local path
  const getImageSrc = (banner: SliderItem) => {
    if (banner.image) return banner.image
    return '/hero/slide-platform.jpg'
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-4 md:px-6">
      <div className="relative h-36 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:h-44 md:h-56 md:rounded-3xl">
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => {
            const content = (
              <>
                {/* Background photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageSrc(banner)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Readability gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.overlay_gradient}`} />

                {/* Ad copy */}
                <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12">
                  <h2 className="max-w-[80%] text-base font-bold leading-snug text-white drop-shadow sm:max-w-[70%] sm:text-xl md:text-2xl">
                    {banner.title_bn || banner.title}
                  </h2>
                  <p className="mt-1 max-w-[80%] text-[11px] text-white/90 sm:text-sm">
                    {banner.subtitle_bn || banner.subtitle}
                  </p>
                  <span className="mt-2.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-900 shadow-sm sm:text-xs">
                    {banner.cta_text}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </>
            )

            return banner.is_external ? (
              <a
                key={banner.id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-full w-full shrink-0"
              >
                {content}
              </a>
            ) : (
              <Link
                key={banner.id}
                href={banner.link}
                className="relative block h-full w-full shrink-0"
              >
                {content}
              </Link>
            )
          })}
        </div>

        {/* Dots */}
        {banners.length > 1 && (
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
        )}
      </div>
    </section>
  )
}
