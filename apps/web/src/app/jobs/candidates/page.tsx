export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Briefcase, GraduationCap, User } from 'lucide-react'
import Link from 'next/link'

import { getJobSeekers } from '@/lib/api'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export default async function CandidatesPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const data = await getJobSeekers({
    search: searchParams.search,
    sort: searchParams.sort,
    page: searchParams.page,
  });
  
  const candidates = Array.isArray(data) ? data : data.results || [];
  
  const buildUrl = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as any);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    return `/jobs/candidates?${newParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container">
          <div className="flex gap-6 mb-6 border-b border-blue-400/30">
            <Link href="/jobs" className="text-2xl md:text-3xl font-bold text-blue-200 hover:text-white pb-2 px-2 transition-colors border-b-4 border-transparent">চাকরি খুঁজুন</Link>
            <Link href="/jobs/candidates" className="text-2xl md:text-3xl font-bold border-b-4 border-white pb-2 px-2">কর্মী খুঁজুন</Link>
          </div>
          <form action="/jobs/candidates" method="GET" className="flex gap-3">
            <div className="flex-1 bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                name="search"
                defaultValue={searchParams.search || ''}
                placeholder="পেশা বা দক্ষতা দিয়ে খুঁজুন..."
                className="border-0 text-gray-900"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-5 w-5 mr-2" />
                খুঁজুন
              </Button>
            </div>
            {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
          </form>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <h3 className="text-lg font-bold mb-2">আপনি কি চাকরি খুঁজছেন?</h3>
              <p className="text-sm text-gray-600 mb-4">আপনার সিভি এবং দক্ষতা দিয়ে প্রোফাইল তৈরি করুন, এমপ্লয়াররা আপনাকে খুঁজে নেবে।</p>
              <Link href="/jobs/create-profile">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">প্রোফাইল তৈরি করুন</Button>
              </Link>
            </div>
          </aside>

          {/* Candidate Listings */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <p className="text-muted-foreground">{candidates.length} জন কর্মী পাওয়া গেছে</p>
              <div className="flex flex-wrap gap-2">
                <Link href={buildUrl({ sort: '-created_at' })}>
                  <Button variant={searchParams.sort === '-created_at' || !searchParams.sort ? 'default' : 'outline'} size="sm">সর্বশেষ</Button>
                </Link>
                <Link href={buildUrl({ sort: '-years_of_experience' })}>
                  <Button variant={searchParams.sort === '-years_of_experience' ? 'default' : 'outline'} size="sm">বেশি অভিজ্ঞতা</Button>
                </Link>
              </div>
            </div>

            {candidates.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <span className="text-6xl mb-4 block">👨‍💼</span>
                <h3 className="text-xl font-semibold mb-2">কোনো কর্মী পাওয়া যায়নি</h3>
                <p>আপনার খোঁজার মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate: any) => (
                  <Card key={candidate.id} className="hover:shadow-lg transition-shadow hover-lift">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center overflow-hidden shrink-0 border-2 border-blue-100">
                            {candidate.profile_picture ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={getMediaUrl(candidate.profile_picture)} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <User className="text-3xl text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h2 className="text-xl font-bold mb-1">{candidate.professional_title}</h2>
                                <p className="text-muted-foreground">{candidate.user_name}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2 mb-3 line-clamp-2">
                              {candidate.summary}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1 text-blue-500" />
                                অভিজ্ঞতা: {candidate.years_of_experience} বছর
                              </div>
                              {candidate.education_level && (
                                <div className="flex items-center">
                                  <GraduationCap className="h-4 w-4 mr-1 text-blue-500" />
                                  {candidate.education_level}
                                </div>
                              )}
                            </div>
                            {candidate.skills && candidate.skills.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {candidate.skills.slice(0, 5).map((skill: string, i: number) => (
                                  <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                                {candidate.skills.length > 5 && (
                                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    +{candidate.skills.length - 5}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-4">
                              <div>
                                {candidate.expected_salary && (
                                  <span className="text-sm font-semibold text-gray-600">
                                    প্রত্যাশিত বেতন: <span className="text-green-600">{candidate.expected_salary} {candidate.salary_currency}</span>
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-2 w-full md:w-auto">
                                <Button variant="outline" className="w-full">প্রোফাইল দেখুন</Button>
                                {candidate.user_phone && (
                                  <a href={`tel:${candidate.user_phone}`} className="w-full">
                                    <Button className="w-full bg-green-600 hover:bg-green-700">কল করুন</Button>
                                  </a>
                                )}
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
          </main>
        </div>
      </div>
    </div>
  )
}
