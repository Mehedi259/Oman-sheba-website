'use client'

import { useState, useEffect } from 'react'

const images = [
  '/hero/slide-platform.jpg',
  '/hero/slide-housing.jpg',
  '/hero/slide-services.jpg',
  '/hero/slide-health.jpg',
]

const AUTOPLAY_MS = 3500

export function Hero() {
  const [current, setCurrent] = useState(0)

  // Auto-advance the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-28 sm:h-36 md:h-44 overflow-hidden bg-muted">
      {/* Image-only crossfade slider */}
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== current}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`স্লাইড ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
