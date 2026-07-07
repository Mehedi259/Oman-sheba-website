import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const allCategories = [
  // Main Categories
  { 
    nameBn: 'চাকরি', 
    href: '/jobs', 
    icon: '💼',
    color: 'from-blue-500 to-blue-600',
    description: 'চাকরি খুঁজুন এবং আবেদন করুন'
  },
  { 
    nameBn: 'বাসা ভাড়া', 
    href: '/properties', 
    icon: '🏠',
    color: 'from-green-500 to-green-600',
    description: 'ফ্ল্যাট, রুম এবং বেড স্পেস'
  },
  { 
    nameBn: 'গাড়ি', 
    href: '/vehicles', 
    icon: '🚗',
    color: 'from-purple-500 to-purple-600',
    description: 'গাড়ি কিনুন বা ভাড়া নিন'
  },
  { 
    nameBn: 'মার্কেট', 
    href: '/classifieds', 
    icon: '🛒',
    color: 'from-orange-500 to-red-500',
    description: 'কিনুন এবং বিক্রি করুন'
  },
  { 
    nameBn: 'কমিউনিটি', 
    href: '/community', 
    icon: '👥',
    color: 'from-pink-500 to-rose-600',
    description: 'আলোচনা এবং সহযোগিতা'
  },
  
  // Services
  { 
    nameBn: 'ওমান - বাংলাদেশ দূতাবাস', 
    href: '/services/embassy', 
    icon: '🏛️',
    color: 'from-blue-600 to-indigo-700',
    description: 'দূতাবাস সেবা এবং সহায়তা'
  },
  { 
    nameBn: 'বিশেষজ্ঞ ডাক্তার', 
    href: '/services/doctors', 
    icon: '👨‍⚕️',
    color: 'from-red-500 to-pink-600',
    description: 'বিশেষজ্ঞ চিকিৎসক এবং পরামর্শ'
  },
  { 
    nameBn: 'হাসপাতাল', 
    href: '/services/hospitals', 
    icon: '🏥',
    color: 'from-red-400 to-red-500',
    description: 'হাসপাতাল এবং ক্লিনিক'
  },
  { 
    nameBn: 'আম্বুলেন্স', 
    href: '/services/ambulance', 
    icon: '🚑',
    color: 'from-red-600 to-rose-700',
    description: 'জরুরী অ্যাম্বুলেন্স সেবা'
  },
  { 
    nameBn: 'আইনজীবী', 
    href: '/services/lawyers', 
    icon: '⚖️',
    color: 'from-amber-500 to-orange-600',
    description: 'আইনি পরামর্শ এবং সহায়তা'
  },
  { 
    nameBn: 'ট্রাভেল এজেন্সি', 
    href: '/services/travel-agency', 
    icon: '✈️',
    color: 'from-cyan-500 to-blue-500',
    description: 'ফ্লাইট এবং ট্যুর বুকিং'
  },
  { 
    nameBn: 'হোটেল', 
    href: '/services/hotels', 
    icon: '🏨',
    color: 'from-indigo-500 to-purple-600',
    description: 'হোটেল এবং আবাসন'
  },
  { 
    nameBn: 'মানি এক্সচেঞ্জ', 
    href: '/services/money-exchange', 
    icon: '💱',
    color: 'from-emerald-500 to-green-600',
    description: 'মানি ট্রান্সফার এবং এক্সচেঞ্জ'
  },
  { 
    nameBn: 'মক্তব সানাদ', 
    href: '/services/maktab', 
    icon: '📜',
    color: 'from-teal-500 to-cyan-600',
    description: 'মক্তব সার্টিফিকেট সেবা'
  },
  { 
    nameBn: 'দর্শনীয় স্থান', 
    href: '/services/tourist-places', 
    icon: '🗿',
    color: 'from-lime-500 to-green-600',
    description: 'ওমানের পর্যটন স্থান'
  },
  { 
    nameBn: 'পুলিশ স্টেশন', 
    href: '/services/police', 
    icon: '👮',
    color: 'from-slate-600 to-blue-700',
    description: 'পুলিশ স্টেশন তথ্য'
  },
  { 
    nameBn: 'জরুরী নম্বর', 
    href: '/emergency', 
    icon: '🚨',
    color: 'from-rose-500 to-red-600',
    description: 'জরুরী যোগাযোগ নম্বর'
  },
  { 
    nameBn: 'সংবাদ', 
    href: '/news', 
    icon: '📰',
    color: 'from-gray-600 to-slate-700',
    description: 'সর্বশেষ সংবাদ'
  },
  { 
    nameBn: 'হ্যালো ওমান সম্পর্কে', 
    href: '/about', 
    icon: '💫',
    color: 'from-violet-500 to-purple-600',
    description: 'আমাদের সম্পর্কে জানুন'
  },
]


export default function AllServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">সকল সেবাসমূহ</h1>
          <p className="text-xl text-violet-100">
            ওমানে বসবাসের জন্য প্রয়োজনীয় সকল সেবা এক জায়গায়
          </p>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {allCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group"
              >
                <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-border bg-card hover:shadow-xl transition-all hover:-translate-y-2 h-full">
                  <div className={`mb-4 rounded-2xl bg-gradient-to-br ${category.color} p-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-center mb-2">
                    {category.nameBn}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-violet-600 group-hover:text-violet-700 text-sm font-medium">
                    বিস্তারিত <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">আপনার প্রয়োজনীয় সেবা খুঁজে পাচ্ছেন না?</h2>
            <p className="text-muted-foreground mb-6">
              আমাদের সাথে যোগাযোগ করুন অথবা কমিউনিটিতে প্রশ্ন করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/community"
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                কমিউনিটিতে প্রশ্ন করুন <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/post/create"
                className="px-6 py-3 border-2 border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                পোস্ট করুন <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
