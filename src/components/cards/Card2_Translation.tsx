interface Props {
  translatedText: string
  tldr: string
  isLoading: boolean
  error?: string
}

export default function Card2_Translation({ translatedText, tldr, isLoading, error }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-purple-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
        <span className="text-white font-semibold text-sm">Translation & Summary</span>
        {isLoading && (
          <span className="ml-auto text-xs text-purple-400 animate-pulse">Translating...</span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded-lg px-3 py-2 text-red-400 text-xs mb-3">
          ⚠️ {error}
        </div>
      )}

      {/* Translation */}
      {translatedText ? (
        <div className="bg-gray-800 rounded-xl px-3 py-2.5 text-white text-sm mb-3 leading-relaxed">
          {translatedText}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl px-3 py-2.5 text-gray-600 text-sm mb-3">
          Translation will appear here...
        </div>
      )}

      {/* TL;DR */}
      {tldr && (
        <div className="bg-purple-950 border border-purple-800 rounded-xl px-3 py-2 text-purple-300 text-xs">
          💡 {tldr}
        </div>
      )}
    </div>
  )
}