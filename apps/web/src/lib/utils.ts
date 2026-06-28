import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'OMR'): string {
  return new Intl.NumberFormat('en-OM', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string, locale: string = 'bn-BD'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'এইমাত্র'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} মিনিট আগে`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ঘন্টা আগে`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} দিন আগে`
  
  return formatDate(d)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
