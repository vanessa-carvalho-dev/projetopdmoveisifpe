import { SubjectId } from './subjectsData';

export interface SubjectQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    label: string;
  }[];
  correctAnswerId: string;
}

// Questões mockadas para cada matéria
// Em produção, isso viria de uma API ou banco de dados
export const SUBJECT_QUESTIONS: Record<SubjectId, SubjectQuestion[]> = {
  portugues: [
    {
      id: 'pt_1',
      question: 'Qual é a função sintática da palavra "rapidamente" na frase: "Ele correu rapidamente"?',
      options: [
        { id: 'a', label: 'Sujeito' },
        { id: 'b', label: 'Predicado' },
        { id: 'c', label: 'Adjunto adverbial' },
        { id: 'd', label: 'Complemento nominal' },
      ],
      correctAnswerId: 'c',
    },
    {
      id: 'pt_2',
      question: 'Assinale a alternativa em que todas as palavras estão grafadas corretamente:',
      options: [
        { id: 'a', label: 'Exceção, excessão, exceção' },
        { id: 'b', label: 'Exceção, excesso, exceção' },
        { id: 'c', label: 'Excessão, excesso, exceção' },
        { id: 'd', label: 'Exceção, excesso, excessão' },
      ],
      correctAnswerId: 'b',
    },
    // Adicionar mais 8 questões mockadas...
  ],
  raciocinio_logico: [
    {
      id: 'rl_1',
      question: 'Se todos os A são B e alguns B são C, então:',
      options: [
        { id: 'a', label: 'Todos os A são C' },
        { id: 'b', label: 'Alguns A são C' },
        { id: 'c', label: 'Nenhum A é C' },
        { id: 'd', label: 'Não é possível determinar' },
      ],
      correctAnswerId: 'd',
    },
    // Adicionar mais 9 questões mockadas...
  ],
  informatica: [
    {
      id: 'inf_1',
      question: 'O que significa a sigla HTTP?',
      options: [
        { id: 'a', label: 'HyperText Transfer Protocol' },
        { id: 'b', label: 'High Transfer Text Protocol' },
        { id: 'c', label: 'HyperText Transmission Protocol' },
        { id: 'd', label: 'High Text Transfer Protocol' },
      ],
      correctAnswerId: 'a',
    },
    // Adicionar mais 9 questões mockadas...
  ],
  direito_constitucional: [
    {
      id: 'dc_1',
      question: 'Qual é o princípio fundamental que garante a separação dos poderes?',
      options: [
        { id: 'a', label: 'Princípio da legalidade' },
        { id: 'b', label: 'Princípio da separação dos poderes' },
        { id: 'c', label: 'Princípio da impessoalidade' },
        { id: 'd', label: 'Princípio da moralidade' },
      ],
      correctAnswerId: 'b',
    },
    // Adicionar mais 9 questões mockadas...
  ],
  direito_administrativo: [
    {
      id: 'da_1',
      question: 'O que é um ato administrativo?',
      options: [
        { id: 'a', label: 'Qualquer manifestação de vontade da administração pública' },
        { id: 'b', label: 'Apenas decisões judiciais' },
        { id: 'c', label: 'Leis aprovadas pelo Congresso' },
        { id: 'd', label: 'Contratos privados' },
      ],
      correctAnswerId: 'a',
    },
    // Adicionar mais 9 questões mockadas...
  ],
};

// Função auxiliar para gerar questões mockadas (para desenvolvimento)
export function generateMockQuestions(subjectId: SubjectId, count: number): SubjectQuestion[] {
  const baseQuestions = SUBJECT_QUESTIONS[subjectId] || [];
  const questions: SubjectQuestion[] = [...baseQuestions];

  // Se não houver questões suficientes, gerar mockadas
  while (questions.length < count) {
    const index = questions.length + 1;
    questions.push({
      id: `${subjectId}_${index}`,
      question: `Questão ${index} de ${count} sobre ${subjectId} (questão mockada para desenvolvimento)`,
      options: [
        { id: 'a', label: 'Alternativa A' },
        { id: 'b', label: 'Alternativa B' },
        { id: 'c', label: 'Alternativa C' },
        { id: 'd', label: 'Alternativa D' },
      ],
      correctAnswerId: 'a', // Mock: sempre A
    });
  }

  return questions.slice(0, count);
}

