import { useState, useEffect, useRef } from 'react'
import styles from './HoldTimer.module.css'

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

const C = 628.318

export default function HoldTimer({ holdSecs, reps, onRepComplete }) {
  const [timeLeft,     setTimeLeft]     = useState(holdSecs)
  const [paused,       setPaused]       = useState(false)
  const [repComplete,  setRepComplete]  = useState(false)
  const [repsDone,     setRepsDone]     = useState(0)
  const intervalRef = useRef(null)

  // Reset when stretch changes
  useEffect(() => {
    setTimeLeft(holdSecs)
    setPaused(false)
    setRepComplete(false)
    setRepsDone(0)
  }, [holdSecs, reps])

  useEffect(() => {
    if (paused || repComplete) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          playCue()
          setRepComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [paused, repComplete])

  const handleNext = () => {
    const next = repsDone + 1
    if (next >= reps) {
      onRepComplete()
    } else {
      setRepsDone(next)
      setTimeLeft(holdSecs)
      setRepComplete(false)
    }
  }

  const offset = holdSecs > 0 ? C * (1 - timeLeft / holdSecs) : 0

  return (
    <div className={styles.wrap}>
      <div className={styles.ringWrap}>
        <svg className={styles.ringSvg} viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="9"/>
          <circle cx="110" cy="110" r="100" fill="none" stroke="var(--accent)" strokeWidth="9"
            strokeLinecap="round" strokeDasharray="628.318" strokeDashoffset={offset}
            style={{ transition: repComplete ? 'none' : 'stroke-dashoffset 1s linear' }}/>
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.ringNum}>{repComplete ? '✓' : timeLeft}</div>
          <div className={styles.ringSub}>{repComplete ? 'hold complete' : 'seconds'}</div>
        </div>
      </div>

      {reps > 1 && (
        <div className={styles.repInfo}>Rep {repsDone + 1} of {reps}</div>
      )}

      {!repComplete ? (
        <button className={styles.pauseBtn} onClick={() => setPaused(p => !p)}>
          {paused
            ? <><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume</>
            : <><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg> Pause</>
          }
        </button>
      ) : (
        <button className={styles.nextBtn} onClick={handleNext}>
          {repsDone + 1 >= reps ? 'Next stretch →' : `Next rep (${repsDone + 2}/${reps})`}
        </button>
      )}
    </div>
  )
}
