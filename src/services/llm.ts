import type { LLMResult } from '../types'


// ✅ TL;DR — ملخص سريع للرسالة الواردة باستخدام Gemini
export async function generateTldr(
  originalText: string,
  translatedText: string,
  apiKey: string,
): Promise<LLMResult> {

  const prompt = `You are a workplace communication assistant.
Given this message, write ONE sentence summarizing: the main topic and any action required.
Format: "Main topic: [X]. Action needed: [Y]."

Original message: ${originalText}
Translation: ${translatedText}`

  return callGemini(prompt, apiKey)
}

// ✅ Polish — تحويل الرد الخام إلى رد مهني باستخدام Gemini
export async function polishReply(
  draftText: string,
  contextText: string,
  targetLang: string,
  apiKey: string,
): Promise<LLMResult> {

  const langMap: Record<string, string> = {
    JA: 'formal business Japanese (Keigo/敬語)',
    AR: 'formal Modern Standard Arabic',
    EN: 'professional business English',
  }

  const targetStyle = langMap[targetLang] ?? 'professional English'

  const prompt = `You are a professional workplace communication assistant.
Convert this casual draft reply into a polished, professional message in ${targetStyle}.
Keep it workplace-appropriate.

Context (original message): ${contextText}
Draft reply: ${draftText}

Respond ONLY with the polished message, no explanations.`

  return callGemini(prompt, apiKey)
}

// 🔧 دالة الاتصال بـ Google Gemini API (عبر REST)


async function callGemini(prompt: string, apiKey: string): Promise<LLMResult> {
  try {
    // 💡 تم استخدام gemini-2.5-flash المتاح والمستقر في حسابك
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!textContent) {
      throw new Error('Invalid response from Gemini API')
    }

    return { content: textContent.trim() }

  } catch (err) {
    return { content: '', error: (err as Error).message }
  }
}