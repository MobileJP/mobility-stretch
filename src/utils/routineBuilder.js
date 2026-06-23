import { STRETCH_LIBRARY } from '../data/stretchLibrary'

// Flatten a stretch + difficulty into a player-ready object
function flatten(stretch, zoneId, difficulty) {
  const d = stretch.difficulty[difficulty]
  return {
    id:          stretch.id,
    name:        stretch.name,
    target:      stretch.target,
    zoneId,
    instruction: d.instruction,
    hold_secs:   d.hold_secs,
    reps:        d.reps,
    notes:       d.notes,
  }
}

// All stretches for one zone
export function buildZoneRoutine(zoneId, difficulty) {
  const zone = STRETCH_LIBRARY.zones.find(z => z.id === zoneId)
  if (!zone) return []
  return zone.stretches.map(s => flatten(s, zoneId, difficulty))
}

// First stretch from each zone (9 total)
export function buildFullBodyRoutine(difficulty) {
  return STRETCH_LIBRARY.zones.map(zone =>
    flatten(zone.stretches[0], zone.id, difficulty)
  )
}

// Single random stretch from a random zone
export function buildQuickRoutine(difficulty) {
  const zones = STRETCH_LIBRARY.zones
  const zone  = zones[Math.floor(Math.random() * zones.length)]
  const s     = zone.stretches[Math.floor(Math.random() * zone.stretches.length)]
  return [flatten(s, zone.id, difficulty)]
}

// Full routine for a randomly selected zone
export function buildSurpriseRoutine(difficulty) {
  const zones = STRETCH_LIBRARY.zones
  const zone  = zones[Math.floor(Math.random() * zones.length)]
  return buildZoneRoutine(zone.id, difficulty)
}

export function getZone(zoneId) {
  return STRETCH_LIBRARY.zones.find(z => z.id === zoneId)
}
