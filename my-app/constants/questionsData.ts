export type QuestionType = 'list' | 'grid_icons' | 'cards';

export type QuestionOption = {
  id: string;
  label: string;
  icon?: string;
};

export type Question = {
  id: number;
  question: string;
  type: QuestionType;
  options: QuestionOption[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Qual o seu nível de formação atual?',
    type: 'list',
    options: [
      { id: 'medio', label: 'Nível Médio' },
      { id: 'superior', label: 'Nível Superior' },
      { id: 'pos', label: 'Pós-graduação' },
      { id: 'mestrado', label: 'Mestrado' },
      { id: 'doutorado', label: 'Doutorado' },
    ],
  },
  {
    id: 2,
    question: 'Que tipo de atividade mais lhe agrada?',
    type: 'grid_icons',
    options: [
      { id: 'admin', label: 'Organização/Escritório', icon: 'folder' },
      { id: 'police', label: 'Ação/Policial', icon: 'shield' },
      { id: 'fiscal', label: 'Números/Fiscal', icon: 'calculator' },
      { id: 'legal', label: 'Jurídico/Legal', icon: 'scale-balance' },
      { id: 'health', label: 'Saúde/Assistência', icon: 'medical-bag' },
      { id: 'education', label: 'Educação/Ensino', icon: 'school' },
    ],
  },
  {
    id: 3,
    question: 'O que é mais importante para si agora?',
    type: 'cards',
    options: [
      { id: 'salary', label: 'Salário mais alto', icon: 'dollar-sign' },
      { id: 'speed', label: 'Passar rápido', icon: 'clock' },
      { id: 'location', label: 'Trabalhar perto de casa', icon: 'map-pin' },
      { id: 'stability', label: 'Estabilidade e segurança', icon: 'shield-check' },
      { id: 'growth', label: 'Crescimento profissional', icon: 'trending-up' },
    ],
  },
  {
    id: 4,
    question: 'Quanto tempo você pode dedicar aos estudos por semana?',
    type: 'list',
    options: [
      { id: 'low', label: 'Menos de 10 horas' },
      { id: 'medium', label: '10 a 20 horas' },
      { id: 'high', label: '20 a 40 horas' },
      { id: 'very_high', label: 'Mais de 40 horas' },
    ],
  },
  {
    id: 5,
    question: 'Qual área do serviço público mais te interessa?',
    type: 'grid_icons',
    options: [
      { id: 'federal', label: 'Federal', icon: 'flag' },
      { id: 'estadual', label: 'Estadual', icon: 'map' },
      { id: 'municipal', label: 'Municipal', icon: 'city' },
      { id: 'autarquia', label: 'Autarquias', icon: 'office-building' },
    ],
  },
  {
    id: 6,
    question: 'Como você prefere estudar?',
    type: 'cards',
    options: [
      { id: 'self', label: 'Sozinho (autodidata)', icon: 'book-open' },
      { id: 'online', label: 'Cursos online', icon: 'monitor' },
      { id: 'presential', label: 'Cursos presenciais', icon: 'chalkboard-teacher' },
      { id: 'hybrid', label: 'Método híbrido', icon: 'sync' },
    ],
  },
  {
    id: 7,
    question: 'Qual é o seu objetivo principal com a carreira pública?',
    type: 'list',
    options: [
      { id: 'retirement', label: 'Aposentadoria garantida' },
      { id: 'impact', label: 'Fazer diferença na sociedade' },
      { id: 'career', label: 'Construir uma carreira sólida' },
      { id: 'change', label: 'Mudar de área profissional' },
    ],
  },
];

export type UserAnswers = {
  [questionId: number]: string;
};

export type Profile = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

export const PROFILES: Profile[] = [
  {
    id: 'estrategista_admin',
    name: 'Estrategista Administrativo',
    description:
      'Você possui habilidades de organização, planejamento e gestão. Perfeito para cargos administrativos, de gestão pública e coordenação. Seu perfil combina com concursos de nível superior em áreas como Administração Pública, Gestão de Políticas Públicas e cargos de coordenação.',
    icon: 'briefcase',
  },
  {
    id: 'guardiao_operacional',
    name: 'Guardião Operacional',
    description:
      'Você tem perfil para atividades que exigem ação, disciplina e comprometimento com a segurança pública. Ideal para carreiras policiais, de segurança e operacionais. Seu perfil se alinha com concursos de Polícia Civil, Militar, Federal e cargos de segurança.',
    icon: 'shield',
  },
  {
    id: 'analista_fiscal',
    name: 'Analista Fiscal e Controle',
    description:
      'Você tem afinidade com números, análise e controle. Perfeito para cargos em Receita Federal, Tribunais de Contas, Controladorias e áreas fiscais. Seu perfil combina com concursos que exigem raciocínio lógico e conhecimento em contabilidade, economia ou direito tributário.',
    icon: 'calculator',
  },
  {
    id: 'jurista_publico',
    name: 'Jurista Público',
    description:
      'Você tem interesse em questões jurídicas e legais. Ideal para carreiras jurídicas, procuradorias, defensoria pública e tribunais. Seu perfil se alinha com concursos que exigem formação em Direito e conhecimento jurídico aprofundado.',
    icon: 'scale-balance',
  },
  {
    id: 'servidor_social',
    name: 'Servidor Social',
    description:
      'Você tem vocação para áreas de assistência, saúde e educação pública. Perfeito para cargos em secretarias de saúde, educação, assistência social e desenvolvimento. Seu perfil combina com concursos que exigem formação específica nessas áreas e comprometimento com o bem-estar social.',
    icon: 'heart',
  },
  {
    id: 'planejador_estrategico',
    name: 'Planejador Estratégico',
    description:
      'Você tem visão estratégica e interesse em políticas públicas de alto nível. Ideal para cargos de planejamento, desenvolvimento e gestão estratégica. Seu perfil se alinha com concursos de nível superior em áreas de planejamento urbano, desenvolvimento regional e gestão de políticas públicas.',
    icon: 'chart-line',
  },
];

