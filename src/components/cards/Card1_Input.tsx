interface Props {
  value: string
  onChange: (text: string) => void
}

export default function Card1_Input({ value, onChange }: Props) {

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch {
      alert('Clipboard access denied. Please paste manually.')
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
          <span className="text-white font-semibold text-sm">Source Message</span>
        </div>
        <button
          onClick={handlePaste}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
        >
          📋 Paste
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste Japanese message here..."
        rows={4}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500 transition-colors"
      />

      {/* Character count */}
      {value.length > 0 && (
        <p className="text-gray-600 text-xs mt-1 text-right">
          {value.length} chars
        </p>
      )}
    </div>
  )
}