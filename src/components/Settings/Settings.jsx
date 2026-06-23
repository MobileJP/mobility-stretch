import styles from './Settings.module.css'
import { STRETCH_LIBRARY } from '../../data/stretchLibrary'

export default function Settings({ settings, updateSettings, notificationPermission, onRequestNotifications, onClose, onSignOut }) {
  const { workMinutes = 60, default_difficulty = 'immediate', defaultRoutine = 'ask', notifications_enabled = false } = settings || {}

  const notifSupported = typeof window !== 'undefined' && 'Notification' in window
  const notifGranted   = notificationPermission === 'granted'
  const notifDenied    = notificationPermission === 'denied'

  const handleNotifToggle = () => {
    if (notifications_enabled) {
      updateSettings({ notifications_enabled: false })
    } else if (notifGranted) {
      updateSettings({ notifications_enabled: true })
    } else {
      onRequestNotifications()
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Settings</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Default break interval</div>
          <div className={styles.pillRow}>
            {[45, 60, 90].map(m => (
              <button key={m}
                className={`${styles.pill} ${workMinutes === m ? styles.pillActive : styles.pillInactive}`}
                onClick={() => updateSettings({ workMinutes: m })}>
                {m} min
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Default intensity level</div>
          <div className={styles.pillRow}>
            {['basic', 'immediate', 'advanced'].map(d => (
              <button key={d}
                className={`${styles.pill} ${default_difficulty === d ? styles.pillActive : styles.pillInactive}`}
                onClick={() => updateSettings({ default_difficulty: d })}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>When a break starts, default to</div>
          <select className={styles.select} value={defaultRoutine}
            onChange={e => updateSettings({ defaultRoutine: e.target.value })}>
            <option value="ask">Ask me each time</option>
            <option value="surprise">Surprise me</option>
            {STRETCH_LIBRARY.zones.map(z => (
              <option key={z.id} value={z.id}>{z.name}</option>
            ))}
          </select>
        </div>

        {notifSupported && (
          <div className={styles.section}>
            <div className={styles.label}>Break reminders</div>
            <div className={styles.notifRow}>
              <div className={styles.notifInfo}>
                <div className={styles.notifTitle}>Notify when focus block ends</div>
                <div className={styles.notifSub}>
                  {notifDenied
                    ? 'Blocked in browser — enable in iOS Settings › Safari'
                    : 'Requires iOS 16.4+ and app installed to home screen'}
                </div>
              </div>
              <button
                className={`${styles.toggle} ${notifications_enabled && notifGranted ? styles.toggleOn : ''}`}
                onClick={handleNotifToggle}
                disabled={notifDenied}
                aria-label="Toggle break reminders"
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <button className={styles.btnSignOut} onClick={() => { onClose(); onSignOut() }}>Sign out</button>
        </div>
      </div>
    </div>
  )
}
