import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SubjectId } from '@/constants/subjectsData';

const DIAGNOSIS_RESULTS_STORAGE_KEY = 'souconcursado.diagnosisResults';

export default function DiagnosisResultScreen() {
  const params = useLocalSearchParams() as {
    subjectId?: string | string[];
    subjectName?: string | string[];
    level?: string | string[];
    percentage?: string | string[];
    correctAnswers?: string | string[];
    totalQuestions?: string | string[];
  };

  const [resultData, setResultData] = useState<{
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    percentage: number;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  const palette = Colors.dark;

  // Função auxiliar para normalizar parâmetros (podem vir como array ou string)
  const getParam = (param: string | string[] | undefined): string => {
    if (Array.isArray(param)) {
      return param[0] || '';
    }
    return param || '';
  };

  // Extrair valores dos parâmetros para usar como dependências (valores primitivos)
  const correctAnswersParam = getParam(params.correctAnswers as string | string[] | undefined);
  const totalQuestionsParam = getParam(params.totalQuestions as string | string[] | undefined);
  const percentageParam = getParam(params.percentage as string | string[] | undefined);
  const levelParam = getParam(params.level as string | string[] | undefined);
  const subjectIdParam = getParam(params.subjectId as string | string[] | undefined);

  useEffect(() => {
    const loadResult = async () => {
      try {

        // Primeiro, tentar usar os parâmetros passados diretamente
        if (correctAnswersParam && totalQuestionsParam && percentageParam) {
          const level = (levelParam || 'Iniciante') as 'Iniciante' | 'Intermediário' | 'Avançado';
          const percentage = parseFloat(percentageParam) || 0;
          const correctAnswers = parseInt(correctAnswersParam, 10) || 0;
          const totalQuestions = parseInt(totalQuestionsParam, 10) || 0;

          // Só definir se os valores forem válidos
          if (totalQuestions > 0 && !isNaN(percentage) && !isNaN(correctAnswers)) {
            setResultData({
              level,
              percentage,
              correctAnswers,
              totalQuestions,
            });

            // Salvar resultado no AsyncStorage
            const resultsData = await AsyncStorage.getItem(DIAGNOSIS_RESULTS_STORAGE_KEY);
            const results = resultsData ? JSON.parse(resultsData) : {};
            if (subjectIdParam) {
              results[subjectIdParam] = {
                subjectId: subjectIdParam,
                level,
                percentage,
                correctAnswers,
                totalQuestions,
                completedAt: new Date().toISOString(),
              };
              await AsyncStorage.setItem(DIAGNOSIS_RESULTS_STORAGE_KEY, JSON.stringify(results));
            }
            return; // Sair da função se os dados foram carregados
          }
        }
        
        // Se não houver parâmetros válidos, tentar carregar do AsyncStorage
        if (subjectIdParam) {
          const resultsData = await AsyncStorage.getItem(DIAGNOSIS_RESULTS_STORAGE_KEY);
          if (resultsData) {
            const results = JSON.parse(resultsData);
            const savedResult = results[subjectIdParam];
            if (savedResult && savedResult.totalQuestions > 0) {
              setResultData({
                level: savedResult.level,
                percentage: savedResult.percentage,
                correctAnswers: savedResult.correctAnswers,
                totalQuestions: savedResult.totalQuestions,
              });
              return; // Sair da função se os dados foram carregados
            }
          }
        }
        
        // Se chegou aqui, não há dados disponíveis - usar valores padrão para evitar carregamento infinito
        setResultData({
          level: 'Iniciante',
          percentage: 0,
          correctAnswers: 0,
          totalQuestions: 10,
        });
      } catch (error) {
        console.error('Erro ao carregar resultado do diagnóstico:', error);
        // Em caso de erro, definir valores padrão
        setResultData({
          level: 'Iniciante',
          percentage: 0,
          correctAnswers: 0,
          totalQuestions: 10,
        });
      }
    };

    loadResult();
  }, [subjectIdParam, correctAnswersParam, totalQuestionsParam, percentageParam, levelParam]);

  if (!resultData) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando resultado...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { level, percentage, correctAnswers, totalQuestions } = resultData;

  const getLevelColor = () => {
    switch (level) {
      case 'Iniciante':
        return '#F44336';
      case 'Intermediário':
        return '#FF9800';
      case 'Avançado':
        return '#4CAF50';
      default:
        return palette.accent;
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case 'Iniciante':
        return 'school-outline';
      case 'Intermediário':
        return 'trending-up';
      case 'Avançado':
        return 'trophy';
      default:
        return 'check-circle';
    }
  };

  const getMotivationalMessage = () => {
    if (percentage >= 80) {
      return 'Excelente desempenho! 🎉 Você demonstrou domínio do conteúdo. Continue mantendo esse nível!';
    } else if (percentage >= 60) {
      return 'Bom desempenho! 👏 Você está no caminho certo. Continue praticando para alcançar a excelência!';
    } else if (percentage >= 40) {
      return 'Continue praticando! 💪 Com dedicação e estudo focado, você vai melhorar rapidamente.';
    } else {
      return 'Não desista! 📚 Todo mundo começa de algum lugar. Foque nos fundamentos e continue estudando!';
    }
  };

  const getLevelMessage = () => {
    switch (level) {
      case 'Iniciante':
        return 'Precisa de teoria base. Foque em estudar os conceitos fundamentais e fazer muitas questões básicas.';
      case 'Intermediário':
        return 'Focar em resolução de questões e revisão. Continue praticando e identifique seus pontos fracos.';
      case 'Avançado':
        return 'Focar em simulados e pontos fracos. Você está no caminho certo! Mantenha o ritmo e aprofunde os temas mais complexos.';
      default:
        return '';
    }
  };

  const handleBackToStudies = () => {
    router.push('/(tabs)/studies');
  };


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View pointerEvents="none" style={styles.glowTop} />
        <View pointerEvents="none" style={styles.glowBottom} />

        {/* Feedback Visual */}
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, { borderColor: getLevelColor() }]}>
            <MaterialCommunityIcons
              name={getLevelIcon() as any}
              size={48}
              color={getLevelColor()}
            />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>Diagnóstico Concluído!</Text>

        {/* Nível */}
        <View style={[styles.levelCard, { borderColor: getLevelColor() }]}>
          <Text style={[styles.levelText, { color: getLevelColor() }]}>
            Nível: {level}
          </Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{correctAnswers}/{totalQuestions}</Text>
            <Text style={styles.statLabel}>Acertos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: getLevelColor() }]}>
              {percentage.toFixed(1)}%
            </Text>
            <Text style={styles.statLabel}>Percentual</Text>
          </View>
        </View>

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${percentage}%`, backgroundColor: getLevelColor() },
              ]}
            />
          </View>
        </View>

        {/* Mensagem Motivacional */}
        <View style={styles.motivationalContainer}>
          <Text style={styles.motivationalText}>{getMotivationalMessage()}</Text>
        </View>

        {/* Mensagem de Orientação */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{getLevelMessage()}</Text>
        </View>

        {/* Botão */}
        <Pressable
          onPress={handleBackToStudies}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: getLevelColor() },
            pressed && styles.ctaButtonPressed,
          ]}>
          <Text style={styles.ctaButtonText}>Voltar para Estudos</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  ...Colors.dark,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  glowTop: {
    position: 'absolute',
    top: -140,
    right: -140,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: colors.glow1 ?? 'rgba(91,97,255,0.18)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -170,
    left: -170,
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: colors.glow2 ?? 'rgba(45,134,255,0.14)',
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(91,97,255,0.15)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  levelCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    alignSelf: 'stretch',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statValue: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  statLabel: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: '700',
  },
  progressContainer: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: colors.cardBorder,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  motivationalContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignSelf: 'stretch',
  },
  motivationalText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    fontWeight: '800',
  },
  messageContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignSelf: 'stretch',
  },
  messageText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  ctaButton: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  ctaButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});

