import { STRETCH_LIBRARY } from '../data/stretchLibrary'
import { STRENGTH_LIBRARY } from '../data/strengthLibrary'

// ── Date helpers ─────────────────────────────────
function fmtDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}

function shiftDate(d, days) {
  const n = new Date(d)
  n.setDate(n.getDate() + days)
  return n
}

// ── Normalise ────────────────────────────────────
// Returns unified array of { id, type, date, zoneName, zoneId, difficulty, durationSecs }
export function normalizeSessions(mobilitySessions = [], strengthSessions = []) {
  const zoneIdToName = {}
  STRETCH_LIBRARY.zones.forEach(z => { zoneIdToName[z.id] = z.name })

  const mobility = mobilitySessions.map(s => ({
    id:          s.id || '',
    type:        'mobility',
    date:        s.date || '',
    zoneName:    s.zone || zoneIdToName[s.zoneId] || s.zoneId || 'Unknown',
    zoneId:      s.zoneId || '',
    difficulty:  s.difficulty_level || '',
    durationSecs: s.seconds || 0,
  }))

  const zoneNameToId = {}
  STRENGTH_LIBRARY.zones.forEach(z => { zoneNameToId[z.name] = z.id })
  STRETCH_LIBRARY.zones.forEach(z => { zoneNameToId[z.name] = z.id })

  const strength = strengthSessions.map(s => {
    let date = s.date || ''
    if (!date && s.completed_at) {
      const ms = s.completed_at.seconds ? s.completed_at.seconds * 1000 : Number(s.completed_at)
      date = fmtDate(new Date(ms))
    }
    const zoneName = s.zone_name || s.zoneName || 'Full Body'
    return {
      id:          s.id || '',
      type:        'strength',
      date,
      zoneName,
      zoneId:      zoneNameToId[zoneName] || '',
      difficulty:  s.difficulty_level || '',
      durationSecs: s.duration_secs || 0,
    }
  })

  return [...mobility, ...strength]
    .filter(s => s.date)
    .sort((a, b) => b.date.localeCompare(a.date))
}

// ── 28-day activity grid ─────────────────────────
// Returns array[28] of { date, mobility: bool, strength: bool }
export function getWeekActivity(allSessions, weeks = 4) {
  const days = weeks * 7
  const today = new Date()
  const result = []
  for (let i = days - 1; i >= 0; i--) {
    const d    = shiftDate(today, -i)
    const key  = fmtDate(d)
    const day  = allSessions.filter(s => s.date === key)
    result.push({
      date:     key,
      dayLabel: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      mobility: day.some(s => s.type === 'mobility'),
      strength: day.some(s => s.type === 'strength'),
    })
  }
  return result
}

// ── Zone frequency ───────────────────────────────
// Returns array of { zoneId, zoneName, count, mobilityCount, strengthCount }
export function getZoneFrequency(allSessions) {
  const map = {}
  allSessions.forEach(s => {
    const key = s.zoneId || s.zoneName
    if (!key || key === 'mixed' || key === 'ask') return
    if (!map[key]) map[key] = { zoneId: s.zoneId, zoneName: s.zoneName, count: 0, mobilityCount: 0, strengthCount: 0 }
    map[key].count++
    if (s.type === 'mobility') map[key].mobilityCount++
    else                       map[key].strengthCount++
  })
  return Object.values(map).sort((a, b) => b.count - a.count)
}

// ── Neglected zones ──────────────────────────────
// Returns zones not trained in dayThreshold days
export function getNeglectedZones(allSessions, dayThreshold = 14) {
  const allZones = [
    ...STRETCH_LIBRARY.zones.map(z => ({ id: z.id, name: z.name })),
  ]
  // dedupe by id
  const seen = new Set()
  const zones = allZones.filter(z => { if (seen.has(z.id)) return false; seen.add(z.id); return true })

  const now     = Date.now()
  const cutoff  = fmtDate(new Date(now - dayThreshold * 86400000))

  return zones
    .map(z => {
      const sessions = allSessions.filter(s => s.zoneId === z.id || s.zoneName === z.name)
      const last     = sessions.length ? sessions[0].date : null // already sorted desc
      const daysAgo  = last
        ? Math.round((now - new Date(last + 'T00:00:00').getTime()) / 86400000)
        : null
      return { ...z, lastDate: last, daysAgo }
    })
    .filter(z => z.daysAgo === null || z.daysAgo >= dayThreshold)
    .sort((a, b) => (b.daysAgo ?? 9999) - (a.daysAgo ?? 9999))
}

// ── Streak ───────────────────────────────────────
export function getStreakInfo(allSessions) {
  const dates = [...new Set(allSessions.map(s => s.date))].filter(Boolean).sort().reverse()
  if (!dates.length) return { current: 0, longest: 0 }

  const todayStr     = fmtDate(new Date())
  const yesterdayStr = fmtDate(shiftDate(new Date(), -1))
  const startsActive = dates[0] === todayStr || dates[0] === yesterdayStr

  let current = 0
  if (startsActive) {
    current = 1
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i-1] + 'T00:00:00')
      const curr = new Date(dates[i]   + 'T00:00:00')
      if (Math.round((prev - curr) / 86400000) === 1) current++
      else break
    }
  }

  // Longest streak across all history
  let longest = current, run = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i-1] + 'T00:00:00')
    const curr = new Date(dates[i]   + 'T00:00:00')
    if (Math.round((prev - curr) / 86400000) === 1) { run++; longest = Math.max(longest, run) }
    else run = 1
  }

  return { current, longest }
}

// ── Summary stats ────────────────────────────────
export function getStatsSummary(allSessions) {
  const now   = Date.now()
  const week  = allSessions.filter(s => (now - new Date(s.date + 'T00:00:00').getTime()) / 86400000 < 7)
  const month = allSessions.filter(s => (now - new Date(s.date + 'T00:00:00').getTime()) / 86400000 < 30)
  const totalMins = Math.round(allSessions.reduce((sum, s) => sum + (s.durationSecs || 0), 0) / 60)
  return {
    total:      allSessions.length,
    totalMins,
    thisWeek:   week.length,
    thisMonth:  month.length,
  }
}
