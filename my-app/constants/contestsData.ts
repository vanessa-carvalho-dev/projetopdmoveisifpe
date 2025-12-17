export type ContestStatus = 'open' | 'soon' | 'closed';
export type ContestLevel = 'medium' | 'superior';
export type ContestCategory = 'police' | 'fiscal' | 'admin' | 'legal' | 'health' | 'education';

export type Contest = {
  id: string;
  institution: string;
  role: string;
  salary: string;
  status: ContestStatus;
  level: ContestLevel;
  category: ContestCategory;
  details: {
    vacancies: string;
    requirements: string;
    link: string;
    registrationPeriod?: string;
    examDate?: string;
  };
};

export const CONTESTS: Contest[] = [
  {
    id: '1',
    institution: 'Polícia Federal',
    role: 'Agente Administrativo',
    salary: 'R$ 4.746,16',
    status: 'open',
    level: 'medium',
    category: 'police',
    details: {
      vacancies: '50 vagas',
      requirements: 'Diploma de nível médio completo, idade entre 18 e 50 anos, altura mínima de 1,60m para homens e 1,55m para mulheres.',
      link: 'https://www.pf.gov.br/concursos',
      registrationPeriod: '01/03/2024 a 31/03/2024',
      examDate: '15/06/2024',
    },
  },
  {
    id: '2',
    institution: 'Banco Central do Brasil',
    role: 'Analista',
    salary: 'R$ 20.924,80',
    status: 'open',
    level: 'superior',
    category: 'fiscal',
    details: {
      vacancies: '200 vagas',
      requirements: 'Diploma de nível superior em qualquer área, conhecimento em economia, direito ou administração.',
      link: 'https://www.bcb.gov.br/concursos',
      registrationPeriod: '10/02/2024 a 10/03/2024',
      examDate: '20/05/2024',
    },
  },
  {
    id: '3',
    institution: 'Caixa Econômica Federal',
    role: 'Técnico Bancário',
    salary: 'R$ 5.200,00',
    status: 'open',
    level: 'medium',
    category: 'admin',
    details: {
      vacancies: '300 vagas',
      requirements: 'Nível médio completo, conhecimentos em matemática e português.',
      link: 'https://www.caixa.gov.br/concursos',
      registrationPeriod: '15/01/2024 a 15/02/2024',
      examDate: '10/04/2024',
    },
  },
  {
    id: '4',
    institution: 'Tribunal de Justiça',
    role: 'Analista Judiciário',
    salary: 'R$ 12.500,00',
    status: 'open',
    level: 'superior',
    category: 'legal',
    details: {
      vacancies: '80 vagas',
      requirements: 'Diploma de nível superior em Direito, registro na OAB.',
      link: 'https://www.tj.gov.br/concursos',
      registrationPeriod: '01/04/2024 a 30/04/2024',
      examDate: '25/07/2024',
    },
  },
  {
    id: '5',
    institution: 'Polícia Civil',
    role: 'Delegado de Polícia',
    salary: 'R$ 18.000,00',
    status: 'soon',
    level: 'superior',
    category: 'police',
    details: {
      vacancies: '30 vagas',
      requirements: 'Diploma de nível superior em Direito, registro na OAB, idade entre 21 e 45 anos.',
      link: 'https://www.policiacivil.gov.br/concursos',
      registrationPeriod: 'A definir',
      examDate: 'A definir',
    },
  },
  {
    id: '6',
    institution: 'Receita Federal',
    role: 'Auditor Fiscal',
    salary: 'R$ 22.000,00',
    status: 'open',
    level: 'superior',
    category: 'fiscal',
    details: {
      vacancies: '150 vagas',
      requirements: 'Diploma de nível superior em Direito, Economia, Contabilidade ou Administração.',
      link: 'https://www.gov.br/receitafederal/concursos',
      registrationPeriod: '05/03/2024 a 05/04/2024',
      examDate: '30/06/2024',
    },
  },
  {
    id: '7',
    institution: 'Ministério da Saúde',
    role: 'Técnico em Enfermagem',
    salary: 'R$ 3.800,00',
    status: 'open',
    level: 'medium',
    category: 'health',
    details: {
      vacancies: '120 vagas',
      requirements: 'Diploma de nível médio em Técnico de Enfermagem, registro no COREN.',
      link: 'https://www.gov.br/saude/concursos',
      registrationPeriod: '20/02/2024 a 20/03/2024',
      examDate: '18/05/2024',
    },
  },
  {
    id: '8',
    institution: 'Secretaria de Educação',
    role: 'Professor de Matemática',
    salary: 'R$ 6.500,00',
    status: 'open',
    level: 'superior',
    category: 'education',
    details: {
      vacancies: '200 vagas',
      requirements: 'Diploma de nível superior em Licenciatura em Matemática ou áreas afins.',
      link: 'https://www.educacao.gov.br/concursos',
      registrationPeriod: '10/03/2024 a 10/04/2024',
      examDate: '22/06/2024',
    },
  },
  {
    id: '9',
    institution: 'Polícia Militar',
    role: 'Soldado PM',
    salary: 'R$ 4.200,00',
    status: 'closed',
    level: 'medium',
    category: 'police',
    details: {
      vacancies: '500 vagas',
      requirements: 'Nível médio completo, idade entre 18 e 30 anos, altura mínima de 1,65m para homens e 1,60m para mulheres.',
      link: 'https://www.pm.gov.br/concursos',
      registrationPeriod: 'Encerrado',
      examDate: 'Realizado',
    },
  },
  {
    id: '10',
    institution: 'Tribunal de Contas',
    role: 'Analista de Controle Externo',
    salary: 'R$ 15.000,00',
    status: 'open',
    level: 'superior',
    category: 'fiscal',
    details: {
      vacancies: '60 vagas',
      requirements: 'Diploma de nível superior em qualquer área, preferência para Direito, Contabilidade ou Administração.',
      link: 'https://www.tce.gov.br/concursos',
      registrationPeriod: '01/05/2024 a 31/05/2024',
      examDate: '15/08/2024',
    },
  },
  {
    id: '11',
    institution: 'Prefeitura Municipal',
    role: 'Agente Administrativo',
    salary: 'R$ 3.500,00',
    status: 'open',
    level: 'medium',
    category: 'admin',
    details: {
      vacancies: '100 vagas',
      requirements: 'Nível médio completo, conhecimentos básicos em informática.',
      link: 'https://www.prefeitura.gov.br/concursos',
      registrationPeriod: '15/04/2024 a 15/05/2024',
      examDate: '10/07/2024',
    },
  },
  {
    id: '12',
    institution: 'Ministério Público',
    role: 'Promotor de Justiça',
    salary: 'R$ 25.000,00',
    status: 'soon',
    level: 'superior',
    category: 'legal',
    details: {
      vacancies: '40 vagas',
      requirements: 'Diploma de nível superior em Direito, registro na OAB há pelo menos 3 anos.',
      link: 'https://www.mp.gov.br/concursos',
      registrationPeriod: 'A definir',
      examDate: 'A definir',
    },
  },
];

