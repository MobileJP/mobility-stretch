import { useState, useCallback, useRef } from 'react'

const supported = typeof window !== 'undefined' && 'Notification' in window

export function useNotifications(enabled) {
  const [permission, setPermission] = useState(supported ? Notification.permission : 'unsupported')
  const timerRef = useRef(null)

  const requestPermission = useCallback(async () => {
    if (!supported) return 'unsupported'
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const schedule = useCallback((workMinutes) => {
    if (!enabled || !supported || Notification.permission !== 'granted') return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      new Notification('Time to surface', {
        body: `Your ${workMinutes}-minute focus block is done. Time to move.`,
        icon: '/icons/apple-touch-icon.png',
      })
      timerRef.current = null
    }, workMinutes * 60 * 1000)
  }, [enabled])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return { permission, requestPermission, schedule, cancel }
}
