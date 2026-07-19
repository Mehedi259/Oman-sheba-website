import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MapPin, Briefcase, Clock, DollarSign, GraduationCap, 
  Users, Calendar, Mail, Phone, ArrowLeft, Shield, 
  CheckCircle, Building, Star
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getJobById } from '@/lib/api'
import { FavoriteButton } from '@/components/ui/favorite-button'

// Dynamic rendering - fetch from API at request time
export const dynamic = 'force-dynamic'

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let job: any
  try {
    job = await getJobById(id)
  } catch (error) {
    notFound()
  }

  if (!job) {
    notFound()
  }

  const typeMap: Record<string, string> = {
    'FULL_TIME': 'ফুল টাইম',
    'PART_TIME': 'পার্ট টাইম',
    'CONTRACT': 'চুক্তিভিত্তিক',
    'TEMPORARY': 'সাময়িক',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-12">
        <div className="container">
          <Link href="/jobs" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সব চাকরি দেখুন
          </Link>
          <div className="flex items-start gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-5xl shrink-0">
              🏢
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title_bn || job.title}</h1>
              <p className="text-blue-200 text-lg mb-1">{job.title}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-lg">{job.company?.name_bn || job.company?.name || ''}</span>
                {job.company?.verified && (
                  <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" /> যাচাইকৃত
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-blue-200">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.city}{job.area ? `, ${job.area}` : ''}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{typeMap[job.type] || job.type}</span>
                {job.experience && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.experience}</span>}
                {job.featured && (
                  <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3" /> ফিচার্ড
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">চাকরির বিবরণ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{job.description_bn || job.description}</p>
                {job.description_bn && job.description && job.description !== job.description_bn && (
                  <p className="text-muted-foreground leading-relaxed mt-2">{job.description}</p>
                )}
              </CardContent>
            </Card>

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">প্রয়োজনীয় দক্ষতা</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string, i: number) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements_bn && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">যোগ্যতা</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{job.requirements_bn}</p>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">সুযোগ-সুবিধা</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.benefits.map((benefit: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {job.benefits_bn && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">সুবিধা</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{job.benefits_bn}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Salary & Info Card */}
            <Card className="border-2 border-blue-200 bg-blue-50/30">
              <CardContent className="pt-6 space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">বেতন</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {job.salary_min && job.salary_max 
                      ? `${job.salary_currency || 'OMR'} ${job.salary_min} - ${job.salary_max}`
                      : 'আলোচনা সাপেক্ষে'}
                  </p>
                  <p className="text-sm text-muted-foreground">মাসিক</p>
                </div>
                <hr />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">কোম্পানি</p>
                      <p className="font-medium">{job.company?.name_bn || job.company?.name || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">অবস্থান</p>
                      <p className="font-medium">{job.city}{job.area ? `, ${job.area}` : ''}</p>
                    </div>
                  </div>
                  {job.education && (
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">শিক্ষাগত যোগ্যতা</p>
                        <p className="font-medium">{job.education}</p>
                      </div>
                    </div>
                  )}
                  {job.vacancy && (
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">পদসংখ্যা</p>
                        <p className="font-medium">{job.vacancy} টি</p>
                      </div>
                    </div>
                  )}
                  {job.application_deadline && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">আবেদনের শেষ তারিখ</p>
                        <p className="font-medium">{new Date(job.application_deadline).toLocaleDateString('bn-BD')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">যোগাযোগ করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(job.application_email || job.contact_email) && (
                  <a href={`mailto:${job.application_email || job.contact_email}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      {job.application_email || job.contact_email}
                    </Button>
                  </a>
                )}
                {(job.application_phone || job.contact_phone) && (
                  <a href={`tel:${job.application_phone || job.contact_phone}`} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      {job.application_phone || job.contact_phone}
                    </Button>
                  </a>
                )}
                <div className="flex gap-2 mt-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    এখনই আবেদন করুন
                  </Button>
                  <FavoriteButton type="job" id={job.id} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
