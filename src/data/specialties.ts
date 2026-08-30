export type SpecialtyFaq = {
  question: string;
  answer: string;
};

export type Specialty = {
  slug: string;
  title: string;
  shortDescription: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  body: readonly string[];
  faq: readonly SpecialtyFaq[];
};

export const specialties = [
  {
    slug: 'medicina-de-familia',
    title: 'Medicina de Família e Comunidade',
    shortDescription:
      'Cuidado longitudinal, integral e centrado na pessoa e na família, com mais de 25 anos de experiência na Atenção Primária.',
    h1: 'Medicina de família e comunidade em Curitiba com a Dra. Ligiana Maffini. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família e comunidade em Curitiba, com título pela SBMFC (2024) e mais de 25 anos na Atenção Primária à Saúde. Atende presencialmente no bairro Cristo Rei e por teleconsulta quando indicado. Agendamento pelo WhatsApp (41) 99510-4424.',
    metaTitle: 'Medicina de família em Curitiba',
    metaDescription:
      'Medicina de Família e Comunidade com a Dra. Ligiana Maffini em Curitiba (Cristo Rei). CRM/PR 17731 · RQE 37637. Consultas longas e acompanhamento contínuo.',
    body: [
      'A Medicina de Família e Comunidade organiza o cuidado em torno da pessoa, da família e do contexto em que vive. Em vez de fragmentar queixas em consultas isoladas, a médica de família conhece a história clínica, a rotina e os objetivos de saúde ao longo do tempo. Esse modelo é especialmente valioso para quem busca um referencial médico estável em Curitiba, com linguagem acessível e decisões compartilhadas.',
      'A Dra. Ligiana Maffini Romanus construiu sua trajetória na Atenção Primária à Saúde, atuando em serviços públicos e comunitários antes de abrir a clínica particular no Cristo Rei. Essa experiência reforça o olhar preventivo, a coordenação do cuidado e a capacidade de integrar condições agudas e crônicas no mesmo plano terapêutico. O consultório não substitui urgência ou emergência, mas oferece continuidade para quem precisa de acompanhamento médico regular.',
      'Na prática clínica, a consulta de medicina de família reserva tempo para escuta qualificada. Revisamos medicamentos, exames, hábitos de vida e fatores que impactam sintomas — sono, alimentação, estresse, movimento. Quando há necessidade de encaminhamento a outro especialista, a médica de família acompanha o processo e mantém a visão global da saúde do paciente.',
      'A abordagem é educativa e baseada em evidências, conforme orientações do Conselho Federal de Medicina. Informações neste site têm caráter informativo e não substituem consulta presencial ou teleconsulta. Cada conduta depende de avaliação individual; não há diagnóstico ou prescrição online por este canal.',
      'O atendimento presencial ocorre na Rua Zeila Moura dos Santos, 101, sala 503, Cristo Rei, Curitiba - PR. Teleconsulta pode ser indicada para continuidade, revisão de planos ou situações em que o deslocamento dificulta o retorno. O agendamento é feito pelo WhatsApp ou e-mail, sem formulário de dados clínicos neste site.',
      'Medicina de família dialoga naturalmente com Medicina do Estilo de Vida, prevenção, saúde da mulher, menopausa, emagrecimento clínico e longevidade — áreas em que a Dra. Ligiana também atua. Pacientes que chegam por uma queixa específica frequentemente permanecem para acompanhamento integral, porque o cuidado de família enxerga o todo, não apenas um laudo ou um sintoma isolado.',
      'Se você procura uma médica de família em Curitiba, com registro CRM/PR 17731 e RQE 37637, que combine experiência comunitária, consultas longas e plano de cuidado personalizado, este é o núcleo da prática clínica da Dra. Ligiana Maffini. Entre em contato para agendar a primeira conversa.',
    ],
    faq: [
      {
        question: 'O que faz uma médica de família em Curitiba?',
        answer:
          'Coordena o cuidado de saúde ao longo do tempo: consultas, prevenção, condições crônicas, orientação de estilo de vida e encaminhamentos quando necessário. A Dra. Ligiana Maffini atende no Cristo Rei, Curitiba. CRM/PR 17731.',
      },
      {
        question: 'Qual a diferença entre clínico geral e medicina de família?',
        answer:
          'A medicina de família forma especialistas para cuidado longitudinal e comunitário, com título reconhecido pela SBMFC. A Dra. Ligiana possui título de especialista em Medicina de Família e Comunidade (2024).',
      },
      {
        question: 'Como agendar consulta de medicina de família?',
        answer:
          'Pelo WhatsApp (41) 99510-4424 ou e-mail draligianamaffini@gmail.com. Atendimento presencial no Cristo Rei e teleconsulta quando indicado clinicamente.',
      },
    ],
  },
  {
    slug: 'medicina-do-estilo-de-vida',
    title: 'Medicina do Estilo de Vida',
    shortDescription:
      'Seis pilares — alimentação, movimento, sono, estresse, conexões e redução de tóxicos — integrados ao plano clínico.',
    h1: 'Medicina do estilo de vida em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família em Curitiba com formação em Medicina do Estilo de Vida (MevClinic e MevChange, MEV Brasil). Trabalha os seis pilares do estilo de vida dentro de consultas médicas presenciais no Cristo Rei. Agende pelo WhatsApp (41) 99510-4424.',
    metaTitle: 'Medicina do estilo de vida em Curitiba',
    metaDescription:
      'Medicina do Estilo de Vida com a Dra. Ligiana Maffini em Curitiba. CRM/PR 17731. Seis pilares clínicos integrados à consulta no Cristo Rei.',
    body: [
      'Medicina do Estilo de Vida é uma abordagem clínica que utiliza mudanças de hábitos — alimentação, movimento, sono, gerenciamento do estresse, conexões sociais e redução de tóxicos — como parte central do tratamento e da prevenção. Não se trata de coaching ou de promessas rápidas: é medicina, com avaliação, registro em prontuário e responsabilidade profissional.',
      'A Dra. Ligiana Maffini integra essa formação ao exercício da medicina de família em Curitiba. Cada consulta considera como a rotina real da pessoa facilita ou dificulta a saúde. Metas são definidas em conjunto, respeitando limites clínicos, preferências e capacidade de manutenção no longo prazo.',
      'Os seis pilares da Medicina do Estilo de Vida orientam o raciocínio clínico, mas não viram checklist rígido. Uma paciente com insônia e ganho de peso, por exemplo, pode precisar priorizar sono e alimentação antes de intensificar movimento. Outra, com estresse crônico e pressão elevada, pode exigir estratégias de regulação emocional aliadas ao ajuste medicamentoso quando indicado.',
      'A formação MEV complementa mais de 25 anos de experiência na Atenção Primária à Saúde. Esse histórico traz sensibilidade para contextos diversos — trabalho, família, envelhecimento, transições hormonais — sem julgamento e sem linguagem técnica desnecessária. O objetivo é traduzir evidência científica em passos praticáveis.',
      'Conteúdo educativo neste site não substitui consulta médica e não configura diagnóstico à distância, em linha com orientações do CFM. Condutas são definidas após anamnese, exame físico e análise de exames em consulta presencial ou teleconsulta.',
      'Para conhecer cada pilar em detalhe — o que significa clinicamente e como entra na consulta — acesse a página dos pilares da Medicina do Estilo de Vida. A abordagem se conecta às demais áreas de atuação: prevenção, saúde da mulher 40+, menopausa, emagrecimento clínico e longevidade.',
      'Consultório no Cristo Rei, Curitiba - PR. CRM/PR 17731 · RQE 37637. Agendamento exclusivamente por WhatsApp ou e-mail, sem coleta de dados clínicos neste site.',
    ],
    faq: [
      {
        question: 'O que é Medicina do Estilo de Vida?',
        answer:
          'Abordagem médica que usa mudanças de hábitos (alimentação, movimento, sono, estresse, conexões sociais e redução de tóxicos) como parte do cuidado clínico. A Dra. Ligiana Maffini atua em Curitiba. CRM/PR 17731.',
      },
      {
        question: 'Medicina do estilo de vida substitui tratamento convencional?',
        answer:
          'Não. Integra-se ao cuidado médico habitual — medicamentos, exames e encaminhamentos quando necessários. Decisões são tomadas em consulta, com avaliação individual.',
      },
      {
        question: 'Quais são os pilares usados na consulta?',
        answer:
          'Alimentação, movimento, sono, gerenciamento do estresse, conexões sociais e redução de tóxicos (tabaco, álcool, ultraprocessados em excesso). Detalhes em /pilares.',
      },
    ],
  },
  {
    slug: 'prevencao',
    title: 'Atenção primária e prevenção',
    shortDescription:
      'Rastreamento, promoção da saúde e prevenção de doenças com plano contínuo, não consulta única.',
    h1: 'Atenção primária e prevenção em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família em Curitiba com mais de 25 anos na Atenção Primária à Saúde. Oferece prevenção, rastreamento e promoção da saúde no consultório do Cristo Rei. Agendamento: WhatsApp (41) 99510-4424.',
    metaTitle: 'Prevenção e atenção primária em Curitiba',
    metaDescription:
      'Atenção primária e prevenção em Curitiba com a Dra. Ligiana Maffini. CRM/PR 17731. Rastreamento e hábitos de vida no Cristo Rei.',
    body: [
      'Prevenção em medicina vai além de pedir exames de rotina. Envolve entender risco cardiovascular, histórico familiar, hábitos, sono, movimento e condições que ainda não geraram sintomas, mas merecem acompanhamento. Na atenção primária, a prevenção é contínua: cada retorno atualiza o plano conforme a idade e a vida da pessoa mudam.',
      'A experiência da Dra. Ligiana Maffini no SUS e na Atenção Primária à Saúde moldou uma prática preventiva realista — adaptada à rotina de quem trabalha, cuida de família e envelhece. Em Curitiba, no bairro Cristo Rei, ela oferece consultas longas o suficiente para revisar rastreamentos indicados, interpretar exames e explicar o porquê de cada conduta, sem alarmismo.',
      'Promoção da saúde inclui vacinação conforme calendário adulto, orientação sobre alimentação e movimento, manejo de fatores de risco como pressão, glicemia e lipídios, e discussão sobre sono e estresse. Quando um achado exige especialista, a médica de família coordena o encaminhamento e mantém a visão integral.',
      'Este site oferece conteúdo educativo. Não realiza triagem online, não interpreta exames enviados por formulário e não prescreve tratamento por mensagem. Avaliação clínica presencial ou teleconsulta é necessária para definir condutas individualizadas, conforme normas do CFM.',
      'A prevenção conecta-se à Medicina do Estilo de Vida: pequenas mudanças sustentadas em alimentação, sono e movimento reduzem risco ao longo dos anos. Para mulheres acima de 40 anos, a prevenção também considera transições hormonais, saúde óssea e metabolismo — temas desenvolvidos nas páginas de saúde da mulher e menopausa.',
      'Pacientes que buscam apenas um check-up pontual podem evoluir para acompanhamento regular quando identificam valor na continuidade. A prevenção eficaz raramente se resolve em uma única visita; ela prospera quando há relação de confiança e retornos programados.',
      'Consultório: Cristo Rei, Curitiba - PR. CRM/PR 17731 · RQE 37637. Agende pelo WhatsApp ou e-mail. Teleconsulta disponível para continuidade quando clinicamente indicada.',
    ],
    faq: [
      {
        question: 'O que inclui prevenção na consulta médica?',
        answer:
          'Rastreamento conforme idade e risco, revisão de exames, orientação de estilo de vida, vacinação adulta e plano de retorno. Atendimento em Curitiba (Cristo Rei) com a Dra. Ligiana Maffini. CRM/PR 17731.',
      },
      {
        question: 'Preciso de sintomas para agendar prevenção?',
        answer:
          'Não. Muitas pessoas procuram consulta preventiva para revisar hábitos, exames e estratégias de longo prazo, especialmente após os 40 anos.',
      },
      {
        question: 'Como marcar consulta preventiva em Curitiba?',
        answer:
          'WhatsApp (41) 99510-4424 ou draligianamaffini@gmail.com. Presencial no Cristo Rei ou teleconsulta quando indicado.',
      },
    ],
  },
  {
    slug: 'saude-da-mulher',
    title: 'Saúde da mulher 40+',
    shortDescription:
      'Consultas longas para transições da meia-idade: energia, hormônios, metabolismo, sono e bem-estar emocional.',
    h1: 'Saúde da mulher 40+ em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família em Curitiba, com foco em saúde da mulher a partir dos 40 anos — transições hormonais, metabolismo, sono e estilo de vida. Consultório no Cristo Rei. WhatsApp: (41) 99510-4424.',
    metaTitle: 'Saúde da mulher 40+ em Curitiba',
    metaDescription:
      'Saúde da mulher 40+ em Curitiba com a Dra. Ligiana Maffini. CRM/PR 17731. Consultas longas no Cristo Rei — hormônios, metabolismo e prevenção.',
    body: [
      'A partir dos 40 anos, muitas mulheres percebem mudanças no sono, na energia, no peso, no ciclo menstrual ou no humor — às vezes gradualmente, às vezes de forma abrupta. Saúde da mulher nessa fase exige escuta atenta, não receitas padronizadas. A Dra. Ligiana Maffini, médica de família em Curitiba, reserva tempo de consulta para compreender contexto, medos e objetivos antes de propor condutas.',
      'A abordagem integra medicina de família e estilo de vida. Alimentação, movimento, estresse e sono entram na mesa junto com exames laboratoriais, histórico ginecológico e condições crônicas. Quando há indicação de terapia hormonal ou outro tratamento específico, a decisão é compartilhada, com explicação de benefícios, riscos e alternativas — sempre após avaliação presencial ou teleconsulta.',
      'Queixas comuns incluem alterações do ciclo na perimenopausa, ganho de peso central, queda de libido, fogachos, insônia e cansaço persistente. Nem todo sintoma tem causa hormonal, e nem toda queixa exige medicamento. Parte do trabalho é distinguir o que merece investigação adicional do que responde a ajustes de rotina e acompanhamento longitudinal.',
      'Informações neste site são educativas e não substituem consulta médica. Não oferecemos diagnóstico online, receitas por WhatsApp sem consulta ou promessas de rejuvenescimento. O CRM/PR 17731 e o RQE 37637 identificam a responsável técnica pelo atendimento em Curitiba.',
      'A saúde da mulher 40+ dialoga com as páginas de menopausa, emagrecimento clínico, longevidade e prevenção. Pacientes podem iniciar por uma queixa específica e manter acompanhamento integral com a mesma médica de família, evitando fragmentação do cuidado.',
      'O consultório fica no Cristo Rei, com ambiente acolhedor e consultas sem pressa de tempo. Teleconsulta complementa o cuidado quando retornos ou orientações podem ocorrer à distância com segurança clínica.',
      'Para agendar, utilize WhatsApp (41) 99510-4424 ou e-mail draligianamaffini@gmail.com. Não há formulário de dados de saúde neste site.',
    ],
    faq: [
      {
        question: 'A partir de que idade procurar saúde da mulher 40+?',
        answer:
          'Muitas mulheres iniciam acompanhamento entre 40 e 55 anos, mas cada caso é individual. A Dra. Ligiana Maffini atende em Curitiba (Cristo Rei). CRM/PR 17731.',
      },
      {
        question: 'A consulta inclui exame ginecológico?',
        answer:
          'A necessidade de exame físico e exames complementares é definida em consulta, conforme história clínica e diretrizes. Agendamento presencial ou teleconsulta inicial conforme indicação.',
      },
      {
        question: 'Como agendar saúde da mulher em Curitiba?',
        answer:
          'WhatsApp (41) 99510-4424. Consultório: Rua Zeila Moura dos Santos, 101, sala 503, Cristo Rei, Curitiba - PR.',
      },
    ],
  },
  {
    slug: 'menopausa',
    title: 'Menopausa',
    shortDescription:
      'Acompanhamento clínico de perimenopausa e menopausa — sintomas, estilo de vida e decisões terapêuticas compartilhadas.',
    h1: 'Acompanhamento de menopausa em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família em Curitiba e acompanha perimenopausa e menopausa com consultas longas, integrando estilo de vida e indicações clínicas quando necessário. Cristo Rei. WhatsApp (41) 99510-4424.',
    metaTitle: 'Menopausa em Curitiba',
    metaDescription:
      'Acompanhamento de menopausa em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731. Consultas no Cristo Rei — sem diagnóstico online.',
    body: [
      'Menopausa é a fase da vida em que os ciclos menstruais cessam de forma permanente, geralmente entre 45 e 55 anos, precedida pela perimenopausa — período de oscilação hormonal que pode durar anos. Fogachos, insônia, alterações de humor, secura vaginal, mudanças no peso e na libido são queixas frequentes, mas cada mulher vive a transição de um jeito.',
      'O acompanhamento médico de menopausa em Curitiba com a Dra. Ligiana Maffini começa pela escuta: quanto tempo duram os sintomas, como interferem no trabalho e no sono, quais medidas já foram tentadas. Exames podem ser solicitados quando ajudam na decisão clínica, não como ritual automático. A interpretação considera idade, histórico ginecológico, comorbidades e preferências pessoais.',
      'Nem toda mulher precisa de terapia hormonal. Quando há indicação, os prós e contras são discutidos com clareza, respeitando contraindicações e diretrizes. Paralelamente, trabalham-se pilares de estilo de vida — alimentação, movimento, sono, manejo de estresse — que impactam sintomas vasomotores, peso e qualidade de vida, com ou sem medicamento.',
      'Conteúdo publicado aqui é informativo. Não prescrevemos hormônios ou suplementos por mensagem, não substituímos consulta presencial e não garantimos resultados específicos. O CFM orienta que relação médico-paciente e prontuário adequado são requisitos para qualquer conduta.',
      'Menopausa intersecta saúde óssea, cardiovascular e metabólica. Por isso, o acompanhamento de família e prevenção continua após a transição hormonal — especialmente relevante para longevidade e saúde da mulher 40+.',
      'Atendimento no bairro Cristo Rei, Curitiba - PR. Teleconsulta pode ser usada para retornos e ajustes quando clinicamente apropriado. CRM/PR 17731 · RQE 37637.',
      'Agende pelo WhatsApp (41) 99510-4424. Este site não coleta queixas clínicas nem dados de saúde.',
    ],
    faq: [
      {
        question: 'Quando procurar médica para menopausa em Curitiba?',
        answer:
          'Quando sintomas como fogachos, insônia, alterações de ciclo ou humor passam a afetar a rotina, ou quando você deseja orientação preventiva na transição. Dra. Ligiana Maffini, CRM/PR 17731, Cristo Rei.',
      },
      {
        question: 'A Dra. Ligiana prescreve reposição hormonal?',
        answer:
          'Quando há indicação clínica após avaliação individual em consulta. A decisão é compartilhada, com explicação de riscos e benefícios. Não há prescrição online por este site.',
      },
      {
        question: 'Como agendar acompanhamento de menopausa?',
        answer:
          'WhatsApp (41) 99510-4424 ou draligianamaffini@gmail.com. Presencial no Cristo Rei ou teleconsulta conforme indicação.',
      },
    ],
  },
  {
    slug: 'emagrecimento',
    title: 'Emagrecimento',
    shortDescription:
      'Acompanhamento clínico de peso e metabolismo — sem promessa de resultado rápido, com plano médico individualizado.',
    h1: 'Emagrecimento clínico em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família em Curitiba e oferece acompanhamento clínico de emagrecimento — avaliação médica, hábitos e metas realistas, sem promessas milagrosas (CFM). Cristo Rei. WhatsApp (41) 99510-4424.',
    metaTitle: 'Emagrecimento clínico em Curitiba',
    metaDescription:
      'Emagrecimento com acompanhamento médico em Curitiba. Dra. Ligiana Maffini, CRM/PR 17731. Sem promessa milagrosa — consulta no Cristo Rei.',
    body: [
      'Emagrecimento saudável é processo médico quando envolve excesso de peso associado a riscos metabólicos, comorbidades ou impacto na qualidade de vida. A Dra. Ligiana Maffini aborda o tema como médica de família em Curitiba, não como programa de “emagrecer rápido”. O Conselho Federal de Medicina proíbe promessas de resultado milagroso; a prática clínica segue avaliação individual, metas graduais e acompanhamento contínuo.',
      'A consulta investiga histórico de peso, medicamentos, sono, estresse, alimentação, movimento, tireoide, diabetes e outros fatores que influenciam o metabolismo. Exames são solicitados quando agregam informação para decisão segura. Não há fórmula única nem dieta vendida como produto: há plano construído com a paciente, revisado em retornos.',
      'Medicamentos para perda de peso podem ser discutidos quando há indicação formal e após consulta, respeitando contraindicações e monitoramento. Suplementos milagrosos, detox sem base ou restrições extremas não fazem parte da abordagem. O foco está em sustentabilidade — mudanças que a pessoa consegue manter após a consulta.',
      'Emagrecimento conecta-se aos pilares de Medicina do Estilo de Vida: alimentação consciente, movimento progressivo, sono reparador e manejo de estresse frequentemente determinam adesão e resultado no longo prazo. Mulheres na perimenopausa ou menopausa podem precisar de estratégias específicas, integradas ao cuidado hormonal quando indicado.',
      'Este site não oferece plano alimentar personalizado, calculadora de IMC com conduta ou diagnóstico à distância. Informações são educativas. Condutas exigem consulta presencial ou teleconsulta com CRM/PR 17731.',
      'Consultório no Cristo Rei, Curitiba - PR. Acompanhamento inclui retornos programados para ajuste de metas e revisão clínica, não consulta única com promessa de transformação imediata.',
      'Agende pelo WhatsApp (41) 99510-4424. RQE 37637. Sem coleta de dados de saúde neste site.',
    ],
    faq: [
      {
        question: 'A Dra. Ligiana promete emagrecimento rápido?',
        answer:
          'Não. O acompanhamento é clínico, baseado em evidências e orientações do CFM — sem promessa de resultado milagroso. CRM/PR 17731, Curitiba.',
      },
      {
        question: 'Emagrecimento inclui medicamento?',
        answer:
          'Quando há indicação médica individual após consulta e exames, medicamentos podem ser discutidos com monitoramento. Não há prescrição por WhatsApp sem avaliação.',
      },
      {
        question: 'Como agendar consulta para emagrecimento em Curitiba?',
        answer:
          'WhatsApp (41) 99510-4424. Atendimento presencial no Cristo Rei ou teleconsulta quando indicado.',
      },
    ],
  },
  {
    slug: 'longevidade',
    title: 'Longevidade',
    shortDescription:
      'Envelhecimento saudável com prevenção, estilo de vida e plano de cuidado de longo prazo — ciência, não modismo.',
    h1: 'Longevidade e envelhecimento saudável em Curitiba com a Dra. Ligiana Maffini, médica de família. CRM/PR 17731.',
    lead:
      'A Dra. Ligiana Maffini Romanus é médica de família em Curitiba e trabalha longevidade como envelhecimento saudável — prevenção, estilo de vida e acompanhamento contínuo. Consultório Cristo Rei. WhatsApp (41) 99510-4424.',
    metaTitle: 'Longevidade em Curitiba',
    metaDescription:
      'Longevidade e envelhecimento saudável em Curitiba com a Dra. Ligiana Maffini. CRM/PR 17731. Medicina de família e estilo de vida no Cristo Rei.',
    body: [
      'Longevidade, no sentido clínico, não é buscar vida eterna nem protocolos da moda. É envelhecer com capacidade funcional, autonomia e menor carga de doenças preveníveis — através de hábitos sustentáveis, rastreamento adequado e relação médica de confiança ao longo dos anos. A Dra. Ligiana Maffini, médica de família em Curitiba, trabalha esse horizonte com pacientes que desejam cuidar da saúde além da queixa imediata.',
      'A consulta de longevidade revisa fatores modificáveis: alimentação, movimento, sono, estresse, conexões sociais e exposição a tabaco ou álcool em excesso — os mesmos pilares da Medicina do Estilo de Vida. Paralelamente, analisa pressão arterial, glicemia, perfil lipídico, peso, composição corporal quando disponível e histórico familiar de doenças cardiovasculares ou oncológicas.',
      'Não há “painel anti-aging” obrigatório ou suplementação empírica padronizada. Exames e intervenções seguem indicação individual, idade e risco. A conversa inclui expectativas realistas: longevidade constrói-se com consistência, não com intervenção única.',
      'Mulheres 40+, homens com fatores de risco cardiovascular e pessoas com condições crônicas controladas frequentemente buscam esse acompanhamento. A medicina de família permite integrar longevidade à prevenção, menopausa, emagrecimento clínico e demais áreas sem trocar de médico a cada tema.',
      'Conteúdo educativo neste site não substitui avaliação médica. CRM/PR 17731 · RQE 37637. Sem diagnóstico online.',
      'Consultório: Cristo Rei, Curitiba - PR. Teleconsulta para continuidade quando apropriado. Agendamento via WhatsApp ou e-mail, sem formulários de saúde no site.',
      'Longevidade é maratona clínica, não sprint comercial. O plano evolui conforme a vida muda — aposentadoria, novos diagnósticos, mudanças de rotina — com a mesma médica acompanhando.',
    ],
    faq: [
      {
        question: 'O que é longevidade na medicina de família?',
        answer:
          'Envelhecimento saudável com prevenção, estilo de vida e acompanhamento contínuo — não promessas de rejuvenescimento. Dra. Ligiana Maffini, Curitiba. CRM/PR 17731.',
      },
      {
        question: 'Longevidade exige exames especiais?',
        answer:
          'Exames são solicitados conforme idade, risco e história clínica individual, não pacotes padronizados. Avaliação em consulta presencial ou teleconsulta.',
      },
      {
        question: 'Como agendar consulta de longevidade em Curitiba?',
        answer:
          'WhatsApp (41) 99510-4424. Rua Zeila Moura dos Santos, 101, sala 503, Cristo Rei, Curitiba - PR.',
      },
    ],
  },
] as const satisfies readonly Specialty[];

export type SpecialtySlug = (typeof specialties)[number]['slug'];

export function getSpecialty(slug: string): Specialty | undefined {
  return specialties.find((item) => item.slug === slug);
}

export function getOtherSpecialties(currentSlug: string): Specialty[] {
  return specialties.filter((item) => item.slug !== currentSlug);
}
