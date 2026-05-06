'use client'
import { Fragment, useEffect, useRef, useState } from 'react'

type LogEntry = {
  time: string
  lvl: string
  lvlColor: string
  msg: React.ReactNode
}

const logEntries: LogEntry[] = [
  { time: '17:42:01', lvl: 'OK',    lvlColor: 'var(--green)', msg: <>Sweep complete · <b style={{ color: '#fff', fontWeight: 600 }}>2,481</b> endpoints clean</> },
  { time: '17:42:04', lvl: 'SCAN',  lvlColor: 'var(--amber)', msg: <>Baseline drift on <b style={{ color: '#fff', fontWeight: 600 }}>api-eu-3</b> · σ=0.31</> },
  { time: '17:42:06', lvl: 'OK',    lvlColor: 'var(--green)', msg: <>Drift within tolerance · resuming</> },
  { time: '17:42:09', lvl: 'ALERT', lvlColor: 'var(--red)',   msg: <>Credential reuse from <b style={{ color: '#fff', fontWeight: 600 }}>185.220.x.x</b> · TOR exit</> },
  { time: '17:42:09', lvl: 'ACT',   lvlColor: 'var(--amber)', msg: <>Session revoked · keys rotated · token blacklisted</> },
  { time: '17:42:10', lvl: 'OK',    lvlColor: 'var(--green)', msg: <>Threat neutralized in <b style={{ color: '#fff', fontWeight: 600 }}>12ms</b> · paged on-call</> },
  { time: '17:42:14', lvl: 'SYNC',  lvlColor: 'var(--amber)', msg: <>Signal pushed to swarm · <b style={{ color: '#fff', fontWeight: 600 }}>14 nodes</b> hardened</> },
  { time: '17:42:18', lvl: 'OK',    lvlColor: 'var(--green)', msg: <>Resume patrol · all clear</> },
]

const lvlShadow: Record<string, string> = {
  OK:    '0 0 8px rgba(57,217,138,0.75)',
  ALERT: '0 0 10px rgba(255,59,59,0.9)',
  ACT:   '0 0 8px rgba(255,176,32,0.65)',
  SCAN:  '0 0 8px rgba(255,176,32,0.55)',
  SYNC:  '0 0 8px rgba(255,176,32,0.55)',
}

const monoFont = 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace'
const orbFont = 'var(--font-orbitron), "Orbitron", sans-serif'

export function Console() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ padding: '80px 0', position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div
          className="console-grid"
          style={{
            border: '1px solid var(--line-2)',
            background: '#0a0a0d',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 0,
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(24px)',
            transition: visible ? 'opacity 0.65s ease, transform 0.65s ease' : 'none',
          }}
        >
          {/* Left panel */}
          <div
            className="console-border-right"
            style={{ padding: 48, borderRight: '1px solid var(--line)' }}
          >
            <div className="sec-eyebrow">// LIVE OPS</div>
            <h2
              style={{
                fontFamily: orbFont,
                fontWeight: 800,
                fontSize: 40,
                letterSpacing: '.02em',
                lineHeight: 1.1,
                margin: '16px 0 16px',
                color: 'var(--ink)',
              }}
            >
              Watch the patrol<br />in real time.
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                color: 'var(--ink-dim)',
                fontSize: 14,
                lineHeight: 1.7,
                margin: '0 0 24px',
              }}
            >
              Every agent reports to a single command surface. Tail the live log, replay incidents frame-by-frame, or hand control off to your SOC team.
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                fontFamily: monoFont,
                fontSize: 13,
                color: 'var(--ink)',
              }}
            >
              <li className="console-list-item">Stream logs over gRPC, Kafka, or stdout</li>
              <li className="console-list-item">Replay any incident with full state diffs</li>
              <li className="console-list-item">Custom playbooks in TypeScript or YAML</li>
              <li className="console-list-item">Native integrations: PagerDuty, Slack, Linear, Jira</li>
            </ul>
          </div>

          {/* Right panel — log */}
          <div
            style={{
              background: '#06060a',
              padding: 24,
              fontFamily: monoFont,
              fontSize: 13,
              lineHeight: 1.8,
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.02) 0 1px, transparent 1px 3px)',
            }}
          >
            {/* Console bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--ink-mute)',
                fontSize: 11,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--line)',
                paddingBottom: 12,
                marginBottom: 16,
              }}
            >
              <span>PATROL.LOG · NODE-04</span>
              <span className="live-label">LIVE</span>
            </div>

            {/* Log entries grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto 1fr',
                gap: '8px 14px',
                color: 'var(--ink-dim)',
              }}
            >
              {logEntries.map((entry, i) => (
                <Fragment key={i}>
                  <span style={{
                    color: 'var(--ink-mute)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(6px)',
                    transition: visible ? `opacity 0.4s ${120 + i * 85}ms ease, transform 0.4s ${120 + i * 85}ms ease` : 'none',
                  }}>
                    {entry.time}
                  </span>
                  <span
                    className={entry.lvl === 'ALERT' ? 'log-alert-pulse' : ''}
                    style={{
                      color: entry.lvlColor,
                      textShadow: lvlShadow[entry.lvl] ?? 'none',
                      opacity: visible ? 1 : 0,
                      transition: visible ? `opacity 0.4s ${120 + i * 85}ms ease` : 'none',
                    }}
                  >
                    {entry.lvl}
                  </span>
                  <span style={{
                    color: '#d6d6dc',
                    opacity: visible ? 1 : 0,
                    transition: visible ? `opacity 0.4s ${120 + i * 85}ms ease` : 'none',
                  }}>
                    {entry.msg}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
