'use client'
import { useEffect, useState } from 'react'
import { SceneWrapper } from './SceneWrapper'

const mono = 'var(--font-jetbrains-mono), ui-monospace, monospace'

function HudCard({ style, accent, label, children }: {
  style: React.CSSProperties
  accent: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div style={{
      position: 'absolute',
      background: 'rgba(6,14,34,0.88)',
      border: `1px solid ${accent}33`,
      backdropFilter: 'blur(14px)',
      padding: '10px 14px',
      fontFamily: mono,
      zIndex: 10,
      ...style,
    }}>
      <div style={{ fontSize: 9, letterSpacing: '0.18em', color: accent, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7, textTransform: 'uppercase' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}`, flexShrink: 0, animation: 'pulse 1.6s ease infinite' }} />
        {label}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{children}</div>
    </div>
  )
}

export function Hero() {
  const [tick, setTick] = useState(true)
  const [blocked, setBlocked] = useState(2481)

  useEffect(() => {
    const id = setInterval(() => setTick(t => !t), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.4) setBlocked(n => n + 1)
    }, 1100)
    return () => clearInterval(id)
  }, [])


  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--bg-1)' }}>

      {/* Subtle blue grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'linear-gradient(rgba(94,179,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,179,255,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%)',
      }} />

      {/* Blue ambient orb behind robot */}
      <div style={{
        position: 'absolute', left: '50%', top: '42%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,80,200,0.38) 0%, rgba(10,40,130,0.18) 40%, transparent 70%)',
        filter: 'blur(48px)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'pulse-glow 5s ease-in-out infinite',
      }} />

      {/* ── Corner labels ── */}
      <div style={{ position: 'absolute', top: 90, left: 28, fontFamily: mono, fontSize: 10, color: 'rgba(94,179,255,0.35)', letterSpacing: '0.12em', zIndex: 10 }}>S-01</div>
      <div style={{ position: 'absolute', top: 90, right: 28, fontFamily: mono, fontSize: 10, color: 'rgba(94,179,255,0.35)', letterSpacing: '0.12em', textAlign: 'right', zIndex: 10, lineHeight: 1.8 }}>
        v3.3<br /><span style={{ opacity: 0.55 }}>01001 // index</span>
      </div>

      {/* ── Side rails ── */}
      <div style={{
        position: 'absolute', left: 10, top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        fontFamily: mono, fontSize: 9, letterSpacing: '0.22em',
        color: 'rgba(94,179,255,0.22)', whiteSpace: 'nowrap', zIndex: 10,
      }}>
        AGENTPATROL &mdash; INDEX 0.42 &mdash; 2026 &mdash;
      </div>
      <div style={{
        position: 'absolute', right: 10, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: mono, fontSize: 9, letterSpacing: '0.22em',
        color: 'rgba(94,179,255,0.22)', whiteSpace: 'nowrap', zIndex: 10,
      }}>
        PATROLS ACTIVE &mdash; LIVE &mdash; 24/7 &mdash;
      </div>

      {/* ── Floating binary decorations ── */}
      {[
        { text: '10011000_', left: '27%',  top:  '20%' },
        { text: '119100_',   right: '25%', top:  '28%' },
        { text: '11100_',    right: '34%', top:  '54%' },
        { text: '000',       right: '26%', bottom: '24%' },
      ].map(({ text, ...pos }) => (
        <div key={text} style={{
          position: 'absolute', ...pos,
          fontFamily: mono, fontSize: 11,
          color: 'rgba(94,179,255,0.2)', letterSpacing: '0.15em',
          zIndex: 2, pointerEvents: 'none',
        }}>{text}</div>
      ))}

      {/* ── HUD cards ── */}
      <HudCard style={{ left: '26%', top: '22%' }} accent="var(--blue)" label="Session · Live">
        agent_047 · llm runtime{' '}
        <span style={{ color: 'var(--blue)', fontWeight: 700 }}>ACTIVE</span>
      </HudCard>

      <HudCard style={{ right: '14%', top: '32%' }} accent="#ff4d57" label="Breach · Detected">
        {blocked.toLocaleString()} threats{' '}
        <span style={{ color: '#ff4d57', fontWeight: 700 }}>BLOCKED</span>
      </HudCard>

      <HudCard style={{ right: '18%', top: '54%' }} accent="var(--blue)" label="Runtime Policy · Enforced">
        call intercepted{' '}
        <span style={{ color: 'var(--blue)', fontWeight: 700 }}>SAFE ↑</span>
      </HudCard>

      {/* ── 3D Robot ── */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '44%',
        transform: 'translate(-50%, -50%)',
        width: 'min(74vw, 980px)',
        height: 'min(95vh, 1100px)',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
          <SceneWrapper />
        </div>
      </div>

      {/* ── Eyebrow ── */}
      <div style={{
        position: 'absolute', bottom: '37%', left: '4%',
        fontFamily: mono, fontSize: 11, letterSpacing: '0.2em',
        color: 'var(--ink-3)', zIndex: 6,
      }}>
        AI AGENT GOVERNANCE PLATFORM{' '}
        <span style={{ opacity: tick ? 1 : 0, transition: 'opacity 0.1s' }}>▌</span>
      </div>

      {/* ── Massive headline ── */}
      <h1 style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        margin: 0, padding: '0 3.5vw 0.5vw',
        fontFamily: 'var(--font-space-grotesk), sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(58px, 13.5vw, 208px)',
        lineHeight: 0.88,
        letterSpacing: '-0.025em',
        color: 'var(--ink)',
        textTransform: 'uppercase',
        zIndex: 4,
        userSelect: 'none',
      }}>
        Govern<br />Your Agents
      </h1>

      {/* ── Blue bar + EN ── */}
      <div style={{ position: 'absolute', bottom: 28, left: 28, zIndex: 10 }}>
        <div style={{
          width: 110, height: 3,
          background: 'var(--blue)',
          boxShadow: '0 0 14px rgba(94,179,255,0.7)',
          marginBottom: 8,
        }} />
        <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(94,179,255,0.4)' }}>EN</div>
      </div>

    </section>
  )
}
