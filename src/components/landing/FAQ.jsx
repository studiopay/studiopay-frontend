import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  {
    q: 'O Studio Pay é banco?',
    a: 'Não. É um ecossistema para organizar rotina, agenda, cobranças e financeiro. A conta digital é só uma parte da operação.',
  },
  {
    q: 'Preciso usar tudo de uma vez?',
    a: 'Não. Você começa pelo que precisa agora e ativa outros módulos conforme a rotina pedir.',
  },
  {
    q: 'A IA responde meus clientes?',
    a: 'O Elisson.IA ajuda com respostas, lembretes, confirmações e recuperação de clientes, sempre conforme sua configuração.',
  },
  {
    q: 'Tem fidelidade?',
    a: 'Não. A ideia é ser simples: você usa enquanto fizer sentido para o estúdio.',
  },
  {
    q: 'Funciona para tatuador autônomo?',
    a: 'Sim. Foi pensado para autônomos, estúdios pequenos e profissionais que querem organizar a operação sem burocracia.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Perguntas <span className="text-pink">frequentes</span>
            </h2>
          </div>
        </Reveal>
        <div className="faq-list">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 45}>
              <div className={`faq-item ${open === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="faq-icon" />
                </button>
                {open === i && <p className="faq-answer">{item.a}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
