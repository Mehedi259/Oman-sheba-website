import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone } from 'lucide-react'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            আজই যুক্ত হোন Hello Oman Sheba-তে
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            বিনামূল্যে রেজিস্ট্রেশন করুন এবং সম্পূর্ণ সেবা উপভোগ করুন
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                রেজিস্ট্রেশন করুন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-blue-600">
                আরও জানুন
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              <span>মোবাইল অ্যাপ শীঘ্রই</span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/30" />
            <div>
              ১০০% বিনামূল্যে সেবা
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/30" />
            <div>
              ২৪/৭ সাপোর্ট
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
