export type MevPillar = {
  id: string;
  title: string;
  clinical: string;
  consultation: string;
};

export const mevPillars = [
  {
    id: 'alimentacao',
    title: 'Alimentação',
    clinical:
      'A alimentação influencia peso, metabolismo, inflamação, sono e risco cardiovascular. Na Medicina do Estilo de Vida, o foco não é dieta da moda, e sim padrão alimentar sustentável, adequado à rotina e às condições clínicas de cada pessoa.',
    consultation:
      'Na consulta, revisamos hábitos reais — horários, fome, preferências, restrições e relação emocional com a comida — para construir metas graduais e monitoráveis, sem prescrição milagrosa.',
  },
  {
    id: 'movimento',
    title: 'Movimento',
    clinical:
      'Atividade física regular protege coração, ossos, humor e capacidade funcional ao longo da vida. O benefício vem da consistência e da progressão segura, não de extremos que a pessoa não consegue manter.',
    consultation:
      'Avaliamos condicionamento, limitações articulares ou cardíacas, tempo disponível e preferências. O plano combina movimento diário, força quando indicado e orientação para retomar ou manter hábitos com segurança.',
  },
  {
    id: 'sono',
    title: 'Sono',
    clinical:
      'Sono insuficiente ou de má qualidade altera hormônios, apetite, memória e recuperação. Muitas queixas de cansaço, irritabilidade ou ganho de peso têm componente relacionado ao sono que merece investigação clínica.',
    consultation:
      'Exploramos rotina, ronco, despertares, uso de telas e medicamentos. Quando necessário, orientamos ajustes comportamentais e encaminhamento para exames ou especialistas, integrando o sono ao restante do cuidado.',
  },
  {
    id: 'estresse',
    title: 'Gerenciamento do estresse',
    clinical:
      'Estresse crônico impacta pressão arterial, imunidade, digestão e adesão a hábitos saudáveis. Reconhecer fontes de tensão e desenvolver estratégias de regulação faz parte de um cuidado médico completo, não é “detalhe emocional”.',
    consultation:
      'Conversamos sobre carga de trabalho, família, saúde mental e sinais físicos. O plano pode incluir limites de ritmo, técnicas de respiração ou pausa, encaminhamento psicoterapêutico e revisão de condições que mantêm o corpo em alerta.',
  },
  {
    id: 'conexoes',
    title: 'Conexões sociais',
    clinical:
      'Isolamento e solidão associam-se a pior qualidade de vida e maior risco de adoecimento. Relações significativas, pertencimento e rede de apoio são determinantes de saúde reconhecidos na literatura de estilo de vida.',
    consultation:
      'Entendemos contexto familiar, profissional e comunitário. Quando a solidão ou conflitos persistentes afetam a saúde, trabalhamos metas realistas para fortalecer vínculos e identificar apoio profissional quando fizer sentido.',
  },
  {
    id: 'reducao-toxicos',
    title: 'Redução de tóxicos',
    clinical:
      'Tabaco, álcool em excesso e consumo frequente de ultraprocessados aumentam risco de doenças crônicas. A redução ou cessação, quando indicada, deve ser acompanhada com plano clínico, não com culpa ou simplificação.',
    consultation:
      'Avaliamos padrão de uso, motivação e riscos individuais. Definimos passos graduais — redução de cigarro, reorganização do álcool, substituição gradual de ultraprocessados — com retorno para ajuste e suporte entre consultas.',
  },
] as const satisfies readonly MevPillar[];
