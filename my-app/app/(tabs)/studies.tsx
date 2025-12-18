import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SUBJECTS, Subject, SubjectId } from '@/constants/subjectsData';
import { DiagnosisResult } from '@/constants/types';

const DIAGNOSIS_RESULTS_STORAGE_KEY = 'souconcursado.diagnosisResults';
const QUIZ_RESULTS_STORAGE_KEY = 'souconcursado.quizResults'; // Mantido para compatibilidade

type DiagnosisResults = {
  [subjectId: string]: DiagnosisResult;
};

export default function StudiesScreen() {
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResults>({});
  const [loading, setLoading] = useState(true);
  const palette = Colors.dark;

  useFocusEffect(
    useCallback(() => {
      loadDiagnosisResults();
    }, [])
  );

  const loadDiagnosisResults = async () => {
    try {
      const resultsData = await AsyncStorage.getItem(DIAGNOSIS_RESULTS_STORAGE_KEY);
      if (resultsData) {
        setDiagnosisResults(JSON.parse(resultsData));
      }
    } catch (error) {
      console.error('Erro ao carregar resultados do diagnóstico:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDiagnosis = (subject: Subject) => {
    router.push({
      pathname: '/diagnosis',
      params: {
        subjectId: subject.id,
        subjectName: subject.name,
      },
    });
  };

  const getSubjectResult = (subjectId: SubjectId): DiagnosisResult | null => {
    return diagnosisResults[subjectId] || null;
  };

  const getLevelColor = (level?: string) => {
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

  const getMotivationalMessage = (result: DiagnosisResult): string => {
    if (result.percentage >= 80) {
      return 'Excelente desempenho! 🎉';
    } else if (result.percentage >= 60) {
      return 'Bom desempenho! 👏';
    } else if (result.percentage >= 40) {
      return 'Continue praticando! 💪';
    } else {
      return 'Não desista! 📚';
    }
  };

  const renderSubjectCard = ({ item: subject }: { item: Subject }) => {
    const result = getSubjectResult(subject.id);
    const isCompleted = result !== null;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={subject.icon as any}
              size={28}
              color={palette.accent}
            />
          </View>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{subject.name}</Text>
            <Text style={styles.cardSubtitle}>
              {subject.questionCount} questões
            </Text>
          </View>
        </View>

        {isCompleted ? (
          <View style={styles.resultContainer}>
            <View style={styles.levelBadgeContainer}>
              <View style={[styles.levelBadge, { backgroundColor: getLevelColor(result.level) + '20' }]}>
                <Text style={[styles.levelText, { color: getLevelColor(result.level) }]}>
                  {result.level}
                </Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${result.percentage}%`,
                    backgroundColor: getLevelColor(result.level),
                  },
                ]}
              />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>
                {result.correctAnswers}/{result.totalQuestions} acertos ({result.percentage.toFixed(1)}%)
              </Text>
              <Text style={styles.encouragementText}>
                {getMotivationalMessage(result)}
              </Text>
            </View>
            <Pressable
              onPress={() => handleStartDiagnosis(subject)}
              style={({ pressed }) => [
                styles.retryButton,
                pressed && styles.retryButtonPressed,
              ]}>
              <MaterialCommunityIcons
                name="refresh"
                size={16}
                color={palette.accent}
              />
              <Text style={styles.retryButtonText}>Refazer diagnóstico</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => handleStartDiagnosis(subject)}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}>
            <Text style={styles.startButtonText}>Iniciar Diagnóstico</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={18}
              color="#FFFFFF"
            />
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Diagnóstico de Nivelamento</Text>
          <Text style={styles.subtitle}>
            Avalie seu nível atual nas matérias básicas com questões reais de concursos. Descubra se você está no nível Iniciante, Intermediário ou Avançado! 🎯
          </Text>
        </View>

        {/* Lista de Matérias */}
        <FlatList
          data={SUBJECTS}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const palette = Colors.dark;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: palette.cardBorder,
  },
  title: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: palette.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  listContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(91,97,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.accent,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: palette.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
  resultContainer: {
    gap: 12,
  },
  levelBadgeContainer: {
    marginBottom: 12,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 13,
    fontWeight: '900',
  },
  resultTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: palette.cardBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  resultText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
  },
  encouragementText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '700',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.accent,
    backgroundColor: 'transparent',
  },
  retryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  retryButtonText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '800',
  },
  startButton: {
    backgroundColor: palette.accent,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});

