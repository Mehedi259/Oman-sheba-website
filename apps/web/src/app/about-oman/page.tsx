import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Map, Landmark, Briefcase, Info, BookOpen, Users, MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'সালতানাত ওমান সম্পর্কে বিস্তারিত - About Sultanate of Oman',
  description: 'ওমান সালতানাতের ইতিহাস, সংস্কৃতি, অর্থনীতি এবং প্রবাসী বাংলাদেশীদের জন্য গুরুত্বপূর্ণ সকল তথ্যের বিস্তারিত গাইড।',
}

export default function AboutOmanPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/categories/sultanate-oman.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <Link href="/" className="inline-flex items-center text-teal-100 hover:text-white mb-8 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            হোম পেজে ফিরে যান
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl shrink-0">
              <div className="text-7xl">🇴🇲</div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">সালতানাত ওমান</h1>
              <p className="text-teal-100 text-xl md:text-2xl font-medium mb-2">
                Sultanate of Oman
              </p>
              <p className="text-teal-50 max-w-2xl text-lg leading-relaxed opacity-90">
                মধ্যপ্রাচ্যের এক শান্তিময় এবং প্রাচীন ঐতিহ্যের দেশ, যা তার অনন্য সংস্কৃতি, আতিথেয়তা এবং প্রবাসী শ্রমিকদের জন্য নিরাপদ কর্মপরিবেশের জন্য পরিচিত।
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Introduction */}
            <Card className="shadow-md border-t-4 border-t-teal-600">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Info className="h-6 w-6 text-teal-600" />
                  ওমান পরিচিতি
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-justify mb-4 text-lg">
                  ওমান (আরবি: عُمان‎), সরকারি নাম <strong>সালতানাত অব ওমান</strong> (سلطنة عُمان), মধ্যপ্রাচ্যের আরব উপদ্বীপের দক্ষিণ-পূর্ব উপকূলে অবস্থিত একটি স্বাধীন রাষ্ট্র। এটি আরব বিশ্বের প্রাচীনতম স্বাধীন রাষ্ট্রগুলির মধ্যে অন্যতম। ওমানের রাজধানী এবং সর্ববৃহৎ শহর হলো <strong>মাস্কাট</strong> (Muscat)।
                </p>
                <p className="text-muted-foreground leading-relaxed text-justify text-lg">
                  ওমান একটি পরম রাজতান্ত্রিক দেশ। বর্তমান সুলতান হাইথাম বিন তারিক আল সাইদ দেশের প্রধান। ওমানের অর্থনীতি মূলত তেল এবং গ্যাস রপ্তানির উপর নির্ভরশীল হলেও বর্তমানে পর্যটন ও মৎস্য শিল্পের ব্যাপক উন্নতি হচ্ছে।
                </p>
              </CardContent>
            </Card>

            {/* Geography & Climate */}
            <Card className="shadow-md">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Map className="h-6 w-6 text-blue-600" />
                  ভৌগোলিক অবস্থান ও জলবায়ু
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-justify mb-4 text-lg">
                  ওমানের উত্তর-পশ্চিমে সংযুক্ত আরব আমিরাত (UAE), পশ্চিমে সৌদি আরব এবং দক্ষিণ-পশ্চিমে ইয়েমেন অবস্থিত। এর দক্ষিণ ও পূর্ব দিকে আরব সাগর এবং উত্তর-পূর্বে ওমান উপসাগর রয়েছে।
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">ভৌগোলিক বৈচিত্র্য</h4>
                    <p className="text-blue-700/80 text-sm">ওমানে রয়েছে বিস্তীর্ণ মরুভূমি, সুউচ্চ পর্বতমালা (যেমন জাবাল শামস) এবং দীর্ঘ সমুদ্র সৈকত। ওয়াদি (শুষ্ক নদী উপত্যকা) ওমানের প্রকৃতির এক অন্যতম আকর্ষণ।</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="font-semibold text-orange-800 mb-2">জলবায়ু</h4>
                    <p className="text-orange-700/80 text-sm">ওমানের জলবায়ু সাধারণত শুষ্ক ও উষ্ণ। গ্রীষ্মকালে তাপমাত্রা ৫০°C পর্যন্ত পৌঁছাতে পারে। তবে শীতকালে (নভেম্বর থেকে মার্চ) আবহাওয়া খুবই মনোরম থাকে।</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History & Culture */}
            <Card className="shadow-md">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-purple-600" />
                  ইতিহাস ও সংস্কৃতি
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-justify text-lg mb-4">
                  ওমানের ইতিহাস হাজার বছরের পুরনো। একসময় ওমানি সাম্রাজ্য পূর্ব আফ্রিকা পর্যন্ত বিস্তৃত ছিল। ওমানিরা তাদের সমৃদ্ধ ঐতিহ্য, প্রাচীন দুর্গ (Forts) এবং আতিথেয়তার জন্য বিশ্বজুড়ে পরিচিত।
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                      <BookOpen className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <strong className="text-gray-800">পোশাক:</strong> পুরুষরা ঐতিহ্যবাহী ‘দিশদাশা’ বা ‘কান্দুরা’ পরিধান করে এবং মাথায় ‘কুমা’ (টুপি) বা ‘মুসার’ (পাগড়ি) বাঁধে। মহিলারা বোরকা বা আবায়া পরিধান করেন।
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                      <BookOpen className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <strong className="text-gray-800">খাদ্যাভ্যাস:</strong> শুয়া (Shuwa - মাটির নিচে রান্না করা বিশেষ মাংস), মাজবুস (Machboos), এবং কাহওয়া (আরবীয় কফি) ওমানি সংস্কৃতির অবিচ্ছেদ্য অংশ।
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Expats and Employment */}
            <Card className="shadow-md border-t-4 border-t-orange-500">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                  প্রবাসী বাংলাদেশী ও কর্মসংস্থান
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-justify text-lg mb-4">
                  ওমানে বিপুল সংখ্যক প্রবাসী কাজ করেন, যার মধ্যে বাংলাদেশীদের সংখ্যা অন্যতম। মূলত নির্মাণ শিল্প, কৃষি, মৎস্য শিকার, সুপারমার্কেট, এবং ক্লিনিং সেক্টরে বাংলাদেশীরা ব্যাপকভাবে কাজ করছেন।
                </p>
                
                <div className="bg-orange-50 rounded-xl p-5 border border-orange-200 mt-4">
                  <h4 className="font-semibold text-orange-800 mb-3 text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" /> প্রবাসীদের জন্য গুরুত্বপূর্ণ নিয়মাবলী
                  </h4>
                  <ul className="space-y-2 text-orange-800/90 list-disc list-inside">
                    <li><strong>ভিসা ও রেসিডেন্স কার্ড:</strong> ওমানে কাজ করার জন্য বৈধ ওয়ার্ক ভিসা এবং রেসিডেন্স কার্ড (পাতাকা) থাকা বাধ্যতামূলক।</li>
                    <li><strong>স্পন্সরশিপ (Kafeel):</strong> ওমানের নিয়ম অনুযায়ী বিদেশি কর্মীদের একজন স্থানীয় স্পন্সর বা কফিলের অধীনে কাজ করতে হয়।</li>
                    <li><strong>আইনশৃঙ্খলা:</strong> ওমানের আইন অত্যন্ত কড়া। ট্রাফিক নিয়ম ভঙ্গ বা কোনো অপরাধমূলক কাজের জন্য কঠোর শাস্তির বিধান রয়েছে।</li>
                    <li><strong>সংস্কৃতির প্রতি সম্মান:</strong> রমজান মাসে জনসম্মুখে পানাহার করা থেকে বিরত থাকা এবং শালীন পোশাক পরিধান করা আইনের অংশ।</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            
            {/* Quick Facts */}
            <Card className="shadow-md bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2 text-teal-900">
                  <BookOpen className="h-5 w-5 text-teal-600" />
                  এক নজরে ওমান
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-1 border-b border-teal-100 pb-2">
                  <span className="text-sm text-teal-600/80 font-medium">রাজধানী</span>
                  <span className="font-semibold text-gray-800 text-lg">মাস্কাট (Muscat)</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-teal-100 pb-2">
                  <span className="text-sm text-teal-600/80 font-medium">রাষ্ট্রভাষা</span>
                  <span className="font-semibold text-gray-800 text-lg">আরবি (Arabic)</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-teal-100 pb-2">
                  <span className="text-sm text-teal-600/80 font-medium">মুদ্রা</span>
                  <span className="font-semibold text-gray-800 text-lg">ওমানি রিয়াল (OMR)</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-teal-100 pb-2">
                  <span className="text-sm text-teal-600/80 font-medium">রাষ্ট্রধর্ম</span>
                  <span className="font-semibold text-gray-800 text-lg">ইসলাম (ইবাদি মতবাদ)</span>
                </div>
                <div className="flex flex-col gap-1 pb-2">
                  <span className="text-sm text-teal-600/80 font-medium">প্রধান শহরসমূহ</span>
                  <span className="font-semibold text-gray-800 leading-relaxed">মাস্কাট (Muscat), সালালাহ (Salalah), সোহার (Sohar), নিজওয়া (Nizwa), সুর (Sur), সীব (Seeb), খাসাব (Khasab), ইবরি (Ibri), রুস্তাক (Rustaq)</span>
                </div>
              </CardContent>
            </Card>

            {/* Useful Links */}
            <Card className="shadow-md">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg">প্রয়োজনীয় লিংক</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <Link href="/services/embassy" className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">বাংলাদেশ দূতাবাস</p>
                      <p className="text-xs text-muted-foreground">যোগাযোগের বিস্তারিত তথ্য</p>
                    </div>
                  </Link>
                  <Link href="/emergency" className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">জরুরী যোগাযোগ</p>
                      <p className="text-xs text-muted-foreground">পুলিশ, এম্বুলেন্স ও হাসপাতাল</p>
                    </div>
                  </Link>
                  <Link href="/jobs" className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Briefcase className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">কর্মসংস্থান</p>
                      <p className="text-xs text-muted-foreground">ওমানে নতুন চাকরির খবর</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

// Ensure Phone is imported
import { Phone } from 'lucide-react'
