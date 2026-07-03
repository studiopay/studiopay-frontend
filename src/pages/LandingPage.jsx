import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import WhyStudioPaySection from '@/components/landing/WhyStudioPaySection'
import PainSection from '@/components/landing/PainSection'
import ElisonPreviewSection from '@/components/landing/ElisonPreviewSection'
import DemoGifSection from '@/components/landing/DemoGifSection'
import StudioEcosystemPreview from '@/components/landing/StudioEcosystemPreview'
import PlansSection from '@/components/landing/PlansSection'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'

export default function LandingPage() {
  return (
    <PublicSiteShell>
      <Navbar />
      <Hero />
      <WhyStudioPaySection />
      <StudioEcosystemPreview />
      <PainSection />
      <ElisonPreviewSection />
      <DemoGifSection />
      <PlansSection compact />
      <Footer />
    </PublicSiteShell>
  )
}



