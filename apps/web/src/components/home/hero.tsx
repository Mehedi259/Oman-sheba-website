'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  '/hero/slide-platform.jpg',
  '/hero/slide-housing.jpg',
  '/hero/slide-services.jpg',
  '/hero/slide-health.jpg',
]

const AUTOPLAY_MS = 4000

export function Hero() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index: number) => {
    setCurrent((index + images.length) % images.length)
  }, [])

  // Auto-advance the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [current])

  return (
    <section className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
      <div className="group relative h-36 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:h-48 md:h-60 md:rounded-3xl">
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>

        {/* Bottom gradient so dots stay legible on any image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />

        {/* Arrows (appear on hover for desktop) */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="আগের স্লাইড"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md backdrop-blur-sm transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          aria-label="পরের স্লাইড"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md backdrop-blur-sm transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
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
