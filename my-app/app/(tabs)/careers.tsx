import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function CareersScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Carreiras</Text>
        <Text style={styles.subtitle}>Em breve: trilhas e sugestões de carreiras públicas.</Text>
      </View>
    </SafeAreaView>
  );
}

const palette = Colors.dark;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  container: { flex: 1, padding: 20, gap: 10 },
  title: { color: palette.text, fontSize: 22, fontWeight: '900' },
  subtitle: { color: palette.mutedText, fontSize: 14, lineHeight: 20 },
});


