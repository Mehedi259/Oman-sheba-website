import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { getFeaturedJobs } from '@/lib/api'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: any) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {job.company.name.charAt(0)}
                    </div>
                    {job.company.verified && (
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  {job.featured && (
                    <span className="text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full font-medium">
                      জরুরী
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">{job.titleBn}</CardTitle>
                <p className="text-sm text-muted-foreground">{job.company.nameBn}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.city}, {job.area}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.salaryMin && job.salaryMax 
                    ? `${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency}`
                    : 'আলোচনা সাপেক্ষে'}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatRelativeTime(job.createdAt)}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/jobs/${job.slug}`} className="w-full">
                  <Button className="w-full">বিস্তারিত দেখুন</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
