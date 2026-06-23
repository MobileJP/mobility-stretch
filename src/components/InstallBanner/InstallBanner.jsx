import { useState, useEffect } from 'react'
import styles from './InstallBanner.module.css'

function isIOSSafari() {
  const ua = navigator.userAgent
  return /iP(hone|ad|od)/.test(ua) &&
    /WebKit/.test(ua) &&
    !/CriOS|FxiOS|OPiOS|mercury/.test(ua)
}

function isStandalone() {
  return window.navigator.standalone === true
}

const STORAGE_KEY = 'tide_install_dismissed'

export default function InstallBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isIOSSafari()) return
    if (isStandalone()) return
    if (localStorage.getItem(STORAGE_KEY)) return
    // Small delay so it doesn't flash on first paint
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <svg className={styles.shareIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        <p className={styles.text}>
          Install Tide on your home screen — tap <strong>Share</strong> then <strong>Add to Home Screen</strong>.
        </p>
        <button className={styles.close} onClick={dismiss} aria-label="Dismiss">×</button>
      </div>
    </div>
  )
}
