'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { submitReview } from '@/lib/api';

interface InteractiveRatingCardProps {
  initialRating: number;
  initialReviewCount: number;
  serviceId: number;
  serviceType: string;
}

export function InteractiveRatingCard({
  initialRating,
  initialReviewCount,
  serviceId,
  serviceType
}: InteractiveRatingCardProps) {
  const [rating, setRating] = useState(initialRating);
  const [reviewCount, setReviewCount] = useState(initialReviewCount);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = async (selectedRating: number) => {
    if (isSubmitting || hasRated) return;
    
    setIsSubmitting(true);
    try {
      const response = await submitReview(serviceType, serviceId, selectedRating, '');
      if (response && response.success !== false) {
        setHasRated(true);
        // Optimistically update the rating UI
        const newTotal = (rating * reviewCount) + selectedRating;
        const newCount = reviewCount + 1;
        setRating(newCount > 0 ? newTotal / newCount : selectedRating);
        setReviewCount(newCount);
      }
    } catch (error) {
      console.error('Failed to submit rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-purple-200 bg-purple-50/30">
      <CardContent className="pt-6 text-center">
        <div 
          className="flex items-center justify-center gap-1 mb-2"
          onMouseLeave={() => !hasRated && setHoveredStar(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={isSubmitting || hasRated}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !hasRated && setHoveredStar(star)}
              className="focus:outline-none disabled:opacity-50 transition-transform hover:scale-110"
            >
              <Star 
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredStar || Math.round(rating)) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            </button>
          ))}
        </div>
        <p className="text-3xl font-bold text-purple-700">{rating.toFixed(1)}</p>
        <p className="text-sm text-muted-foreground">{reviewCount} রিভিউ</p>
        {hasRated && (
          <p className="text-xs text-green-600 font-medium mt-2">আপনার রেটিং এর জন্য ধন্যবাদ!</p>
        )}
      </CardContent>
    </Card>
  );
}
