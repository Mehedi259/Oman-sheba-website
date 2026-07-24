export const dynamic = 'force-dynamic';
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const allCategories = [
  // Main Categories
  { 
    nameBn: 'চাকরি', 
    href: '/jobs', 
    image: '/images/categories/jobs.jpg',
    description: 'চাকরি খুঁজুন এবং আবেদন করুন'
  },
  { 
    nameBn: 'বাসা ভাড়া', 
    href: '/properties', 
    image: '/images/categories/properties.jpg',
    description: 'ফ্ল্যাট, রুম এবং বেড স্পেস'
  },
  { 
    nameBn: 'গাড়ি', 
    href: '/vehicles', 
    image: '/images/categories/vehicles.jpg',
    description: 'গাড়ি কিনুন বা ভাড়া নিন'
  },
  { 
    nameBn: 'মার্কেট', 
    href: '/classifieds', 
    image: '/images/categories/classifieds.jpg',
    description: 'কিনুন এবং বিক্রি করুন'
  },
  { 
    nameBn: 'কমিউনিটি', 
    href: '/community', 
    image: '/images/categories/community.jpg',
    description: 'আলোচনা এবং সহযোগিতা'
  },
  
  // Services
  { 
    nameBn: 'ওমান - বাংলাদেশ দূতাবাস', 
    href: '/services/embassy', 
    image: '/images/categories/embassy.jpg',
    description: 'দূতাবাস সেবা এবং সহায়তা'
  },
  { 
    nameBn: 'বিশেষজ্ঞ ডাক্তার', 
    href: '/services/doctors', 
    image: '/images/categories/doctors.jpg',
    description: 'বিশেষজ্ঞ চিকিৎসক এবং পরামর্শ'
  },
  { 
    nameBn: 'হাসপাতাল', 
    href: '/services/hospitals', 
    image: '/images/categories/hospitals.jpg',
    description: 'হাসপাতাল এবং ক্লিনিক'
  },
  { 
    nameBn: 'অ্যাম্বুলেন্স', 
    href: '/services/ambulance', 
    image: '/images/categories/ambulance.jpg',
    description: 'জরুরী অ্যাম্বুলেন্স সেবা'
  },
  { 
    nameBn: 'আইনজীবী', 
    href: '/services/lawyers', 
    image: '/images/categories/lawyers.jpg',
    description: 'আইনি পরামর্শ এবং সহায়তা'
  },
  { 
    nameBn: 'ট্রাভেল এজেন্সি', 
    href: '/services/travel-agency', 
    image: '/images/categories/travel.jpg',
    description: 'ফ্লাইট এবং ট্যুর বুকিং'
  },
  { 
    nameBn: 'হোটেল', 
    href: '/services/hotels', 
    image: '/images/categories/hotels.jpg',
    description: 'হোটেল এবং আবাসন'
  },
  { 
    nameBn: 'মানি এক্সচেঞ্জ', 
    href: '/services/money-exchange', 
    image: '/images/categories/money.jpg',
    description: 'মানি ট্রান্সফার এবং এক্সচেঞ্জ'
  },
  { 
    nameBn: 'মক্তব সানাদ', 
    href: '/services/maktab', 
    image: '/images/categories/maktab.jpg',
    description: 'মক্তব সার্টিফিকেট সেবা'
  },
  { 
    nameBn: 'দর্শনীয় স্থান', 
    href: '/services/tourist-places', 
    image: '/images/categories/tourist.jpg',
    description: 'ওমানের পর্যটন স্থান'
  },
  { 
    nameBn: 'পুলিশ স্টেশন', 
    href: '/services/police', 
    image: '/images/categories/police.jpg',
    description: 'পুলিশ স্টেশন তথ্য'
  },
  { 
    nameBn: 'জরুরী নম্বর', 
    href: '/emergency', 
    image: '/images/categories/emergency.jpg',
    description: 'জরুরী যোগাযোগ নম্বর'
  },
  { 
    nameBn: 'সংবাদ', 
    href: '/news', 
    image: '/images/categories/news.jpg',
    description: 'সর্বশেষ সংবাদ'
  },
  { 
    nameBn: 'হ্যালো ওমান', 
    href: 'https://www.facebook.com/helloomanbangla/', 
    image: '/images/categories/hello_oman.jpg',
    description: 'আমাদের Facebook পেজ'
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
            {allCategories.map((category) => {
              const isExternal = category.href.startsWith('http');
              const linkProps = isExternal ? {
                href: category.href,
                target: '_blank',
                rel: 'noopener noreferrer'
              } : {
                href: category.href
              };
              
              const LinkComponent = isExternal ? 'a' : Link;
              
              return (
                <LinkComponent
                  key={category.href}
                  {...linkProps}
                  className="group"
                >
                  <div className="flex flex-col rounded-2xl border-2 border-border bg-card hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden h-full">
                    <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-muted">
                      <Image 
                        src={category.image} 
                        alt={category.nameBn} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="flex flex-col p-4 sm:p-5 flex-grow">
                      <h3 className="text-sm sm:text-base font-bold mb-2 group-hover:text-violet-600 transition-colors">
                        {category.nameBn}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-grow">
                        {category.description}
                      </p>
                      <div className="mt-auto flex items-center text-violet-600 group-hover:text-violet-700 text-sm font-medium">
                        বিস্তারিত <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </LinkComponent>
              );
            })}
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
