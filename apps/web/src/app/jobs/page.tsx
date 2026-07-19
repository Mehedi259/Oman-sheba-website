export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Briefcase, Clock, Filter } from 'lucide-react'
import Link from 'next/link'

import { getJobs } from '@/lib/api'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export default async function JobsPage() {
  const data = await getJobs();
  const jobs = Array.isArray(data) ? data : data.results || [];
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
              {jobs.map((job: any) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow hover-lift">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden shrink-0">
                          {job.images && job.images.length > 0 ? (
                            <img src={getMediaUrl(job.images[0])} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="text-3xl">🏢</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h2 className="text-xl font-bold mb-1">{job.titleBn || job.title}</h2>
                              <p className="text-muted-foreground">{job.company?.nameBn || job.company?.name || job.company_name_bn}</p>
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
                              {job.city}, {job.area}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.employmentType || job.employment_type || 'ফুল টাইম'}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatRelativeTime(job.createdAt || job.created_at)}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-lg font-bold text-primary">
                                {job.salaryMin && job.salaryMax ? `${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency || 'রিয়াল'}` : 'আলোচনা সাপেক্ষে'}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">• {job.experienceLevel || job.experience_level || 'ফ্রেশার'} অভিজ্ঞতা</span>
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
