import Link from 'next/link'
import {
  Briefcase, Home, Car, Heart, FileText, Shield,
  Plane, GraduationCap, Scale, Building, Users,
  ShoppingBag, Wrench, Phone, MessageSquare, Newspaper
} from 'lucide-react'

const categories = [
  { name: 'চাকরি', nameBn: 'চাকরি', href: '/jobs', icon: Briefcase, color: 'bg-blue-500' },
  { name: 'বাসা ভাড়া', nameBn: 'বাসা ভাড়া', href: '/properties', icon: Home, color: 'bg-green-500' },
  { name: 'গাড়ি', nameBn: 'গাড়ি', href: '/vehicles', icon: Car, color: 'bg-orange-500' },
  { name: 'স্বাস্থ্যসেবা', nameBn: 'স্বাস্থ্যসেবা', href: '/services/healthcare', icon: Heart, color: 'bg-red-500' },
  { name: 'পাসপোর্ট', nameBn: 'পাসপোর্ট', href: '/services/passport', icon: FileText, color: 'bg-purple-500' },
  { name: 'ভিসা', nameBn: 'ভিসা', href: '/services/visa', icon: Shield, color: 'bg-indigo-500' },
  { name: 'ভ্রমণ', nameBn: 'ভ্রমণ', href: '/services/travel', icon: Plane, color: 'bg-cyan-500' },
  { name: 'শিক্ষা', nameBn: 'শিক্ষা', href: '/services/education', icon: GraduationCap, color: 'bg-yellow-500' },
  { name: 'আইনগত সহায়তা', nameBn: 'আইনগত সহায়তা', href: '/services/legal', icon: Scale, color: 'bg-gray-700' },
  { name: 'ব্যবসা', nameBn: 'ব্যবসা', href: '/services/business', icon: Building, color: 'bg-teal-500' },
  { name: 'কমিউনিটি', nameBn: 'কমিউনিটি', href: '/community', icon: Users, color: 'bg-pink-500' },
  { name: 'ক্লাসিফাইড', nameBn: 'ক্লাসিফাইড', href: '/classifieds', icon: ShoppingBag, color: 'bg-lime-500' },
  { name: 'রেস্টুরেন্ট', nameBn: 'রেস্টুরেন্ট', href: '/services/restaurant', icon: Wrench, color: 'bg-amber-500' },
  { name: 'জরুরী নম্বর', nameBn: 'জরুরী নম্বর', href: '/emergency', icon: Phone, color: 'bg-rose-500' },
  { name: 'সংবাদ', nameBn: 'সংবাদ', href: '/news', icon: Newspaper, color: 'bg-slate-600' },
  { name: 'ফোরাম', nameBn: 'ফোরাম', href: '/forum', icon: MessageSquare, color: 'bg-violet-500' },
]

type Category = (typeof categories)[number]

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon
  return (
    <Link
      href={category.href}
      className="group flex w-36 shrink-0 flex-col items-center rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`${category.color} mb-3 rounded-lg p-4 transition-transform group-hover:scale-110`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-center text-sm font-medium">{category.nameBn}</span>
    </Link>
  )
}

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">আমাদের সেবাসমূহ</h2>
          <p className="text-muted-foreground text-lg">যা প্রয়োজন সবকিছু এক জায়গায়</p>
        </div>
      </div>

      {/* Continuous left -> right marquee (pauses on hover) */}
      <div className="marquee-pause marquee-mask overflow-hidden">
        <div
          className="marquee flex w-max gap-4"
          style={{ ['--marquee-duration' as string]: '45s' }}
        >
          {/* Two identical copies for a seamless loop */}
          {[...categories, ...categories].map((category, i) => (
            <CategoryCard key={`${category.href}-${i}`} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
