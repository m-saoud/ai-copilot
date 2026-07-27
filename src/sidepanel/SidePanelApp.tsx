import { useState, useEffect, useRef } from 'react'
import { useSettings } from '../hooks/useSettings'
import { translateText } from '../services/deepl'
import { generateTldr, polishReply } from '../services/llm'
import SettingsModal from '../components/SettingsModal'
import Card1_Input from '../components/cards/Card1_Input'
import Card2_Translation from '../components/cards/Card2_Translation'
import Card3_Draft from '../components/cards/Card3_Draft'
import Card4_Polish from '../components/cards/Card4_Polish'
import Card5_BackTranslation from '../components/cards/Card5_BackTranslation'

export default function SidePanelApp() {
  const { settings, saveSettings, loaded } = useSettings()
  const [showSettings, setShowSettings] = useState(false)

  // --- App State ---
  const [sourceText, setSourceText]       = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [tldr, setTldr]                   = useState('')
  const [draftText, setDraftText]         = useState('')
  const [polishedText, setPolishedText]   = useState('')
  const [backTranslation, setBackTranslation] = useState('')

  // --- Loading & Error States ---
  const [translateLoading, setTranslateLoading] = useState(false)
  const [polishLoading, setPolishLoading]       = useState(false)
  const [backTranslateLoading, setBackTranslateLoading] = useState(false)
  const [translateError, setTranslateError]     = useState('')
  const [polishError, setPolishError]           = useState('')
  const [backTranslateError, setBackTranslateError] = useState('')

  // --- Auto-translate when sourceText changes ---
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!sourceText.trim() || !settings.deeplApiKey) {
      setTranslatedText('')
      setTldr('')
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setTranslateLoading(true)
      setTranslateError('')
      try {
        const result = await translateText(
          sourceText,
          settings.targetLanguage,
          settings.deeplApiKey,
          settings.sourceLanguage,
        )
        setTranslatedText(result.translatedText)

        if (settings.geminiApiKey) {
          const tldrResult = await generateTldr(sourceText, result.translatedText, settings.geminiApiKey)
          setTldr(tldrResult.content)
        }
      } catch (err) {
        setTranslateError((err as Error).message)
      } finally {
        setTranslateLoading(false)
      }
    }, 800)
  }, [sourceText, settings])

  // --- Polish Handler ---
  const handlePolish = async () => {
    if (!draftText.trim() || !settings.geminiApiKey) return
    setPolishLoading(true)
    setPolishError('')
    try {
      const result = await polishReply(
        draftText,
        sourceText,
        settings.sourceLanguage,
        settings.geminiApiKey,
      )
      if (result.error) setPolishError(result.error)
      else setPolishedText(result.content)
    } catch (err) {
      setPolishError((err as Error).message)
    } finally {
      setPolishLoading(false)
    }
  }

  // --- Back Translate Handler ---
  const handleBackTranslate = async () => {
    if (!polishedText.trim() || !settings.deeplApiKey) return
    setBackTranslateLoading(true)
    setBackTranslateError('')
    try {
      const result = await translateText(
        polishedText,
        settings.targetLanguage,
        settings.deeplApiKey,
      )
      setBackTranslation(result.translatedText)
    } catch (err) {
      setBackTranslateError((err as Error).message)
    } finally {
      setBackTranslateLoading(false)
    }
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <span className="text-gray-500 text-sm animate-pulse">Loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌐</span>
          <span className="text-white font-bold text-sm">AI Translator</span>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="text-gray-400 hover:text-white transition-colors text-lg"
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* No API Keys Warning */}
      {(!settings.deeplApiKey || !settings.geminiApiKey) && (
        <div
          onClick={() => setShowSettings(true)}
          className="mx-4 mt-3 bg-amber-950/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-400 text-xs cursor-pointer hover:bg-amber-900/50 transition-colors"
        >
          ⚠️ Click to add your API keys in Settings
        </div>
      )}

      {/* Cards */}
      <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
        <Card1_Input
          value={sourceText}
          onChange={setSourceText}
        />
        <Card2_Translation
          translatedText={translatedText}
          tldr={tldr}
          isLoading={translateLoading}
          error={translateError}
        />
        <Card3_Draft
          value={draftText}
          onChange={setDraftText}
          onPolish={handlePolish}
          isLoading={polishLoading}
        />
        <Card4_Polish
          polishedText={polishedText}
          isLoading={polishLoading}
          error={polishError}
        />
        <Card5_BackTranslation
          polishedText={polishedText}
          onBackTranslate={handleBackTranslate}
          backTranslation={backTranslation}
          isLoading={backTranslateLoading}
          error={backTranslateError}
        />
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={(newSettings) => {
            saveSettings(newSettings)
            setShowSettings(false)
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

    </div>
  )
}