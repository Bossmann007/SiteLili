export const site = {
  name: 'Clínica Dra. Ligiana Maffini',
  shortName: 'Dra. Ligiana Maffini',
  doctor: 'Dra. Ligiana Maffini',
  fullName: 'Ligiana Maffini Romanus',
  specialty: 'Médica de Família e Comunidade',
  url: 'https://www.draligianamaffini.com.br',
  phone: '(41) 99510-4424',
  phoneTel: '+5541995104424',
  whatsapp: 'https://wa.me/5541995104424',
  email: 'draligianamaffini@gmail.com',
  crm: 'CRM/PR 17731',
  rqe: 'RQE 37637',
  address: {
    street: 'Rua Zeila Moura dos Santos, 101, sala 503',
    neighborhood: 'Cristo Rei',
    city: 'Curitiba',
    state: 'PR',
    zip: '80050-605',
    country: 'BR',
    full: 'Rua Zeila Moura dos Santos, 101, sala 503, Cristo Rei, Curitiba - PR, 80050-605',
  },
  instagram: {
    personal: 'https://www.instagram.com/draligianamaffini',
    clinic: 'https://www.instagram.com/clinicadraligianamaffini',
    personalHandle: '@draligianamaffini',
    clinicHandle: '@clinicadraligianamaffini',
  },
  mapQuery:
    'Rua+Zeila+Moura+dos+Santos,+101,+sala+503,+Cristo+Rei,+Curitiba+-+PR,+80050-605',
  logo: {
    horizontal: '/logo/logo-horizontal.png',
    icon: '/logo/logo-icon.png',
  },
} as const;

export const nav = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/abordagem', label: 'Abordagem' },
  { href: '/contato', label: 'Contato' },
] as const;

export const services = [
  {
    title: 'Consulta integral',
    description:
      'Atendimento presencial em Curitiba com tempo dedicado para ouvir, examinar e construir um plano de cuidado personalizado.',
  },
  {
    title: 'Teleconsulta',
    description:
      'Acompanhamento à distância com a mesma atenção clínica, ideal para continuidade do cuidado e orientações de estilo de vida.',
  },
  {
    title: 'Longevidade e estilo de vida',
    description:
      'Estratégias baseadas em evidências para envelhecimento saudável, prevenção e qualidade de vida após os 40 anos.',
  },
  {
    title: 'Saúde da mulher',
    description:
      'Atenção às transições hormonais, rotina, sono, nutrição e bem-estar emocional com abordagem acolhedora.',
  },
] as const;
