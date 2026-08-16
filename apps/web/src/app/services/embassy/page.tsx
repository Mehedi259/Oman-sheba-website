import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, Phone, Mail, Globe, ArrowLeft, Clock, 
  CalendarDays, AlertCircle, ExternalLink, ShieldCheck,
  Building2, Users, FileText
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'বাংলাদেশ দূতাবাস, ওমান - Bangladesh Embassy Oman',
  description: 'ওমানে বাংলাদেশ দূতাবাসের সকল তথ্য, যোগাযোগ নম্বর, ঠিকানা এবং সেবাসমূহ।',
}

export default function EmbassyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 text-white py-12 md:py-16">
        <div className="container relative">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none hidden md:block">
            <Building2 className="w-64 h-64" />
          </div>
          
          <Link href="/services" className="inline-flex items-center text-emerald-100 hover:text-white mb-8 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব সেবা দেখুন
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="bg-white p-4 rounded-2xl shadow-xl shrink-0">
              <div className="bg-green-50 w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl border border-green-100">
                🇧🇩
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-emerald-500/30 border border-emerald-400/30 text-emerald-50 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4" /> 
                  অফিসিয়াল তথ্য
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">বাংলাদেশ দূতাবাস, মাস্কাট</h1>
              <p className="text-emerald-100 text-lg md:text-xl font-medium mb-1">
                Embassy of the People&apos;s Republic of Bangladesh
              </p>
              <p className="text-emerald-200 text-sm md:text-base">
                Sultanate of Oman
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Embassy Details */}
            <Card className="shadow-md border-t-4 border-t-emerald-600">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  দূতাবাস সম্পর্কে বিস্তারিত
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-justify mb-4">
                  ওমানে অবস্থিত বাংলাদেশ দূতাবাস প্রবাসী বাংলাদেশীদের জন্য একটি অত্যন্ত গুরুত্বপূর্ণ নির্ভরতার স্থান। এটি বাংলাদেশ ও ওমানের মধ্যে দ্বিপাক্ষিক সম্পর্ক উন্নয়ন, বাণিজ্য সম্প্রসারণ এবং সাংস্কৃতিক বিনিময়ে কাজ করে। দূতাবাসে প্রবাসীদের জন্য পাসপোর্ট নবায়ন, নতুন ই-পাসপোর্ট ইস্যু, ভিসা প্রদান, এবং ওয়েজ আর্নার্স কল্যাণ বোর্ডের মেম্বারশিপ সংক্রান্ত সেবা প্রদান করা হয়।
                </p>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  এছাড়াও, প্রবাসী শ্রমিকদের যেকোনো আইনি সহায়তা, কর্মক্ষেত্রে সমস্যা সমাধান, এবং কল্যাণমূলক কার্যক্রমে শ্রম উইং (Labour Wing) সার্বক্ষণিক সহযোগিতা করে থাকে। যেকোনো কনস্যুলার সেবার জন্য সরাসরি দূতাবাসে আসার আগে অনলাইনে অ্যাপয়েন্টমেন্ট নেওয়া বা ফোনে যোগাযোগ করে নেওয়া বাঞ্ছনীয়।
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a href="tel:+96824698660" className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-border shadow-sm hover:border-green-500 hover:shadow-md transition-all group">
                <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Phone className="h-6 w-6 text-green-600 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-center">কল করুন</span>
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Bangladesh+Embassy+Muscat+Oman" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-border shadow-sm hover:border-blue-500 hover:shadow-md transition-all group">
                <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <MapPin className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-center">ম্যাপ দেখুন</span>
              </a>
              <a href="mailto:mission.muscat@mofa.gov.bd" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-border shadow-sm hover:border-purple-500 hover:shadow-md transition-all group">
                <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Mail className="h-6 w-6 text-purple-600 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-center">ইমেইল</span>
              </a>
              <a href="https://muscat.mofa.gov.bd" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-border shadow-sm hover:border-orange-500 hover:shadow-md transition-all group">
                <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Globe className="h-6 w-6 text-orange-600 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-center">ওয়েবসাইট</span>
              </a>
            </div>

            {/* Department Contacts */}
            <Card className="border-t-4 border-t-green-600 shadow-md">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  জরুরী যোগাযোগ নম্বরসমূহ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="font-semibold text-lg">সাধারণ তথ্য ও অনুসন্ধান</h3>
                      <p className="text-muted-foreground text-sm">যেকোনো সাধারণ তথ্যের জন্য</p>
                    </div>
                    <a href="tel:+96824698660">
                      <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                        +968 2469 8660
                      </Button>
                    </a>
                  </div>
                  
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        পাসপোর্ট ও ভিসা সংক্রান্ত
                      </h3>
                      <p className="text-muted-foreground text-sm">নতুন পাসপোর্ট, নবায়ন বা ভিসার তথ্য</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <a href="tel:+96824698098">
                        <Button variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                          <Phone className="h-4 w-4 mr-2 text-blue-500" /> 
                          +968 2469 8098
                        </Button>
                      </a>
                      <a href="tel:+96895279792">
                        <Button variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                          <Phone className="h-4 w-4 mr-2 text-blue-500" /> 
                          +968 9527 9792 (মোবাইল)
                        </Button>
                      </a>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-500" />
                        শ্রম শাখা (Labour Wing)
                      </h3>
                      <p className="text-muted-foreground text-sm">শ্রমিকদের যেকোনো সমস্যার জন্য</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <a href="tel:+96824603514">
                        <Button variant="outline" className="w-full justify-start border-orange-200 hover:bg-orange-50 hover:text-orange-700">
                          <Phone className="h-4 w-4 mr-2 text-orange-500" /> 
                          +968 2460 3514
                        </Button>
                      </a>
                      <a href="tel:+96824698440">
                        <Button variant="outline" className="w-full justify-start border-orange-200 hover:bg-orange-50 hover:text-orange-700">
                          <Phone className="h-4 w-4 mr-2 text-orange-500" /> 
                          +968 2469 8440
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning / Notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
              <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">গুরুত্বপূর্ণ তথ্য</h4>
                <p className="text-amber-700/80 text-sm leading-relaxed">
                  দূতাবাসে আসার আগে অবশ্যই প্রয়োজনীয় কাগজপত্র গুছিয়ে নিয়ে আসুন। পাসপোর্ট নবায়ন বা যেকোনো কনস্যুলার সেবার জন্য অনলাইনে অ্যাপয়েন্টমেন্ট নেওয়া বাধ্যতামূলক হতে পারে। বিস্তারিত তথ্যের জন্য দূতাবাসের অফিশিয়াল ওয়েবসাইট ভিজিট করুন অথবা কল করে নিশ্চিত হোন।
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            
            {/* Address Card */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  ঠিকানা
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg border">
                  <p className="font-medium mb-1">Villa 4207, Way 3052</p>
                  <p className="text-muted-foreground text-sm mb-1">Shatti Al Qurum</p>
                  <p className="text-muted-foreground text-sm">Muscat, Sultanate of Oman</p>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  অফিস সময়সূচী
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <CalendarDays className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">রবিবার - বৃহস্পতিবার</p>
                      <p className="text-sm text-green-600 font-medium">সকাল ৮:০০ - বিকাল ৪:০০</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm font-medium border border-red-100">
                  <AlertCircle className="h-4 w-4" />
                  শুক্রবার ও শনিবার বন্ধ থাকে
                </div>
              </CardContent>
            </Card>

            {/* Email & Web */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  অনলাইন যোগাযোগ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="mailto:mission.muscat@mofa.gov.bd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-border transition-colors">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <Mail className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-muted-foreground mb-0.5">অফিসিয়াল ইমেইল</p>
                    <p className="text-sm font-medium truncate">mission.muscat@mofa.gov.bd</p>
                  </div>
                </a>
                
                <a href="https://muscat.mofa.gov.bd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-border transition-colors">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <ExternalLink className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-muted-foreground mb-0.5">অফিসিয়াল ওয়েবসাইট</p>
                    <p className="text-sm font-medium truncate">muscat.mofa.gov.bd</p>
                  </div>
                </a>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>
    </div>
  )
}
