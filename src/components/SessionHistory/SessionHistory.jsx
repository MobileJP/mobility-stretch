import { useMemo, useState } from 'react'
import styles from './SessionHistory.module.css'
import { ZONE_COLORS } from '../../data/stretchLibrary'
import {
  normalizeSessions,
  getWeekActivity,
  getZoneFrequency,
  getNeglectedZones,
  getStreakInfo,
  getStatsSummary,
} from '../../utils/analytics'

const STRENGTH_COLOR = '#4a8fb5'

function fmtMins(secs) {
  const m = Math.round(secs / 60)
  return m < 60 ? `${m}m` : `${Math.floor(m/60)}h ${m%60}m`
}

function fmtDate(str) {
  if (!str) return ''
  const d = new Date(str + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function SessionHistory({ sessions, strengthSessions, onBack }) {
  const [filter, setFilter] = useState('all') // 'all' | 'mobility' | 'strength'

  const all = useMemo(() => normalizeSessions(sessions, strengthSessions), [sessions, strengthSessions])
  const filtered = filter === 'all' ? all : all.filter(s => s.type === filter)

  const activity   = useMemo(() => getWeekActivity(all), [all])
  const zoneFreq   = useMemo(() => getZoneFrequency(all), [all])
  const neglected  = useMemo(() => getNeglectedZones(all, 14), [all])
  const streak     = useMemo(() => getStreakInfo(all), [all])
  const stats      = useMemo(() => getStatsSummary(all), [all])

  const maxZoneCount = zoneFreq.length ? zoneFreq[0].count : 1

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className={styles.shell}>
      {/* HEADER */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Dashboard
        </button>
        <h1 className={styles.title}>History & Insights</h1>
        <div className={styles.filterRow}>
          {['all', 'mobility', 'strength'].map(f => (
            <button key={f}
              className={`${styles.filterPill} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.main}>

        {/* STATS ROW */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{stats.total}</div>
            <div className={styles.statLabel}>Total sessions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{stats.thisWeek}</div>
            <div className={styles.statLabel}>This week</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{stats.totalMins}</div>
            <div className={styles.statLabel}>Minutes moved</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{streak.current}</div>
            <div className={styles.statLabel}>Day streak</div>
          </div>
          {streak.longest > 0 && (
            <div className={styles.statCard}>
              <div className={styles.statVal}>{streak.longest}</div>
              <div className={styles.statLabel}>Best streak</div>
            </div>
          )}
        </div>

        {/* 4-WEEK ACTIVITY CALENDAR */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Activity — last 4 weeks</h2>
          <div className={styles.calendarWrap}>
            <div className={styles.dayLabelRow}>
              {dayLabels.map(d => <div key={d} className={styles.dayLabel}>{d}</div>)}
            </div>
            <div className={styles.calGrid}>
              {activity.map((day, i) => {
                const both = day.mobility && day.strength
                const bg = both
                  ? `linear-gradient(135deg, var(--accent) 50%, ${STRENGTH_COLOR} 50%)`
                  : day.mobility  ? 'var(--accent)'
                  : day.strength  ? STRENGTH_COLOR
                  : 'rgba(255,255,255,0.25)'
                return (
                  <div key={i} className={styles.calCell} title={day.date}>
                    <div
                      className={`${styles.calDot} ${(day.mobility || day.strength) ? styles.calDotActive : ''}`}
                      style={{ background: bg }}
                    />
                  </div>
                )
              })}
            </div>
            <div className={styles.calLegend}>
              <span className={styles.legendDot} style={{ background: 'var(--accent)' }}/>
              <span className={styles.legendLabel}>Mobility</span>
              <span className={styles.legendDot} style={{ background: STRENGTH_COLOR }}/>
              <span className={styles.legendLabel}>Strength</span>
            </div>
          </div>
        </div>

        {/* NEGLECTED ZONES */}
        {neglected.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Zones to revisit</h2>
            <div className={styles.neglectedList}>
              {neglected.slice(0, 5).map(z => (
                <div key={z.id} className={styles.neglectedItem}>
                  <div className={styles.neglectedDot} style={{ background: ZONE_COLORS[z.id] || 'var(--muted)' }}/>
                  <span className={styles.neglectedZone}>{z.name}</span>
                  <span className={styles.neglectedAge}>
                    {z.daysAgo === null ? 'Never trained' : `${z.daysAgo}d ago`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ZONE FREQUENCY */}
        {zoneFreq.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Zone breakdown</h2>
            <div className={styles.zoneChart}>
              {zoneFreq.map(z => {
                const color    = ZONE_COLORS[z.zoneId] || 'var(--accent)'
                const mobPct   = (z.mobilityCount  / maxZoneCount) * 100
                const strPct   = (z.strengthCount  / maxZoneCount) * 100
                return (
                  <div key={z.zoneId || z.zoneName} className={styles.zoneRow}>
                    <div className={styles.zoneRowName}>{z.zoneName}</div>
                    <div className={styles.zoneBarTrack}>
                      <div className={styles.zoneBarMob}  style={{ width: `${mobPct}%`,  background: color, opacity: 0.85 }}/>
                      <div className={styles.zoneBarStr}  style={{ width: `${strPct}%`,  background: STRENGTH_COLOR }}/>
                    </div>
                    <div className={styles.zoneCount}>{z.count}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* RECENT SESSIONS LIST */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Recent sessions
            <span className={styles.sectionCount}>{filtered.length}</span>
          </h2>
          {filtered.length === 0 ? (
            <div className={styles.empty}>No sessions yet — complete a routine to see it here.</div>
          ) : (
            <div className={styles.sessionList}>
              {filtered.slice(0, 30).map((s, i) => (
                <div key={s.id || i} className={styles.sessionRow}>
                  <div className={styles.sessionDate}>{fmtDate(s.date)}</div>
                  <div className={`${styles.typeBadge} ${s.type === 'strength' ? styles.typeBadgeStr : styles.typeBadgeMob}`}>
                    {s.type === 'strength' ? 'Strength' : 'Mobility'}
                  </div>
                  <div className={styles.sessionZone}>{s.zoneName || '—'}</div>
                  <div className={styles.sessionDiff}>{s.difficulty}</div>
                  <div className={styles.sessionDur}>
                    {s.durationSecs > 0 ? fmtMins(s.durationSecs) : '—'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
