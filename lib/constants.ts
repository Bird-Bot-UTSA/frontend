export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' }
] as const;

export const THEMES = [
  { value: 'system', label: 'System', description: 'Follows your device settings' },
  { value: 'light', label: 'Light', description: 'Light theme' },
  { value: 'dark', label: 'Dark', description: 'Dark theme' }
] as const;

export const DEFAULT_USER_DATA = {
  language: 'English',
  theme: 'system' as const
};

export const APP_CONFIG = {
  name: 'BirdBot',
  description: 'Your AI programming assistant for CS concepts and debugging',
  logo: {
    width: 360,
    height: 74,
    smallWidth: 240,
    smallHeight: 49,
    headerWidth: 200,
    headerHeight: 41
  }
} as const; 