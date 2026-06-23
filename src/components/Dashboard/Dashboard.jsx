import { useState, useMemo } from 'react'
import styles from './Dashboard.module.css'
import { STRETCH_LIBRARY, ZONE_COLORS } from '../../data/stretchLibrary'
import { buildZoneRoutine, buildFullBodyRoutine, buildSurpriseRoutine, buildQuickRoutine } from '../../utils/routineBuilder'
import { getProgressionSuggestion } from '../../utils/strengthBuilder'
import { normalizeSessions, getStreakInfo } from '../../utils/analytics'

function fmt(sec) {
  sec = Math.max(0, sec | 0)
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0')
}

function todayStr() {
  const d = new Date()
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}

function getWeekCount(sessions) {
  const now = Date.now()
  return sessions.filter(s => (now - new Date(s.date + 'T00:00:00').getTime()) / 86400000 < 7).length
}

function getStrengthWeekCount(strengthSessions) {
  const now = Date.now()
  return (strengthSessions || []).filter(s => {
    const ts = s.completed_at?.seconds ? s.completed_at.seconds * 1000 : new Date((s.date || '') + 'T00:00:00').getTime()
    return (now - ts) / 86400000 < 7
  }).length
}

export default function Dashboard({ user, settings, updateSettings, sessions, strengthSessions, timer, sessionDifficulty, setSessionDifficulty, onStartRoutine, onGoStrength, onGoHistory, onOpenSettings, onSignOut }) {
  const { timeRemaining, isRunning, totalSecs, startTimer, pauseTimer, resumeTimer, resetTimer } = timer
  const idle   = !isRunning && timeRemaining === 0
  const paused = !isRunning && timeRemaining > 0
  const C = 628.318
  const focusOffset = totalSecs > 0 ? C * (1 - timeRemaining / totalSecs) : 0
  const wc = getWeekCount(sessions)

  const [mobNudgeDismissed, setMobNudgeDismissed]  = useState(false)
  const [strNudgeDismissed, setStrNudgeDismissed]  = useState(false)

  // ── Today indicators ───────────────────────────
  const today          = todayStr()
  const mobilityToday  = sessions.some(s => s.date === today)
  const strengthToday  = (strengthSessions || []).some(s => {
    if (s.date) return s.date === today
    if (s.completed_at?.seconds) return new Date(s.completed_at.seconds * 1000).toDateString() === new Date().toDateString()
    return false
  })

  // ── Streak (combined any session) ─────────────
  const allNorm = useMemo(() => normalizeSessions(sessions, strengthSessions), [sessions, strengthSessions])
  const streak  = useMemo(() => getStreakInfo(allNorm), [allNorm])

  // ── Progression nudges ─────────────────────────
  const mobNudge = useMemo(
    () => getProgressionSuggestion(sessions, sessionDifficulty),
    [sessions, sessionDifficulty]
  )
  const strNudge = useMemo(
    () => getProgressionSuggestion(strengthSessions || [], settings?.default_difficulty || 'immediate'),
    [strengthSessions, settings]
  )

  const start = (list, zoneId, mode) => onStartRoutine(list, zoneId, mode)

  return (
    <div className={styles.shell}>
      {/* HEADER */}
      <header className={styles.header}>
        <button className={styles.brand} onClick={() => {}}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="3.4" fill="var(--accent)"/>
            <circle cx="16" cy="16" r="7.5" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.8"/>
            <circle cx="16" cy="16" r="11.5" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1.8"/>
          </svg>
          <div>
            <div className={styles.brandName}>Tide</div>
            <div className={styles.brandSub}>Mobility Breaks</div>
          </div>
        </button>
        <div className={styles.headerRight}>
          {/* Today indicators */}
          <div className={styles.todayDots} title="Mobility and Strength done today">
            <span className={`${styles.todayDot} ${mobilityToday ? styles.todayDotDone : ''}`} title={mobilityToday ? 'Mobility done' : 'Mobility not yet'}>M</span>
            <span className={`${styles.todayDot} ${strengthToday ? styles.todayDotStrDone : ''}`} title={strengthToday ? 'Strength done' : 'Strength not yet'}>S</span>
          </div>
          {/* Week + streak badge */}
          <div className={styles.weekBadge}>
            <svg width="13" height="13" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="3.4" fill="var(--accent)"/>
              <circle cx="13" cy="13" r="8" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="2"/>
            </svg>
            <span>{wc + getStrengthWeekCount(strengthSessions)} sessions this week</span>
            {streak.current > 1 && (
              <span className={styles.streakBadge}>{streak.current} day streak</span>
            )}
          </div>
          <button className={styles.iconBtn} onClick={onGoHistory} aria-label="History">
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 7v5l3 3"/>
            </svg>
          </button>
          <button className={styles.iconBtn} onClick={onOpenSettings} aria-label="Settings">
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
          <button className={styles.userBtn} onClick={onSignOut}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <span>{user?.displayName?.split(' ')[0] || 'Sign out'}</span>
          </button>
          <span
            className={styles.uidBadge}
            title="Click to copy UID"
            onClick={() => navigator.clipboard.writeText(user?.uid || '')}
          >
            uid: {user?.uid?.slice(0, 8)}…
          </span>
        </div>
      </header>

      <main className={styles.main}>
        {/* FOCUS TIMER CARD */}
        <div className={styles.card}>
          <div className={styles.eyebrow}>Focus timer</div>

          {idle && (
            <div className={styles.timerIdle}>
              <h2 className={styles.h2}>Settle in for a focused block</h2>
              <p className={styles.subcopy}>Pick how long you'll work. We'll gently let you know when it's time to surface and move.</p>
              <div className={styles.pillRow}>
                {[45, 60, 90].map(m => (
                  <button key={m}
                    className={`${styles.pill} ${(settings?.workMinutes ?? 60) === m ? styles.pillActive : styles.pillInactive}`}
                    onClick={() => updateSettings({ workMinutes: m })}>
                    {m} min
                  </button>
                ))}
              </div>
              <button className={styles.btnPrimary} onClick={startTimer}>Start focus block</button>
              <div style={{ marginTop: 18 }}>
                <button className={styles.btnLink} onClick={() => onStartRoutine(buildQuickRoutine(sessionDifficulty), null, 'quick')}>Need to move right now?</button>
              </div>
            </div>
          )}

          {isRunning && (
            <div className={styles.timerRunning}>
              <div className={styles.subcopy} style={{ margin: '14px 0 4px' }}>Next break in</div>
              <div className={styles.ringWrap}>
                <svg className={styles.ringSvg} viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="9"/>
                  <circle cx="110" cy="110" r="100" fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round"
                    strokeDasharray="628.318" strokeDashoffset={focusOffset} style={{ transition: 'stroke-dashoffset 1s linear' }}/>
                </svg>
                <div className={styles.ringTextMd}>{fmt(timeRemaining)}</div>
              </div>
              <div className={styles.btnRow}>
                <button className={styles.btnGhostMuted} onClick={pauseTimer}>Pause</button>
                <button className={styles.btnPrimarySm} onClick={() => { resetTimer(); onStartRoutine(buildQuickRoutine(sessionDifficulty), null, 'break') }}>Break now</button>
                <button className={styles.btnGhostMuted} onClick={resetTimer}>Reset</button>
              </div>
            </div>
          )}

          {paused && (
            <div className={styles.timerPaused}>
              <div className={styles.subcopy} style={{ margin: '14px 0 14px' }}>Paused — {fmt(timeRemaining)} left</div>
              <div className={styles.btnRow}>
                <button className={styles.btnPrimary} onClick={resumeTimer}>Resume</button>
                <button className={styles.btnGhostMuted} onClick={resetTimer}>Reset</button>
              </div>
            </div>
          )}
        </div>

        {/* MOBILITY PROGRESSION NUDGE */}
        {mobNudge.shouldSuggest && !mobNudgeDismissed && (
          <div className={styles.nudgeBanner}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span className={styles.nudgeMsg}>{mobNudge.message}</span>
            <button className={styles.nudgeAccept} onClick={() => { setSessionDifficulty(mobNudge.nextDifficulty); setMobNudgeDismissed(true) }}>Try it</button>
            <button className={styles.nudgeDismiss} onClick={() => setMobNudgeDismissed(true)} aria-label="Dismiss">×</button>
          </div>
        )}

        {/* ROUTINES */}
        <div>
          <div className={styles.routinesHeader}>
            <h3 className={styles.h3}>Mobility</h3>
            <button className={styles.strengthPill} onClick={onGoStrength}>
              🏋️ Strength →
            </button>
          </div>

          {/* Difficulty pills */}
          <div className={styles.diffRow}>
            <span className={styles.diffLabel}>Intensity:</span>
            {['basic', 'immediate', 'advanced'].map(d => (
              <button key={d}
                className={`${styles.pill} ${styles.pillSm} ${sessionDifficulty === d ? styles.pillActive : styles.pillInactive}`}
                onClick={() => setSessionDifficulty(d)}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>

          {/* Zone grid */}
          <div className={styles.zoneGrid}>
            {STRETCH_LIBRARY.zones.map(zone => {
              const color = ZONE_COLORS[zone.id] || '#2a7fad'
              return (
                <button key={zone.id} className={styles.zoneCard}
                  onClick={() => start(buildZoneRoutine(zone.id, sessionDifficulty), zone.id, 'routine')}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="4" fill={color}/>
                    <circle cx="16" cy="16" r="8.5" stroke={color} strokeOpacity="0.45" strokeWidth="2"/>
                    <circle cx="16" cy="16" r="13" stroke={color} strokeOpacity="0.22" strokeWidth="2"/>
                  </svg>
                  <div className={styles.zoneName}>{zone.name}</div>
                  <div className={styles.zoneTag}>{zone.complaint}</div>
                  <div className={styles.zoneMeta}>{zone.stretches.length} stretches</div>
                </button>
              )
            })}
          </div>

          {/* Dashed tiles */}
          <div className={styles.dashedGrid}>
            <button className={styles.dashedTile} onClick={() => start(buildFullBodyRoutine(sessionDifficulty), 'full_body', 'full_body')}>
              <svg width="26" height="26" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2"/><path d="M12 7v5M9 10l-2 4M15 10l2 4M10 21l2-5 2 5"/>
              </svg>
              <div><div className={styles.dashedTitle}>Full Body</div><div className={styles.dashedSub}>One stretch per zone</div></div>
            </button>
            <button className={styles.dashedTile} onClick={() => { const r = buildSurpriseRoutine(sessionDifficulty); start(r, r[0]?.zoneId, 'surprise') }}>
              <svg width="26" height="26" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/>
                <path d="M6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v12a3 3 0 0 0 3 3z"/>
              </svg>
              <div><div className={styles.dashedTitle}>Surprise me</div><div className={styles.dashedSub}>A routine at random</div></div>
            </button>
            <button className={styles.dashedTile} onClick={() => start(buildQuickRoutine(sessionDifficulty), null, 'quick')}>
              <svg width="26" height="26" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <div><div className={styles.dashedTitle}>Quick stretch</div><div className={styles.dashedSub}>One stretch · under 2 min</div></div>
            </button>
          </div>
        </div>

        {/* STRENGTH PROGRESSION NUDGE */}
        {strNudge.shouldSuggest && !strNudgeDismissed && (
          <div className={`${styles.nudgeBanner} ${styles.nudgeBannerStr}`}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 4v6M18 4v6M3 9h18M3 15h18M6 14v6M18 14v6"/>
            </svg>
            <span className={styles.nudgeMsg}>{strNudge.message}</span>
            <button className={styles.nudgeAccept} onClick={() => { onGoStrength(); setStrNudgeDismissed(true) }}>Go to Strength</button>
            <button className={styles.nudgeDismiss} onClick={() => setStrNudgeDismissed(true)} aria-label="Dismiss">×</button>
          </div>
        )}

        {/* STRENGTH SECTION */}
        <div>
          <div className={styles.routinesHeader}>
            <h3 className={styles.h3}>Strength</h3>
            <span className={styles.subcopy}>{getStrengthWeekCount(strengthSessions)} sessions this week</span>
          </div>
          {strengthSessions && strengthSessions.length > 0 && (
            <div className={styles.strengthLastSession}>
              <span className={styles.strengthLastLabel}>Last session:</span>
              <span className={styles.strengthLastZone}>{strengthSessions[0].zone_name}</span>
              <span className={styles.strengthLastDiff}>{strengthSessions[0].difficulty_level}</span>
            </div>
          )}
          <button className={styles.btnStrengthStart} onClick={onGoStrength}>
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M6 4v6M18 4v6M3 9h18M3 15h18M6 14v6M18 14v6"/>
            </svg>
            Start strength session
          </button>
        </div>
      </main>
    </div>
  )
}
