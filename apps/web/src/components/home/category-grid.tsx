import Link from 'next/link'

const categories = [
  { nameBn: 'ওমান - বাংলাদেশ দূতাবাস', href: '/services/embassy', icon: '/icons/embassy.svg' },
  { nameBn: 'আম্বুলেন্স', href: '/services/ambulance', icon: '/icons/ambulance.svg' },
  { nameBn: 'চাকরি', href: '/jobs', icon: '/icons/jobs.svg' },
  { nameBn: 'বাসা ভাড়া', href: '/properties', icon: '/icons/properties.svg' },
  { nameBn: 'বিশেষজ্ঞ ডাক্তার', href: '/services/doctors', icon: '/icons/doctor.svg' },
  { nameBn: 'হাসপাতাল', href: '/services/hospitals', icon: '/icons/hospital.svg' },
  { nameBn: 'মক্তব সানাদ', href: '/services/maktab', icon: '/icons/maktab.svg' },
  { nameBn: 'ট্রাভেল এজেন্সি', href: '/services/travel-agency', icon: '/icons/travel.svg' },
  { nameBn: 'দর্শনীয় স্থান', href: '/services/tourist-places', icon: '/icons/tourism.svg' },
  { nameBn: 'আইনজীবী', href: '/services/lawyers', icon: '/icons/lawyer.svg' },
  { nameBn: 'হোটেল', href: '/services/hotels', icon: '/icons/hotel.svg' },
  { nameBn: 'মানি এক্সচেঞ্জ', href: '/services/money-exchange', icon: '/icons/money.svg' },
  { nameBn: 'মার্কেট', href: '/classifieds', icon: '/icons/classifieds.svg' },
  { nameBn: 'পুলিশ স্টেশন', href: '/services/police', icon: '/icons/police.svg' },
  { nameBn: 'হ্যালো ওমান', href: '/about', icon: '/icons/logo.svg' },
]

export function CategoryGrid() {
  return (
    <section className="py-6 sm:py-8 bg-background">
      <div className="container">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl md:text-4xl font-bold">আমাদের সেবাসমূহ</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-center p-3 sm:p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="mb-2 sm:mb-3 rounded-xl bg-muted/50 p-2.5 sm:p-3 group-hover:scale-110 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.icon}
                  alt=""
                  className="h-8 w-8 sm:h-10 sm:w-10"
                />
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
