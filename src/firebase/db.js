import {
  collection, doc, getDoc, setDoc, addDoc,
  getDocs, query, orderBy, limit, serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

// ── Refs ────────────────────────────────────────
const sessionsRef         = (uid)              => collection(db, 'users', uid, 'sessions')
const settingsRef         = (uid)              => doc(db, 'users', uid, 'settings', 'prefs')
const exercisesRef        = (uid, sessionId)   => collection(db, 'users', uid, 'sessions', sessionId, 'exercises')
const streakRef           = (uid)              => doc(db, 'users', uid, 'streaks', 'current')
const strengthSessionsRef = (uid)              => collection(db, 'users', uid, 'strength_sessions')
const strengthExercisesRef= (uid, sessionId)   => collection(db, 'users', uid, 'strength_sessions', sessionId, 'exercises')

// ── Settings ────────────────────────────────────
export async function getSettings(uid) {
  const snap = await getDoc(settingsRef(uid))
  return snap.exists() ? snap.data() : null
}

export async function saveSettings(uid, settings) {
  await setDoc(settingsRef(uid), settings, { merge: true })
}

// ── Mobility sessions ────────────────────────────
export async function saveSession(uid, session) {
  const ref = await addDoc(sessionsRef(uid), {
    date:                session.date,
    zone:                session.zone,
    zoneId:              session.zoneId,
    seconds:             session.seconds,
    steps:               session.steps,
    difficulty_level:    session.difficulty_level,
    exercises_completed: session.exercises_completed,
    effort_rating:       session.effort_rating  ?? null,
    notes:               session.notes          ?? '',
    createdAt:           serverTimestamp(),
  })
  return ref.id
}

export async function saveExercise(uid, sessionId, exercise) {
  await addDoc(exercisesRef(uid, sessionId), exercise)
}

export async function getRecentSessions(uid, limitCount = 90) {
  const q    = query(sessionsRef(uid), orderBy('createdAt', 'desc'), limit(limitCount))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Streaks ─────────────────────────────────────
export async function getStreak(uid) {
  const snap = await getDoc(streakRef(uid))
  return snap.exists() ? snap.data() : { current_streak: 0, longest_streak: 0, last_session_date: null, week_count: 0 }
}

export async function updateStreak(uid, todayDate, weekCount) {
  const existing = await getStreak(uid)
  const last     = existing.last_session_date
  const prev     = last ? new Date(last + 'T00:00:00') : null
  const today    = new Date(todayDate + 'T00:00:00')
  const daysDiff = prev ? Math.round((today - prev) / 86400000) : null

  let current = existing.current_streak ?? 0
  if      (daysDiff === null) current = 1
  else if (daysDiff === 0)    current = current
  else if (daysDiff === 1)    current = current + 1
  else                        current = 1

  const longest = Math.max(current, existing.longest_streak ?? 0)

  await setDoc(streakRef(uid), {
    current_streak:    current,
    longest_streak:    longest,
    last_session_date: todayDate,
    week_count:        weekCount,
  })
}

// ── Strength sessions ────────────────────────────
export async function saveStrengthSession(uid, session) {
  const today = new Date()
  const date  = session.date || (
    today.getFullYear() + '-' +
    String(today.getMonth()+1).padStart(2,'0') + '-' +
    String(today.getDate()).padStart(2,'0')
  )
  const ref = await addDoc(strengthSessionsRef(uid), {
    user_id:             uid,
    date,
    zone_name:           session.zone_name,
    difficulty_level:    session.difficulty_level,
    exercises_completed: session.exercises_completed,
    exercises_skipped:   session.exercises_skipped,
    sets_completed:      session.sets_completed,
    sets_total:          session.sets_total,
    duration_secs:       session.duration_secs,
    effort_rating:       session.effort_rating ?? null,
    notes:               session.notes         ?? '',
    completed_at:        serverTimestamp(),
  })
  return ref.id
}

export async function saveStrengthExercise(uid, sessionId, exercise) {
  await addDoc(strengthExercisesRef(uid, sessionId), exercise)
}

export async function getRecentStrengthSessions(uid, limitCount = 30) {
  const q    = query(strengthSessionsRef(uid), orderBy('completed_at', 'desc'), limit(limitCount))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getStrengthSessionsThisWeek(uid) {
  const q    = query(strengthSessionsRef(uid), orderBy('completed_at', 'desc'), limit(30))
  const snap = await getDocs(q)
  const today     = new Date()
  const dayOfWeek = today.getDay() || 7          // Mon=1 … Sun=7
  const monday    = new Date(today)
  monday.setDate(today.getDate() - (dayOfWeek - 1))
  monday.setHours(0, 0, 0, 0)
  const mondayMs = monday.getTime()
  return snap.docs
    .map(d => d.data())
    .filter(s => {
      const ts = s.completed_at?.seconds ? s.completed_at.seconds * 1000 : 0
      return ts >= mondayMs
    }).length
}
