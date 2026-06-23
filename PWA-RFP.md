# PWA Implementation — Requirements & Feature Plan
**Project:** Tide – Mobility Companion  
**Platform target:** iPhone and iPad, iOS 16.4+  
**Date:** June 2026

---

## 1. Objective

Convert the existing React + Vite web application into an installable Progressive Web App so users can launch it from the iPhone/iPad home screen, use it without a network connection, and receive break reminders without having the browser open.

---

## 2. iOS / Safari Constraints — Must Read First

iOS has stricter PWA limitations than Android or desktop. Every requirement in this document is written around these constraints.

| Feature | iOS status | Notes |
|---|---|---|
| Service Worker | Supported (iOS 11.3+) | Core caching works |
| Web App Manifest | Partial | `display: standalone` works; some fields ignored |
| Install prompt (`beforeinstallprompt`) | **Not available** | Apple does not fire this event — no custom install banner |
| Add to Home Screen | Manual only | User must tap Share → Add to Home Screen in Safari |
| Push notifications | iOS 16.4+ only, home screen only | App must be installed; user must grant permission |
| Background Sync | Not supported | Cannot silently sync when app is closed |
| Background Fetch | Not supported | Cannot prefetch content in background |
| Persistent storage | Not guaranteed | iOS may clear cache under storage pressure |
| Chrome / Firefox on iOS | Cannot install PWA | Install only works from Safari |
| Badges (notification count) | iOS 16.4+ | Supported on home screen icon |

**Critical:** the install flow on iOS is entirely manual. The app cannot prompt the user to install — it can only display a custom in-app instruction banner explaining the steps.

---

## 3. Scope

### In scope
- Installable home screen app (standalone, full-screen)
- Offline access to all exercise content (stretch and strength libraries)
- Offline-safe session flow (complete a session without network)
- Background break timer notification (iOS 16.4+, installed app only)
- In-app install instructions banner (iOS-aware)
- App icons, splash screens, and status bar styling for iPhone and iPad
- Auto-update prompt when a new version is deployed

### Out of scope
- Android-specific PWA features (install prompt, shortcuts)
- Desktop PWA
- Native push via APNs (web push only)
- Background session sync when app is closed

---

## 4. Feature Requirements

---

### 4.1 Installability

**FR-01** The app must have a valid Web App Manifest with:
- `name`: "Tide – Mobility"
- `short_name`: "Tide"
- `display`: `standalone`
- `orientation`: `portrait`
- `background_color`: matching `--pageBg` (Coastal Dusk: `#e8ddd4`)
- `theme_color`: matching `--accent` (`#c47e5a`)
- `start_url`: `/`

**FR-02** The manifest must include icons at:
- 192×192 (Android / general)
- 512×512 (Android / splash)
- 180×180 as `apple-touch-icon` (iOS home screen)
- 167×167 for iPad home screen
- 152×152 for iPad retina (legacy)

