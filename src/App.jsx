import { useState, useEffect } from 'react'
import { useAuth }            from './hooks/useAuth'
import { useSettings }        from './hooks/useSettings'
import { useTimer }           from './hooks/useTimer'
import { useOnlineStatus }    from './hooks/useOnlineStatus'
import { useNotifications }   from './hooks/useNotifications'
import { usePWAUpdate }       from './hooks/usePWAUpdate'
import { signOutUser }        from './firebase/auth'
import { getRecentSessions, getRecentStrengthSessions } from './firebase/db'
import OceanCanvas            from './components/OceanCanvas/OceanCanvas'
import Login                  from './components/Login/Login'
import Dashboard              from './components/Dashboard/Dashboard'
import RoutinePlayer          from './components/RoutinePlayer/RoutinePlayer'
import SessionSummary         from './components/SessionSummary/SessionSummary'
import Settings               from './components/Settings/Settings'
import BreakPrompt            from './components/BreakTimer/BreakPrompt'
import StrengthZoneSelector   from './components/StrengthZoneSelector/StrengthZoneSelector'
import StrengthSession        from './components/StrengthSession/StrengthSession'
import StrengthSummary        from './components/StrengthSummary/StrengthSummary'
import SessionHistory         from './components/SessionHistory/SessionHistory'
import InstallBanner          from './components/InstallBanner/InstallBanner'
import OfflineBanner          from './components/OfflineBanner/OfflineBanner'

const ACTIVE_VIEWS = new Set(['routine', 'strength_session'])

