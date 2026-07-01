import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import AppLayout from './layouts/AppLayout'
import PublicLayout from './layouts/PublicLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import OnboardingPage from './pages/OnboardingPage'
import StudioCorePage from './pages/public/StudioCorePage'
import StudioAgendaPage from './pages/public/StudioAgendaPage'
import ElisonIAPage from './pages/public/ElisonIAPage'
import StudioShopPage from './pages/public/StudioShopPage'
import StudioLearnPage from './pages/public/StudioLearnPage'
import StudioAdsPage from './pages/public/StudioAdsPage'
import PlanosPage from './pages/public/PlanosPage'
import Dashboard from './pages/app/Dashboard'
import Banco from './pages/app/Banco'
import Financeiro from './pages/app/Financeiro'
import Agenda from './pages/app/Agenda'
import Clientes from './pages/app/Clientes'
import Cobracas from './pages/app/Cobracas'
import CriarCobranca from './pages/app/CriarCobranca'
import CriarLink from './pages/app/CriarLink'
import SimularVenda from './pages/app/SimularVenda'
import Elison from './pages/app/Elison'
import Shop from './pages/app/Shop'
import ShopProduto from './pages/app/ShopProduto'
import Learn from './pages/app/Learn'
import Ads from './pages/app/Ads'
import Relatorios from './pages/app/Relatorios'
import Configuracoes from './pages/app/Configuracoes'
import AdminPage from './pages/admin/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studio-core" element={<StudioCorePage />} />
          <Route path="/studio-agenda" element={<StudioAgendaPage />} />
          <Route path="/elison-ia" element={<ElisonIAPage />} />
          <Route path="/studio-shop" element={<StudioShopPage />} />
          <Route path="/studio-learn" element={<StudioLearnPage />} />
          <Route path="/studio-ads" element={<StudioAdsPage />} />
          <Route path="/planos" element={<PlanosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="banco" element={<Banco />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="cobrancas" element={<Cobracas />} />
          <Route path="cobrancas/criar" element={<CriarCobranca />} />
          <Route path="cobrancas/link" element={<CriarLink />} />
          <Route path="cobrancas/simular" element={<SimularVenda />} />
          <Route path="elison" element={<Elison />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/produto/:id" element={<ShopProduto />} />
          <Route path="learn" element={<Learn />} />
          <Route path="ads" element={<Ads />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
