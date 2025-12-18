import { UserAnswers, Profile, PROFILES } from '@/constants/questionsData';
import { CONTESTS, Contest, EducationLevel } from '@/constants/contestsData';

/**
 * Função auxiliar para converter resposta do quiz em nível de educação comparável
 */
function mapEducationLevel(answerId: string): number {
  const levels: { [key: string]: number } = {
    'fundamental': 1,
    'medio': 2,
    'superior': 3,
    'pos': 3, // Pós-graduação conta como superior
    'mestrado': 3, // Mestrado conta como superior
    'doutorado': 3, // Doutorado conta como superior
  };
  return levels[answerId] || 0;
}

/**
 * Função auxiliar para converter nível de educação do concurso em número
 */
function mapContestEducationLevel(education: EducationLevel): number {
  const levels: { [key: string]: number } = {
    'fundamental': 1,
    'medium': 2,
    'superior': 3,
    'pos': 4,
  };
  return levels[education] || 0;
}

/**
 * Função auxiliar para extrair idade numérica da resposta
 */
function extractAgeFromAnswer(ageAnswer: string): number {
  // Pegar o valor médio da faixa etária
  if (ageAnswer === '18-25') return 21;
  if (ageAnswer === '26-30') return 28;
  if (ageAnswer === '31-35') return 33;
  if (ageAnswer === '36-40') return 38;
  if (ageAnswer === '41-45') return 43;
  if (ageAnswer === '46+') return 50;
  return 25; // default
}

/**
 * Lógica de match para determinar o perfil do usuário baseado nas respostas
 */
export function matchProfile(answers: UserAnswers): Profile {
  // Contador de pontos por perfil
  const scores: { [key: string]: number } = {};

  // Inicializar scores
  PROFILES.forEach((profile) => {
    scores[profile.id] = 0;
  });

  // Questão 1: Nível de formação
  const formation = answers[1];
  if (formation === 'superior' || formation === 'pos' || formation === 'mestrado' || formation === 'doutorado') {
    scores['estrategista_admin'] += 2;
    scores['analista_fiscal'] += 2;
    scores['jurista_publico'] += 2;
    scores['planejador_estrategico'] += 3;
  }

  // Questão 2: Tipo de atividade
  const activity = answers[2];
  if (activity === 'admin') {
    scores['estrategista_admin'] += 5;
    scores['planejador_estrategico'] += 3;
  } else if (activity === 'police') {
    scores['guardiao_operacional'] += 5;
  } else if (activity === 'fiscal') {
    scores['analista_fiscal'] += 5;
  } else if (activity === 'legal') {
    scores['jurista_publico'] += 5;
  } else if (activity === 'health' || activity === 'education') {
    scores['servidor_social'] += 5;
  }

  // Questão 3: Prioridade
  const priority = answers[3];
  if (priority === 'stability') {
    scores['guardiao_operacional'] += 2;
    scores['estrategista_admin'] += 2;
  } else if (priority === 'growth') {
    scores['planejador_estrategico'] += 3;
    scores['jurista_publico'] += 2;
  } else if (priority === 'salary') {
    scores['analista_fiscal'] += 2;
    scores['jurista_publico'] += 2;
  }

  // Questão 4: Tempo de estudo
  const studyTime = answers[4];
  if (studyTime === 'very_high' || studyTime === 'high') {
    scores['jurista_publico'] += 1;
    scores['analista_fiscal'] += 1;
  }

  // Questão 5: Área de interesse
  const area = answers[5];
  if (area === 'federal') {
    scores['analista_fiscal'] += 2;
    scores['jurista_publico'] += 2;
  } else if (area === 'municipal') {
    scores['servidor_social'] += 2;
    scores['estrategista_admin'] += 2;
  }

  // Questão 6: Método de estudo
  const studyMethod = answers[6];
  if (studyMethod === 'self' || studyMethod === 'online') {
    scores['analista_fiscal'] += 1;
    scores['estrategista_admin'] += 1;
  }

  // Questão 7: Objetivo
  const objective = answers[7];
  if (objective === 'impact') {
    scores['servidor_social'] += 3;
  } else if (objective === 'career') {
    scores['planejador_estrategico'] += 3;
    scores['jurista_publico'] += 2;
  } else if (objective === 'retirement') {
    scores['guardiao_operacional'] += 2;
    scores['estrategista_admin'] += 2;
  }

  // Encontrar o perfil com maior score
  let maxScore = 0;
  let selectedProfileId = 'estrategista_admin'; // default

  Object.keys(scores).forEach((profileId) => {
    if (scores[profileId] > maxScore) {
      maxScore = scores[profileId];
      selectedProfileId = profileId;
    }
  });

  // Retornar o perfil correspondente
  const profile = PROFILES.find((p) => p.id === selectedProfileId);
  return profile || PROFILES[0];
}

/**
 * Função para obter concursos recomendados baseado no perfil e requisitos do usuário
 */
export function getRecommendedContests(answers: UserAnswers, matchedProfileId: string): Contest[] {
  // 1. Extrair dados do usuário das respostas
  const userEducationAnswer = answers[1]; // Questão 1: Formação
  if (!userEducationAnswer) {
    // Se não houver resposta de educação, retornar array vazio
    return [];
  }
  const userEducationWeight = mapEducationLevel(userEducationAnswer);
  const userHasCNH = answers[8] === 'yes'; // Questão 8: CNH (assume false se não respondido)
  const userAgeAnswer = answers[9] || '26-30'; // Questão 9: Idade (default 26-30 se não respondido)
  const userAge = extractAgeFromAnswer(userAgeAnswer);

  // 2. Mapeamento de perfil para categorias de interesse
  const profileMapping: { [key: string]: string[] } = {
    'guardiao_operacional': ['police'],
    'estrategista_admin': ['admin'],
    'analista_fiscal': ['fiscal'],
    'jurista_publico': ['legal'],
    'servidor_social': ['health', 'education'],
    'planejador_estrategico': ['admin'],
  };

  const interestedCategories = profileMapping[matchedProfileId] || [];

  // 3. Filtrar concursos
  return CONTESTS.filter((contest) => {
    // Filtro 1: Escolaridade (Usuário deve ter escolaridade IGUAL ou MAIOR que a exigida)
    const requiredEducationWeight = mapContestEducationLevel(contest.requirements.education);
    if (userEducationWeight < requiredEducationWeight) {
      return false;
    }

    // Filtro 2: Idade (Se houver limite máximo no concurso)
    if (contest.requirements.maxAge && userAge > contest.requirements.maxAge) {
      return false;
    }

    // Filtro 3: Idade mínima (Se houver limite mínimo no concurso)
    if (contest.requirements.minAge && userAge < contest.requirements.minAge) {
      return false;
    }

    // Filtro 4: CNH (Se concurso exige e usuário não tem)
    if (contest.requirements.requiresCNH && !userHasCNH) {
      return false;
    }

    // Filtro 5: Relevância com o Perfil Vocacional (Match de Categoria)
    // Se o perfil deu uma categoria específica, priorizar concursos dessa categoria
    // Mas não excluir completamente outros se forem boas oportunidades
    if (interestedCategories.length > 0) {
      return interestedCategories.includes(contest.category);
    }

    return true;
  });
}

