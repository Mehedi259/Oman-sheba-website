'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

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

function SliderImage({ src, alt }: { src: string; alt: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // If the image is already loaded from cache, trigger loaded state immediately
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth === 0) setStatus('error')
      else setStatus('loaded')
    }
  }, [src])

  return (
    <div className="relative w-full min-h-[150px] sm:min-h-[250px] md:min-h-[350px]">
      {status !== 'loaded' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {status === 'error' && (
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`relative w-full h-auto object-cover block transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}

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
    if (banner.image) {
      // If the backend returns an absolute HTTP URL, make it relative so Vercel rewrites can securely proxy it
      return banner.image.replace(/^http:\/\/[^\/]+/, '');
    }
    return '/hero/slide-platform.jpg'
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-4 md:px-6">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 md:rounded-3xl bg-gray-50/50">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-700 ease-out items-center"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => {
            const content = (
              <>
                <SliderImage src={getImageSrc(banner)} alt={banner.title || ''} />
              </>
            )

            return banner.is_external ? (
              <a
                key={banner.id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full shrink-0"
              >
                {content}
              </a>
            ) : (
              <Link
                key={banner.id}
                href={banner.link}
                className="relative block w-full shrink-0"
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
