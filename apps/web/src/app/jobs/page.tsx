import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Briefcase, Clock, Filter } from 'lucide-react'
import Link from 'next/link'

const jobs = [
  {
    id: '1',
    title: 'সফটওয়্যার ইঞ্জিনিয়ার',
    titleEn: 'Software Engineer',
    company: 'টেক সলিউশনস ওমান',
    location: 'মাস্কাট, রুয়ি',
    type: 'ফুল টাইম',
    salary: '৳ ২৮০,০০০-৪২০,০০০',
    experience: '৩-৫ বছর',
    posted: '২ দিন আগে',
    logo: '🏢',
    featured: true
  },
  {
    id: '2',
    title: 'রেজিস্টার্ড নার্স',
    titleEn: 'Registered Nurse',
    company: 'আল নূর হাসপাতাল',
    location: 'মাস্কাট',
    type: 'ফুল টাইম',
    salary: '৳ ২১০,০০০-৩১৫,০০০',
    experience: '২-৪ বছর',
    posted: '৩ দিন আগে',
    logo: '🏥',
    featured: false
  },
  {
    id: '3',
    title: 'সিভিল ইঞ্জিনিয়ার',
    titleEn: 'Civil Engineer',
    company: 'কনস্ট্রাকশন কোম্পানি',
    location: 'সোহার',
    type: 'ফুল টাইম',
    salary: '৳ ২৪৫,০০০-৩৫০,০০০',
    experience: '৫+ বছর',
    posted: '১ সপ্তাহ আগে',
    logo: '🏗️',
    featured: false
  },
  {
    id: '4',
    title: 'সেলস এক্সিকিউটিভ',
    titleEn: 'Sales Executive',
    company: 'রিটেইল গ্রুপ',
    location: 'মাস্কাট',
    type: 'ফুল টাইম',
    salary: '৳ ১৭৫,০০০-২৮০,০০০',
    experience: '১-৩ বছর',
    posted: '৪ দিন আগে',
    logo: '🏪',
    featured: false
  },
  {
    id: '5',
    title: 'ইলেকট্রিশিয়ান',
    titleEn: 'Electrician',
    company: 'মেইনটেন্যান্স কোম্পানি',
    location: 'মাস্কাট',
    type: 'ফুল টাইম',
    salary: '৳ ১৪০,০০০-২১০,০০০',
    experience: '২-৪ বছর',
    posted: '৫ দিন আগে',
    logo: '⚡',
    featured: false
  },
  {
    id: '6',
    title: 'অ্যাকাউন্ট্যান্ট',
    titleEn: 'Accountant',
    company: 'ফাইন্যান্স ফার্ম',
    location: 'মাস্কাট, বোশার',
    type: 'ফুল টাইম',
    salary: '৳ ২১০,০০০-৩১৫,০০০',
    experience: '৩-৫ বছর',
    posted: '১ সপ্তাহ আগে',
    logo: '💼',
    featured: true
  }
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">চাকরি খুঁজুন</h1>
          <div className="flex gap-3">
            <div className="flex-1 bg-white rounded-lg p-2 flex gap-2">
              <Input
                type="text"
                placeholder="চাকরির পদবী, কোম্পানি বা কীওয়ার্ড..."
                className="border-0 text-gray-900"
              />
              <Input
                type="text"
                placeholder="লোকেশন"
                className="border-0 text-gray-900 max-w-xs"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5 mr-2" />
                খুঁজুন
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  ফিল্টার
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">চাকরির ধরন</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">ফুল টাইম</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">পার্ট টাইম</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">কন্ট্রাক্ট</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">অভিজ্ঞতা</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">০-২ বছর</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">৩-৫ বছর</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">৫+ বছর</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">বেতন সীমা</label>
                  <Input type="number" placeholder="সর্বনিম্ন" className="mb-2" />
                  <Input type="number" placeholder="সর্বোচ্চ" />
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">{jobs.length}টি চাকরি পাওয়া গেছে</p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>সর্বশেষ</option>
                <option>বেতন: উচ্চ থেকে নিম্ন</option>
                <option>বেতন: নিম্ন থেকে উচ্চ</option>
              </select>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow hover-lift">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="text-5xl">{job.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h2 className="text-xl font-bold mb-1">{job.title}</h2>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                            {job.featured && (
                              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                                ফিচার্ড
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.posted}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-lg font-bold text-primary">{job.salary}</span>
                              <span className="text-sm text-muted-foreground ml-2">• {job.experience} অভিজ্ঞতা</span>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/jobs/${job.id}`}>
                                <Button>বিস্তারিত দেখুন</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline">পূর্ববর্তী</Button>
              <Button variant="outline">১</Button>
              <Button>২</Button>
              <Button variant="outline">৩</Button>
              <Button variant="outline">পরবর্তী</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
