import { useState } from 'react'

interface Props {
  polishedText: string
  onBackTranslate: () => void
  backTranslation: string
  isLoading: boolean
  error?: string
}

export default function Card5_BackTranslation({
  polishedText,
  onBackTranslate,
  backTranslation,
  isLoading,
  error,
}: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(backTranslation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 border border-teal-900/50 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-teal-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">5</span>
          <span className="text-white font-semibold text-sm">Back-Translation Check</span>
        </div>
        {backTranslation && (
          <button
            onClick={handleCopy}
            className="text-xs bg-teal-900/50 hover:bg-teal-800 text-teal-300 hover:text-white px-3 py-1 rounded-lg transition-colors"
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        )}
      </div>

      {/* Back-Translate Button */}
      <button
        onClick={onBackTranslate}
        disabled={!polishedText.trim() || isLoading}
        className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-2 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 mb-3"
      >
        {isLoading
          ? <><span className="animate-spin">⏳</span> Translating back...</>
          : '🔍 Back-Translate to My Language'
        }
      </button>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded-lg px-3 py-2 text-red-400 text-xs mb-3">
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {backTranslation ? (
        <div className="bg-teal-950/30 border border-teal-900/30 rounded-xl px-3 py-2.5 text-white text-sm leading-relaxed whitespace-pre-wrap">
          {backTranslation}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl px-3 py-2.5 text-gray-600 text-sm">
          Back-translation will appear here...
        </div>
      )}

    </div>
  )
}