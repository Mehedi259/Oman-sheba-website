'use client'

import { useState } from 'react'
import { Tag } from 'lucide-react'
import { getMediaUrl } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(images?.[0] || null)

  return (
    <div className="overflow-hidden border-0 shadow-md rounded-xl bg-card text-card-foreground">
      <div className="aspect-video bg-slate-100 relative group flex items-center justify-center">
        {selectedImage ? (
          <img 
            src={getMediaUrl(selectedImage)} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-400 flex flex-col items-center">
            <Tag className="h-16 w-16 mb-2 opacity-50" />
            <span>কোনো ছবি নেই</span>
          </div>
        )}
      </div>
      {/* Thumbnail Gallery */}
      {images && images.length > 1 && (
        <div className="p-4 flex gap-4 overflow-x-auto bg-slate-50 border-t">
          {images.map((imgUrl: string, idx: number) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(imgUrl)}
              className={`w-20 h-20 rounded-md overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${selectedImage === imgUrl ? 'border-purple-600' : 'border-transparent hover:border-purple-300'}`}
            >
              <img 
                src={getMediaUrl(imgUrl)} 
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
