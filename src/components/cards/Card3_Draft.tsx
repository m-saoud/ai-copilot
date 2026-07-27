interface Props {
  value: string
  onChange: (text: string) => void
  onPolish: () => void
  isLoading: boolean
}

export default function Card3_Draft({ value, onChange, onPolish, isLoading }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
        <span className="text-white font-semibold text-sm">Your Draft Reply</span>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write your casual reply here in English or Arabic..."
        rows={3}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-green-500 transition-colors mb-3"
      />

      {/* Polish Button */}
      <button
        onClick={onPolish}
        disabled={!value.trim() || isLoading}
        className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {isLoading
          ? <><span className="animate-spin">⏳</span> Polishing...</>
          : '✨ Polish & Translate'
        }
      </button>

    </div>
  )
}