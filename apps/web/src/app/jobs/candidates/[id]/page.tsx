import { getJobSeeker } from '@/lib/api'
import { getMediaUrl } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, GraduationCap, Phone, User, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CandidateDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const candidate = await getJobSeeker(resolvedParams.id)
    if (!candidate) return notFound()

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Link href="/jobs/candidates" className="text-blue-600 hover:underline">
              &larr; সব কর্মীর তালিকায় ফিরে যান
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar - Profile overview */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-50 bg-gray-100 flex items-center justify-center">
                    {candidate.user_avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={getMediaUrl(candidate.user_avatar)} 
                        alt={candidate.user_full_name || candidate.user_name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  
                  <h1 className="text-xl font-bold mb-1">{candidate.user_full_name || candidate.user_name}</h1>
                  <p className="text-blue-600 font-medium mb-4">{candidate.professional_title}</p>
                  
                  <div className="w-full space-y-3 mt-2">
                    {candidate.phone || candidate.user_phone ? (
                      <a href={`tel:${candidate.phone || candidate.user_phone}`} className="w-full block">
                        <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                          <Phone className="mr-2 h-5 w-5" /> কল করুন
                        </Button>
                      </a>
                    ) : (
                      <Button disabled className="w-full h-12">ফোন নম্বর নেই</Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg border-b pb-2">সংক্ষিপ্ত তথ্য</h3>
                  
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">লোকেশন</p>
                      <p className="text-gray-600">{candidate.city || 'অজানা'}{candidate.area ? `, ${candidate.area}` : ''}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-sm">
                    <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">অভিজ্ঞতা</p>
                      <p className="text-gray-600">{candidate.years_of_experience} বছর</p>
                    </div>
                  </div>

                  {candidate.education_level && (
                    <div className="flex items-start gap-3 text-sm">
                      <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">শিক্ষাগত যোগ্যতা</p>
                        <p className="text-gray-600">{candidate.education_level}</p>
                      </div>
                    </div>
                  )}

                  {candidate.expected_salary && (
                    <div className="flex items-start gap-3 text-sm">
                      <div className="h-5 w-5 flex items-center justify-center text-gray-400 mt-0.5 shrink-0 font-bold">৳</div>
                      <div>
                        <p className="font-medium text-gray-900">প্রত্যাশিত বেতন</p>
                        <p className="text-gray-600">{candidate.expected_salary} {candidate.salary_currency}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right content - Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>বিস্তারিত সম্পর্কে</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                    {candidate.summary || 'কোনো বিস্তারিত তথ্য দেওয়া হয়নি।'}
                  </div>
                </CardContent>
              </Card>

              {candidate.skills && candidate.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>দক্ষতাসমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Uploaded Documents / Portfolio */}
              {/* Note: The backend documents field needs to be populated correctly. Assuming it's an array of URLs or ClassifiedImage objects */}
              {candidate.documents && Array.isArray(candidate.documents) && candidate.documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>সার্টিফিকেট / কাজের ছবি</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {candidate.documents.map((doc: any, i: number) => {
                        const url = typeof doc === 'string' ? doc : doc.image;
                        return url ? (
                          <div key={i} className="aspect-square rounded-lg border bg-gray-100 overflow-hidden relative group cursor-pointer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={getMediaUrl(url)} 
                              alt="Document" 
                              className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                            />
                            <a 
                              href={getMediaUrl(url)} 
                              target="_blank" 
                              rel="noreferrer"
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium"
                            >
                              বড় করে দেখুন
                            </a>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
}
