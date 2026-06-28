import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react'

const jobs = [
  {
    id: '1',
    title: 'সফটওয়্যার ইঞ্জিনিয়ার',
    company: 'টেক সলিউশনস ওমান',
    location: 'মাস্কাট',
    type: 'ফুল টাইম',
    salary: 'OMR 800-1200',
    posted: '২ দিন আগে',
    logo: '🏢'
  },
  {
    id: '2',
    title: 'নার্স',
    company: 'আল নূর হাসপাতাল',
    location: 'মাস্কাট',
    type: 'ফুল টাইম',
    salary: 'OMR 600-900',
    posted: '৩ দিন আগে',
    logo: '🏥'
  },
  {
    id: '3',
    title: 'সিভিল ইঞ্জিনিয়ার',
    company: 'কনস্ট্রাকশন কোম্পানি',
    location: 'সোহার',
    type: 'ফুল টাইম',
    salary: 'OMR 700-1000',
    posted: '১ সপ্তাহ আগে',
    logo: '🏗️'
  },
  {
    id: '4',
    title: 'সেলস এক্সিকিউটিভ',
    company: 'রিটেইল গ্রুপ',
    location: 'মাস্কাট',
    type: 'ফুল টাইম',
    salary: 'OMR 500-800',
    posted: '৪ দিন আগে',
    logo: '🏪'
  }
]

export function FeaturedJobs() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{job.logo}</div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {job.posted}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/jobs/${job.id}`} className="w-full">
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
