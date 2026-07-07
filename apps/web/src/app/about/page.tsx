import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Briefcase, Home, MessageSquare, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">হ্যালো ওমান শেবা</h1>
          <p className="text-xl md:text-2xl mb-4 text-violet-100">
            বাংলাদেশী প্রবাসীদের জন্য ওমানের সবচেয়ে বড় ডিজিটাল সেবা প্ল্যাটফর্ম
          </p>
          <p className="text-lg text-violet-200 max-w-3xl mx-auto">
            একটি সম্পূর্ণ বাংলা ভাষায় ডিজিটাল প্ল্যাটফর্ম যেখানে আপনি পাবেন চাকরি, বাসা ভাড়া,
            গাড়ি, সেবা প্রদানকারী, কমিউনিটি ফোরাম এবং আরও অনেক কিছু।
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">আমাদের লক্ষ্য</h2>
            <p className="text-lg text-muted-foreground">
              ওমানে বসবাসরত বাংলাদেশী প্রবাসীদের দৈনন্দিন জীবনযাত্রা সহজ করা এবং
              সকল প্রয়োজনীয় সেবা এক প্ল্যাটফর্মে প্রদান করা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">প্রবাসী বান্ধব</h3>
                <p className="text-muted-foreground">
                  সম্পূর্ণ বাংলা ভাষায় সহজ এবং ব্যবহারবান্ধব ইন্টারফেস
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">কমিউনিটি</h3>
                <p className="text-muted-foreground">
                  প্রবাসী ভাই-বোনদের মধ্যে সংযোগ স্থাপন এবং সহযোগিতা
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">নিরাপদ ও বিশ্বস্ত</h3>
                <p className="text-muted-foreground">
                  যাচাইকৃত সেবা প্রদানকারী এবং নিরাপদ লেনদেন
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">আমাদের সেবাসমূহ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">চাকরি পোর্টাল</h3>
                <p className="text-muted-foreground text-sm">
                  হাজারো চাকরির বিজ্ঞাপন, সিভি জমা এবং সরাসরি নিয়োগকর্তার সাথে যোগাযোগ
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">প্রপার্টি</h3>
                <p className="text-muted-foreground text-sm">
                  বাসা ভাড়া, ফ্ল্যাট, রুম শেয়ারিং এবং বেড স্পেসের বিজ্ঞাপন
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">কমিউনিটি ফোরাম</h3>
                <p className="text-muted-foreground text-sm">
                  প্রশ্ন করুন, উত্তর দিন এবং অভিজ্ঞতা শেয়ার করুন
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">সেবা প্রদানকারী</h3>
                <p className="text-muted-foreground text-sm">
                  ডাক্তার, আইনজীবী, ট্রাভেল এজেন্সি এবং আরও অনেক সেবা
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">যোগাযোগ করুন</h2>
            <p className="text-lg text-muted-foreground mb-8">
              আপনার কোন প্রশ্ন বা পরামর্শ থাকলে আমাদের সাথে যোগাযোগ করতে পারেন।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@helloomansheba.com" className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                ইমেইল পাঠান
              </a>
              <a href="/community" className="px-6 py-3 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 transition-colors">
                কমিউনিটিতে যোগ দিন
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
