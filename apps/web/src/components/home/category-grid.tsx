import Link from 'next/link'

const categories = [
  { 
    nameBn: 'চাকরি', 
    href: '/jobs', 
    icon: '💼',
    color: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  { 
    nameBn: 'বাসা ভাড়া', 
    href: '/properties', 
    icon: '🏠',
    color: 'bg-gradient-to-br from-emerald-50 to-green-100'
  },
  { 
    nameBn: 'গাড়ি', 
    href: '/vehicles', 
    icon: '🚗',
    color: 'bg-gradient-to-br from-purple-50 to-violet-100'
  },
  { 
    nameBn: 'বিশেষজ্ঞ ডাক্তার', 
    href: '/services/doctors', 
    icon: '👨‍⚕️',
    color: 'bg-gradient-to-br from-red-50 to-pink-100'
  },
  { 
    nameBn: 'হাসপাতাল', 
    href: '/services/hospitals', 
    icon: '🏥',
    color: 'bg-gradient-to-br from-rose-50 to-red-100'
  },
  { 
    nameBn: 'ট্রাভেল এজেন্সি', 
    href: '/services/travel-agency', 
    icon: '✈️',
    color: 'bg-gradient-to-br from-sky-50 to-cyan-100'
  },
  { 
    nameBn: 'আইনজীবী', 
    href: '/services/lawyers', 
    icon: '⚖️',
    color: 'bg-gradient-to-br from-amber-50 to-yellow-100'
  },
  { 
    nameBn: 'মার্কেট', 
    href: '/classifieds', 
    icon: '🛒',
    color: 'bg-gradient-to-br from-orange-50 to-amber-100'
  },
  { 
    nameBn: 'মক্তব সানাদ', 
    href: '/services/maktab', 
    icon: '📜',
    color: 'bg-gradient-to-br from-indigo-50 to-blue-100'
  },
  { 
    nameBn: 'মানি এক্সচেঞ্জ', 
    href: '/services/money-exchange', 
    icon: '💱',
    color: 'bg-gradient-to-br from-teal-50 to-emerald-100'
  },
  { 
    nameBn: 'জরুরী সেবা', 
    href: '/emergency', 
    icon: '🚨',
    color: 'bg-gradient-to-br from-rose-50 to-pink-100'
  },
  { 
    nameBn: 'আরো সেবা', 
    href: '/services', 
    icon: '📋',
    color: 'bg-gradient-to-br from-slate-50 to-gray-100'
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
              <div className={`mb-2 sm:mb-3 rounded-xl ${category.color} p-2.5 sm:p-3 group-hover:scale-110 transition-transform shadow-sm`}>
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
