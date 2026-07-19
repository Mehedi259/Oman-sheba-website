'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { getFavorites, addFavorite, removeFavorite } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface FavoriteButtonProps {
  type: 'job' | 'property' | 'vehicle' | 'service' | 'classified';
  id: number;
}

export function FavoriteButton({ type, id }: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkFavorite();
    }
  }, [isAuthenticated, type, id]);

  const checkFavorite = async () => {
    try {
      const data = await getFavorites();
      if (Array.isArray(data)) {
        const found = data.find((f: any) => f.favorite_type === type && f.favorite_id === id);
        if (found) {
          setIsFavorite(true);
          setFavoriteId(found.id);
        }
      }
    } catch (err) {
      console.error('Error checking favorite:', err);
    }
  };

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast({ title: 'লগইন প্রয়োজন', description: 'পছন্দের তালিকায় যোগ করতে লগইন করুন', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    try {
      if (isFavorite && favoriteId) {
        await removeFavorite(favoriteId);
        setIsFavorite(false);
        setFavoriteId(null);
        toast({ title: 'সফল', description: 'পছন্দের তালিকা থেকে মুছে ফেলা হয়েছে' });
      } else {
        const res = await addFavorite(type, id);
        setIsFavorite(true);
        setFavoriteId(res.id);
        toast({ title: 'সফল', description: 'পছন্দের তালিকায় যোগ করা হয়েছে' });
      }
    } catch (err) {
      toast({ title: 'ত্রুটি', description: 'পছন্দের তালিকায় যোগ করতে সমস্যা হয়েছে', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleFavorite} 
      disabled={loading}
      className={isFavorite ? "bg-red-50 hover:bg-red-100 border-red-200" : ""}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
    </Button>
  );
}
