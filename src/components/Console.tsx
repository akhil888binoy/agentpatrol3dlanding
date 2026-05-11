'use client'
import { useEffect, useRef, useState } from 'react'

const EVENTS = [
  { cls: 'ok',   t: '17:42:01', m: '>', msg: 'Sweep complete · <code>2,481</code> endpoints clean' },
  { cls: 'warn', t: '17:42:04', m: '~', msg: 'Baseline drift · <code>api-eu-3</code> · σ=0.31' },
  { cls: 'ok',   t: '17:42:06', m: '>', msg: 'Drift within tolerance · resuming' },
  { cls: 'crit', t: '17:42:09', m: '!', msg: 'Credential reuse · <code>185.220.x.x</code> · TOR exit' },
  { cls: 'warn', t: '17:42:09', m: '~', msg: 'Session revoked · keys rotated · token blacklisted <span class="tag">ACT</span>' },
  { cls: 'ok',   t: '17:42:10', m: '>', msg: 'Threat neutralized in <code>12ms</code> · paged on-call' },
  { cls: 'warn', t: '17:42:14', m: '~', msg: 'Signal pushed to swarm · <code>14 nodes</code> hardened <span class="tag">SYNC</span>' },
  { cls: 'ok',   t: '17:42:18', m: '>', msg: 'Resume patrol · all clear' },
  { cls: 'crit', t: '17:42:31', m: '!', msg: 'Prompt injection · agent-gpt-a7b · <code>QUARANTINED</code>' },
  { cls: 'ok',   t: '17:42:31', m: '>', msg: 'Playbook executed in <code>7ms</code> · incident filed' },
]

const BAR_HEIGHTS = [18, 28, 22, 36, 30, 24, 32, 20, 34, 26, 18, 30]

export function Console() {
  const [count, setCount] = useState(0)
  const [lat, setLat]     = useState('8.3')
  const keyRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(n => {
        if (n >= EVENTS.length) {
          keyRef.current += 1
          return 0
        }
        return n + 1
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setLat((7.4 + Math.random() * 2.2).toFixed(1)), 900)
    return () => clearInterval(id)
  }, [])

  const visible = EVENTS.slice(0, count)

  return (
    <section id="detect" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// Detection engine</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Watch the patrol<br />
              in <span className="accent">real time</span>.
            </h2>
          </div>
          <p className="lede">
            Every agent reports to a single command surface. Tail the live log, replay incidents frame-by-frame, or hand control to your SOC team.
          </p>
        </div>

        {/* Detect stage — console + signals */}
        <div className="detect-stage glass" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', overflow: 'hidden' }}>
          {/* Left: terminal */}
          <div style={{ borderRight: '1px solid var(--line-2)' }}>
            <div className="panel-head">
              <div className="left">
                <span className="dot" />
                PATROL.LOG · NODE-04
              </div>
              <div className="right" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green)', fontSize: 10, letterSpacing: '0.16em' }}>
                <span style={{ animation: 'blip 1.2s ease infinite' }}>●</span> LIVE
              </div>
            </div>

            <div style={{ padding: '20px 24px', minHeight: 360, fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace' }} key={keyRef.current}>
              {visible.map((ev, i) => (
                <div
                  key={i}
                  className={`console-line${ev.cls === 'crit' ? ' crit' : ev.cls === 'warn' ? ' warn' : ' ok'}`}
                  style={{ animationDelay: `0ms` }}
                >
                  <span className="t">{ev.t}</span>
                  <span className="m">{ev.m}</span>
                  <span dangerouslySetInnerHTML={{ __html: ev.msg }} />
                </div>
              ))}
              {count > 0 && count <= EVENTS.length && (
                <div className="console-line ok" style={{ animationDelay: '0ms' }}>
                  <span className="t" />
                  <span className="m" style={{ color: 'var(--ink-4)' }}>_</span>
                  <span style={{ color: 'var(--ink-4)', animation: 'blip 1s step-start infinite' }}>▌</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: signals */}
          <div style={{ padding: '0' }}>
            <div className="panel-head">
              <div className="left">
                <span className="dot amber" />
                SIGNAL MONITOR
              </div>
              <div className="right">NODE-04 / EU-WEST</div>
            </div>

            <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* P50 Latency */}
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>
                  P50 Detection Latency
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, monospace", fontSize: 36, fontWeight: 500, color: 'var(--green)', fontVariantNumeric: 'tabular-nums', textShadow: '0 0 20px rgba(94,179,255,0.4)' }}>
                    {lat}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>ms</span>
                </div>
                <div className="mini-bars">
                  {BAR_HEIGHTS.map((h, i) => (
                    <i key={i} style={{ height: h, animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>

              {/* Signal count */}
              <div style={{ paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10 }}>
                  Behavioral signals active
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, monospace", fontSize: 36, fontWeight: 500, color: 'var(--ink)' }}>
                    140
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--green)' }}>+ signals</span>
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['syscall', 'network', 'memory', 'process', 'file-io', 'auth'].map(tag => (
                    <span key={tag} style={{ fontSize: 10, padding: '3px 8px', border: '1px solid var(--line-3)', color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Egress */}
              <div style={{ paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>
                  Data egress
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, monospace", fontSize: 28, fontWeight: 500, color: 'var(--green)', textShadow: '0 0 14px rgba(94,179,255,0.35)' }}>
                    0
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>bytes / completely on-device</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
