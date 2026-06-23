import HoldTimer from '../HoldTimer/HoldTimer'
import styles from './StrengthExerciseCard.module.css'
import { getEquipmentLabel } from '../../utils/strengthBuilder'
import { ZONE_COLORS } from '../../data/stretchLibrary'

export default function StrengthExerciseCard({ exercise, currentSet, totalSets, onSetComplete }) {
  const color = ZONE_COLORS[exercise.zoneId] || 'var(--accent)'
  const isHold = exercise.hold_secs > 0

  return (
    <div className={styles.card}>
      <div className={styles.badges}>
        <span className={styles.zoneBadge} style={{ color }}>{exercise.zoneName}</span>
        <span className={styles.equipBadge}>{getEquipmentLabel(exercise.equipment)}</span>
      </div>

      <h2 className={styles.name}>{exercise.name}</h2>
      <p className={styles.target}>{exercise.target}</p>

      <p className={styles.why}>{exercise.why_it_matters}</p>

      <div className={styles.prescription}>
        <div className={styles.prescItem}>
          <span className={styles.prescVal}>{currentSet}<span className={styles.prescOf}>/{totalSets}</span></span>
          <span className={styles.prescLabel}>Set</span>
        </div>
        <div className={styles.divider}/>
        <div className={styles.prescItem}>
          <span className={styles.prescVal}>{exercise.reps}</span>
          <span className={styles.prescLabel}>Reps</span>
        </div>
        <div className={styles.divider}/>
        <div className={styles.prescItem}>
          <span className={styles.prescVal}>{exercise.rest_secs}s</span>
          <span className={styles.prescLabel}>Rest</span>
        </div>
        <div className={styles.divider}/>
        <div className={styles.prescItem}>
          <span className={styles.prescValSm}>{exercise.load}</span>
          <span className={styles.prescLabel}>Load</span>
        </div>
      </div>

      <p className={styles.instruction}>{exercise.instruction}</p>

      {isHold ? (
        <HoldTimer
          key={`${exercise.id}-set${currentSet}`}
          holdSecs={exercise.hold_secs}
          reps={exercise.reps}
          onRepComplete={onSetComplete}
        />
      ) : (
        <button className={styles.doneBtn} onClick={onSetComplete}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Set complete
        </button>
      )}

      {exercise.notes && <div className={styles.notes}>{exercise.notes}</div>}
    </div>
  )
}