**FR-03** The `index.html` must include iOS-specific meta tags:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Tide">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
```

**FR-04** Splash screens must be provided for:
- iPhone 15 Pro Max (430×932 @3x)
- iPhone 15 / 14 (390×844 @3x)
- iPhone SE (375×667 @2x)
- iPad Pro 12.9" (1024×1366 @2x)
- iPad 10th gen (820×1180 @2x)

Splash screen background matches the Coastal Dusk theme; centred Tide logo.

---

### 4.2 Install instructions banner

Because iOS does not fire `beforeinstallprompt`, the app must guide users manually.

**FR-05** Show an in-app install banner the first time a user visits from Safari on iOS and the app is not already installed.

Detection method:
- Check `navigator.standalone === false` (not installed)
- Check user-agent for iOS Safari
- Store a `pwa_install_dismissed` flag in localStorage; do not show again after dismissal

**FR-06** Banner content:
> To install Tide on your home screen: tap the **Share** button (↑) in Safari, then tap **Add to Home Screen**.

**FR-07** Banner must:
- Appear at the bottom of the screen (above the Safari toolbar)
- Be dismissible with a close (×) button
- Match the Coastal Dusk glass card style
- Not block the main UI

---

### 4.3 Offline support

**FR-08** The service worker must cache all static assets at install time (precache):
- All JS and CSS bundles
- `index.html`
- All icon and image assets
- Fonts (DM Sans, Playfair Display) — if self-hosted; if loaded from Google Fonts, cache on first fetch

**FR-09** The stretch library (`stretchLibrary.js`) and strength library (`strengthLibrary.js`) are bundled into the JS — no separate fetch needed. No extra work required.

**FR-10** Firebase Firestore SDK requests must use a **network-first** strategy with fallback to cache. If offline:
- Sessions already loaded into React state remain usable
- The user can complete a full session (Mobility or Strength) without network
- The save attempt on SessionSummary / StrengthSummary must queue offline and sync automatically when back online (Firestore SDK handles this natively via `enableIndexedDbPersistence`)

**FR-11** Enable Firestore offline persistence in `src/firebase/config.js`:
```javascript
import { enableIndexedDbPersistence } from 'firebase/firestore'
enableIndexedDbPersistence(db).catch(err => console.warn('Firestore persistence:', err.code))
```

**FR-12** If the app is loaded while offline and the cache is available, it must render the full UI — not a browser error page.

**FR-13** An offline indicator must appear in the Dashboard header when `navigator.onLine` is false — a small muted badge ("Offline — changes will sync when connected"). It must disappear automatically when online status returns.

---

### 4.4 Break timer notifications

The existing focus timer counts down and navigates to `BreakPrompt` when it reaches zero — but only while the app is open and in the foreground. On iOS, a background notification would allow the app to alert the user even when the screen is locked or the app is backgrounded.

**FR-14** Request Web Push notification permission after the user starts their first focus block. Show a permission prompt dialog (custom in-app) before calling `Notification.requestPermission()`.

**FR-15** Notification permission prompt text:
> "Allow Tide to remind you when your break is due? You can turn this off anytime in Settings."

Two buttons: **Allow** | **Not now**

**FR-16** When the focus timer starts, schedule a local notification for `workMinutes` from now using the Notifications API. Cancel and reschedule if the timer is reset or paused.

**FR-17** Notification content:
- Title: "Time to surface"
- Body: "Your {N}-minute focus block is done. Time to move."
- Icon: `/icons/apple-touch-icon.png`

**FR-18** Notification scheduling must use `setTimeout` + `new Notification(...)` for the primary path (no Service Worker Push needed for local scheduling). This works on iOS 16.4+ when the app is installed to the home screen and the user has granted permission.

**FR-19** If notification permission is denied or unavailable, the existing in-app BreakPrompt flow (navigating to the break screen) remains the fallback. The feature degrades gracefully.

**FR-20** Add a notification toggle to the Settings panel:
- Label: "Break reminders"
- Sub-label: "Requires iOS 16.4+ and app installed to home screen"
- Saves to `settings.notifications_enabled` in Firestore

---

### 4.5 Auto-update

**FR-21** When a new version of the app is deployed (new service worker detected), show an in-app update banner:
> "A new version of Tide is available."  
> **Reload** button

**FR-22** The update banner must not interrupt an active session (RoutinePlayer, StrengthSession). Check the current view state before showing it.

---

### 4.6 Storage considerations

**FR-23** On first load, call `navigator.storage.persist()` to request durable storage. This reduces the risk of iOS clearing the cache.

**FR-24** The app must not store session data in localStorage as the sole source — Firestore is the source of truth. localStorage is acceptable for UI preferences only (install banner dismissed, nudge dismissed, etc.).

---

## 5. Technical Implementation

### 5.1 Tooling

Use `vite-plugin-pwa` (wraps Workbox).

```bash
npm install -D vite-plugin-pwa
```

`vite.config.js` additions:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

VitePWA({
  registerType: 'prompt',         // manual update — show banner rather than auto-reload
  includeAssets: ['icons/*.png'], // include all icon assets in precache
  manifest: { ... },              // FR-01 fields
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } }
      },
      {
        urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
        handler: 'NetworkFirst',
        options: { cacheName: 'firestore-cache', networkTimeoutSeconds: 4 }
      }
    ]
  }
})
```

