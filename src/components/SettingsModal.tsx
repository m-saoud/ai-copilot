import { useState } from 'react'
import type { UserSettings } from '../types'

interface Props {
  settings: UserSettings
  onSave: (settings: UserSettings) => void
  onClose: () => void
}

export default function SettingsModal({ settings, onSave, onClose }: Props) {
  const [form, setForm] = useState<UserSettings>(settings)
  const [saved, setSaved] = useState(false)

  const handleChange = (field: keyof UserSettings, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm p-5 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* DeepL API Key */}
        <div className="mb-4">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            DeepL API Key (Free)
          </label>
          <input
            type="password"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx"
            value={form.deeplApiKey}
            onChange={e => handleChange('deeplApiKey', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-gray-600 text-xs mt-1">Must end with <code className="text-blue-400">:fx</code></p>
        </div>

        {/* Gemini API Key */}
        <div className="mb-4">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Gemini API Key (Free)
          </label>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={form.geminiApiKey}
            onChange={e => handleChange('geminiApiKey', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-gray-600 text-xs mt-1">
            Get free key from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-blue-400 underline">Google AI Studio</a>
          </p>
        </div>

        {/* Language Selectors */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Source Lang
            </label>
            <select
              value={form.sourceLanguage}
              onChange={e => handleChange('sourceLanguage', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="JA">🇯🇵 Japanese</option>
              <option value="AR">🇸🇦 Arabic</option>
              <option value="EN">🇬🇧 English</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Target Lang
            </label>
            <select
              value={form.targetLanguage}
              onChange={e => handleChange('targetLanguage', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="EN">🇬🇧 English</option>
              <option value="AR">🇸🇦 Arabic</option>
              <option value="JA">🇯🇵 Japanese</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          {saved ? '✅ Saved!' : 'Save Settings'}
        </button>

      </div>
    </div>
  )
}