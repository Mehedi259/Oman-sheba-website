export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Briefcase, Clock, Filter } from 'lucide-react'
import Link from 'next/link'

import { getJobs } from '@/lib/api'
import { FavoriteButton } from '@/components/ui/favorite-button'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export default async function JobsPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const data = await getJobs({
    search: searchParams.search,
    type: searchParams.type,
    sort: searchParams.sort,
    page: searchParams.page,
  });
  
  const jobs = Array.isArray(data) ? data : data.results || [];
  
  const buildUrl = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as any);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    return `/jobs?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">চাকরি খুঁজুন</h1>
          <form action="/jobs" method="GET" className="flex gap-3">
            <div className="flex-1 bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                name="search"
                defaultValue={searchParams.search || ''}
                placeholder="চাকরির পদবী, কোম্পানি বা কীওয়ার্ড..."
                className="border-0 text-gray-900"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5 mr-2" />
                খুঁজুন
              </Button>
            </div>
            {searchParams.type && <input type="hidden" name="type" value={searchParams.type} />}
            {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
          </form>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    ফিল্টার
                  </div>
                  {(searchParams.search || searchParams.type || searchParams.sort) && (
                    <Link href="/jobs" className="text-sm font-normal text-red-500 hover:underline">মুছুন</Link>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">চাকরির ধরন</label>
                  <div className="space-y-2 flex flex-col">
                    <Link href={buildUrl({ type: 'FULL_TIME' })} className={`text-sm py-1 px-2 rounded hover:bg-muted ${searchParams.type === 'FULL_TIME' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                      ফুল টাইম
                    </Link>
                    <Link href={buildUrl({ type: 'PART_TIME' })} className={`text-sm py-1 px-2 rounded hover:bg-muted ${searchParams.type === 'PART_TIME' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                      পার্ট টাইম
                    </Link>
                    <Link href={buildUrl({ type: 'CONTRACT' })} className={`text-sm py-1 px-2 rounded hover:bg-muted ${searchParams.type === 'CONTRACT' ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}>
                      কন্ট্রাক্ট
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <p className="text-muted-foreground">{jobs.length}টি চাকরি পাওয়া গেছে</p>
              <div className="flex flex-wrap gap-2">
                <Link href={buildUrl({ sort: '-created_at' })}>
                  <Button variant={searchParams.sort === '-created_at' || !searchParams.sort ? 'default' : 'outline'} size="sm">সর্বশেষ</Button>
                </Link>
                <Link href={buildUrl({ sort: '-price' })}>
                  <Button variant={searchParams.sort === '-price' ? 'default' : 'outline'} size="sm">উচ্চ বেতন</Button>
                </Link>
                <Link href={buildUrl({ sort: 'price' })}>
                  <Button variant={searchParams.sort === 'price' ? 'default' : 'outline'} size="sm">নিম্ন বেতন</Button>
                </Link>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <span className="text-6xl mb-4 block">💼</span>
                <h3 className="text-xl font-semibold mb-2">কোনো চাকরি পাওয়া যায়নি</h3>
                <p>আপনার খোঁজার মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: any) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow hover-lift">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden shrink-0">
                            {job.images && job.images.length > 0 ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={getMediaUrl(job.images[0])} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="text-3xl">🏢</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h2 className="text-xl font-bold mb-1">{job.titleBn || job.title}</h2>
                                <p className="text-muted-foreground">{job.company?.nameBn || job.company?.name || job.company_name_bn || job.company_name}</p>
                              </div>
                              {job.featured && (
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded hidden md:block">
                                  ফিচার্ড
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.city}{job.area ? `, ${job.area}` : ''}
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.employmentType || job.type || 'ফুল টাইম'}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {formatRelativeTime(job.createdAt || job.created_at)}
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-4">
                              <div>
                                <span className="text-lg font-bold text-primary">
                                  {(() => {
                                    const min = job.salary_min ?? job.salaryMin;
                                    const max = job.salary_max ?? job.salaryMax;
                                    const curr = job.salary_currency || job.salaryCurrency || job.currency || 'OMR';
                                    if (min && max) return `${min} - ${max} ${curr}`;
                                    if (min) return `${min}+ ${curr}`;
                                    if (max) return `পর্যন্ত ${max} ${curr}`;
                                    if (job.price) return `${job.price.toLocaleString()} ${curr}`;
                                    return 'আলোচনা সাপেক্ষে';
                                  })()}
                                </span>
                              </div>
                              <div className="flex gap-2 w-full md:w-auto">
                                <Link href={`/jobs/${job.id}`} className="w-full">
                                  <Button className="w-full">বিস্তারিত দেখুন</Button>
                                </Link>
                                <FavoriteButton type="job" id={job.id} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" disabled>পূর্ববর্তী</Button>
                <Button>১</Button>
                <Button variant="outline" disabled>পরবর্তী</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
