import { UserAnswers, Profile, PROFILES } from '@/constants/questionsData';

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

