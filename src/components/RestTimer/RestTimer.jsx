import { useState, useEffect, useRef } from 'react'
import styles from './RestTimer.module.css'

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
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.08)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
    o.start(t); o.stop(t + 1.2)
  } catch (e) {}
}

const C = 628.318

export default function RestTimer({ rest_secs, nextLabel, onComplete, onSkip }) {
  const [timeLeft, setTimeLeft] = useState(rest_secs)
  const doneRef = useRef(false)

  useEffect(() => {
    doneRef.current = false
    setTimeLeft(rest_secs)
  }, [rest_secs])

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!doneRef.current) { doneRef.current = true; playCue(); onComplete() }
      return
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, onComplete])

  const progress  = rest_secs > 0 ? timeLeft / rest_secs : 0
  const offset    = C * (1 - progress)

  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Rest</div>
      <div className={styles.ringWrap}>
        <svg className={styles.ringSvg} viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="9"/>
          <circle cx="110" cy="110" r="100" fill="none" stroke="var(--accent)" strokeWidth="9"
            strokeLinecap="round" strokeDasharray="628.318" strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}/>
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.ringNum}>{timeLeft}</div>
          <div className={styles.ringSub}>seconds</div>
        </div>
      </div>
      {nextLabel && <div className={styles.nextLabel}>Up next: {nextLabel}</div>}
      <button className={styles.skipBtn} onClick={onSkip}>Skip rest →</button>
    </div>
  )
}
