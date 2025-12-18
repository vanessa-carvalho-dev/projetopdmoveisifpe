export type DifficultyLevel = 'Fácil' | 'Médio' | 'Difícil';

export type QuestionData = {
  id: number;
  text: string;           // O enunciado da questão
  contextText?: string;   // Texto de apoio (ex: poema em Português)
  options: string[];      // Alternativas A, B, C, D, E
  correctAnswerIndex: number; // Índice da resposta correta (0-4)
  
  // Metadados Estilo Gran/QC
  banca: string;          // Ex: "FGV"
  ano: number;            // Ex: 2024
  orgao: string;          // Ex: "Câmara dos Deputados"
  cargo?: string;         // Ex: "Analista Judiciário"
  assunto: string;        // Ex: "Crase" ou "Atos Administrativos"
  explanation: string;    // Comentário do professor sobre a resposta
  difficulty: DifficultyLevel;
};

export type LevelResult = 'Iniciante' | 'Intermediário' | 'Avançado';

export type DiagnosisResult = {
  subjectId: string;
  level: LevelResult;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
};

