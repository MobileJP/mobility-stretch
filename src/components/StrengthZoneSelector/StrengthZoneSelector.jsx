import { useState, useMemo } from 'react'
import styles from './StrengthZoneSelector.module.css'
import { STRENGTH_LIBRARY } from '../../data/strengthLibrary'
import { buildStrengthZoneSession, buildFullBodyStrengthSession, getZoneEquipment, getProgressionSuggestion } from '../../utils/strengthBuilder'
import { ZONE_COLORS } from '../../data/stretchLibrary'

const DIFFICULTIES = ['basic', 'immediate', 'advanced']

export default function StrengthZoneSelector({ sessionDifficulty, setSessionDifficulty, strengthSessions, onStartSession, onGoMobility }) {
  const [nudgeDismissed, setNudgeDismissed] = useState(false)

  const nudge = useMemo(
    () => getProgressionSuggestion(strengthSessions || [], sessionDifficulty),
    [strengthSessions, sessionDifficulty]
  )

  const startZone = (zoneId) => {
    const exercises = buildStrengthZoneSession(zoneId, sessionDifficulty)
    const zone = STRENGTH_LIBRARY.zones.find(z => z.id === zoneId)
    onStartSession(exercises, sessionDifficulty, zone.name)
  }

  const startFullBody = () => {
    const exercises = buildFullBodyStrengthSession(sessionDifficulty)
    onStartSession(exercises, sessionDifficulty, 'Full Body')
  }

  const acceptNudge = () => {
    setSessionDifficulty(nudge.nextDifficulty)
    setNudgeDismissed(true)
  }

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onGoMobility}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Mobility
        </button>
        <h1 className={styles.title}>Strength</h1>
        <div style={{ width: 80 }}/>
      </div>

      <div className={styles.main}>

        {/* PROGRESSION NUDGE */}
        {nudge.shouldSuggest && !nudgeDismissed && (
          <div className={styles.nudgeBanner}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span className={styles.nudgeMsg}>{nudge.message}</span>
            <button className={styles.nudgeAccept} onClick={acceptNudge}>Try it</button>
            <button className={styles.nudgeDismiss} onClick={() => setNudgeDismissed(true)} aria-label="Dismiss">×</button>
          </div>
        )}

        <div className={styles.diffSection}>
          <div className={styles.diffLabel}>Session intensity</div>
          <div className={styles.diffRow}>
            {DIFFICULTIES.map(d => (
              <button key={d}
                className={`${styles.pill} ${sessionDifficulty === d ? styles.pillActive : styles.pillInactive}`}
                onClick={() => setSessionDifficulty(d)}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.fullBodyTile} onClick={startFullBody}>
          <div className={styles.fullBodyIcon}>🏋️</div>
          <div>
            <div className={styles.fullBodyTitle}>Full Body</div>
            <div className={styles.fullBodySub}>One exercise per zone · {STRENGTH_LIBRARY.zones.length} exercises</div>
          </div>
        </button>

        <div className={styles.zoneGrid}>
          {STRENGTH_LIBRARY.zones.map(zone => {
            const color   = ZONE_COLORS[zone.id] || 'var(--accent)'
            const equip   = getZoneEquipment(zone.id)
            const exCount = zone.exercises.length
            return (
              <button key={zone.id} className={styles.zoneCard} onClick={() => startZone(zone.id)}>
                <div className={styles.zoneTop}>
                  <span className={styles.zoneName} style={{ color }}>{zone.name}</span>
                </div>
                <p className={styles.zoneGoal}>{zone.strength_goal}</p>
                <div className={styles.zoneFoot}>
                  <span className={styles.zoneMeta}>{exCount} exercises</span>
                  <span className={styles.zoneEquip}>{equip.join(' · ')}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
