import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { QUESTIONS, Question, UserAnswers } from '@/constants/questionsData';
import { matchProfile } from '@/utils/profileMatcher';
import { generateMockQuestions } from '@/constants/subjectQuestionsData';
import { SubjectId, SUBJECTS } from '@/constants/subjectsData';

const QUIZ_RESULTS_STORAGE_KEY = 'souconcursado.quizResults';

export default function QuizScreen() {
  const params = useLocalSearchParams<{ subjectId?: string; subjectName?: string }>();
  const isSubjectQuiz = !!params.subjectId;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [slideAnim] = useState(new Animated.Value(0));
  const palette = Colors.dark;

  // Determinar quais questões usar
  const questions = useMemo(() => {
    if (isSubjectQuiz && params.subjectId) {
      const subject = SUBJECTS.find((s) => s.id === params.subjectId as SubjectId);
      return generateMockQuestions(params.subjectId as SubjectId, subject?.questionCount || 10);
    }
    return QUESTIONS;
  }, [isSubjectQuiz, params.subjectId]);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = answers[currentQuestion.id];

  const handleSelectAnswer = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = async () => {
    if (!selectedAnswer) return;

    // Garantir que a resposta atual está salva
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    };

    if (isLastQuestion) {
      if (isSubjectQuiz && params.subjectId) {
        // Calcular acertos para quiz de matéria
        let correctAnswers = 0;
        questions.forEach((q) => {
          const userAnswer = updatedAnswers[q.id];
          if (userAnswer === q.correctAnswerId) {
            correctAnswers++;
          }
        });

        // Salvar resultado
        try {
          const resultsData = await AsyncStorage.getItem(QUIZ_RESULTS_STORAGE_KEY);
          const results = resultsData ? JSON.parse(resultsData) : {};
          results[params.subjectId] = {
            subjectId: params.subjectId,
            correctAnswers,
            totalQuestions: questions.length,
            completedAt: new Date().toISOString(),
          };
          await AsyncStorage.setItem(QUIZ_RESULTS_STORAGE_KEY, JSON.stringify(results));
        } catch (error) {
          console.error('Erro ao salvar resultado do quiz:', error);
        }

        // Voltar para a tela de Estudos
        router.push('/(tabs)/studies');
      } else {
        // Navegar para a tela de resultado do perfil vocacional
        const profile = matchProfile(updatedAnswers as UserAnswers);
        router.push({
          pathname: '/quiz-result',
          params: {
            profileId: profile.id,
            profileName: profile.name,
            profileDescription: profile.description,
          },
        });
      }
    } else {
      // Animar transição
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (isFirstQuestion) return;

    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const getIconName = (iconName?: string): keyof typeof MaterialCommunityIcons.glyphMap => {
    const iconMap: { [key: string]: keyof typeof MaterialCommunityIcons.glyphMap } = {
      folder: 'folder-outline',
      shield: 'shield-outline',
      calculator: 'calculator',
      'scale-balance': 'scale-balance',
      'medical-bag': 'hospital-box-outline',
      school: 'school-outline',
      'dollar-sign': 'currency-usd',
      clock: 'clock-outline',
      'map-pin': 'map-marker-outline',
      'shield-check': 'shield-check-outline',
      'trending-up': 'trending-up',
      flag: 'flag-outline',
      map: 'map-outline',
      city: 'city-variant-outline',
      'office-building': 'office-building-outline',
      'book-open': 'book-open-outline',
      monitor: 'monitor',
      'chalkboard-teacher': 'school-outline',
      sync: 'sync',
    };
    return iconMap[iconName || ''] || 'circle-outline';
  };

  const renderOption = (option: any, questionType?: string) => {
    const isSelected = selectedAnswer === option.id;

    // Para quizzes de matérias, sempre usar formato de lista
    if (isSubjectQuiz || (!isSubjectQuiz && questionType === 'list')) {
      return (
        <Pressable
          key={option.id}
          onPress={() => handleSelectAnswer(option.id)}
          style={({ pressed }) => [
            styles.listOption,
            isSelected && styles.listOptionSelected,
            pressed && styles.optionPressed,
          ]}>
          <View style={styles.radioContainer}>
            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
          </View>
          <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
            {option.label}
          </Text>
          {isSelected && (
            <Feather name="check" size={18} color={palette.accent} style={styles.checkIcon} />
          )}
        </Pressable>
      );
    }

    if (!isSubjectQuiz && (questionType === 'grid_icons' || questionType === 'cards')) {
      return (
        <Pressable
          key={option.id}
          onPress={() => handleSelectAnswer(option.id)}
          style={({ pressed }) => [
            styles.cardOption,
            isSelected && styles.cardOptionSelected,
            pressed && styles.optionPressed,
          ]}>
          {option.icon && (
            <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
              <MaterialCommunityIcons
                name={getIconName(option.icon)}
                size={24}
                color={isSelected ? palette.accent : palette.icon}
              />
            </View>
          )}
          <Text style={[styles.cardOptionText, isSelected && styles.cardOptionTextSelected]}>
            {option.label}
          </Text>
          {isSelected && (
            <View style={styles.cardCheck}>
              <Feather name="check" size={16} color="#FFFFFF" />
            </View>
          )}
        </Pressable>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Cabeçalho de Progresso */}
        <View style={styles.progressHeader}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Questão {currentQuestionIndex + 1} de {questions.length}
          </Text>
        </View>

        {/* Área da Pergunta */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.questionContainer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {/* Área de Respostas */}
            <View
              style={[
                styles.optionsContainer,
                !isSubjectQuiz && (currentQuestion.type === 'grid_icons' || currentQuestion.type === 'cards')
                  ? styles.optionsGrid
                  : styles.optionsList,
              ]}>
              {currentQuestion.options.map((option) => renderOption(option, (currentQuestion as any).type))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Rodapé de Navegação */}
        <View style={styles.footer}>
          <Pressable
            onPress={handleBack}
            disabled={isFirstQuestion}
            style={({ pressed }) => [
              styles.navButton,
              styles.backButton,
              isFirstQuestion && styles.navButtonDisabled,
              pressed && !isFirstQuestion && styles.navButtonPressed,
            ]}>
            <Feather
              name="arrow-left"
              size={18}
              color={isFirstQuestion ? palette.mutedText : palette.text}
            />
            <Text
              style={[
                styles.navButtonText,
                isFirstQuestion && styles.navButtonTextDisabled,
              ]}>
              Voltar
            </Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            disabled={!selectedAnswer}
            style={({ pressed }) => [
              styles.navButton,
              styles.nextButton,
              !selectedAnswer && styles.navButtonDisabled,
              pressed && selectedAnswer && styles.navButtonPressed,
            ]}>
            <Text
              style={[
                styles.navButtonText,
                styles.nextButtonText,
                !selectedAnswer && styles.navButtonTextDisabled,
              ]}>
              {isLastQuestion ? 'Finalizar' : 'Avançar'}
            </Text>
            <Feather
              name="arrow-right"
              size={18}
              color={!selectedAnswer ? palette.mutedText : '#FFFFFF'}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const colors = {
  ...Colors.dark,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  progressHeader: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
    gap: 10,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.cardBorder,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  progressText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: { flex: 1 },
  contentContainer: { paddingHorizontal: 22, paddingVertical: 24 },
  questionContainer: {
    gap: 24,
  },
  questionText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionsList: {
    gap: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  listOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    gap: 12,
  },
  listOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(91,97,255,0.10)',
  },
  radioContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.accent,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  optionTextSelected: {
    color: colors.accent,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  cardOption: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.cardBorder,
    gap: 12,
    position: 'relative',
  },
  cardOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(91,97,255,0.10)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(91,97,255,0.15)',
    borderColor: colors.accent,
  },
  cardOptionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  cardOptionTextSelected: {
    color: colors.accent,
  },
  cardCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionPressed: {
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingVertical: 18,
    paddingBottom: 28,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  backButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  nextButton: {
    backgroundColor: colors.accent,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  navButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  navButtonTextDisabled: {
    color: colors.mutedText,
  },
});

