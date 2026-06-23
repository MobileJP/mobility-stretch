import { useEffect, useRef } from 'react'
import styles from './OceanCanvas.module.css'

// ── Animation constants (copied from V2) ─────────────────────────────────────
const OCEAN = {
  sky:    ['#f6ddd0', '#f1d6cf', '#e6ccd8', '#d6cce0'],
  water:  ['#5f93aa', '#437a94', '#315f78', '#244c63'],
  waves:  [[105,158,178],[82,138,160],[62,118,142],[48,98,124],[38,80,104]],
  sunCol:  '255,230,200',
  sunGlow: '255,205,165',
}

const LAYERS = [
  { amp:26, freq:0.010, speed:0.012, yFrac:0.53, alpha:0.18 },
  { amp:18, freq:0.016, speed:0.018, yFrac:0.58, alpha:0.22 },
  { amp:22, freq:0.013, speed:0.010, yFrac:0.63, alpha:0.30 },
  { amp:14, freq:0.022, speed:0.022, yFrac:0.69, alpha:0.40 },
  { amp:10, freq:0.030, speed:0.028, yFrac:0.76, alpha:0.52 },
]

const PARTICLES = Array.from({ length: 34 }, () => ({
  x:     Math.random(),
  y:     0.5 + Math.random() * 0.34,
  size:  1.1 + Math.random() * 2.4,
  speed: 0.00012 + Math.random() * 0.0002,
  alpha: 0.12 + Math.random() * 0.38,
  phase: Math.random() * Math.PI * 2,
}))

// ─────────────────────────────────────────────────────────────────────────────
export default function OceanCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W, H, rafId

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)

      // Sky gradient
      const sg = ctx.createLinearGradient(0, 0, 0, H * 0.6)
      OCEAN.sky.forEach((c, i) => sg.addColorStop(i / 3, c))
      ctx.fillStyle = sg
      ctx.fillRect(0, 0, W, H)

      // Sun glow
      const sx = W * 0.74, sy = H * 0.17
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * 0.24)
      glow.addColorStop(0,    `rgba(${OCEAN.sunGlow},0.28)`)
      glow.addColorStop(0.45, `rgba(${OCEAN.sunGlow},0.08)`)
      glow.addColorStop(1,    `rgba(${OCEAN.sunGlow},0)`)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      // Sun disc
      ctx.beginPath()
      ctx.arc(sx, sy, H * 0.04, 0, Math.PI * 2)
      const disc = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * 0.04)
      disc.addColorStop(0, `rgba(${OCEAN.sunCol},0.95)`)
      disc.addColorStop(1, `rgba(${OCEAN.sunGlow},0.55)`)
      ctx.fillStyle = disc
      ctx.fill()

      // Water base
      const wg = ctx.createLinearGradient(0, H * 0.5, 0, H)
      OCEAN.water.forEach((c, i) => wg.addColorStop(i / 3, c))
      ctx.fillStyle = wg
      ctx.fillRect(0, H * 0.5, W, H * 0.5)

      // Wave layers
      LAYERS.forEach((L, i) => {
        const c = OCEAN.waves[i], baseY = H * L.yFrac
        const pts = []
        for (let x = 0; x <= W + 4; x += 6) {
          pts.push([
            x,
            baseY
            + Math.sin(x * L.freq + t * L.speed * 60) * L.amp
            + Math.sin(x * L.freq * 1.7 + t * L.speed * 40 + 1.2) * L.amp * 0.4
            + Math.sin(x * L.freq * 0.5 + t * L.speed * 20 + 2.5) * L.amp * 0.25,
          ])
        }

        ctx.beginPath()
        ctx.moveTo(0, H)
        pts.forEach(([x, y]) => ctx.lineTo(x, y))
        ctx.lineTo(W, H)
        ctx.closePath()

        const fg = ctx.createLinearGradient(0, baseY - L.amp, 0, H)
        fg.addColorStop(0,   `rgba(${c[0]+30},${c[1]+30},${c[2]+30},${L.alpha*0.6})`)
        fg.addColorStop(0.3, `rgba(${c[0]},${c[1]},${c[2]},${L.alpha})`)
        fg.addColorStop(1,   `rgba(${c[0]-10},${c[1]-10},${c[2]-10},${L.alpha*1.15})`)
        ctx.fillStyle = fg
        ctx.fill()

        ctx.beginPath()
        pts.forEach(([x, y], j) => j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
        ctx.strokeStyle = `rgba(255,255,255,${L.alpha * 0.5})`
        ctx.lineWidth = 1.1
        ctx.stroke()
      })

      // Particles
      PARTICLES.forEach(p => {
        p.x += p.speed
        if (p.x > 1.05) p.x = -0.05
        const shimmer = 0.5 + 0.5 * Math.sin(t * 2 + p.phase)
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * shimmer})`
        ctx.fill()
      })
    }

    const loop = (ts) => {
      draw(ts * 0.001)
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize()
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
