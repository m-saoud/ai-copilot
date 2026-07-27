export interface UserSettings {
  deeplApiKey: string
  geminiApiKey: string
  sourceLanguage: 'JA' | 'AR' | 'EN'
  targetLanguage: 'JA' | 'AR' | 'EN'
}

export interface TranslationResult {
  translatedText: string
  detectedLanguage?: string
}

export interface LLMResult {
  content: string
  error?: string
}

export interface AppState {
  sourceText: string
  translatedText: string
  tldr: string
  draftText: string
  polishedText: string
}