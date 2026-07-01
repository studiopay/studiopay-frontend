import Navbar from '@/components/landing/Navbar'
import PlansSection from '@/components/landing/PlansSection'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'

export default function PlanosPage() {
  return (
    <PublicSiteShell>
      <Navbar />
      <main className="plans-page">
        <PlansSection />
      </main>
      <Footer />
    </PublicSiteShell>
  )
}
