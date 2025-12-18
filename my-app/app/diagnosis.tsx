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
import { SubjectId } from '@/constants/subjectsData';
import { getDiagnosisQuestions, calculateLevel } from '@/constants/diagnosisQuestionsData';
import { DiagnosisResult } from '@/constants/types';

const DIAGNOSIS_RESULTS_STORAGE_KEY = 'souconcursado.diagnosisResults';

export default function DiagnosisScreen() {
  const params = useLocalSearchParams<{ subjectId: string; subjectName: string }>();
  const subjectId = params.subjectId as SubjectId;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const palette = Colors.dark;

  const questions = useMemo(() => {
    return getDiagnosisQuestions(subjectId);
  }, [subjectId]);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isCorrect = selectedAnswer !== undefined && selectedAnswer === currentQuestion.correctAnswerIndex;

  const handleSelectAnswer = (answerIndex: number) => {
    if (showExplanation) return; // Não permitir mudar resposta após ver explicação
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === undefined) return;
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!showExplanation) {
      // Se ainda não mostrou explicação, mostrar primeiro
      if (selectedAnswer !== undefined) {
        handleConfirmAnswer();
      }
      return;
    }

    // Se já mostrou explicação, avançar para próxima questão
    if (isLastQuestion) {
      finishDiagnosis();
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
      setShowExplanation(false);
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
    setShowExplanation(false);
  };

  const finishDiagnosis = async () => {
    // Calcular resultado
    let correctAnswers = 0;
    questions.forEach((q) => {
      const userAnswer = selectedAnswers[q.id];
      if (userAnswer === q.correctAnswerIndex) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / questions.length) * 100;
    const level = calculateLevel(percentage);

    const result: DiagnosisResult = {
      subjectId,
      level,
      percentage,
      correctAnswers,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString(),
    };

    // Salvar resultado
    try {
      const resultsData = await AsyncStorage.getItem(DIAGNOSIS_RESULTS_STORAGE_KEY);
      const results = resultsData ? JSON.parse(resultsData) : {};
      results[subjectId] = result;
      await AsyncStorage.setItem(DIAGNOSIS_RESULTS_STORAGE_KEY, JSON.stringify(results));
    } catch (error) {
      console.error('Erro ao salvar resultado do diagnóstico:', error);
    }

    // Navegar para tela de resultado
    router.push({
      pathname: '/diagnosis-result',
      params: {
        subjectId,
        subjectName: params.subjectName || '',
        level,
        percentage: percentage.toFixed(1),
        correctAnswers: correctAnswers.toString(),
        totalQuestions: questions.length.toString(),
      },
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return '#4CAF50';
      case 'Médio':
        return '#FF9800';
      case 'Difícil':
        return '#F44336';
      default:
        return palette.mutedText;
    }
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D, E
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Cabeçalho de Progresso */}
        <View style={styles.progressHeader}>
          <View style={styles.metadataContainer}>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataText}>
                {currentQuestion.banca} • {currentQuestion.ano}
              </Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(currentQuestion.difficulty) + '20' }]}>
                <Text style={[styles.difficultyText, { color: getDifficultyColor(currentQuestion.difficulty) }]}>
                  {currentQuestion.difficulty}
                </Text>
              </View>
            </View>
            <Text style={styles.orgaoText}>{currentQuestion.orgao}</Text>
            <Text style={styles.assuntoText}>{currentQuestion.assunto}</Text>
          </View>
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
            {currentQuestion.contextText && (
              <View style={styles.contextContainer}>
                <Text style={styles.contextText}>{currentQuestion.contextText}</Text>
              </View>
            )}
            
            <Text style={styles.questionText}>{currentQuestion.text}</Text>

            {/* Área de Respostas */}
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => {
                const optionLabel = getOptionLabel(index);
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === currentQuestion.correctAnswerIndex;
                const showResult = showExplanation;

                return (
                  <Pressable
                    key={index}
                    onPress={() => handleSelectAnswer(index)}
                    disabled={showExplanation}
                    style={({ pressed }) => [
                      styles.option,
                      isSelected && styles.optionSelected,
                      showResult && isCorrectOption && styles.optionCorrect,
                      showResult && isSelected && !isCorrectOption && styles.optionIncorrect,
                      pressed && !showExplanation && styles.optionPressed,
                    ]}>
                    <View style={styles.optionHeader}>
                      <View style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                        showResult && isCorrectOption && styles.optionLabelCorrect,
                        showResult && isSelected && !isCorrectOption && styles.optionLabelIncorrect,
                      ]}>
                        <Text style={[
                          styles.optionLabelText,
                          isSelected && styles.optionLabelTextSelected,
                          showResult && isCorrectOption && styles.optionLabelTextCorrect,
                        ]}>
                          {optionLabel}
                        </Text>
                      </View>
                      {showResult && isCorrectOption && (
                        <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                      )}
                      {showResult && isSelected && !isCorrectOption && (
                        <MaterialCommunityIcons name="close-circle" size={20} color="#F44336" />
                      )}
                    </View>
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                      showResult && isCorrectOption && styles.optionTextCorrect,
                    ]}>
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Explicação */}
            {showExplanation && (
              <View style={[
                styles.explanationContainer,
                isCorrect ? styles.explanationCorrect : styles.explanationIncorrect,
              ]}>
                <View style={styles.explanationHeader}>
                  <MaterialCommunityIcons
                    name={isCorrect ? "check-circle" : "alert-circle"}
                    size={24}
                    color={isCorrect ? "#4CAF50" : "#F44336"}
                  />
                  <Text style={[
                    styles.explanationTitle,
                    { color: isCorrect ? "#4CAF50" : "#F44336" },
                  ]}>
                    {isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                  </Text>
                </View>
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              </View>
            )}
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
            onPress={showExplanation ? handleNext : handleConfirmAnswer}
            disabled={selectedAnswer === undefined}
            style={({ pressed }) => [
              styles.navButton,
              styles.nextButton,
              selectedAnswer === undefined && styles.navButtonDisabled,
              pressed && selectedAnswer !== undefined && styles.navButtonPressed,
            ]}>
            <Text
              style={[
                styles.navButtonText,
                styles.nextButtonText,
                selectedAnswer === undefined && styles.navButtonTextDisabled,
              ]}>
              {showExplanation ? (isLastQuestion ? 'Finalizar' : 'Próxima') : 'Confirmar'}
            </Text>
            {showExplanation && (
              <Feather
                name={isLastQuestion ? "check" : "arrow-right"}
                size={18}
                color={selectedAnswer === undefined ? palette.mutedText : '#FFFFFF'}
              />
            )}
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
  metadataContainer: {
    marginBottom: 8,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metadataText: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '800',
  },
  orgaoText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  assuntoText: {
    color: colors.mutedText,
    fontSize: 11,
    fontWeight: '600',
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
  contextContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  contextText: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
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
  option: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  optionSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(91,97,255,0.10)',
  },
  optionCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76,175,80,0.10)',
  },
  optionIncorrect: {
    borderColor: '#F44336',
    backgroundColor: 'rgba(244,67,54,0.10)',
  },
  optionPressed: {
    opacity: 0.8,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionLabel: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabelSelected: {
    backgroundColor: colors.accent,
  },
  optionLabelCorrect: {
    backgroundColor: '#4CAF50',
  },
  optionLabelIncorrect: {
    backgroundColor: '#F44336',
  },
  optionLabelText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  optionLabelTextSelected: {
    color: '#FFFFFF',
  },
  optionLabelTextCorrect: {
    color: '#FFFFFF',
  },
  optionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  optionTextSelected: {
    color: colors.accent,
  },
  optionTextCorrect: {
    color: '#4CAF50',
  },
  explanationContainer: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  explanationCorrect: {
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  explanationIncorrect: {
    backgroundColor: 'rgba(244,67,54,0.15)',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  explanationText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
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

