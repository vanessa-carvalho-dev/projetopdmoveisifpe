import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { CONTESTS, ContestStatus } from '@/constants/contestsData';

export default function ContestDetailsScreen() {
  const params = useLocalSearchParams<{ contestId: string }>();
  const palette = Colors.dark;

  const contest = CONTESTS.find((c) => c.id === params.contestId);

  if (!contest) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Concurso não encontrado</Text>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusConfig = (status: ContestStatus) => {
    switch (status) {
      case 'open':
        return {
          label: 'Edital Aberto',
          color: '#10B981',
          bgColor: 'rgba(16,185,129,0.15)',
        };
      case 'soon':
        return {
          label: 'Em Breve',
          color: '#F59E0B',
          bgColor: 'rgba(245,158,11,0.15)',
        };
      case 'closed':
        return {
          label: 'Encerrado',
          color: '#6B7280',
          bgColor: 'rgba(107,114,128,0.15)',
        };
    }
  };

  const getLevelLabel = (level: string) => {
    return level === 'medium' ? 'Nível Médio' : 'Nível Superior';
  };

  const statusConfig = getStatusConfig(contest.status);

  const handleOpenLink = async () => {
    try {
      const canOpen = await Linking.canOpenURL(contest.details.link);
      if (canOpen) {
        await Linking.openURL(contest.details.link);
      }
    } catch (error) {
      console.error('Erro ao abrir link:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Header com botão voltar */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={palette.text}
            />
          </Pressable>
        </View>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusConfig.bgColor },
            ]}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: statusConfig.color },
              ]}
            />
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Instituição */}
        <Text style={styles.institution}>{contest.institution}</Text>

        {/* Cargo */}
        <Text style={styles.role}>{contest.role}</Text>

        {/* Remuneração */}
        <View style={styles.salaryCard}>
          <View style={styles.salaryHeader}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={24}
              color={palette.accent}
            />
            <Text style={styles.salaryLabel}>Remuneração</Text>
          </View>
          <Text style={styles.salary}>{contest.salary}</Text>
        </View>

        {/* Informações */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações do Concurso</Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="account-group"
              size={20}
              color={palette.icon}
            />
            <Text style={styles.infoLabel}>Vagas:</Text>
            <Text style={styles.infoValue}>{contest.details.vacancies}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="school"
              size={20}
              color={palette.icon}
            />
            <Text style={styles.infoLabel}>Nível:</Text>
            <Text style={styles.infoValue}>{getLevelLabel(contest.level)}</Text>
          </View>

          {contest.details.registrationPeriod && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={palette.icon}
              />
              <Text style={styles.infoLabel}>Período de Inscrição:</Text>
              <Text style={styles.infoValue}>
                {contest.details.registrationPeriod}
              </Text>
            </View>
          )}

          {contest.details.examDate && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={20}
                color={palette.icon}
              />
              <Text style={styles.infoLabel}>Data da Prova:</Text>
              <Text style={styles.infoValue}>{contest.details.examDate}</Text>
            </View>
          )}
        </View>

        {/* Requisitos */}
        <View style={styles.requirementsSection}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          <Text style={styles.requirementsText}>
            {contest.details.requirements}
          </Text>
        </View>

        {/* Seção de Nivelamento */}
        <View style={styles.levelingSection}>
          <Text style={styles.sectionTitle}>Nivelamento</Text>
          <Text style={styles.levelingText}>
            Este concurso exige conhecimentos em matérias-base. Que tal verificar se você está preparado?
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/studies')}
            style={({ pressed }) => [
              styles.levelingButton,
              pressed && styles.levelingButtonPressed,
            ]}>
            <MaterialCommunityIcons name="school-outline" size={20} color="#FFFFFF" />
            <Text style={styles.levelingButtonText}>Quero testar meus conhecimentos</Text>
          </Pressable>
        </View>

        {/* Botão de Ação */}
        <Pressable
          onPress={handleOpenLink}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}>
          <MaterialCommunityIcons name="open-in-new" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>
            {contest.status === 'open'
              ? 'Acessar Edital'
              : contest.status === 'soon'
                ? 'Ver Mais Informações'
                : 'Ver Detalhes'}
          </Text>
        </Pressable>
      </ScrollView>
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
  contentContainer: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  institution: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  role: {
    color: palette.mutedText,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
  },
  salaryCard: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  salaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  salaryLabel: {
    color: palette.mutedText,
    fontSize: 14,
    fontWeight: '700',
  },
  salary: {
    color: palette.accent,
    fontSize: 32,
    fontWeight: '900',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  infoLabel: {
    color: palette.mutedText,
    fontSize: 15,
    fontWeight: '700',
  },
  infoValue: {
    flex: 1,
    color: palette.text,
    fontSize: 15,
    fontWeight: '800',
  },
  requirementsSection: {
    marginBottom: 24,
  },
  requirementsText: {
    color: palette.text,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },
  levelingSection: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  levelingText: {
    color: palette.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  levelingButton: {
    backgroundColor: palette.accent,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  levelingButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  levelingButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  actionButton: {
    backgroundColor: palette.accent,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
  },
  actionButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});

