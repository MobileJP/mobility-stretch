import { useState } from 'react'
import { saveStrengthSession, saveStrengthExercise } from '../../firebase/db'
import styles from './StrengthSummary.module.css'

function fmt(sec) {
  sec = sec | 0
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0')
}

export default function StrengthSummary({ sessionData, userId, onDone }) {
  const [effortRating, setEffortRating] = useState(null)
  const [notes,        setNotes]        = useState('')
  const [saveState,    setSaveState]    = useState('idle')
  const [saveError,    setSaveError]    = useState('')

  if (!sessionData) return null

  const { zoneName, difficulty, setsCompleted, setsTotal, durationSecs, completedExerciseIds, skippedExerciseIds, setCompletions } = sessionData
  const totalExercises   = sessionData.exercises?.length ?? 0
  const completedCount   = completedExerciseIds?.length ?? 0

  const handleSave = async () => {
    setSaveState('saving')
    try {
      const payload = {
        user_id:              userId,
        zone_name:            zoneName,
        difficulty_level:     difficulty,
        exercises_completed:  completedExerciseIds,
        exercises_skipped:    skippedExerciseIds,
        sets_completed:       setsCompleted,
        sets_total:           setsTotal,
        duration_secs:        durationSecs,
        effort_rating:        effortRating ?? null,
        notes:                notes ?? '',
      }
      const sessionId = await saveStrengthSession(userId, payload)
      await Promise.all((setCompletions || []).map(ex =>
        saveStrengthExercise(userId, sessionId, {
          exercise_id:    ex.exerciseId,
          exercise_name:  ex.exerciseName,
          zone:           ex.zone,
          difficulty_level: difficulty,
          equipment:      ex.equipment,
          sets_completed: ex.setsCompleted,
          sets_total:     ex.setsTotal,
          completed:      ex.completed,
        })
      ))
      setSaveState('saved')
    } catch (e) {
      setSaveError(e.message || 'Save failed')
      setSaveState('error')
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.checkIcon}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
            <circle cx="27" cy="27" r="25" fill="var(--accentSoft)"/>
            <path d="M18 27.5 24 33.5 37 20" stroke="var(--accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.title}>Strong work</h2>
        <p className={styles.sub}>{zoneName} · <span className={styles.diffBadge}>{difficulty}</span></p>

        <div className={styles.statTiles}>
          <div className={styles.statTile}>
            <div className={styles.statVal}>{fmt(durationSecs)}</div>
            <div className={styles.statLabel}>Duration</div>
          </div>
          <div className={styles.statTile}>
            <div className={styles.statVal}>{setsCompleted}<span className={styles.statOf}>/{setsTotal}</span></div>
            <div className={styles.statLabel}>Sets done</div>
          </div>
          <div className={styles.statTile}>
            <div className={styles.statVal}>{completedCount}<span className={styles.statOf}>/{totalExercises}</span></div>
            <div className={styles.statLabel}>Exercises</div>
          </div>
        </div>

        <div className={styles.effortSection}>
          <div className={styles.effortLabel}>How did it feel?</div>
          <div className={styles.effortRow}>
            {[['1','Easy'], ['2','Good'], ['3','Hard']].map(([v, label]) => (
              <button key={v}
                className={`${styles.effortBtn} ${effortRating === Number(v) ? styles.effortActive : ''}`}
                onClick={() => setEffortRating(Number(v))}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <textarea className={styles.notes} placeholder="Any notes? (optional)"
          value={notes} onChange={e => setNotes(e.target.value)} rows={2}/>

        <div className={styles.actions}>
          <button className={styles.btnGhost} onClick={onDone}>Done</button>
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
