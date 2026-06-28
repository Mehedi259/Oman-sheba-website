import Link from 'next/link'

const categories = [
  { nameBn: 'চাকরি', href: '/jobs', icon: '/icons/jobs.svg' },
  { nameBn: 'বাসা ভাড়া', href: '/properties', icon: '/icons/properties.svg' },
  { nameBn: 'গাড়ি', href: '/vehicles', icon: '/icons/vehicles.svg' },
  { nameBn: 'স্বাস্থ্যসেবা', href: '/services/healthcare', icon: '/icons/healthcare.svg' },
  { nameBn: 'পাসপোর্ট', href: '/services/passport', icon: '/icons/passport.svg' },
  { nameBn: 'ভিসা', href: '/services/visa', icon: '/icons/visa.svg' },
  { nameBn: 'ভ্রমণ', href: '/services/travel', icon: '/icons/travel.svg' },
  { nameBn: 'শিক্ষা', href: '/services/education', icon: '/icons/education.svg' },
  { nameBn: 'আইনগত সহায়তা', href: '/services/legal', icon: '/icons/legal.svg' },
  { nameBn: 'ব্যবসা', href: '/services/business', icon: '/icons/business.svg' },
  { nameBn: 'কমিউনিটি', href: '/community', icon: '/icons/community.svg' },
  { nameBn: 'ক্লাসিফাইড', href: '/classifieds', icon: '/icons/classifieds.svg' },
  { nameBn: 'রেস্টুরেন্ট', href: '/services/restaurant', icon: '/icons/restaurant.svg' },
  { nameBn: 'জরুরী নম্বর', href: '/emergency', icon: '/icons/emergency.svg' },
  { nameBn: 'সংবাদ', href: '/news', icon: '/icons/news.svg' },
  { nameBn: 'ফোরাম', href: '/forum', icon: '/icons/forum.svg' },
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
