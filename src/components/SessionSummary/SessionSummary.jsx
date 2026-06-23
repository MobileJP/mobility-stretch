import { useState } from 'react'
import { saveSession, saveExercise, updateStreak } from '../../firebase/db'
import styles from './SessionSummary.module.css'

function fmt(sec) {
  sec = sec | 0
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0')
}

function getWeekDots(sessions) {
  const dots = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
    dots.push({ key, active: sessions.some(s => s.date === key) })
  }
  return dots
}

function getWeekCount(sessions) {
  const now = Date.now()
  return sessions.filter(s => (now - new Date(s.date + 'T00:00:00').getTime()) / 86400000 < 7).length
}

export default function SessionSummary({ sessionData, userId, sessions, onDone, onAnotherRoutine }) {
  const [effortRating, setEffortRating] = useState(null)
  const [notes,        setNotes]        = useState('')
  const [saveState,    setSaveState]    = useState('idle') // idle | saving | saved | error
  const [saveError,    setSaveError]    = useState('')

  const wc   = getWeekCount([sessionData, ...(sessions || [])])
  const dots = getWeekDots([sessionData, ...(sessions || [])])

  const handleSave = async () => {
    setSaveState('saving')
    try {
      const payload = { ...sessionData, effort_rating: effortRating, notes }
      const sessionId = await saveSession(userId, payload)
      await Promise.all((sessionData.exerciseDetails || []).map(ex => saveExercise(userId, sessionId, ex)))
      setSaveState('saved')
      // Streak is non-critical — don't let it fail the save
      updateStreak(userId, sessionData.date, wc).catch(e => console.warn('Streak update:', e.message))
    } catch (e) {
      setSaveError(e.message || 'Save failed')
      setSaveState('error')
    }
  }

  if (!sessionData) return null

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.checkIcon}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
            <circle cx="27" cy="27" r="25" fill="var(--accentSoft)"/>
            <path d="M18 27.5 24 33.5 37 20" stroke="var(--accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.title}>Beautifully done</h2>
        <p className={styles.sub}>That's exactly the kind of small reset that adds up. Your body thanks you.</p>

        <div className={styles.statTiles}>
          <div className={styles.statTile}>
            <div className={styles.statVal}>{fmt(sessionData.seconds)}</div>
            <div className={styles.statLabel}>Time moved</div>
          </div>
          <div className={styles.statTile}>
            <div className={styles.statVal}>{sessionData.steps}</div>
            <div className={styles.statLabel}>Stretches</div>
          </div>
          <div className={`${styles.statTile} ${styles.statTileWide}`}>
            <div className={styles.statValSm}>{sessionData.zone}</div>
            <div className={styles.statLabel} style={{ marginTop: 6 }}>Zone</div>
          </div>
        </div>

        <div className={styles.weekSection}>
          <div className={styles.weekLabel}>This week · <span>{wc}</span> routines</div>
          <div className={styles.weekDots}>
            {dots.map(d => <div key={d.key} className={`${styles.weekDot} ${d.active ? styles.weekDotActive : ''}`}/>)}
          </div>
        </div>

        {/* Effort rating */}
        <div className={styles.effortSection}>
          <div className={styles.effortLabel}>How did it feel?</div>
          <div className={styles.effortRow}>
            {[['1','Easy'], ['2','Good'], ['3','Tough']].map(([v, label]) => (
              <button key={v}
                className={`${styles.effortBtn} ${effortRating === Number(v) ? styles.effortActive : ''}`}
                onClick={() => setEffortRating(Number(v))}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <textarea className={styles.notes} placeholder="Any notes? (optional)"
          value={notes} onChange={e => setNotes(e.target.value)} rows={2}/>

        <div className={styles.actions}>
          <button className={styles.btnGhost} onClick={onDone}>Done</button>
          <button className={styles.btnPrimary} onClick={onAnotherRoutine}>Another routine</button>
        </div>

        {saveState === 'idle' && (
          <button className={styles.saveBtn} onClick={handleSave}>Save session</button>
        )}
        {saveState === 'saving' && <div className={styles.saveStatus}>Saving…</div>}
        {saveState === 'saved'  && <div className={`${styles.saveStatus} ${styles.saved}`}>✓ Saved</div>}
        {saveState === 'error'  && <div className={`${styles.saveStatus} ${styles.saveErr}`}>{saveError}</div>}
      </div>
    </div>
  )
}
