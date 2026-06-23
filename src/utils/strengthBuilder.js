import { STRENGTH_LIBRARY, EQUIPMENT_LABELS } from '../data/strengthLibrary'

function resolveExercise(ex, zone, difficulty) {
  const d = ex.difficulty[difficulty] || ex.difficulty.immediate
  return {
    ...ex,
    zoneName:    zone.name,
    zoneId:      zone.id,
    instruction: d.instruction,
    sets:        d.sets,
    reps:        d.reps,
    hold_secs:   d.hold_secs,
    rest_secs:   d.rest_secs,
    load:        d.load,
    notes:       d.notes,
  }
}

export function buildStrengthZoneSession(zoneId, difficulty) {
  const zone = STRENGTH_LIBRARY.zones.find(z => z.id === zoneId)
  if (!zone) return []
  return zone.exercises.map(ex => resolveExercise(ex, zone, difficulty))
}

export function buildFullBodyStrengthSession(difficulty) {
  return STRENGTH_LIBRARY.zones.map(zone => {
    const ex = zone.exercises[Math.floor(Math.random() * zone.exercises.length)]
    return resolveExercise(ex, zone, difficulty)
  })
}

export function getEquipmentLabel(equipment) {
  return EQUIPMENT_LABELS[equipment] || equipment
}

export function getZoneEquipment(zoneId) {
  const zone = STRENGTH_LIBRARY.zones.find(z => z.id === zoneId)
  if (!zone) return []
  const seen = new Set()
  zone.exercises.forEach(ex => seen.add(ex.equipment))
  return [...seen].map(e => getEquipmentLabel(e))
}

// Returns { shouldSuggest: boolean, message: string }
// recentSessions must have difficulty_level, effort_rating, and date fields.
export function getProgressionSuggestion(recentSessions, currentDifficulty) {
  if (!recentSessions?.length || currentDifficulty === 'advanced') {
    return { shouldSuggest: false, message: '' }
  }

  const cutoffMs = Date.now() - 14 * 86400000
  const qualifying = recentSessions.filter(s => {
    if (s.difficulty_level !== currentDifficulty) return false
    if (s.effort_rating == null || s.effort_rating > 2) return false
    const dateStr = s.date || ''
    const ts = dateStr
      ? new Date(dateStr + 'T00:00:00').getTime()
      : s.completed_at?.seconds ? s.completed_at.seconds * 1000 : 0
    return ts >= cutoffMs
  })

  if (qualifying.length < 5) return { shouldSuggest: false, message: '' }

  const curr = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)
  const next = currentDifficulty === 'basic' ? 'Immediate' : 'Advanced'
  return {
    shouldSuggest: true,
    nextDifficulty: currentDifficulty === 'basic' ? 'immediate' : 'advanced',
    message: `You've been nailing ${curr} for 2 weeks — ready to try ${next}?`,
  }
}