export default function App() {
  const { user, loading }                         = useAuth()
  const { settings, updateSettings }              = useSettings(user?.uid)
  const [view, setView]                           = useState('home')
  const [routine, setRoutine]                     = useState(null)
  const [completedSession, setCompletedSession]   = useState(null)
  const [sessionDifficulty, setSessionDifficulty] = useState('immediate')
  const [showSettings, setShowSettings]           = useState(false)
  const [sessions, setSessions]                   = useState([])

  // ── Strength state ──────────────────────────────
  const [strengthExercises,         setStrengthExercises]         = useState(null)
  const [strengthDifficulty,        setStrengthDifficulty]        = useState('immediate')
  const [strengthZoneName,          setStrengthZoneName]          = useState('')
  const [completedStrengthSession,  setCompletedStrengthSession]  = useState(null)
  const [strengthSessions,          setStrengthSessions]          = useState([])

  // ── PWA ─────────────────────────────────────────
  const online                        = useOnlineStatus()
  const { needRefresh, updateServiceWorker } = usePWAUpdate()
  const notifs                        = useNotifications(settings?.notifications_enabled)
  const [showNotifPrompt, setShowNotifPrompt] = useState(false)

  useEffect(() => {
    if (settings?.default_difficulty) {
      setSessionDifficulty(settings.default_difficulty)
      setStrengthDifficulty(settings.default_difficulty)
    }
  }, [settings?.default_difficulty])

  useEffect(() => {
    if (!user) return
    getRecentSessions(user.uid)
      .then(setSessions)
      .catch(e => console.warn('Sessions load:', e.message))
    getRecentStrengthSessions(user.uid)
      .then(setStrengthSessions)
      .catch(e => console.warn('Strength sessions load:', e.message))
  }, [user])

  // ── Timer with notification scheduling ──────────
  const baseTimer = useTimer(settings?.workMinutes ?? 60, () => {
    notifs.cancel()
    setView('break')
  })

  const timer = {
    ...baseTimer,
    startTimer: () => {
      baseTimer.startTimer()
      notifs.schedule(settings?.workMinutes ?? 60)
    },
    pauseTimer: () => {
      baseTimer.pauseTimer()
      notifs.cancel()
    },
    resumeTimer: () => {
      baseTimer.resumeTimer()
      notifs.schedule(baseTimer.timeRemaining / 60)
    },
    resetTimer: () => {
      baseTimer.resetTimer()
      notifs.cancel()
    },
  }

  // ── Notification permission request ─────────────
  const handleEnableNotifications = async () => {
    const result = await notifs.requestPermission()
    if (result === 'granted') {
      updateSettings({ notifications_enabled: true })
    }
    setShowNotifPrompt(false)
  }

  // ── Mobility handlers ───────────────────────────
  const handleStartRoutine = (list, zoneId, mode) => {
    setRoutine({ list, zoneId, mode, difficulty: sessionDifficulty })
    setView('routine')
  }

  const handleRoutineComplete = (sessionData) => {
    setCompletedSession(sessionData)
    setSessions(prev => [sessionData, ...prev])
    setView('summary')
  }

  const handleAnotherRoutine = () => {
    import('./utils/routineBuilder').then(({ buildSurpriseRoutine }) => {
      const list = buildSurpriseRoutine(sessionDifficulty)
      handleStartRoutine(list, list[0]?.zoneId, 'surprise')
    })
  }

  // ── Strength handlers ───────────────────────────
  const handleStartStrengthSession = (exercises, difficulty, zoneName) => {
    setStrengthExercises(exercises)
    setStrengthDifficulty(difficulty)
    setStrengthZoneName(zoneName)
    setView('strength_session')
  }

  const handleStrengthComplete = (sessionData) => {
    setCompletedStrengthSession(sessionData)
    setStrengthSessions(prev => [sessionData, ...prev])
    setView('strength_summary')
  }

  if (loading) return <OceanCanvas />

  return (
    <>
      <OceanCanvas />

      {/* PWA: offline indicator */}
      {!online && <OfflineBanner />}

      {/* PWA: update available — not shown during active sessions */}
      {needRefresh && !ACTIVE_VIEWS.has(view) && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 14, padding: '10px 20px', fontSize: 14, fontWeight: 500,
        }}>
          A new version of Tide is available.
          <button onClick={() => updateServiceWorker(true)} style={{
            background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)',
            color: '#fff', borderRadius: 8, padding: '5px 14px', cursor: 'pointer', fontWeight: 600,
          }}>
            Reload
          </button>
        </div>
      )}

      {/* PWA: notification permission dialog */}
      {showNotifPrompt && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            background: 'var(--cardBg)', backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: 24,
            padding: '32px 28px', maxWidth: 360, textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔔</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
              Break reminders
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 24 }}>
              Allow Tide to remind you when your break is due? You can turn this off anytime in Settings.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowNotifPrompt(false)} style={{
                flex: 1, padding: '12px', borderRadius: 12, cursor: 'pointer',
                border: '1.5px solid rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.6)',
                fontSize: 14, color: 'var(--muted)',
              }}>Not now</button>
              <button onClick={handleEnableNotifications} style={{
                flex: 1, padding: '12px', borderRadius: 12, cursor: 'pointer',
                border: 'none', background: 'var(--accent)', color: '#fff',
                fontSize: 14, fontWeight: 600,
              }}>Allow</button>
            </div>
          </div>
        </div>
      )}

      {!user ? (
        <Login />
      ) : (
        <>
          {view === 'home' && (
            <Dashboard
              user={user}
              settings={settings}
              updateSettings={updateSettings}
              sessions={sessions}
              strengthSessions={strengthSessions}
              timer={timer}
              sessionDifficulty={sessionDifficulty}
              setSessionDifficulty={setSessionDifficulty}
              onStartRoutine={handleStartRoutine}
              onGoStrength={() => setView('strength')}
              onGoHistory={() => setView('history')}
              onOpenSettings={() => setShowSettings(true)}
              onSignOut={signOutUser}
            />
          )}
          {view === 'routine' && routine && (
            <RoutinePlayer
              routine={routine}
              userId={user.uid}
              onComplete={handleRoutineComplete}
              onGoHome={() => setView('home')}
            />
          )}
          {view === 'summary' && (
            <SessionSummary
              sessionData={completedSession}
              userId={user.uid}
              sessions={sessions}
              onDone={() => setView('home')}
              onAnotherRoutine={handleAnotherRoutine}
            />
          )}
          {view === 'history' && (
            <SessionHistory
              sessions={sessions}
              strengthSessions={strengthSessions}
              onBack={() => setView('home')}
            />
          )}
          {view === 'break' && (
            <BreakPrompt
              settings={settings}
              sessionDifficulty={sessionDifficulty}
              timer={timer}
              onStartRoutine={handleStartRoutine}
              onGoHome={() => setView('home')}
            />
          )}
          {view === 'strength' && (
            <StrengthZoneSelector
              sessionDifficulty={strengthDifficulty}
              setSessionDifficulty={setStrengthDifficulty}
              strengthSessions={strengthSessions}
              onStartSession={handleStartStrengthSession}
              onGoMobility={() => setView('home')}
            />
          )}
          {view === 'strength_session' && strengthExercises && (
            <StrengthSession
              exercises={strengthExercises}
              difficulty={strengthDifficulty}
              zoneName={strengthZoneName}
              onComplete={handleStrengthComplete}
              onGoHome={() => setView('home')}
            />
          )}
          {view === 'strength_summary' && (
            <StrengthSummary
              sessionData={completedStrengthSession}
              userId={user.uid}
              onDone={() => setView('home')}
            />
          )}
          {showSettings && (
            <Settings
              settings={settings}
              updateSettings={updateSettings}
              notificationPermission={notifs.permission}
              onRequestNotifications={() => setShowNotifPrompt(true)}
              onClose={() => setShowSettings(false)}
              onSignOut={signOutUser}
            />
          )}
        </>
      )}

      {/* PWA: iOS install instructions */}
      <InstallBanner />
    </>
  )
}
