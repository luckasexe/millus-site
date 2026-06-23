import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/5513982071346';

const infos = [
  {
    icon: MapPin,
    label: 'ENDEREÇO',
    linhas: ['R. Teodoro Soares Fernandes, 78', 'Cubatão — SP'],
    href: 'https://maps.google.com/?q=R.+Teodoro+Soares+Fernandes,+78,+Cubatão,+SP',
  },
  {
    icon: Phone,
    label: 'TELEFONE / WHATSAPP',
    linhas: ['(13) 98207-1346'],
    href: WHATSAPP_URL,
  },
  {
    icon: Clock,
    label: 'HORÁRIO DE ATENDIMENTO',
    linhas: ['Seg – Sex: 08h às 18h', 'Sáb: 08h às 12h'],
    href: null,
  },
  {
    icon: Mail,
    label: 'E-MAIL',
    linhas: ['contato@millus.com.br'],
    href: 'mailto:contato@millus.com.br',
  },
];

export function Contato() {
  return (
    <section className="blueprint-bg relative py-20 px-6 md:px-12 overflow-hidden" id="contato">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#f59e0b]" />
            <span className="blueprint-tag" style={{ color: '#f59e0b' }}>FALE CONOSCO</span>
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            ENTRE EM <span className="accent">CONTATO</span>
          </h2>
          <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
            Atendimento direto, sem intermediários. Fale com nossa equipe técnica
            pelo WhatsApp ou visite nossa loja em Cubatão.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#4a7fb5]/15">

          {/* Informações de contato */}
          <div className="bg-[#0a1628] p-8 flex flex-col gap-6">
            <p className="blueprint-tag mb-2">INFORMAÇÕES</p>

            {infos.map(({ icon: Icon, label, linhas, href }) => (
              <div key={label} className="flex gap-4 group">
                <div className="w-9 h-9 border border-[#4a7fb5]/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-[#f59e0b]/50 transition-colors duration-200">
                  <Icon size={16} className="text-[#f59e0b]" />
                </div>
                <div>
                  <p className="blueprint-tag mb-1" style={{ fontSize: '9px' }}>{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-[#e2eaf5] text-sm leading-relaxed hover:text-[#f59e0b] transition-colors duration-200"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem' }}
                    >
                      {linhas.map((l, i) => <span key={i} className="block">{l}</span>)}
                    </a>
                  ) : (
                    <div className="text-[#e2eaf5]" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem' }}>
                      {linhas.map((l, i) => <span key={i} className="block">{l}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA + mapa placeholder */}
          <div className="bg-[#060f1e] flex flex-col">

            {/* Mapa Google Maps */}
            <div className="flex-1 relative min-h-[260px] overflow-hidden">
              <iframe
                title="Localização Millus"
                src="https://www.google.com/maps?q=R.+Teodoro+Soares+Fernandes,+78,+Cubatão,+SP&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '260px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#f59e0b]/60 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#f59e0b]/60 pointer-events-none" />
            </div>

            {/* CTA WhatsApp */}
            <div className="p-8 border-t border-[#4a7fb5]/15">
              <p className="blueprint-tag mb-3">ATENDIMENTO RÁPIDO</p>
              <p className="text-[#8fadc8] text-sm leading-relaxed mb-5">
                Para orçamentos, dúvidas técnicas ou urgências — o caminho mais rápido é o WhatsApp.
                Nossa equipe responde em minutos.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#f59e0b] text-[#0a1628] font-semibold px-6 py-3 rounded-sm hover:bg-[#fbbf24] transition-colors duration-200 w-full"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                CHAMAR NO WHATSAPP
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="w-full max-w-7xl mx-auto mt-16 pt-8 border-t border-[#4a7fb5]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#4a7fb5] text-xs text-center" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          © {new Date().getFullYear()} MILLUS ACESSÓRIOS INDUSTRIAIS — CUBATÃO/SP
        </p>
        <p className="text-[#4a7fb5]/40 text-xs" style={{ fontFamily: 'monospace' }}>
          REF-MLX-SITE // v1.0
        </p>
      </div>
    </section>
  );
}
