export type SubjectId =
  | 'portugues'
  | 'raciocinio_logico'
  | 'informatica'
  | 'direito_constitucional'
  | 'direito_administrativo';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  questionCount: number;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'portugues',
    name: 'Língua Portuguesa',
    icon: 'book-open-variant',
    questionCount: 10,
  },
  {
    id: 'raciocinio_logico',
    name: 'Raciocínio Lógico',
    icon: 'calculator-variant',
    questionCount: 10,
  },
  {
    id: 'informatica',
    name: 'Informática',
    icon: 'laptop',
    questionCount: 10,
  },
  {
    id: 'direito_constitucional',
    name: 'Direito Constitucional',
    icon: 'scale-balance',
    questionCount: 10,
  },
  {
    id: 'direito_administrativo',
    name: 'Direito Administrativo',
    icon: 'gavel',
    questionCount: 10,
  },
];

