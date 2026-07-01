import Reveal from './Reveal'

const testimonials = [
  {
    initials: 'RM',
    name: 'Rafaela Mendes',
    city: 'São Paulo, SP',
    specialty: 'Fine Line',
    mocked: true,
    text: 'Antes eu anotava tudo no WhatsApp. Agora sei quem confirmou, quem pagou e quanto entrou.',
  },
  {
    initials: 'LS',
    name: 'Lucas Santana',
    city: 'Belo Horizonte, MG',
    specialty: 'Realismo',
    mocked: true,
    text: 'Parece que eu ganhei uma secretária sem contratar ninguém.',
  },
  {
    initials: 'CB',
    name: 'Carol Bastos',
    city: 'Curitiba, PR',
    specialty: 'Aquarela',
    mocked: true,
    text: 'O financeiro ficou claro. Parei de misturar dinheiro do estúdio com o meu.',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="depoimentos">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Depoimentos</span>
            <h2 className="section-title">
              Rotina organizada<br />
              <span className="text-pink">muda a conversa.</span>
            </h2>
            <p className="section-sub">
              Exemplos de percepção de uso para representar o tom esperado dos clientes.
            </p>
          </div>
        </Reveal>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="testimonial-card" data-mocked={t.mocked ? 'true' : undefined}>
                <p className="testimonial-text">“{t.text}”</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-meta">{t.specialty} · {t.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
