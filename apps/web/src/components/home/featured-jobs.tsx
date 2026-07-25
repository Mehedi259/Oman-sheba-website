import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { getFeaturedJobs } from '@/lib/api'
import { formatCurrency, formatRelativeTime, getMediaUrl } from '@/lib/utils'

// Colorful flat icon per job industry (falls back to a briefcase)
const jobIcons: Record<string, string> = {
  'তথ্য প্রযুক্তি': '/icons/jobs/it.svg',
  'প্রকৌশল': '/icons/jobs/engineering.svg',
  'আতিথেয়তা': '/icons/restaurant.svg',
}

const getJobIcon = (job: any) =>
  jobIcons[job.category?.nameBn] || '/icons/jobs.svg'

export async function FeaturedJobs() {
  const jobs = await getFeaturedJobs(3);
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">সর্বশেষ চাকরি</h2>
            <p className="text-muted-foreground">আপনার স্বপ্নের চাকরি খুঁজুন</p>
          </div>
          <Link href="/jobs">
            <Button variant="outline">
              সব দেখুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {jobs.map((job: any) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow hover-lift h-full flex flex-col">
              <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-muted/50 flex items-center justify-center p-1.5 sm:p-2 overflow-hidden shrink-0">
                      {job.images && job.images.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getMediaUrl(job.images[0])} alt="" className="h-full w-full object-cover" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getJobIcon(job)} alt="" className="h-6 w-6 sm:h-8 sm:w-8" />
                      )}
                    </div>
                    {job.company?.verified && (
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                    )}
                  </div>
                  {job.featured && (
                    <span className="text-[10px] sm:text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                      জরুরী
                    </span>
                  )}
                </div>
                <CardTitle className="text-sm sm:text-lg line-clamp-1 sm:line-clamp-2">{job.title_bn || job.titleBn || job.title || 'চাকরি'}</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{job.company?.name_bn || job.company?.nameBn || job.company?.name || job.company_name_bn || job.company_name || ''}</p>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 space-y-1.5 sm:space-y-2 flex-grow">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{job.city}{job.area ? `, ${job.area}` : ''}</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">
                  {(() => {
                    const min = job.salary_min ?? job.salaryMin;
                    const max = job.salary_max ?? job.salaryMax;
                    const curr = job.salary_currency || job.salaryCurrency || job.currency || 'OMR';
                    if (min && max) return `${min} - ${max} ${curr}`;
                    if (min) return `${min}+ ${curr}`;
                    if (max) return `পর্যন্ত ${max} ${curr}`;
                    if (job.price) return `${job.price} ${curr}`;
                    return 'আলোচনা সাপেক্ষে';
                  })()}
                  </span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{formatRelativeTime(job.createdAt || job.created_at)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-6 pt-0 mt-auto">
                <Link href={`/jobs/${job.id}`} className="w-full">
                  <Button className="w-full text-xs sm:text-sm h-8 sm:h-10">বিস্তারিত দেখুন</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
