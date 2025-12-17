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

const QUIZ_RESULTS_STORAGE_KEY = 'souconcursado.quizResults';

type QuizResult = {
  subjectId: SubjectId;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
};

type QuizResults = {
  [subjectId: string]: QuizResult;
};

export default function StudiesScreen() {
  const [quizResults, setQuizResults] = useState<QuizResults>({});
  const [loading, setLoading] = useState(true);
  const palette = Colors.dark;

  useFocusEffect(
    useCallback(() => {
      loadQuizResults();
    }, [])
  );

  const loadQuizResults = async () => {
    try {
      const resultsData = await AsyncStorage.getItem(QUIZ_RESULTS_STORAGE_KEY);
      if (resultsData) {
        setQuizResults(JSON.parse(resultsData));
      }
    } catch (error) {
      console.error('Erro ao carregar resultados dos quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (subject: Subject) => {
    router.push({
      pathname: '/quiz',
      params: {
        subjectId: subject.id,
        subjectName: subject.name,
      },
    });
  };

  const getSubjectResult = (subjectId: SubjectId): QuizResult | null => {
    return quizResults[subjectId] || null;
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
              {subject.questionCount} perguntas
            </Text>
          </View>
        </View>

        {isCompleted ? (
          <View style={styles.resultContainer}>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(result.correctAnswers / result.totalQuestions) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.resultText}>
              Acertos: {result.correctAnswers}/{result.totalQuestions}
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={() => handleStartQuiz(subject)}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}>
            <Text style={styles.startButtonText}>Iniciar</Text>
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
          <Text style={styles.title}>Guia de Estudos</Text>
          <Text style={styles.subtitle}>
            Realize os diagnósticos abaixo para identificar seu nível atual nas
            matérias-base.
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
    gap: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: palette.cardBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: palette.accent,
    borderRadius: 4,
  },
  resultText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
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

