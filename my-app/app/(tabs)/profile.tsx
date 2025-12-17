import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';

const SESSION_KEY = 'souconcursado.session';

type Session = { user?: { name?: string; email?: string } };

export default function ProfileScreen() {
  const [name, setName] = useState('Usuário');
  const [email, setEmail] = useState('');

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
        if (!cancelled) {
          setName(parsed?.user?.name?.trim() || 'Usuário');
          setEmail(parsed?.user?.email?.trim() || '');
        }
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
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{name}</Text>
          <Text style={[styles.label, { marginTop: 12 }]}>E-mail</Text>
          <Text style={styles.value}>{email || '—'}</Text>
        </View>

        <Pressable onPress={logout} style={({ pressed }) => [styles.logout, pressed ? styles.pressed : null]}>
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const palette = Colors.dark;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  container: { flex: 1, padding: 20, gap: 14 },
  title: { color: palette.text, fontSize: 22, fontWeight: '900' },
  card: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  label: { color: palette.mutedText, fontSize: 12, fontWeight: '800' },
  value: { color: palette.text, fontSize: 15, fontWeight: '700', marginTop: 4 },
  logout: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  logoutText: { color: palette.mutedText, fontWeight: '900' },
  pressed: { opacity: 0.92 },
});


