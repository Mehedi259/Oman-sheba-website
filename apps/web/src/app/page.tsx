import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedJobs } from '@/components/home/featured-jobs'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { FeaturedServices } from '@/components/home/featured-services'
import { NewsSection } from '@/components/home/news-section'
import { CallToAction } from '@/components/home/call-to-action'
import { EmergencyContacts } from '@/components/home/emergency-contacts'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryGrid />
      <FeaturedJobs />
      <FeaturedProperties />
      <FeaturedServices />
      <NewsSection />
      <EmergencyContacts />
      <CallToAction />
    </div>
  )
}
