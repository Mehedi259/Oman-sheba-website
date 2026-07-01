import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Hello Oman Sheba - ওমান বাংলাদেশীদের বিশ্বস্ত সেবা প্ল্যাটফর্ম',
  description: 'ওমানে বসবাসরত বাংলাদেশীদের জন্য সম্পূর্ণ ডিজিটাল সেবা প্ল্যাটফর্ম। চাকরি, বাসা, গাড়ি, স্বাস্থ্যসেবা, আইনগত সহায়তা এবং আরো অনেক কিছু এক জায়গায়।',
  keywords: ['ওমান', 'বাংলাদেশী', 'চাকরি', 'বাসা ভাড়া', 'গাড়ি', 'সেবা', 'Oman', 'Bangladesh', 'Expatriates'],
  openGraph: {
    title: 'Hello Oman Sheba',
    description: 'ওমানে বসবাসরত বাংলাদেশীদের জন্য সম্পূর্ণ ডিজিটাল সেবা প্ল্যাটফর্ম',
    type: 'website',
    locale: 'bn_BD',
    siteName: 'Hello Oman Sheba',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hello Oman Sheba',
    description: 'ওমানে বসবাসরত বাংলাদেশীদের জন্য সম্পূর্ণ ডিজিটাল সেবা প্ল্যাটফর্ম',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
        </Providers>
      </body>
    </html>
  )
}
