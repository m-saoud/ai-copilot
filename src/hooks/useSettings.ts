import { useState, useEffect } from 'react'
import type { UserSettings } from '../types'

const DEFAULT_SETTINGS: UserSettings = {
  deeplApiKey: '',
  geminiApiKey: '',
  sourceLanguage: 'JA',
  targetLanguage: 'EN',
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    chrome.storage.local.get('userSettings', (result) => {
      if (result && result.userSettings) {
        setSettings(result.userSettings as UserSettings)
      }
      setLoaded(true)
    })
  }, [])

  const saveSettings = (newSettings: UserSettings) => {
    chrome.storage.local.set({ userSettings: newSettings })
    setSettings(newSettings)
  }

  return { settings, saveSettings, loaded }
}