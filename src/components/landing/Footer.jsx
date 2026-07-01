import { Link } from 'react-router-dom'
import { Camera, Play, X as XIcon, Mail } from 'lucide-react'
import Reveal from './Reveal'

const productLinks = [
  { label: 'Início', to: '/' },
  { label: 'Studio Pro', to: '/#planos' },
  { label: 'Elison IA', to: '/elison-ia' },
  { label: 'Conta Digital', to: '/studio-core' },
  { label: 'Shop', to: '/studio-shop' },
  { label: 'Cursos', to: '/studio-learn' },
  { label: 'Agenda', to: '/studio-agenda' },
]

const companyLinks = [
  { label: 'Sobre', href: '#' },
  { label: 'Carreiras', href: '#' },
  { label: 'Imprensa', href: '#' },
  { label: 'Parceiros', href: '#' },
]

const supportLinks = [
  { label: 'Ajuda', href: '#' },
  { label: 'Contato', href: '#' },
  { label: 'Status', href: '#' },
  { label: 'Termos de Uso', href: '#' },
  { label: 'Privacidade', href: '#' },
  { label: 'Política de Cookies', href: '#' },
  { label: 'Preferências de Cookies', href: '#' },
]

const socialLinks = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Play, label: 'YouTube', href: '#' },
  { icon: XIcon, label: 'X / Twitter', href: '#' },
  { icon: Mail, label: 'E-mail', href: '#' },
]

export default function Footer({ showCta = true }) {
  return (
    <footer className="landing-footer">
      {showCta && (
        <Reveal>
          <div className="footer-cta">
            <div className="container">
              <h2 className="footer-cta-title">
                Você cria.<br />
                <span className="text-pink">A gente organiza.</span>
              </h2>
              <p className="footer-cta-sub">
                Comece pela parte da rotina que mais pesa hoje.
              </p>
              <Link to="/cadastro" className="btn btn-primary btn-lg">
                Começar agora
              </Link>
            </div>
          </div>
        </Reveal>
      )}

      <div className="footer-main">
        <div className="container">
          <div className="footer-main-grid">
            <div className="footer-brand">
              <Link to="/" aria-label="Studio Pay">
                <img
                  src="/brand/logo-studio-pay-horizontal-white.png"
                  alt="Studio Pay"
                  className="footer-brand-logo-img"
                />
              </Link>
              <p className="footer-brand-tagline">
                O sistema que cuida da rotina, pra você cuidar do trabalho. Feito pra quem vive da tatuagem.
              </p>
              <div className="footer-socials">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="footer-social-btn"
                    aria-label={label}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-col-title">Produto</h3>
              <ul className="footer-nav-col-links">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith('/#') ? (
                      <a href={link.to}>{link.label}</a>
                    ) : (
                      <Link to={link.to}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-col-title">Empresa</h3>
              <ul className="footer-nav-col-links">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-col-title">Suporte</h3>
              <ul className="footer-nav-col-links">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-regulatory">
        <div className="container">
          <p className="footer-regulatory-title">Informações regulatórias</p>
          <p className="footer-regulatory-text">
            Somos uma fintech parceira da PINBANK. A STUDIO PAY CARTÕES E REPRESENTAÇÕES LTDA atua como correspondente no País — ou seja, conectamos você aos produtos da Pinbank Brasil Instituição de Pagamento S.A. (CNPJ: 17.079.937/0001-05), autorizada pelo Banco Central do Brasil. Tudo 100% digital, simples e seguro. A análise e a contratação dos produtos financeiros são realizadas pela PINBANK, conforme a Resolução CMN nº 4.935/2021.
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-bar-inner">
          <span className="footer-bottom-copy">© 2026 Studio Pay. Todos os direitos reservados.</span>
          <span className="footer-bottom-tagline">Seu trabalho rende mais quando o sistema acompanha.</span>
          <span className="footer-bottom-credit">Design &amp; Desenvolvimento por T-ALPHA®</span>
        </div>
      </div>
    </footer>
  )
}
