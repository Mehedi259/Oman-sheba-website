import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/main-logo.png" alt="Hello Oman Sheba" className="h-12 md:h-14 lg:h-16 w-auto object-contain mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              ওমানে বসবাসরত বাংলাদেশীদের জন্য সম্পূর্ণ ডিজিটাল সেবা প্ল্যাটফর্ম
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/helloomanbangla/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/helloomanbangla/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/helloomanbangla/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/helloomanbangla/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="text-muted-foreground hover:text-primary">চাকরি খুঁজুন</Link></li>
              <li><Link href="/properties" className="text-muted-foreground hover:text-primary">বাসা ভাড়া</Link></li>
              <li><Link href="/vehicles" className="text-muted-foreground hover:text-primary">গাড়ি কিনুন/ভাড়া</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">সেবা প্রদানকারী</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-primary">কমিউনিটি ফোরাম</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">সেবাসমূহ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/passport" className="text-muted-foreground hover:text-primary">পাসপোর্ট সেবা</Link></li>
              <li><Link href="/services/visa" className="text-muted-foreground hover:text-primary">ভিসা সেবা</Link></li>
              <li><Link href="/services/legal" className="text-muted-foreground hover:text-primary">আইনগত সহায়তা</Link></li>
              <li><Link href="/services/healthcare" className="text-muted-foreground hover:text-primary">স্বাস্থ্যসেবা</Link></li>
              <li><Link href="/emergency" className="text-muted-foreground hover:text-primary">জরুরী নম্বর</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">যোগাযোগ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">Muscat, Oman</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+968 1234 5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@helloomansheba.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Hello Oman Sheba. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}
