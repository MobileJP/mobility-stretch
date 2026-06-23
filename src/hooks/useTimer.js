import { useState, useEffect, useRef, useCallback } from 'react'

let _actx = null
function playCue() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    if (!_actx) _actx = new Ctx()
    const o = _actx.createOscillator(), g = _actx.createGain()
    o.type = 'sine'; o.frequency.value = 528
    o.connect(g); g.connect(_actx.destination)
    const t = _actx.currentTime
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.1, t + 0.06)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
    o.start(t); o.stop(t + 0.95)
  } catch (e) {}
}

function fireNotification() {
  try {
    if (window.Notification && Notification.permission === 'granted') {
      new Notification('Time to surface 🌊', { body: 'A short mobility break is ready when you are.' })
    }
  } catch (e) {}
}

export function useTimer(workMinutes, onBreakTime) {
  const totalSecs = workMinutes * 60
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isRunning,     setIsRunning]     = useState(false)
  const [snoozeCount,   setSnoozeCount]   = useState(0)
  const intervalRef = useRef(null)
  const onBreakRef  = useRef(onBreakTime)
  onBreakRef.current = onBreakTime

  const clear = () => { clearInterval(intervalRef.current); intervalRef.current = null }

  const startTimer = useCallback(() => {
    if (window.Notification && Notification.permission === 'default') Notification.requestPermission()
    setTimeRemaining(totalSecs)
    setIsRunning(true)
    setSnoozeCount(0)
  }, [totalSecs])

  const pauseTimer  = useCallback(() => setIsRunning(false), [])
  const resumeTimer = useCallback(() => setIsRunning(true), [])
  const resetTimer  = useCallback(() => { setIsRunning(false); setTimeRemaining(0); setSnoozeCount(0) }, [])

  const snoozeTimer = useCallback(() => {
    setSnoozeCount(c => c + 1)
    setTimeRemaining(5 * 60)
    setIsRunning(true)
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clear()
            setIsRunning(false)
            playCue()
            fireNotification()
            onBreakRef.current?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clear()
    }
    return clear
  }, [isRunning])

  return { timeRemaining, isRunning, totalSecs, startTimer, pauseTimer, resumeTimer, resetTimer, snoozeTimer, snoozeCount }
}
