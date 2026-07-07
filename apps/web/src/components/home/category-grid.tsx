import Link from 'next/link'

const categories = [
  { 
    nameBn: 'চাকরি', 
    href: '/jobs', 
    icon: '💼',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    nameBn: 'বাসা ভাড়া', 
    href: '/properties', 
    icon: '🏠',
    color: 'from-green-500 to-green-600'
  },
  { 
    nameBn: 'গাড়ি', 
    href: '/vehicles', 
    icon: '🚗',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    nameBn: 'বিশেষজ্ঞ ডাক্তার', 
    href: '/services/doctors', 
    icon: '👨‍⚕️',
    color: 'from-red-500 to-pink-600'
  },
  { 
    nameBn: 'হাসপাতাল', 
    href: '/services/hospitals', 
    icon: '🏥',
    color: 'from-red-400 to-red-500'
  },
  { 
    nameBn: 'ট্রাভেল এজেন্সি', 
    href: '/services/travel-agency', 
    icon: '✈️',
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    nameBn: 'আইনজীবী', 
    href: '/services/lawyers', 
    icon: '⚖️',
    color: 'from-amber-500 to-orange-600'
  },
  { 
    nameBn: 'মার্কেট', 
    href: '/classifieds', 
    icon: '🛒',
    color: 'from-orange-500 to-red-500'
  },
  { 
    nameBn: 'হোটেল', 
    href: '/services/hotels', 
    icon: '🏨',
    color: 'from-indigo-500 to-purple-600'
  },
  { 
    nameBn: 'মানি এক্সচেঞ্জ', 
    href: '/services/money-exchange', 
    icon: '💱',
    color: 'from-emerald-500 to-green-600'
  },
  { 
    nameBn: 'জরুরী সেবা', 
    href: '/emergency', 
    icon: '🚨',
    color: 'from-rose-500 to-red-600'
  },
  { 
    nameBn: 'আরো সেবা', 
    href: '/services', 
    icon: '📋',
    color: 'from-slate-500 to-gray-600'
  },
]

export function CategoryGrid() {
  return (
    <section className="py-6 sm:py-8 bg-background">
      <div className="container">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl md:text-4xl font-bold">আমাদের সেবাসমূহ</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-center p-3 sm:p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`mb-2 sm:mb-3 rounded-xl bg-gradient-to-br ${category.color} p-2.5 sm:p-3 group-hover:scale-110 transition-transform shadow-md`}>
                <span className="text-2xl sm:text-3xl">{category.icon}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                {category.nameBn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
