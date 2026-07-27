import { useState } from 'react'

interface Props {
  polishedText: string
  isLoading: boolean
  error?: string
}

export default function Card4_Polish({ polishedText, isLoading, error }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(polishedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 border border-amber-900/50 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">4</span>
          <span className="text-white font-semibold text-sm">Polished Reply</span>
        </div>
        {polishedText && (
          <button
            onClick={handleCopy}
            className="text-xs bg-amber-900/50 hover:bg-amber-800 text-amber-300 hover:text-white px-3 py-1 rounded-lg transition-colors"
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded-lg px-3 py-2 text-red-400 text-xs mb-3">
          ⚠️ {error}
        </div>
      )}

      {/* Output */}
      {isLoading ? (
        <div className="bg-gray-800 rounded-xl px-3 py-4 text-center">
          <span className="text-amber-400 text-sm animate-pulse">🤖 Generating professional reply...</span>
        </div>
      ) : polishedText ? (
        <div className="bg-amber-950/30 border border-amber-900/30 rounded-xl px-3 py-2.5 text-white text-sm leading-relaxed whitespace-pre-wrap">
          {polishedText}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl px-3 py-2.5 text-gray-600 text-sm">
          Polished reply will appear here...
        </div>
      )}

    </div>
  )
}