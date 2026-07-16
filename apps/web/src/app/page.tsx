import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedJobs } from '@/components/home/featured-jobs'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { FeaturedVehicles } from '@/components/home/featured-vehicles'
import { FeaturedServices } from '@/components/home/featured-services'
import { FeaturedCommunity } from '@/components/home/featured-community'
import { FeaturedMarketplace } from '@/components/home/featured-marketplace'
import { NewsSection } from '@/components/home/news-section'
import { CallToAction } from '@/components/home/call-to-action'
import { EmergencyContacts } from '@/components/home/emergency-contacts'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryGrid />
      <FeaturedJobs />
      <FeaturedProperties />
      <FeaturedVehicles />
      <FeaturedServices />
      <FeaturedCommunity />
      <FeaturedMarketplace />
      <NewsSection />
      <EmergencyContacts />
      <CallToAction />
    </div>
  )
}
