import { useState, useRef } from 'react'
import ExerciseCard from '../ExerciseCard/ExerciseCard'
import styles from './RoutinePlayer.module.css'
import { ZONE_COLORS } from '../../data/stretchLibrary'

function fmtDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}

export default function RoutinePlayer({ routine, userId, onComplete, onGoHome }) {
  const { list, zoneId, mode, difficulty } = routine
  const [idx, setIdx]     = useState(0)
  const startTime         = useRef(Date.now())

  const current   = list[idx]
  const zoneName  = mode === 'full_body' ? 'Full Body'
                  : mode === 'quick'     ? 'Quick stretch'
                  : current?.zoneId
                    ? (list.find(s => s.zoneId === current.zoneId) ? current.zoneId.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : 'Routine')
                    : 'Routine'

  const color = ZONE_COLORS[zoneId || current?.zoneId] || 'var(--accent)'

  const advance = (completed = true) => {
    if (idx + 1 >= list.length) {
      finishSession(completed)
    } else {
      setIdx(i => i + 1)
    }
  }

  const finishSession = (completed = true) => {
    const secs = Math.round((Date.now() - startTime.current) / 1000)
    const today = fmtDate(new Date())
    const displayZone = mode === 'full_body' ? 'Full Body'
                      : list[0]?.zoneId?.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) || 'Mixed'
    onComplete({
      date:                today,
      zone:                displayZone,
      zoneId:              zoneId || list[0]?.zoneId || 'mixed',
      seconds:             secs,
      steps:               idx + (completed ? 1 : 0),
      difficulty_level:    difficulty,
      exercises_completed: list.slice(0, idx + (completed ? 1 : 0)).map(s => s.id),
      exerciseDetails:     list.slice(0, idx + (completed ? 1 : 0)).map((s, i) => ({
        exercise_id:        s.id,
        stretch_name:       s.name,
        zone:               s.zoneId,
        difficulty_level:   difficulty,
        hold_duration_secs: s.hold_secs,
        completed:          true,
        sequence_position:  i,
      })),
    })
  }

  // Dots
  const dots = list.map((_, i) => (
    <span key={i} className={`${styles.dot} ${i < idx ? styles.dotDone : i === idx ? styles.dotActive : styles.dotPending}`}/>
  ))

  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.zonePill} style={{ color }}>
            {mode === 'full_body' ? '🌊 Full Body' : mode === 'quick' ? '⚡ Quick' : zoneName}
          </span>
          <span className={styles.stepLabel}>{idx + 1} of {list.length}</span>
        </div>
        <button className={styles.btnEnd} onClick={() => finishSession(false)}>End session</button>
      </div>

      <div className={styles.card}>
        <ExerciseCard
          key={idx}
          stretch={current}
          stepLabel={`${idx + 1} of ${list.length}`}
          onComplete={() => advance(true)}
        />

        <div className={styles.dotRow}>{dots}</div>

        <div className={styles.navRow}>
          <button className={styles.btnCircle} onClick={() => setIdx(i => Math.max(0, i - 1))} aria-label="Previous">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className={styles.btnCircle} onClick={() => advance(false)} aria-label="Skip">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
