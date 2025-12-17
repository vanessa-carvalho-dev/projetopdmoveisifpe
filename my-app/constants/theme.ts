/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#3F63FF';
const tintColorDark = '#5B61FF';
const tintColorDark2 = '#2D86FF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    card: '#F5F7FA',
    cardBorder: 'rgba(17,24,28,0.08)',
    mutedText: '#5B6770',
    inputBg: '#FFFFFF',
    inputBorder: 'rgba(17,24,28,0.10)',
  },
  dark: {
    text: '#F4F7FB',
    background: '#070A12',
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: 'rgba(244,247,251,0.55)',
    tabIconSelected: tintColorDark,
    mutedText: 'rgba(244,247,251,0.65)',
    card: '#0B1422',
    card2: '#0E1C2C',
    cardBorder: 'rgba(255,255,255,0.10)',
    inputBg: 'rgba(255,255,255,0.04)',
    inputBorder: 'rgba(255,255,255,0.09)',
    divider: 'rgba(255,255,255,0.12)',
    accent: tintColorDark,
    accent2: tintColorDark2,
    buttonTextOnAccent: '#0A0D14',
    error: '#FF6B6B',
    glow1: 'rgba(94,92,230,0.20)',
    glow2: 'rgba(45,134,255,0.18)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
