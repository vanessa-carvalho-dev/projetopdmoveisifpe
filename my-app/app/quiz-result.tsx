import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const PROFILE_STORAGE_KEY = 'souconcursado.userProfile';
const QUIZ_ANSWERS_STORAGE_KEY = 'souconcursado.quizAnswers';

export default function QuizResultScreen() {
  const params = useLocalSearchParams<{
    profileId: string;
    profileName: string;
    profileDescription: string;
  }>();

  const palette = Colors.dark;

  const getIconName = (profileId: string): keyof typeof MaterialCommunityIcons.glyphMap => {
    const iconMap: { [key: string]: keyof typeof MaterialCommunityIcons.glyphMap } = {
      estrategista_admin: 'briefcase-outline',
      guardiao_operacional: 'shield-outline',
      analista_fiscal: 'calculator',
      jurista_publico: 'scale-balance',
      servidor_social: 'heart-outline',
      planejador_estrategico: 'chart-line',
    };
    return iconMap[profileId] || 'account-check-outline';
  };

  useEffect(() => {
    // Salvar perfil no AsyncStorage quando a tela carregar
    const saveProfile = async () => {
      try {
        const profileData = {
          profileId: params.profileId,
          profileName: params.profileName,
          profileDescription: params.profileDescription,
        };
        await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
      }
    };

    if (params.profileId) {
      saveProfile();
    }
  }, [params.profileId, params.profileName, params.profileDescription]);

  const handleSeeConcursos = () => {
    // Navegar para a tela de concursos recomendados
    router.push('/(tabs)');
  };

  const handleRefazerQuiz = async () => {
    try {
      // Limpar dados do quiz e perfil
      await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
      await AsyncStorage.removeItem(QUIZ_ANSWERS_STORAGE_KEY);
      
      // Navegar para a tela do quiz
      router.replace('/quiz');
    } catch (error) {
      console.error('Erro ao limpar dados do quiz:', error);
    }
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
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={getIconName(params.profileId || 'estrategista_admin')}
              size={48}
              color={palette.accent}
            />
          </View>
          <View style={styles.successBadge}>
            <MaterialCommunityIcons name="check-circle" size={32} color={palette.accent} />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>Análise concluída!</Text>

        {/* Definição do Perfil */}
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{params.profileName || 'Perfil não encontrado'}</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>
          {params.profileDescription ||
            'Seu perfil foi analisado com base nas suas respostas ao quiz.'}
        </Text>

        
        <Pressable
          onPress={handleSeeConcursos}
          style={({ pressed }) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed,
          ]}>
          <Text style={styles.ctaButtonText}>Ver Concursos Recomendados</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />
        </Pressable>

        {/* Botão secundário para refazer quiz */}
        <Pressable
          onPress={handleRefazerQuiz}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}>
          <MaterialCommunityIcons
            name="refresh"
            size={16}
            color={colors.mutedText}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.secondaryButtonText}>Refazer Quiz</Text>
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
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: colors.background,
    borderRadius: 20,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.accent,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  profileName: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  ctaButton: {
    backgroundColor: colors.accent,
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
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  secondaryButtonPressed: {
    opacity: 0.8,
  },
  secondaryButtonText: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: '800',
  },
});