### 5.2 Files to create

| File | Purpose |
|---|---|
| `public/icons/apple-touch-icon.png` | 180×180 iOS home screen icon |
| `public/icons/icon-192.png` | 192×192 general icon |
| `public/icons/icon-512.png` | 512×512 general icon |
| `public/icons/icon-167.png` | 167×167 iPad icon |
| `public/icons/icon-152.png` | 152×152 iPad legacy icon |
| `public/splash/*.png` | Splash screens per FR-04 |
| `src/components/InstallBanner/InstallBanner.jsx` | FR-05–07 |
| `src/components/OfflineBanner/OfflineBanner.jsx` | FR-13 |
| `src/hooks/useOnlineStatus.js` | `navigator.onLine` + event listeners |
| `src/hooks/useNotifications.js` | Permission request + scheduling logic |
| `src/hooks/usePWAUpdate.js` | `vite-plugin-pwa` update event handler |

### 5.3 Files to modify

| File | Change |
|---|---|
| `vite.config.js` | Add VitePWA plugin |
| `index.html` | Add apple meta tags (FR-03), splash link tags (FR-04) |
| `src/firebase/config.js` | Add `enableIndexedDbPersistence` (FR-11) |
| `src/App.jsx` | Mount InstallBanner, OfflineBanner, usePWAUpdate; pass notification hook to useTimer |
| `src/components/Settings/Settings.jsx` | Add notifications toggle (FR-20) |

---

## 6. Icon & Asset Requirements

All icons should use the Tide concentric-circle mark on the Coastal Dusk background (`#e8ddd4`).

| Asset | Size | Format | Notes |
|---|---|---|---|
| `apple-touch-icon.png` | 180×180 | PNG | No rounded corners — iOS applies them |
| `icon-192.png` | 192×192 | PNG | |
| `icon-512.png` | 512×512 | PNG | |
| `icon-167.png` | 167×167 | PNG | iPad Pro |
| `icon-152.png` | 152×152 | PNG | iPad retina legacy |
| Splash screens | Various | PNG | See FR-04; can be generated from a single template |

Recommended tool for splash generation: `pwa-asset-generator`  
```bash
npx pwa-asset-generator logo.svg public/icons --index index.html --manifest public/manifest.json
```

---

## 7. Testing Requirements

| Test | Condition |
|---|---|
| Install banner appears | First visit in Safari on iOS, not installed |
| Install banner does not appear | Already installed (standalone mode) |
| Install banner does not appear again | After dismissal (localStorage flag set) |
| App loads offline | Kill network, reload from home screen |
| Session completes offline | Airplane mode during full routine |
| Session saves when back online | Complete session offline, restore network |
| Notification fires | Start timer, lock phone, wait N minutes |
| Notification does not fire | Permission denied |
| Update banner appears | Deploy new build, reload app |
| Update banner not shown during session | Active RoutinePlayer or StrengthSession |
| Offline badge shows/hides | Toggle airplane mode while app is open |

Test devices minimum:
- iPhone (Safari, iOS 16.4+)
- iPad (Safari, iPadOS 16.4+)
- iPhone (Safari, iOS 15) — verify graceful degradation of notifications

---

## 8. Out of Scope

- Android PWA install prompt
- Desktop PWA
- Server-side push notifications (APNs/VAPID)
- Bluetooth or NFC
- App Store / TestFlight distribution
- Offline AI or ML features

---

## 9. Open Questions

1. **Icons:** Do final icon assets exist, or do they need to be created from the existing SVG mark in the codebase?
2. **Notifications on iOS 15:** Users on iOS 15 will not receive notifications. Is a visible in-app warning required, or is silent degradation acceptable?
3. **Firestore offline persistence:** `enableIndexedDbPersistence` is deprecated in favour of `initializeFirestore` with `localCache`. Confirm which Firestore SDK version is in use before implementing (check `package.json`).
4. **Splash screen generation:** Automated via `pwa-asset-generator` or manually designed assets?
