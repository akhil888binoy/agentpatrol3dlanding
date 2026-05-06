'use client'
import { useEffect, useRef } from 'react'

const CHARGE_MS = 300   // ms to ramp 0 → 1 after entering the circle

export function LaserEffect() {
  const cvs       = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -1000, y: -1000 })
  const raf       = useRef<number | null>(null)
  const enterTime = useRef<number | null>(null)

  useEffect(() => {
    const el = cvs.current
    if (!el) return
    const ctx = el.getContext('2d')!

    const resize = () => { el.width = window.innerWidth; el.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    /* ── draw one laser beam (multiple glow layers) ─────────────────────── */
    const drawBeam = (
      x1: number, y1: number,
      x2: number, y2: number,
      charge: number,
    ) => {
      // jitter while charging
      const jAmt = (1 - charge) * 5
      const ex = x2 + (jAmt ? (Math.random() - .5) * jAmt : 0)
      const ey = y2 + (jAmt ? (Math.random() - .5) * jAmt : 0)

      const flicker = charge >= 1 ? .82 + Math.sin(Date.now() * .04) * .18 : charge

      const pass = (w: number, blur: number, color: string, alpha: number) => {
        ctx.save()
        ctx.globalAlpha = alpha * flicker
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(ex, ey)
        ctx.strokeStyle = color
        ctx.lineWidth   = w
        ctx.lineCap     = 'round'
        ctx.shadowBlur  = blur
        ctx.shadowColor = '#ff0000'
        ctx.stroke()
        ctx.restore()
      }

      pass(26, 0,  'rgba(255,  20,  0, .05)', 1)   // wide ambient
      pass(12, 45, 'rgba(255,  30,  0, .18)', 1)   // outer glow
      pass( 5, 22, 'rgba(255,  60, 20, .45)', 1)   // mid glow
      pass( 2, 10, 'rgba(255, 120, 40, .80)', 1)   // inner
      pass( 1,  4, 'rgba(255, 220,180, .95)', 1)   // white-hot core
    }

    /* ── energy sparks along beam ───────────────────────────────────────── */
    const drawSparks = (
      x1: number, y1: number,
      x2: number, y2: number,
      charge: number,
    ) => {
      if (charge < 1) return
      for (let i = 1; i <= 4; i++) {
        const t = i / 5
        const sx = x1 + (x2 - x1) * t + (Math.random() - .5) * 5
        const sy = y1 + (y2 - y1) * t + (Math.random() - .5) * 5
        ctx.save()
        ctx.globalAlpha = Math.random() * .5 + .2
        ctx.beginPath()
        ctx.arc(sx, sy, .8 + Math.random() * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = '#ff6040'
        ctx.shadowBlur = 6
        ctx.shadowColor = '#ff2000'
        ctx.fill()
        ctx.restore()
      }
    }

    /* ── muzzle flash at eye ────────────────────────────────────────────── */
    const drawMuzzle = (x: number, y: number, charge: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 18 * charge)
      g.addColorStop(0,   `rgba(255, 200, 150, ${charge * .8})`)
      g.addColorStop(.5,  `rgba(255,  60,  20, ${charge * .35})`)
      g.addColorStop(1,   'rgba(200,   0,   0, 0)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, 18 * charge, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.shadowBlur = 18
      ctx.shadowColor = '#ff0000'
      ctx.fill()
      ctx.restore()
    }

    /* ── impact burst at cursor ─────────────────────────────────────────── */
    const drawImpact = (x: number, y: number, charge: number, sec: number) => {
      const pulse = charge >= 1 ? .75 + Math.sin(sec * 20) * .25 : charge

      // radial fireball
      const g = ctx.createRadialGradient(x, y, 0, x, y, 30 * charge)
      g.addColorStop(0,  `rgba(255, 180,  80, ${pulse * .9})`)
      g.addColorStop(.3, `rgba(255,  40,   0, ${pulse * .5})`)
      g.addColorStop(.7, `rgba(180,   0,   0, ${pulse * .2})`)
      g.addColorStop(1,  'rgba(100,   0,   0, 0)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, 30 * charge, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.shadowBlur = 28
      ctx.shadowColor = '#ff2200'
      ctx.fill()
      ctx.restore()

      // pulsing rings
      const r1 = (8 + Math.sin(sec * 16) * 4) * charge
      const r2 = r1 * 2.2

      for (const [r, a] of [[r1, .7], [r2, .3]] as [number, number][]) {
        ctx.save()
        ctx.globalAlpha = pulse * a
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.strokeStyle = '#ff3300'
        ctx.lineWidth   = 1.5
        ctx.shadowBlur  = 10
        ctx.shadowColor = '#ff0000'
        ctx.stroke()
        ctx.restore()
      }

      // 8 spark lines
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + sec * 3
        ctx.save()
        ctx.globalAlpha = pulse * (.4 + Math.random() * .4)
        ctx.beginPath()
        ctx.moveTo(x + Math.cos(ang) *  8,         y + Math.sin(ang) *  8)
        ctx.lineTo(x + Math.cos(ang) * (16 + 14 * charge), y + Math.sin(ang) * (16 + 14 * charge))
        ctx.strokeStyle = i % 2 === 0 ? '#ff5020' : '#ff8040'
        ctx.lineWidth   = 1.5
        ctx.lineCap     = 'round'
        ctx.shadowBlur  = 6
        ctx.shadowColor = '#ff2000'
        ctx.stroke()
        ctx.restore()
      }

      // crosshair lock
      const ch = 12 * charge
      ctx.save()
      ctx.globalAlpha = pulse * .75
      ctx.strokeStyle = 'rgba(255, 120, 60, .85)'
      ctx.lineWidth   = 1
      ctx.shadowBlur  = 6
      ctx.shadowColor = '#ff2000'
      for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]] as [number,number][]) {
        ctx.beginPath()
        ctx.moveTo(x + dx * 4,  y + dy * 4)
        ctx.lineTo(x + dx * ch, y + dy * ch)
        ctx.stroke()
      }
      ctx.restore()
    }

    /* ── main RAF loop ──────────────────────────────────────────────────── */
    const tick = (now: number) => {
      ctx.clearRect(0, 0, el.width, el.height)
      const sec = now * .001

      // locate the robot art container
      const art = document.getElementById('hero-robot-art')
      if (!art) { raf.current = requestAnimationFrame(tick); return }

      const rect = art.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        enterTime.current = null
        raf.current = requestAnimationFrame(tick)
        return
      }

      // robot center in screen coords
      const cx = rect.left + rect.width  * 0.5
      const cy = rect.top  + rect.height * 0.5

      // detection radius = the outer amber ring (120 % of hero-art width / 2)
      const triggerR = rect.width * 0.6

      // eye positions: use real 3D projection if EyeTracker has data, else estimate
      const eyes = (typeof window !== 'undefined') ? (window as Window & { __robotEyes?: { left: { fx: number; fy: number }; right: { fx: number; fy: number } } }).__robotEyes : undefined
      let lEyeX: number, lEyeY: number, rEyeX: number, rEyeY: number
      if (eyes) {
        lEyeX = rect.left + eyes.left.fx  * rect.width
        lEyeY = rect.top  + eyes.left.fy  * rect.height
        rEyeX = rect.left + eyes.right.fx * rect.width
        rEyeY = rect.top  + eyes.right.fy * rect.height
      } else {
        const eyeOX = rect.width * 0.04
        lEyeX = cx - eyeOX;  lEyeY = rect.top + rect.height * 0.27
        rEyeX = cx + eyeOX;  rEyeY = rect.top + rect.height * 0.27
      }

      const mx = mouse.current.x
      const my = mouse.current.y
      const distToCenter = Math.hypot(mx - cx, my - cy)
      const inZone = distToCenter < triggerR && distToCenter > 12

      // charge ramp
      if (inZone) {
        if (enterTime.current === null) enterTime.current = now
      } else {
        enterTime.current = null
      }
      const charge = enterTime.current !== null
        ? Math.min(1, (now - enterTime.current) / CHARGE_MS)
        : 0

      if (charge <= 0) { raf.current = requestAnimationFrame(tick); return }

      // ── left eye laser ────────────────────────────────────────────────
      drawBeam(lEyeX, lEyeY, mx, my, charge)
      drawSparks(lEyeX, lEyeY, mx, my, charge)
      drawMuzzle(lEyeX, lEyeY, charge)

      // ── right eye laser ───────────────────────────────────────────────
      drawBeam(rEyeX, rEyeY, mx, my, charge)
      drawSparks(rEyeX, rEyeY, mx, my, charge)
      drawMuzzle(rEyeX, rEyeY, charge)

      // ── shared impact at cursor ───────────────────────────────────────
      drawImpact(mx, my, charge, sec)

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <canvas
      ref={cvs}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9990 }}
    />
  )
}
