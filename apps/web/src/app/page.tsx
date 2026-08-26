import { HeroSlider } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedJobs } from '@/components/home/featured-jobs'
import { FeaturedCandidates } from '@/components/home/featured-candidates'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { FeaturedVehicles } from '@/components/home/featured-vehicles'

import { FeaturedCommunity } from '@/components/home/featured-community'
import { FeaturedMarketplace } from '@/components/home/featured-marketplace'
import { NewsSection } from '@/components/home/news-section'
import { CallToAction } from '@/components/home/call-to-action'
import { getHeroSliders } from '@/lib/api'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let sliders: any[] = []
  try {
    sliders = await getHeroSliders()
  } catch (e) {
    // Fallback: Hero component has built-in fallback banners
  }

  return (
    <div className="flex flex-col">
      <HeroSlider sliders={sliders} />
      <CategoryGrid />
      <FeaturedJobs />
      <FeaturedCandidates />
      <FeaturedProperties />
      <FeaturedVehicles />

      <FeaturedCommunity />
      <FeaturedMarketplace />
      <NewsSection />
      <CallToAction />
    </div>
  )
}
