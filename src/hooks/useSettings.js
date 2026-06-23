import { useState, useEffect } from 'react'
import { getSettings, saveSettings } from '../firebase/db'
import { LEGACY_ID_MAP } from '../data/stretchLibrary'

const CACHE_KEY = 'tide_settings_cache'

const DEFAULTS = {
  workMinutes:           60,
  defaultRoutine:        'ask',
  default_difficulty:    'immediate',
  notifications_enabled: true,
}

function fromCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function toCache(s) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(s))
}

export function useSettings(uid) {
  const [settings, setSettings] = useState({ ...DEFAULTS, ...fromCache() })
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!uid) return
    getSettings(uid)
      .then(data => {
        if (data) {
          const merged = {
            ...DEFAULTS,
            ...data,
            // migrate legacy zone IDs stored in old V2 sessions
            defaultRoutine: LEGACY_ID_MAP[data.defaultRoutine] || data.defaultRoutine || DEFAULTS.defaultRoutine,
          }
          setSettings(merged)
          toCache(merged)
        }
      })
      .catch(e => console.warn('Settings load:', e.message))
      .finally(() => setLoading(false))
  }, [uid])

  const updateSettings = (patch) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    toCache(next)
    if (uid) saveSettings(uid, next).catch(e => console.warn('Settings save:', e.message))
  }

  return { settings, updateSettings, loading }
}
