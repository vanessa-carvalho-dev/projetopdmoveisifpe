import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

type AuthMode = 'login' | 'register';

const SESSION_KEY = 'souconcursado.session';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);

  const primaryLabel = mode === 'register' ? 'Cadastrar' : 'Entrar';

  const palette = Colors.dark;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (!cancelled && raw) router.replace('/welcome');
      } finally {
        if (!cancelled) setBootstrapping(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const canSubmit = useMemo(() => {
    if (isLoading || bootstrapping) return false;
    if (mode === 'register' && name.trim().length === 0) return false;
    if (email.trim().length === 0) return false;
    if (password.length === 0) return false;
    return true;
  }, [bootstrapping, email, isLoading, mode, name, password]);

  function validate() {
    const next: typeof errors = {};

    if (mode === 'register' && name.trim().length === 0) {
      next.name = 'Nome é obrigatório.';
    }

    if (email.trim().length === 0) {
      next.email = 'E-mail é obrigatório.';
    } else if (!emailRegex.test(email.trim())) {
      next.email = 'Informe um e-mail válido.';
    }

    if (password.length === 0) {
      next.password = 'Senha é obrigatória.';
    } else if (password.length < 6) {
      next.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function mockAuth() {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1400));

      const session = {
        token: 'fake-token',
        loggedIn: true,
        user: {
          name: mode === 'register' ? name.trim() : 'Usuário',
          email: email.trim().toLowerCase(),
        },
      };

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
      router.replace('/welcome');
    } finally {
      setIsLoading(false);
    }
  }

  function toggleMode() {
    setErrors({});
    setPassword('');
    setMode((m) => (m === 'login' ? 'register' : 'login'));
  }

  if (bootstrapping) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator color={palette.accent} />
          <Text style={styles.loadingText}>Carregando…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.safe}>
        <View style={styles.container}>
          <View pointerEvents="none" style={styles.glowTop} />
          <View pointerEvents="none" style={styles.glowBottom} />
          <View style={styles.header}>
            <View style={styles.logoIconWrap}>
              <MaterialCommunityIcons name="school-outline" size={26} color={palette.accent} />
            </View>
            <Text style={styles.logo}>SouConcursado</Text>
            <Text style={styles.slogan}>Comece sua jornada no serviço público</Text>
          </View>

          <View style={styles.form}>
            {mode === 'register' ? (
              <View style={styles.field}>
                <Text style={styles.label}>Nome Completo</Text>
                <View style={[styles.inputRow, errors.name ? styles.inputError : null]}>
                  <Feather name="user" size={18} color={palette.icon} />
                  <TextInput
                    value={name}
                    onChangeText={(t) => {
                      setName(t);
                      if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
                    }}
                    placeholder="Digite seu nome"
                    placeholderTextColor={palette.mutedText}
                    autoCapitalize="words"
                    style={styles.input}
                  />
                </View>
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              </View>
            ) : null}

            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <View style={[styles.inputRow, errors.email ? styles.inputError : null]}>
                <Feather name="mail" size={18} color={palette.icon} />
                <TextInput
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                  }}
                  placeholder="seu@email.com"
                  placeholderTextColor={palette.mutedText}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Senha</Text>
              <View style={[styles.inputRow, errors.password ? styles.inputError : null]}>
                <Feather name="lock" size={18} color={palette.icon} />
                <TextInput
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                  }}
                  placeholder="••••••"
                  placeholderTextColor={palette.mutedText}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <Pressable
              onPress={mockAuth}
              disabled={!canSubmit}
              style={({ pressed }) => [
                styles.primaryButton,
                !canSubmit ? styles.primaryButtonDisabled : null,
                pressed && canSubmit ? styles.primaryButtonPressed : null,
              ]}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
              )}
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou continue com</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              onPress={() => {
                // mock: sem integração real por enquanto
                if (isLoading) return;
                void mockAuth();
              }}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.socialButton,
                pressed && !isLoading ? styles.socialButtonPressed : null,
              ]}>
              <AntDesign name="google" size={18} color={palette.text} />
              <Text style={styles.socialButtonText}>Google</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Pressable onPress={toggleMode} disabled={isLoading}>
              {mode === 'register' ? (
                <Text style={styles.footerText}>
                  Já tem uma conta? <Text style={styles.footerLink}>Entrar</Text>
                </Text>
              ) : (
                <Text style={styles.footerText}>
                  Não tem conta? <Text style={styles.footerLink}>Cadastre-se</Text>
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const colors = {
  
  ...Colors.dark,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 26 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  loadingText: { color: colors.mutedText },

  header: { marginTop: 34, marginBottom: 26, alignItems: 'center', gap: 10 },
  logoIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(91,108,255,0.10)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  logo: { color: colors.text, fontSize: 30, fontWeight: '800', letterSpacing: 0.2 },
  slogan: { color: colors.mutedText, fontSize: 14, lineHeight: 20, textAlign: 'center' },

  form: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 12,
  },

  field: { gap: 8 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.inputBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  input: { flex: 1, color: colors.text, padding: 0 },
  inputError: { borderColor: 'rgba(255,107,107,0.65)' },
  errorText: { color: colors.error ?? '#FF6B6B', fontSize: 12, marginTop: 2 },

  primaryButton: {
    marginTop: 4,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: { transform: [{ scale: 0.99 }], opacity: 0.95 },
  primaryButtonDisabled: { opacity: 0.55 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.divider ?? colors.cardBorder },
  dividerText: { color: colors.mutedText, fontSize: 12 },

  socialButton: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: 'transparent',
  },
  socialButtonPressed: { opacity: 0.92 },
  socialButtonText: { color: colors.text, fontWeight: '800' },

  footer: { marginTop: 18, alignItems: 'center' },
  footerText: { color: colors.mutedText, fontWeight: '700' },
  footerLink: { color: colors.accent, fontWeight: '900' },

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
});


