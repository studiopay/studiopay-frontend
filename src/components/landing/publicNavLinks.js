export const publicNavLinks = [
  { label: 'Início', href: '/' },
  { label: 'Conta Digital', href: '/studio-core' },
  { label: 'Agenda', href: '/studio-agenda' },
  { label: 'Elison IA', href: '/elison-ia' },
  { label: 'Shop', href: '/studio-shop' },
  { label: 'Cursos', href: '/studio-learn' },
  { label: 'Tráfego', href: '/studio-ads' },
  { label: 'Planos', href: '/#planos' },
]

export const moduleNavLinks = publicNavLinks.filter((link) => link.label !== 'Planos')
