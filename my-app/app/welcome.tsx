import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SESSION_KEY = 'souconcursado.session';

type Session = {
  user?: { name?: string };
};

export default function WelcomeScreen() {
  const [name, setName] = useState<string>('Usuário');
  const palette = Colors.dark;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const raw = await AsyncStorage.getItem(SESSION_KEY);
      if (!raw) {
        router.replace('/');
        return;
      }
      try {
        const parsed = JSON.parse(raw) as Session;
        const n = parsed?.user?.name?.trim();
        if (!cancelled && n) setName(n);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await AsyncStorage.removeItem(SESSION_KEY);
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View pointerEvents="none" style={styles.glowTop} />
        <View pointerEvents="none" style={styles.glowBottom} />

        <Text style={styles.title}>
          Olá, <Text style={styles.titleAccent}>{name}!</Text>
        </Text>

        <View style={styles.card}>
          <View style={styles.cardIconWrap}>
            <MaterialIcons name="psychology" size={22} color={palette.tint} />
          </View>
          <Text style={styles.cardTitle}>Vamos descobrir o seu perfil?</Text>
          <Text style={styles.cardSubtitle}>Iniciar Quiz Vocacional</Text>

          <Pressable
            onPress={() => router.push('/quiz')}
            style={({ pressed }) => [styles.primaryButton, pressed ? styles.pressed : null]}>
            <Text style={styles.primaryText}>Começar</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={logout}
          style={({ pressed }) => [styles.link, pressed ? styles.pressed : null]}>
          <Text style={styles.linkText}>Sair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const colors = {
  ...Colors.dark,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 28 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 8 },
  titleAccent: { color: colors.accent2 ?? colors.tint, fontWeight: '900' },

  card: {
    marginTop: 18,
    backgroundColor: colors.card2 ?? colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(91,97,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    marginBottom: 10,
  },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '900', marginTop: 2 },
  cardSubtitle: { color: colors.mutedText, fontSize: 13, marginTop: 4, marginBottom: 12 },

  primaryButton: {
    backgroundColor: colors.tint,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  primaryText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },

  link: { alignItems: 'center', marginTop: 14, paddingVertical: 10 },
  linkText: { color: colors.mutedText, fontWeight: '800' },
  pressed: { opacity: 0.92 },

  glowTop: {
    position: 'absolute',
    top: -160,
    right: -160,
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: colors.glow1 ?? 'rgba(91,97,255,0.16)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -190,
    left: -190,
    width: 400,
    height: 400,
    borderRadius: 999,
    backgroundColor: colors.glow2 ?? 'rgba(45,134,255,0.14)',
  },
});


