import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Heart,
  FileText,
  Settings,
  Bell,
  Shield,
  Edit,
  Save,
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-purple-600 text-3xl font-bold">
              MA
            </div>
            <div>
              <h1 className="text-3xl font-bold">মোহাম্মদ আহমেদ</h1>
              <p className="text-purple-100">ahmed@example.com</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  মাস্কাট, ওমান
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  সদস্য হয়েছেন: জানুয়ারি ২০২৪
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <a
                    href="#profile"
                    className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-t-lg"
                  >
                    <User className="h-5 w-5" />
                    <span>প্রোফাইল তথ্য</span>
                  </a>
                  <a
                    href="#posts"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                    <span>আমার পোস্ট</span>
                  </a>
                  <a
                    href="#favorites"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>পছন্দের তালিকা</span>
                  </a>
                  <a
                    href="#applications"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>চাকরির আবেদন</span>
                  </a>
                  <a
                    href="#notifications"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    <span>নোটিফিকেশন</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>সেটিংস</span>
                  </a>
                  <a
                    href="#security"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors rounded-b-lg"
                  >
                    <Shield className="h-5 w-5" />
                    <span>নিরাপত্তা</span>
                  </a>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  সম্পাদনা করুন
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">পূর্ণ নাম</label>
                    <Input defaultValue="মোহাম্মদ আহমেদ" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">ইমেইল</label>
                    <Input type="email" defaultValue="ahmed@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">ফোন নম্বর</label>
                    <Input defaultValue="+968 9123 4567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">জন্ম তারিখ</label>
                    <Input type="date" defaultValue="1990-01-15" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">শহর</label>
                    <Input defaultValue="মাস্কাট" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">এলাকা</label>
                    <Input defaultValue="আল খুয়াইর" />
                  </div>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  পরিবর্তন সংরক্ষণ করুন
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">মোট পোস্ট</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">১২</p>
                  <p className="text-sm text-muted-foreground mt-1">সক্রিয় পোস্ট: ৮</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">পছন্দের তালিকা</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">২৪</p>
                  <p className="text-sm text-muted-foreground mt-1">সংরক্ষিত আইটেম</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">চাকরির আবেদন</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">৭</p>
                  <p className="text-sm text-muted-foreground mt-1">পেন্ডিং: ৩</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>সাম্প্রতিক কার্যকলাপ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'চাকরিতে আবেদন করেছেন', item: 'সফটওয়্যার ইঞ্জিনিয়ার পদে', time: '২ ঘন্টা আগে' },
                    { action: 'পছন্দের তালিকায় যোগ করেছেন', item: '২ বেডরুম অ্যাপার্টমেন্ট', time: '৫ ঘন্টা আগে' },
                    { action: 'নতুন পোস্ট করেছেন', item: 'iPhone 13 Pro বিক্রয়', time: '১ দিন আগে' },
                    { action: 'কমিউনিটিতে মন্তব্য করেছেন', item: 'ভিসা নিয়ম সম্পর্কে', time: '২ দিন আগে' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
