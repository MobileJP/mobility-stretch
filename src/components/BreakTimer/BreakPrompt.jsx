import styles from './BreakPrompt.module.css'
import { buildQuickRoutine, buildSurpriseRoutine } from '../../utils/routineBuilder'

export default function BreakPrompt({ sessionDifficulty, timer, onStartRoutine, onGoHome }) {
  const { snoozeTimer } = timer

  const startRoutine = () => {
    const r = buildSurpriseRoutine(sessionDifficulty)
    onStartRoutine(r, r[0]?.zoneId, 'break')
  }

  const startQuick = () => {
    const r = buildQuickRoutine(sessionDifficulty)
    onStartRoutine(r, r[0]?.zoneId, 'quick')
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.icon} style={{ animation: 'tideBreathe 3.4s ease-in-out infinite' }}>
          <svg width="58" height="58" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="4.5" fill="var(--accent)"/>
            <circle cx="16" cy="16" r="9.5" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="2.2"/>
            <circle cx="16" cy="16" r="14.5" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="2.2"/>
          </svg>
        </div>
        <h2 className={styles.title}>Time to surface</h2>
        <p className={styles.sub}>You've been focused for a while. A minute or two of movement now keeps the strain from building.</p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={startRoutine}>Start a routine</button>
          <div className={styles.row}>
            <button className={styles.btnGhost} onClick={startQuick}>Quick stretch</button>
            <button className={styles.btnGhostMuted} onClick={snoozeTimer}>Snooze 5 min</button>
          </div>
          <button className={styles.btnLink} onClick={onGoHome}>I'll choose myself</button>
        </div>
      </div>
    </div>
  )
}
