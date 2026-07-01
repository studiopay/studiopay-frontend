import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import PainSection from '@/components/landing/PainSection'
import ElisonPreviewSection from '@/components/landing/ElisonPreviewSection'
import StudioEcosystemPreview from '@/components/landing/StudioEcosystemPreview'
import PlansSection from '@/components/landing/PlansSection'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'

export default function LandingPage() {
  return (
    <PublicSiteShell>
      <Navbar />
      <Hero />
      <PainSection />
      <ElisonPreviewSection />
      <StudioEcosystemPreview />
      <PlansSection compact />
      <Footer />
    </PublicSiteShell>
  )
}



