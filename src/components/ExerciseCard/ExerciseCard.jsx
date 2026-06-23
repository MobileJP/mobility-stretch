import { useState } from 'react'
import HoldTimer from '../HoldTimer/HoldTimer'
import styles from './ExerciseCard.module.css'
import { ZONE_COLORS } from '../../data/stretchLibrary'

export default function ExerciseCard({ stretch, stepLabel, onComplete }) {
  const [repsDone, setRepsDone] = useState(0)
  const isMovement = stretch.hold_secs === 0

  const handleMovementRep = () => {
    const next = repsDone + 1
    if (next >= stretch.reps) {
      onComplete()
    } else {
      setRepsDone(next)
    }
  }

  const color = ZONE_COLORS[stretch.zoneId] || 'var(--accent)'

  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{stretch.name}</h2>
      <p className={styles.target}>{stretch.target}</p>

      {isMovement ? (
        <div className={styles.movementSection}>
          <div className={styles.movementIcon}>🔄</div>
          <div className={styles.repCounter}>
            Rep {repsDone + 1} of {stretch.reps}
          </div>
        </div>
      ) : (
        <HoldTimer
          key={`${stretch.id}`}
          holdSecs={stretch.hold_secs}
          reps={stretch.reps}
          onRepComplete={onComplete}
        />
      )}

      <p className={styles.instruction}>{stretch.instruction}</p>

      {stretch.notes && (
        <div className={styles.notes}>{stretch.notes}</div>
      )}

      {isMovement && (
        <div className={styles.movementControls}>
          <button className={styles.repDoneBtn} onClick={handleMovementRep}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Rep done
          </button>
        </div>
      )}
    </div>
  )
}
