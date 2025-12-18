import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { Contest, ContestStatus } from '@/constants/contestsData';

type ContestCardProps = {
  contest: Contest;
  onPress: () => void;
};

export function ContestCard({ contest, onPress }: ContestCardProps) {
  const palette = Colors.dark;

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
    return level === 'medium' ? 'Médio' : 'Superior';
  };

  const statusConfig = getStatusConfig(contest.status);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}>
      {/* Header com Instituição */}
      <View style={styles.header}>
        <Text style={styles.institution}>{contest.institution}</Text>
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
          <Text
            style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Cargo */}
      <Text style={styles.role}>{contest.role}</Text>

      {/* Remuneração */}
      <View style={styles.salaryContainer}>
        <MaterialCommunityIcons
          name="currency-usd"
          size={20}
          color={palette.accent}
        />
        <Text style={styles.salary}>{contest.salary}</Text>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View style={[styles.tag, { backgroundColor: palette.card2 }]}>
          <Text style={styles.tagText}>{getLevelLabel(contest.level)}</Text>
        </View>
        {contest.requirements.requiresCNH && (
          <View style={[styles.tag, { backgroundColor: 'rgba(91,97,255,0.15)' }]}>
            <MaterialCommunityIcons
              name="car-outline"
              size={12}
              color={palette.accent}
              style={styles.tagIcon}
            />
            <Text style={[styles.tagText, { color: palette.accent }]}>CNH</Text>
          </View>
        )}
        {contest.requirements.requiresTAF && (
          <View style={[styles.tag, { backgroundColor: 'rgba(245,158,11,0.15)' }]}>
            <MaterialCommunityIcons
              name="dumbbell"
              size={12}
              color="#F59E0B"
              style={styles.tagIcon}
            />
            <Text style={[styles.tagText, { color: '#F59E0B' }]}>TAF</Text>
          </View>
        )}
        {contest.requirements.maxAge && (
          <View style={[styles.tag, { backgroundColor: 'rgba(107,114,128,0.15)' }]}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={12}
              color={palette.mutedText}
              style={styles.tagIcon}
            />
            <Text style={[styles.tagText, { color: palette.mutedText }]}>
              Até {contest.requirements.maxAge} anos
            </Text>
          </View>
        )}
      </View>

      {/* Ícone de seta */}
      <View style={styles.arrowContainer}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={palette.mutedText}
        />
      </View>
    </Pressable>
  );
}

const palette = Colors.dark;

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.cardBorder,
    position: 'relative',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  institution: {
    flex: 1,
    color: palette.text,
    fontSize: 18,
    fontWeight: '900',
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  role: {
    color: palette.mutedText,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 16,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  salary: {
    color: palette.accent,
    fontSize: 20,
    fontWeight: '900',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '800',
  },
  tagIcon: {
    marginRight: 4,
  },
  arrowContainer: {
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
});

