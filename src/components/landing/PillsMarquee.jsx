import {
  Wallet, Calendar, ShoppingBag, Bot, GraduationCap, ReceiptText, QrCode, BellRing,
  MessageCircle, Users, BarChart3, TrendingUp, Crown, Zap, Headset, Package, Clock, FileText,
} from 'lucide-react'

// Faixa decorativa — só reforça visualmente módulos/termos que já existem
// como copy real em outras seções da home (Ecossistema, navbar, etc.).
// Puramente visual/premium, por isso fica aria-hidden.
const pillItems = [
  { label: 'Conta Digital', Icon: Wallet },
  { label: 'Agenda', Icon: Calendar },
  { label: 'Studio Shop', Icon: ShoppingBag },
  { label: 'Elison IA', Icon: Bot },
  { label: 'Cursos', Icon: GraduationCap },
  { label: 'Cobranças', Icon: ReceiptText },
  { label: 'Pix', Icon: QrCode },
  { label: 'Lembretes', Icon: BellRing },
  { label: 'WhatsApp', Icon: MessageCircle },
  { label: 'Clientes', Icon: Users },
  { label: 'Financeiro', Icon: BarChart3 },
  { label: 'Crescimento', Icon: TrendingUp },
  { label: 'Studio Pró', Icon: Crown },
  { label: 'Automação', Icon: Zap },
  { label: 'Atendimento', Icon: Headset },
  { label: 'Produtos', Icon: Package },
  { label: 'Sessões', Icon: Clock },
  { label: 'Orçamentos', Icon: FileText },
]

export default function PillsMarquee() {
  return (
    <div className="pills-marquee" aria-hidden="true">
      <div className="pills-marquee-track">
        {[...pillItems, ...pillItems].map(({ label, Icon }, i) => (
          <span key={i} className="pills-marquee-pill">
            <Icon size={14} strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
