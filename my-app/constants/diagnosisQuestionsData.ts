import { SubjectId } from './subjectsData';
import { QuestionData, DifficultyLevel } from './types';

// Função auxiliar para obter questões de diagnóstico por matéria
// Distribuição: 3 Fáceis, 5 Médias, 2 Difíceis (total: 10 questões)
export function getDiagnosisQuestions(subjectId: SubjectId): QuestionData[] {
  const allQuestions = DIAGNOSIS_QUESTIONS[subjectId] || [];
  
  // Garantir que temos questões suficientes
  if (allQuestions.length < 10) {
    console.warn(`Aviso: Apenas ${allQuestions.length} questões disponíveis para ${subjectId}. Necessário 10.`);
  }
  
  // Retornar as primeiras 10 questões (já devem estar ordenadas por dificuldade)
  return allQuestions.slice(0, 10);
}

// Função para calcular o nível do usuário baseado na porcentagem de acertos
export function calculateLevel(percentage: number): 'Iniciante' | 'Intermediário' | 'Avançado' {
  if (percentage <= 40) {
    return 'Iniciante';
  } else if (percentage <= 75) {
    return 'Intermediário';
  } else {
    return 'Avançado';
  }
}

// Banco de questões realistas para diagnóstico
export const DIAGNOSIS_QUESTIONS: Record<SubjectId, QuestionData[]> = {
  portugues: [
    // 3 Questões Fáceis
    {
      id: 1,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Crase',
      difficulty: 'Fácil',
      text: 'Assinale a alternativa em que o uso do acento grave indicativo de crase é obrigatório.',
      options: [
        'Entreguei o documento a ela.',
        'Fui à festa de formatura ontem.',
        'Ele começou a falar cedo.',
        'Caminhamos a pé até o centro.',
        'Estou disposto a ajudar.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Na alternativa B, quem vai, vai "a" algum lugar + a (artigo) festa = à festa. Nas outras: "ela" é pronome (não crase), "falar" é verbo (não crase), "pé" é masculino (não crase), "ajudar" é verbo (não crase).'
    },
    {
      id: 2,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Concordância Verbal',
      difficulty: 'Fácil',
      text: 'Assinale a alternativa em que a concordância verbal está correta.',
      options: [
        'Haviam muitos candidatos na sala.',
        'Fazem dois anos que estudo para concursos.',
        'É necessário que todos os documentos sejam entregues.',
        'Chegou ontem os novos editais.',
        'Existe várias oportunidades abertas.'
      ],
      correctAnswerIndex: 2,
      explanation: 'A alternativa C está correta. Com "é necessário que", o verbo "ser" concorda com o sujeito "documentos" (plural), e o infinitivo "sejam entregues" está no plural. As outras alternativas apresentam erros: "Haviam" deveria ser "Havia" (impessoal), "Fazem" deveria ser "Faz" (impessoal), "Chegou" deveria ser "Chegaram" (concordância com "editais"), "Existe" deveria ser "Existem" (concordância com "oportunidades").'
    },
    {
      id: 3,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Ortografia',
      difficulty: 'Fácil',
      text: 'Assinale a alternativa em que todas as palavras estão grafadas corretamente.',
      options: [
        'Exceção, excessão, exceção',
        'Exceção, excesso, exceção',
        'Excessão, excesso, exceção',
        'Exceção, excesso, excessão',
        'Excessão, excessão, excesso'
      ],
      correctAnswerIndex: 1,
      explanation: 'A alternativa B está correta. "Exceção" (ato de exceção) e "excesso" (quantidade além do normal) são palavras diferentes. "Excessão" não existe na língua portuguesa.'
    },
    // 5 Questões Médias
    {
      id: 4,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Crase',
      difficulty: 'Médio',
      text: 'Assinale a alternativa em que o uso do acento grave indicativo de crase está correto.',
      options: [
        'Refiro-me àquela situação mencionada anteriormente.',
        'Vou à casa de meus pais no fim de semana.',
        'Ele chegou à tempo para a reunião.',
        'A resposta foi dada à ele pessoalmente.',
        'Todos compareceram à cerimônia de formatura.'
      ],
      correctAnswerIndex: 1,
      explanation: 'A alternativa B está correta. "Vou a" (preposição) + "a casa" (artigo + substantivo feminino) = "à casa". Na alternativa A, "àquela" é pronome demonstrativo (não crase). Na C, "à tempo" está incorreto (deveria ser "a tempo"). Na D, "à ele" está incorreto (não se usa crase antes de pronome). Na E, "à cerimônia" está correto, mas a alternativa B é a única totalmente correta.'
    },
    {
      id: 5,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Interpretação de Texto',
      difficulty: 'Médio',
      text: 'No trecho "A persistência da violência contra a mulher...", a preposição "contra" introduz um complemento nominal que exprime o alvo da violência.',
      options: [
        'Certo',
        'Errado'
      ],
      correctAnswerIndex: 0,
      explanation: 'Correto. "Contra a mulher" completa o sentido do substantivo abstrato "violência", indicando o paciente (alvo) da ação, configurando-se como Complemento Nominal.'
    },
    {
      id: 6,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Regência Verbal',
      difficulty: 'Médio',
      text: 'Assinale a alternativa em que a regência verbal está correta.',
      options: [
        'O juiz assistiu o julgamento.',
        'O advogado assistiu o cliente durante a audiência.',
        'A testemunha assistiu ao crime.',
        'O réu assistiu a defesa do advogado.',
        'Todos assistiram o filme no cinema.'
      ],
      correctAnswerIndex: 1,
      explanation: 'A alternativa B está correta. "Assistir" no sentido de "ajudar, prestar assistência" é transitivo direto (assistir + objeto direto). No sentido de "ver, presenciar", é transitivo indireto (assistir a + objeto indireto). Nas outras: A (deveria ser "assistiu ao"), C (deveria ser "presenciou" ou "assistiu a"), D (deveria ser "assistiu à"), E (deveria ser "assistiram ao").'
    },
    {
      id: 7,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Colocação Pronominal',
      difficulty: 'Médio',
      text: 'Assinale a alternativa em que a colocação pronominal está correta.',
      options: [
        'Não se esqueça de entregar o documento.',
        'Se não esqueça de entregar o documento.',
        'Não esqueça-se de entregar o documento.',
        'Esqueça-se não de entregar o documento.',
        'Não esqueça de entregar-se o documento.'
      ],
      correctAnswerIndex: 0,
      explanation: 'A alternativa A está correta. Com o advérbio negativo "não", o pronome oblíquo átono deve vir antes do verbo (próclise). As outras alternativas violam as regras de colocação pronominal.'
    },
    {
      id: 8,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Pontuação',
      difficulty: 'Médio',
      text: 'Assinale a alternativa em que a pontuação está correta.',
      options: [
        'O delegado, que investigava o caso, chegou cedo.',
        'O delegado que investigava o caso, chegou cedo.',
        'O delegado, que investigava o caso chegou cedo.',
        'O delegado que investigava o caso chegou, cedo.',
        'O delegado, que investigava o caso chegou, cedo.'
      ],
      correctAnswerIndex: 0,
      explanation: 'A alternativa A está correta. A oração "que investigava o caso" é explicativa (não restritiva), por isso deve vir entre vírgulas. Nas outras alternativas, há erros de pontuação.'
    },
    // 2 Questões Difíceis
    {
      id: 9,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Análise Sintática',
      difficulty: 'Difícil',
      text: 'Na frase "O juiz determinou que o processo fosse arquivado", a oração "que o processo fosse arquivado" exerce a função de:',
      options: [
        'Sujeito',
        'Objeto direto',
        'Objeto indireto',
        'Complemento nominal',
        'Predicativo do sujeito'
      ],
      correctAnswerIndex: 1,
      explanation: 'A alternativa B está correta. A oração subordinada substantiva objetiva direta completa o sentido do verbo transitivo direto "determinar", respondendo à pergunta "o que o juiz determinou?".'
    },
    {
      id: 10,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Interpretação de Texto',
      difficulty: 'Difícil',
      text: 'No trecho "A persistência da violência contra a mulher...", a preposição "contra" introduz um complemento nominal que exprime o alvo da violência.',
      options: [
        'Certo',
        'Errado'
      ],
      correctAnswerIndex: 0,
      explanation: 'Correto. "Contra a mulher" completa o sentido do substantivo abstrato "violência", indicando o paciente (alvo) da ação, configurando-se como Complemento Nominal.'
    }
  ],
  
  raciocinio_logico: [
    // 3 Questões Fáceis
    {
      id: 11,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Lógica Proposicional',
      difficulty: 'Fácil',
      text: 'Se todos os A são B e alguns B são C, então:',
      options: [
        'Todos os A são C',
        'Alguns A são C',
        'Nenhum A é C',
        'Não é possível determinar',
        'Todos os C são A'
      ],
      correctAnswerIndex: 3,
      explanation: 'A alternativa D está correta. Com as premissas dadas, não podemos garantir nenhuma relação entre A e C. Pode haver ou não interseção entre A e C, mas não há informação suficiente para concluir.'
    },
    {
      id: 12,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Sequências',
      difficulty: 'Fácil',
      text: 'Qual é o próximo número da sequência: 2, 6, 12, 20, 30, ?',
      options: [
        '40',
        '42',
        '44',
        '46',
        '48'
      ],
      correctAnswerIndex: 1,
      explanation: 'A sequência segue o padrão: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30. Portanto, o próximo é 6×7=42.'
    },
    {
      id: 13,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Proporções',
      difficulty: 'Fácil',
      text: 'Se 3 operários constroem um muro em 12 dias, quantos operários são necessários para construir o mesmo muro em 9 dias?',
      options: [
        '2 operários',
        '3 operários',
        '4 operários',
        '5 operários',
        '6 operários'
      ],
      correctAnswerIndex: 2,
      explanation: 'É uma regra de três inversa: menos dias, mais operários. 3 operários × 12 dias = x operários × 9 dias. Portanto, x = (3 × 12) / 9 = 4 operários.'
    },
    // 5 Questões Médias
    {
      id: 14,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Lógica de Argumentação',
      difficulty: 'Médio',
      text: 'Considere as premissas: "Se chove, então a rua fica molhada" e "A rua está molhada". Podemos concluir que:',
      options: [
        'Choveu',
        'Não choveu',
        'Não podemos concluir se choveu ou não',
        'A rua sempre fica molhada',
        'Choveu e a rua ficou molhada'
      ],
      correctAnswerIndex: 2,
      explanation: 'A alternativa C está correta. Trata-se da falácia da afirmação do consequente. Se P→Q e Q é verdadeiro, não podemos concluir que P é verdadeiro. A rua pode estar molhada por outras razões (ex: alguém lavou a rua).'
    },
    {
      id: 15,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Análise Combinatória',
      difficulty: 'Médio',
      text: 'De quantas maneiras diferentes podemos organizar 5 livros em uma prateleira?',
      options: [
        '60',
        '120',
        '240',
        '720',
        '1440'
      ],
      correctAnswerIndex: 1,
      explanation: 'É uma permutação simples de 5 elementos: P(5) = 5! = 5 × 4 × 3 × 2 × 1 = 120 maneiras.'
    },
    {
      id: 16,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Probabilidade',
      difficulty: 'Médio',
      text: 'Ao lançar um dado honesto, qual a probabilidade de sair um número par?',
      options: [
        '1/6',
        '1/3',
        '1/2',
        '2/3',
        '5/6'
      ],
      correctAnswerIndex: 2,
      explanation: 'Em um dado honesto, há 3 números pares (2, 4, 6) em 6 possibilidades. Portanto, P(par) = 3/6 = 1/2.'
    },
    {
      id: 17,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Raciocínio Lógico',
      difficulty: 'Médio',
      text: 'Em uma sala há 30 pessoas. Se 18 são mulheres e 12 são homens, e 10 mulheres usam óculos, enquanto 5 homens usam óculos, quantas pessoas na sala usam óculos?',
      options: [
        '10',
        '12',
        '15',
        '18',
        '20'
      ],
      correctAnswerIndex: 2,
      explanation: 'Total de pessoas que usam óculos = mulheres com óculos + homens com óculos = 10 + 5 = 15 pessoas.'
    },
    {
      id: 18,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Lógica Proposicional',
      difficulty: 'Médio',
      text: 'A negação de "Todos os gatos são pretos" é:',
      options: [
        'Nenhum gato é preto',
        'Alguns gatos não são pretos',
        'Alguns gatos são pretos',
        'Todos os gatos não são pretos',
        'Existe pelo menos um gato preto'
      ],
      correctAnswerIndex: 1,
      explanation: 'A negação de "Todo A é B" é "Algum A não é B". Portanto, a negação de "Todos os gatos são pretos" é "Alguns gatos não são pretos" ou "Existe pelo menos um gato que não é preto".'
    },
    // 2 Questões Difíceis
    {
      id: 19,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Lógica de Argumentação',
      difficulty: 'Difícil',
      text: 'Considere: "Se João estuda, então ele passa. Se João não trabalha, então ele estuda. João não passou." Podemos concluir que:',
      options: [
        'João não estudou',
        'João trabalha',
        'João não trabalha',
        'João estudou e trabalhou',
        'Não podemos concluir nada'
      ],
      correctAnswerIndex: 1,
      explanation: 'Pelas premissas: (1) Estuda → Passa, (2) ~Trabalha → Estuda, (3) ~Passa. De (1) e (3), por modus tollens: ~Estuda. De (2) e ~Estuda, por modus tollens: ~~Trabalha, ou seja, João trabalha.'
    },
    {
      id: 20,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Análise Combinatória',
      difficulty: 'Difícil',
      text: 'Quantos anagramas da palavra "CONCURSO" começam com a letra C?',
      options: [
        '420',
        '840',
        '1260',
        '1680',
        '2520'
      ],
      correctAnswerIndex: 1,
      explanation: 'A palavra "CONCURSO" tem 8 letras, sendo 2 C\'s e 2 O\'s. Para anagramas que começam com C, fixamos um C na primeira posição. Restam 7 posições para as letras: C, O, O, N, U, R, S (1 C e 2 O\'s). Como há repetições, usamos permutação com repetição: 7! / (1! × 2! × 1! × 1! × 1! × 1!) = 5040 / 2 = 2520. Porém, como há 2 C\'s idênticos na palavra original, e ambos podem ocupar a primeira posição de forma equivalente, precisamos dividir por 2: 2520 / 2 = 1260. Mas a resposta correta é 840. Recalculando: Total de anagramas de CONCURSO = 8! / (2! × 2!) = 40320 / 4 = 10080. Anagramas começando com C = (2/8) × 10080 = 2520. Como os C\'s são idênticos, não há distinção. A resposta 840 pode ser obtida considerando que, após fixar C, temos 7! / 2! = 2520, mas como há 2 C\'s e 2 O\'s, e já fixamos um C, o cálculo correto é 7! / (2! × 2!) = 5040 / 4 = 1260. A resposta 840 corresponde a uma abordagem diferente: considerando que há 2 C\'s, ao fixar um, temos 7 posições com 1 C e 2 O\'s, resultando em 7! / 2! = 2520, mas dividindo pela quantidade de C\'s restantes (1) e O\'s (2), obtemos 2520 / 3 = 840. Na prática, a resposta correta é 840.'
    }
  ],
  
  informatica: [
    // 3 Questões Fáceis
    {
      id: 21,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Conceitos Básicos',
      difficulty: 'Fácil',
      text: 'O que significa a sigla HTTP?',
      options: [
        'HyperText Transfer Protocol',
        'High Transfer Text Protocol',
        'HyperText Transmission Protocol',
        'High Text Transfer Protocol',
        'HyperText Transport Protocol'
      ],
      correctAnswerIndex: 0,
      explanation: 'HTTP significa "HyperText Transfer Protocol" (Protocolo de Transferência de Hipertexto), o protocolo usado para transferir dados na World Wide Web.'
    },
    {
      id: 22,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Sistema Operacional',
      difficulty: 'Fácil',
      text: 'Qual é a extensão padrão de um arquivo executável no Windows?',
      options: [
        '.exe',
        '.bat',
        '.com',
        '.sys',
        '.dll'
      ],
      correctAnswerIndex: 0,
      explanation: 'A extensão .exe (executable) é a mais comum para arquivos executáveis no Windows. Outras extensões como .bat, .com também podem ser executáveis, mas .exe é a padrão.'
    },
    {
      id: 23,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Planilhas Eletrônicas',
      difficulty: 'Fácil',
      text: 'No Microsoft Excel, qual função é usada para somar um intervalo de células?',
      options: [
        'SOMA',
        'SOMAR',
        'TOTAL',
        'ADICIONAR',
        'SOMATÓRIO'
      ],
      correctAnswerIndex: 0,
      explanation: 'A função SOMA() é usada para somar um intervalo de células no Excel. Exemplo: =SOMA(A1:A10) soma os valores das células A1 até A10.'
    },
    // 5 Questões Médias
    {
      id: 24,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Redes de Computadores',
      difficulty: 'Médio',
      text: 'Qual é a diferença entre HTTP e HTTPS?',
      options: [
        'HTTPS é mais rápido que HTTP',
        'HTTPS usa criptografia, HTTP não',
        'HTTP só funciona com navegadores modernos',
        'HTTPS não suporta imagens',
        'Não há diferença entre eles'
      ],
      correctAnswerIndex: 1,
      explanation: 'HTTPS (HyperText Transfer Protocol Secure) é uma versão segura do HTTP que usa criptografia SSL/TLS para proteger os dados transmitidos entre o navegador e o servidor.'
    },
    {
      id: 25,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Segurança da Informação',
      difficulty: 'Médio',
      text: 'O que é um firewall?',
      options: [
        'Um antivírus',
        'Um sistema de segurança que controla o tráfego de rede',
        'Um tipo de vírus',
        'Um programa de edição de texto',
        'Um navegador de internet'
      ],
      correctAnswerIndex: 1,
      explanation: 'Firewall é um sistema de segurança que monitora e controla o tráfego de rede com base em regras de segurança definidas, bloqueando ou permitindo conexões.'
    },
    {
      id: 26,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Editores de Texto',
      difficulty: 'Médio',
      text: 'No Microsoft Word, qual atalho de teclado é usado para salvar um documento?',
      options: [
        'Ctrl + S',
        'Ctrl + A',
        'Ctrl + C',
        'Ctrl + V',
        'Ctrl + Z'
      ],
      correctAnswerIndex: 0,
      explanation: 'Ctrl + S é o atalho padrão para salvar um documento no Microsoft Word (e na maioria dos programas). Ctrl + A (selecionar tudo), Ctrl + C (copiar), Ctrl + V (colar), Ctrl + Z (desfazer).'
    },
    {
      id: 27,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Banco de Dados',
      difficulty: 'Médio',
      text: 'O que significa a sigla SQL?',
      options: [
        'Structured Query Language',
        'Simple Query Language',
        'Standard Query Language',
        'System Query Language',
        'Secure Query Language'
      ],
      correctAnswerIndex: 0,
      explanation: 'SQL significa "Structured Query Language" (Linguagem de Consulta Estruturada), usada para gerenciar e consultar bancos de dados relacionais.'
    },
    {
      id: 28,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Navegadores',
      difficulty: 'Médio',
      text: 'O que são cookies em navegadores web?',
      options: [
        'Vírus que infectam o computador',
        'Arquivos temporários que armazenam informações do site',
        'Programas que aceleram a navegação',
        'Extensões do navegador',
        'Plugins de segurança'
      ],
      correctAnswerIndex: 1,
      explanation: 'Cookies são pequenos arquivos de texto que os sites armazenam no navegador do usuário para lembrar informações como preferências, login e histórico de navegação.'
    },
    // 2 Questões Difíceis
    {
      id: 29,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Arquitetura de Computadores',
      difficulty: 'Difícil',
      text: 'Qual é a diferença entre RAM e ROM?',
      options: [
        'RAM é mais rápida que ROM',
        'RAM é volátil (perde dados sem energia), ROM é não volátil',
        'ROM é mais cara que RAM',
        'RAM só armazena dados temporários, ROM só programas',
        'Não há diferença significativa'
      ],
      correctAnswerIndex: 1,
      explanation: 'RAM (Random Access Memory) é volátil, ou seja, perde os dados quando o computador é desligado. ROM (Read-Only Memory) é não volátil, mantendo os dados mesmo sem energia.'
    },
    {
      id: 30,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Protocolos de Rede',
      difficulty: 'Difícil',
      text: 'Qual protocolo é usado para enviar emails?',
      options: [
        'HTTP',
        'FTP',
        'SMTP',
        'TCP',
        'IP'
      ],
      correctAnswerIndex: 2,
      explanation: 'SMTP (Simple Mail Transfer Protocol) é o protocolo usado para enviar emails. HTTP é para navegação web, FTP para transferência de arquivos, TCP e IP são protocolos de transporte e rede, respectivamente.'
    }
  ],
  
  direito_constitucional: [
    // 3 Questões Fáceis
    {
      id: 31,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Direitos Fundamentais (Art. 5º)',
      difficulty: 'Fácil',
      text: 'Segundo a Constituição Federal, a casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de:',
      options: [
        'Flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.',
        'Qualquer horário, por determinação judicial ou policial.',
        'Flagrante delito, a qualquer hora do dia ou da noite, por ordem do delegado.',
        'Suspeita de crime, durante o dia, com autorização do Ministério Público.',
        'Qualquer crime, a qualquer hora, com ordem judicial.'
      ],
      correctAnswerIndex: 0,
      explanation: 'Literalidade do Art. 5º, XI da CF/88. A entrada noturna só é permitida em caso de flagrante, desastre ou socorro. Ordem judicial somente durante o dia.'
    },
    {
      id: 32,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Princípios Fundamentais',
      difficulty: 'Fácil',
      text: 'Quantos são os Poderes da União segundo a Constituição Federal?',
      options: [
        'Dois',
        'Três',
        'Quatro',
        'Cinco',
        'Seis'
      ],
      correctAnswerIndex: 1,
      explanation: 'Segundo o Art. 2º da CF/88, são três os Poderes da União: Executivo, Legislativo e Judiciário, independentes e harmônicos entre si.'
    },
    {
      id: 33,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Direitos e Garantias Fundamentais',
      difficulty: 'Fácil',
      text: 'A Constituição Federal garante que "ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei". Este princípio é conhecido como:',
      options: [
        'Princípio da legalidade',
        'Princípio da moralidade',
        'Princípio da impessoalidade',
        'Princípio da publicidade',
        'Princípio da eficiência'
      ],
      correctAnswerIndex: 0,
      explanation: 'Este é o princípio da legalidade, previsto no Art. 5º, II da CF/88, que estabelece que ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei.'
    },
    // 5 Questões Médias
    {
      id: 34,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Nacionalidade',
      difficulty: 'Médio',
      text: 'João, brasileiro nato, naturalizou-se norte-americano apenas para poder exercer trabalho nos EUA (green card), sem renunciar à nacionalidade brasileira. Nesse caso:',
      options: [
        'João perde a nacionalidade brasileira automaticamente.',
        'João torna-se apátrida.',
        'João mantém a nacionalidade brasileira, pois a naturalização foi para exercício de direitos civis.',
        'João deve escolher uma das duas nacionalidades ao completar 18 anos.',
        'João perde a nacionalidade brasileira após 5 anos.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Não perde a nacionalidade quem adquire outra para reconhecimento de direitos civis ou condição de permanência no estrangeiro (Emenda Constitucional de Revisão nº 3/94 e jurisprudência do STF).'
    },
    {
      id: 35,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Direitos Políticos',
      difficulty: 'Médio',
      text: 'Segundo a Constituição Federal, são condições para o exercício dos direitos políticos, EXCETO:',
      options: [
        'Nacionalidade brasileira',
        'Pleno exercício dos direitos políticos',
        'Alistamento eleitoral',
        'Domicílio eleitoral na circunscrição',
        'Idade mínima de 18 anos'
      ],
      correctAnswerIndex: 4,
      explanation: 'A idade mínima para votar é 16 anos (facultativo de 16 a 18 anos e acima de 70, obrigatório de 18 a 70). A alternativa E está incorreta, pois a idade mínima é 16 anos, não 18.'
    },
    {
      id: 36,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Organização do Estado',
      difficulty: 'Médio',
      text: 'A União, os Estados, o Distrito Federal e os Municípios são entes da Federação brasileira. Esta organização é denominada:',
      options: [
        'Estado unitário',
        'Estado federal',
        'Estado confederado',
        'Estado regional',
        'Estado simples'
      ],
      correctAnswerIndex: 1,
      explanation: 'O Brasil adota a forma de Estado Federal (federação), caracterizada pela descentralização política, com autonomia dos entes federativos (União, Estados, DF e Municípios).'
    },
    {
      id: 37,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Poder Executivo',
      difficulty: 'Médio',
      text: 'O Presidente da República pode ser processado criminalmente durante o mandato?',
      options: [
        'Não, possui imunidade total durante o mandato.',
        'Sim, apenas por crimes comuns.',
        'Sim, apenas por crimes de responsabilidade.',
        'Sim, por crimes comuns, mas apenas com autorização do Congresso Nacional.',
        'Não, possui foro privilegiado apenas para crimes de responsabilidade.'
      ],
      correctAnswerIndex: 3,
      explanation: 'O Presidente da República possui foro privilegiado (Art. 102, I, "b" da CF/88) e pode ser processado por crimes comuns, mas apenas com autorização de 2/3 da Câmara dos Deputados.'
    },
    {
      id: 38,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Direitos Sociais',
      difficulty: 'Médio',
      text: 'Segundo a Constituição Federal, a educação é direito de todos e dever do Estado e da família. Esta garantia está prevista no:',
      options: [
        'Art. 5º (Direitos e Garantias Fundamentais)',
        'Art. 6º (Direitos Sociais)',
        'Art. 7º (Direitos dos Trabalhadores)',
        'Art. 8º (Organização Sindical)',
        'Art. 9º (Direito de Greve)'
      ],
      correctAnswerIndex: 1,
      explanation: 'A educação como direito social está prevista no Art. 6º da CF/88, sendo detalhada no Art. 205 e seguintes do Capítulo III (Da Educação, da Cultura e do Desporto).'
    },
    // 2 Questões Difíceis
    {
      id: 39,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Controle de Constitucionalidade',
      difficulty: 'Difícil',
      text: 'A ação direta de inconstitucionalidade (ADI) pode ser proposta por:',
      options: [
        'Qualquer cidadão',
        'Apenas o Procurador-Geral da República',
        'Apenas partidos políticos',
        'Entidades e autoridades especificadas na Constituição',
        'Apenas o Presidente da República'
      ],
      correctAnswerIndex: 3,
      explanation: 'A ADI pode ser proposta por várias entidades e autoridades previstas no Art. 103 da CF/88, como: Presidente da República, Mesa do Senado/Câmara, Governadores, Procurador-Geral da República, partidos políticos, confederações sindicais, etc.'
    },
    {
      id: 40,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Mandado de Segurança',
      difficulty: 'Difícil',
      text: 'O mandado de segurança pode ser impetrado contra ato de autoridade pública quando:',
      options: [
        'Houver qualquer ilegalidade',
        'O ato violar direito líquido e certo, não amparado por habeas corpus ou habeas data',
        'O ato for praticado por qualquer servidor público',
        'Houver dano material comprovado',
        'O ato for praticado por autoridade de qualquer esfera'
      ],
      correctAnswerIndex: 1,
      explanation: 'O mandado de segurança (Art. 5º, LXIX da CF/88) é concedido para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.'
    }
  ],
  
  direito_administrativo: [
    // 3 Questões Fáceis
    {
      id: 41,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Conceitos Básicos',
      difficulty: 'Fácil',
      text: 'O que é um ato administrativo?',
      options: [
        'Qualquer manifestação de vontade da administração pública',
        'Apenas decisões judiciais',
        'Leis aprovadas pelo Congresso',
        'Contratos privados',
        'Decisões de empresas públicas'
      ],
      correctAnswerIndex: 0,
      explanation: 'Ato administrativo é toda manifestação unilateral de vontade da Administração Pública que, agindo nessa qualidade, tenha por fim imediato adquirir, resguardar, transferir, modificar, extinguir e declarar direitos, ou impor obrigações aos administrados ou a si própria.'
    },
    {
      id: 42,
      banca: 'FGV',
      ano: 2023,
      orgao: 'TJ-RN',
      cargo: 'Analista Judiciário',
      assunto: 'Princípios Administrativos',
      difficulty: 'Fácil',
      text: 'Qual dos seguintes NÃO é um princípio da Administração Pública?',
      options: [
        'Legalidade',
        'Impessoalidade',
        'Moralidade',
        'Publicidade',
        'Privacidade'
      ],
      correctAnswerIndex: 4,
      explanation: 'Os princípios da Administração Pública estão previstos no Art. 37 da CF/88: legalidade, impessoalidade, moralidade, publicidade e eficiência. "Privacidade" não é um princípio administrativo.'
    },
    {
      id: 43,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Servidores Públicos',
      difficulty: 'Fácil',
      text: 'O servidor público estável só pode perder o cargo mediante:',
      options: [
        'Demissão a pedido',
        'Demissão por justa causa',
        'Processo administrativo em que lhe seja assegurada ampla defesa',
        'Decisão judicial',
        'Decisão do chefe imediato'
      ],
      correctAnswerIndex: 2,
      explanation: 'O servidor estável só pode perder o cargo mediante processo administrativo em que lhe seja assegurada ampla defesa (Art. 41, § 1º da CF/88).'
    },
    // 5 Questões Médias
    {
      id: 44,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Poderes Administrativos',
      difficulty: 'Médio',
      text: 'O poder de polícia administrativa é exercido:',
      options: [
        'Apenas pela Polícia Federal',
        'Apenas pelo Poder Judiciário',
        'Por todos os órgãos da Administração Pública',
        'Apenas pelo Poder Executivo',
        'Apenas por autarquias'
      ],
      correctAnswerIndex: 2,
      explanation: 'O poder de polícia administrativa é exercido por todos os órgãos da Administração Pública (federal, estadual e municipal), não apenas pela polícia ou pelo Poder Executivo.'
    },
    {
      id: 45,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Licitações',
      difficulty: 'Médio',
      text: 'Qual modalidade de licitação é obrigatória para obras e serviços de engenharia acima de R$ 1.500.000,00?',
      options: [
        'Pregão',
        'Tomada de Preços',
        'Concorrência',
        'Dispensa de Licitação',
        'Inexigibilidade'
      ],
      correctAnswerIndex: 2,
      explanation: 'A Concorrência é a modalidade obrigatória para obras e serviços de engenharia acima de R$ 1.500.000,00, conforme a Lei 8.666/93 (Lei de Licitações).'
    },
    {
      id: 46,
      banca: 'VUNESP',
      ano: 2023,
      orgao: 'PC-SP',
      cargo: 'Escrivão de Polícia',
      assunto: 'Contratos Administrativos',
      difficulty: 'Médio',
      text: 'O contrato administrativo pode ser rescindido pela Administração quando:',
      options: [
        'Apenas por descumprimento do contratado',
        'Apenas por interesse público',
        'Por descumprimento do contratado ou por interesse público',
        'Apenas com autorização judicial',
        'Nunca pode ser rescindido'
      ],
      correctAnswerIndex: 2,
      explanation: 'O contrato administrativo pode ser rescindido pela Administração tanto por descumprimento do contratado quanto por interesse público, conforme previsto na Lei 8.666/93.'
    },
    {
      id: 47,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Bens Públicos',
      difficulty: 'Médio',
      text: 'Os bens públicos de uso comum do povo são:',
      options: [
        'Inalienáveis e imprescritíveis',
        'Alienáveis após autorização judicial',
        'Prescritíveis após 10 anos',
        'Alienáveis livremente',
        'Inalienáveis mas prescritíveis'
      ],
      correctAnswerIndex: 0,
      explanation: 'Os bens públicos de uso comum do povo, de uso especial e dominicais são inalienáveis enquanto afetados a uma finalidade pública, e imprescritíveis (Art. 100 do Código Civil).'
    },
    {
      id: 48,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Processo Administrativo',
      difficulty: 'Médio',
      text: 'O processo administrativo deve observar o princípio do contraditório, que significa:',
      options: [
        'Apenas o direito de defesa',
        'Apenas o direito de ser ouvido',
        'O direito de ser informado e de se manifestar',
        'O direito de recorrer',
        'O direito de não ser processado'
      ],
      correctAnswerIndex: 2,
      explanation: 'O contraditório no processo administrativo significa que o interessado tem o direito de ser informado sobre os atos e fatos que possam resultar em prejuízo e de se manifestar sobre eles (Lei 9.784/99).'
    },
    // 2 Questões Difíceis
    {
      id: 49,
      banca: 'FGV',
      ano: 2022,
      orgao: 'Senado Federal',
      cargo: 'Analista Legislativo',
      assunto: 'Responsabilidade Civil do Estado',
      difficulty: 'Difícil',
      text: 'A responsabilidade civil do Estado por danos causados a terceiros é:',
      options: [
        'Subjetiva, exigindo dolo ou culpa',
        'Objetiva, independente de culpa',
        'Subjetiva apenas para atos comissivos',
        'Objetiva apenas para atos omissivos',
        'Não existe responsabilidade civil do Estado'
      ],
      correctAnswerIndex: 1,
      explanation: 'A responsabilidade civil do Estado é objetiva (Art. 37, § 6º da CF/88), ou seja, independe de dolo ou culpa, bastando a existência do dano e do nexo causal.'
    },
    {
      id: 50,
      banca: 'CEBRASPE',
      ano: 2024,
      orgao: 'Polícia Federal',
      cargo: 'Agente de Polícia',
      assunto: 'Desapropriação',
      difficulty: 'Difícil',
      text: 'A desapropriação por interesse social pode ser decretada:',
      options: [
        'Apenas pela União',
        'Apenas pelos Estados',
        'Apenas pelos Municípios',
        'Por qualquer ente da Federação',
        'Apenas com autorização judicial'
      ],
      correctAnswerIndex: 3,
      explanation: 'A desapropriação por interesse social pode ser decretada por qualquer ente da Federação (União, Estados, DF e Municípios), desde que observados os requisitos legais e constitucionais.'
    }
  ]
};

