import type { TranslationResult } from '../types'

export async function translateText(
  text: string,
  targetLang: string,
  apiKey: string,
  sourceLang?: string,
): Promise<TranslationResult> {

  const params = new URLSearchParams({
    text,
    target_lang: targetLang,
    ...(sourceLang && { source_lang: sourceLang }),
  })

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`DeepL Error: ${response.status} — ${error}`)
  }

  const data = await response.json()

  return {
    translatedText: data.translations[0].text,
    detectedLanguage: data.translations[0].detected_source_language,
  }
}