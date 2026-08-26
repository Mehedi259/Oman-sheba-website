import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, Clock, ArrowRight, User, GraduationCap } from 'lucide-react'
import { getJobSeekers } from '@/lib/api'
import { formatRelativeTime, getMediaUrl } from '@/lib/utils'

export async function FeaturedCandidates() {
  const data = await getJobSeekers({ sort: '-created_at' });
  const candidates = (Array.isArray(data) ? data : data.results || []).slice(0, 4);

  if (candidates.length === 0) return null;

  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="container">
        <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">কর্মী খুঁজুন</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">দক্ষ কর্মী খুঁজে নিন</p>
          </div>
          <Link href="/jobs/candidates" className="shrink-0 mt-1 sm:mt-0">
            <Button variant="outline" size="sm" className="h-8 sm:h-10 text-xs sm:text-sm">
              সব দেখুন
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {candidates.map((candidate: any) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow hover-lift h-full flex flex-col border-blue-100">
              <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-3 text-center items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/50 flex items-center justify-center p-0 overflow-hidden mb-3 border-2 border-blue-50">
                  {candidate.user_avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getMediaUrl(candidate.user_avatar)} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <CardTitle className="text-sm sm:text-lg font-bold leading-snug line-clamp-2">{candidate.professional_title}</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-1">{candidate.user_full_name || candidate.user_name}</p>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 space-y-1.5 sm:space-y-2 flex-grow">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground justify-center">
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0 text-blue-500" />
                  <span className="line-clamp-1">অভিজ্ঞতা: {candidate.years_of_experience} বছর</span>
                </div>
                {candidate.education_level && (
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground justify-center">
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0 text-blue-500" />
                    <span className="line-clamp-1">{candidate.education_level}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-3 sm:p-6 pt-0 mt-auto">
                <Link href="/jobs/candidates" className="w-full">
                  <Button className="w-full text-xs sm:text-sm h-8 sm:h-10 bg-blue-600 text-white hover:bg-blue-700">প্রোফাইল দেখুন</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
