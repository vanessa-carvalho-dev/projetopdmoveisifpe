import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { CONTESTS, Contest } from '@/constants/contestsData';
import { ContestCard } from '@/components/ContestCard';

const PROFILE_STORAGE_KEY = 'souconcursado.userProfile';
const QUIZ_RESULTS_STORAGE_KEY = 'souconcursado.quizResults';

type UserProfile = {
  profileId: string;
  profileName: string;
  profileDescription: string;
};

// Mapeamento de perfil para categoria de concurso
const profileToCategoryMap: { [key: string]: string[] } = {
  estrategista_admin: ['admin'],
  guardiao_operacional: ['police'],
  analista_fiscal: ['fiscal'],
  jurista_publico: ['legal'],
  servidor_social: ['health', 'education'],
  planejador_estrategico: ['admin'],
};

// Mapeamento de perfil para nível preferido (baseado nas respostas do quiz)
const profileToLevelMap: { [key: string]: string[] } = {
  estrategista_admin: ['medium', 'superior'],
  guardiao_operacional: ['medium', 'superior'],
  analista_fiscal: ['superior'],
  jurista_publico: ['superior'],
  servidor_social: ['medium', 'superior'],
  planejador_estrategico: ['superior'],
};

export default function RecommendedContestsScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hasQuizResults, setHasQuizResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const palette = Colors.dark;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profileData = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (profileData) {
        setProfile(JSON.parse(profileData));
      }

      // Verificar se há resultados de quizzes de matérias
      const quizResultsData = await AsyncStorage.getItem(QUIZ_RESULTS_STORAGE_KEY);
      if (quizResultsData) {
        const results = JSON.parse(quizResultsData);
        setHasQuizResults(Object.keys(results).length > 0);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const shouldShowStudyCard = profile && !hasQuizResults;

  // Filtrar concursos baseado no perfil
  const filteredContests = useMemo(() => {
    if (!profile) {
      // Se não houver perfil, retornar todos os concursos
      return CONTESTS;
    }

    const categories = profileToCategoryMap[profile.profileId] || [];
    const levels = profileToLevelMap[profile.profileId] || ['medium', 'superior'];

    return CONTESTS.filter((contest) => {
      const matchesCategory = categories.length === 0 || categories.includes(contest.category);
      const matchesLevel = levels.includes(contest.level);
      return matchesCategory && matchesLevel;
    });
  }, [profile]);

  const handleContestPress = (contest: Contest) => {
    router.push({
      pathname: '/contest-details',
      params: {
        contestId: contest.id,
      },
    });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Nenhum concurso encontrado</Text>
      <Text style={styles.emptyText}>
        Não encontramos concursos que correspondam ao seu perfil no momento.
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.accent} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Seu Perfil: {profile?.profileName || 'Não definido'}
          </Text>
          {profile && (
            <Text style={styles.headerSubtitle}>
              {filteredContests.length} {filteredContests.length === 1 ? 'concurso encontrado' : 'concursos encontrados'}
            </Text>
          )}
        </View>

        {/* Lista de Concursos */}
        <FlatList
          data={filteredContests}
          renderItem={({ item }) => (
            <ContestCard contest={item} onPress={() => handleContestPress(item)} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            filteredContests.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          ListHeaderComponent={
            shouldShowStudyCard ? (
              <Pressable
                onPress={() => router.push('/(tabs)/studies')}
                style={({ pressed }) => [
                  styles.studyCard,
                  pressed && styles.studyCardPressed,
                ]}>
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={24}
                  color={palette.accent}
                />
                <View style={styles.studyCardContent}>
                  <Text style={styles.studyCardText}>
                    Não sabe por onde começar? 🤯 Descubra seu nível agora mesmo e monte sua estratégia!
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={palette.mutedText}
                />
              </Pressable>
            ) : null
          }
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: palette.mutedText,
    fontSize: 14,
    fontWeight: '700',
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.cardBorder,
  },
  headerTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: palette.mutedText,
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 100,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    color: palette.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  studyCard: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    marginHorizontal: 22,
    marginTop: 20,
    borderWidth: 1,
    borderColor: palette.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studyCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  studyCardContent: {
    flex: 1,
  },
  studyCardText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
});
