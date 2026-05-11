'use client'
import { useEffect, useRef, useState } from 'react'

const mono = "var(--font-jetbrains-mono), ui-monospace, monospace"
const sg   = "var(--font-space-grotesk), sans-serif"

const FILES = [
  { path: '/etc/passwd',             icon: 'doc',   crit: false },
  { path: '/var/log/auth.log',       icon: 'doc',   crit: false },
  { path: '/home/user/.ssh/id_rsa',  icon: 'key',   crit: true  },
  { path: '/tmp/.x1f2 (unsigned)',   icon: 'alert', crit: true  },
  { path: '/var/bin/curl',           icon: 'doc',   crit: false },
]

const LOGS = [
  { t: '01.00', text: 'agent[scraper-worker] spawned child: /bin/sh -c curl', lvl: 'warn' },
  { t: '02.20', text: 'agent accessed /etc/passwd',                            lvl: 'ok'   },
  { t: '04.20', text: 'unusual outbound traffic spike to 185.42.xx.xx:443',   lvl: 'crit' },
  { t: '05.10', text: 'executing unknown script from /tmp/.x1f2',              lvl: 'crit' },
  { t: '06.00', text: 'signature mismatch: unsigned binary',                   lvl: 'crit' },
]

const BARS = [28,33,30,38,35,42,40,48,45,52,50,55,58,62,56,65,68,72,66,75,78,82,76,86,90,84,92,96,94,100]

function FileIcon({ type }: { type: string }) {
  if (type === 'key') return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="4.5"/><path d="M10.9 10.9L21 21M16 16l-3 3"/>
    </svg>
  )
  if (type === 'alert') return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )
}

const STATS = [
  { num: '0.8ms', label: 'Time to block IMDS credential theft attempt' },
  { num: '3',     label: 'Enforcement actions fired automatically' },
  { num: '4.2s',  label: 'Complete threat detection and neutralization' },
]

export function Demo() {
  const [step,        setStep]        = useState(0)
  const [cycle,       setCycle]       = useState(1)
  const [elapsed,     setElapsed]     = useState(0)
  const [intentScore, setIntentScore] = useState(0)
  const stepTimer  = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const tickTimer  = useRef<ReturnType<typeof setInterval> | null>(null)

  const verdict     = step >= 5 ? 'blocked' : step >= 3 ? 'evaluating' : 'pending'
  const alertActive = step >= 4

  const vis = (threshold: number): React.CSSProperties => ({
    opacity: step >= threshold ? 1 : 0,
    transform: step >= threshold ? 'none' : 'translateY(5px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  })

  const reset = () => {
    setStep(0)
    setElapsed(0)
    setIntentScore(0)
    setCycle(c => c + 1)
  }

  // Elapsed ticker — restarts each cycle
  useEffect(() => {
    if (tickTimer.current) clearInterval(tickTimer.current)
    tickTimer.current = setInterval(() => setElapsed(e => e + 0.1), 100)
    return () => { if (tickTimer.current) clearInterval(tickTimer.current) }
  }, [cycle])

  // Step advancement
  useEffect(() => {
    if (stepTimer.current) clearTimeout(stepTimer.current)
    if (step >= 5) { stepTimer.current = setTimeout(reset, 3200); return }
    stepTimer.current = setTimeout(() => setStep(s => s + 1), step === 0 ? 700 : 1400)
    return () => { if (stepTimer.current) clearTimeout(stepTimer.current) }
  }, [step])

  // Intent score
  useEffect(() => {
    const raw = step <= 2 ? step * 0.14 : step * 0.19
    setIntentScore(Math.min(raw, 0.89))
  }, [step])

  const elapsedStr = `t+${String(elapsed.toFixed(2)).padStart(5, '0')}s`
  const subCard: React.CSSProperties = {
    background: 'linear-gradient(160deg, rgba(20,46,95,0.2), rgba(8,20,45,0.45))',
    border: '1px solid rgba(113,161,241,0.28)',
    borderRadius: 8, padding: 16, marginBottom: 12,
    boxShadow: 'inset 0 1px 0 rgba(160,199,255,0.18)',
  }

  return (
    <section id="demo" className="hero-theme-section" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// See It In Action</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Watch AgentPatrol catch<br />a real threat in real time.
            </h2>
          </div>
          <p className="lede">
            This panel is live: watch the attack unfold, escalate, and get blocked. The simulation loops continuously while visible.
          </p>
        </div>

        {/* ── Dashboard ── */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(10,22,48,0.96), rgba(6,14,33,0.96))',
          border: '1px solid rgba(123,171,246,0.35)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 26px 60px rgba(2,8,24,0.62), inset 0 1px 0 rgba(170,205,255,0.14)',
        }}>

          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 20px', borderBottom: '1px solid var(--line)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 32, height: 32, border: '1px solid var(--line-2)', borderRadius: 7, display: 'grid', placeItems: 'center', color: 'var(--ink-3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7l-9-5z"/></svg>
              </div>
              <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--ink)' }}>
                incident-<span style={{ color: 'var(--blue)' }}>#A-4812</span>
              </span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
                borderRadius: 20, border: '1px solid rgba(94,179,255,0.28)',
                background: 'rgba(94,179,255,0.12)',
                fontFamily: mono, fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em',
                boxShadow: '0 0 14px rgba(94,179,255,0.2)',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 1.6s ease infinite' }} />
                {elapsedStr} · cycle {cycle}
              </div>
            </div>

            {/* Alert pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '6px 16px', borderRadius: 20,
              border: `1px solid ${alertActive ? 'rgba(94,179,255,0.65)' : 'rgba(255,255,255,0.08)'}`,
              background: alertActive ? 'rgba(94,179,255,0.18)' : 'transparent',
              fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
              color: alertActive ? 'var(--blue)' : 'var(--ink-4)',
              transition: 'all 0.4s ease',
              boxShadow: alertActive ? '0 0 18px rgba(94,179,255,0.22)' : 'none',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: alertActive ? 'var(--blue)' : 'var(--ink-4)',
                display: 'inline-block',
                animation: alertActive ? 'pulse 1.2s ease infinite' : 'none',
              }} />
              ALERT
            </div>
          </div>

          {/* Two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

            {/* ── LEFT: Agent Activity ── */}
            <div style={{ borderRight: '1px solid var(--line)', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: sg, fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Agent activity</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>scraper-worker · local runtime</div>
                </div>
                <div style={{ width: 28, height: 28, border: '1px solid var(--line)', borderRadius: 6, display: 'grid', placeItems: 'center', color: 'var(--ink-4)' }}><GearIcon /></div>
              </div>

              {/* Filesystem */}
              <div style={subCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Filesystem</span>
                  <span style={{ fontFamily: mono, fontSize: 10, padding: '2px 8px', border: '1px solid var(--line-2)', borderRadius: 4, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>READ</span>
                </div>
                <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {FILES.map((f, i) => (
                      <div key={f.path} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: mono, fontSize: 12, color: f.crit ? 'var(--red)' : 'var(--ink-2)', ...vis(i + 1) }}>
                        <span style={{ color: f.crit ? 'var(--red)' : 'var(--ink-4)', flexShrink: 0 }}><FileIcon type={f.icon} /></span>
                        {f.path}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    fontFamily: mono, fontSize: 11, color: 'var(--ink-4)',
                    ...(step === 0 ? { animation: 'blip 1s step-start infinite' } : { opacity: 0, transition: 'opacity 0.2s ease' }),
                    pointerEvents: 'none',
                  }}>scanning...</div>
                </div>
              </div>

              {/* Outbound Connections */}
              <div style={{ ...subCard, borderColor: step >= 3 ? 'rgba(94,179,255,0.5)' : 'var(--line)', transition: 'border-color 0.4s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Outbound Connections</span>
                  <span style={{ fontFamily: mono, fontSize: 10, padding: '2px 8px', border: `1px solid ${step >= 3 ? 'rgba(94,179,255,0.4)' : 'var(--line)'}`, borderRadius: 4, color: step >= 3 ? 'var(--blue)' : 'var(--ink-4)', letterSpacing: '0.1em', transition: 'all 0.4s ease' }}>
                    {step >= 3 ? 'ANOMALY' : 'NORMAL'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 68, marginBottom: 10 }}>
                  {BARS.map((h, i) => {
                    const pct  = step < 2 ? h * 0.25 : step < 3 ? h * 0.55 : h
                    const warm = h > 60 && step >= 3
                    return (
                      <div key={i} style={{
                        flex: 1, height: `${pct}%`, borderRadius: '2px 2px 0 0',
                        background: warm
                          ? `linear-gradient(to top, rgba(255,77,87,0.86), rgba(94,179,255,0.72))`
                          : `linear-gradient(to top, rgba(94,179,255,0.72), rgba(94,179,255,0.28))`,
                        transition: 'height 0.7s ease, background 0.4s ease',
                      }} />
                    )
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, color: 'var(--ink-3)' }}>
                  <span>185.42.xx.xx:443</span>
                  <span style={{ color: step >= 3 ? 'var(--blue)' : 'var(--ink-4)', transition: 'color 0.4s ease' }}>
                    {step >= 3 ? '+4,300/s' : 'nominal'}
                  </span>
                </div>
              </div>

              {/* Agent Intent */}
              <div style={{ ...subCard, marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Agent Intent</span>
                  <span style={{ fontFamily: mono, fontSize: 11, padding: '2px 8px', border: '1px solid var(--line-2)', borderRadius: 4, color: intentScore > 0.5 ? 'var(--red)' : intentScore > 0.25 ? 'var(--blue)' : 'var(--ink-3)', transition: 'color 0.4s ease' }}>
                    {intentScore.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14, height: 48, overflow: 'hidden' }}>
                  <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--blue)', ...vis(2) }}>&gt; read credential material</div>
                  <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--red)', ...vis(4) }}>&gt; establish remote shell</div>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${intentScore * 100}%`, background: 'linear-gradient(90deg, #67bcff, #5f86ff, var(--red))', borderRadius: 2, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            </div>

            {/* ── RIGHT: System Response ── */}
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: sg, fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>System response</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>agentpatrol · runtime guard</div>
                </div>
                <div style={{ width: 28, height: 28, border: '1px solid var(--line)', borderRadius: 6, display: 'grid', placeItems: 'center', color: 'var(--ink-4)' }}><GearIcon /></div>
              </div>

              {/* Verdict */}
              <div style={{
                ...subCard,
                borderColor: verdict === 'blocked' ? 'rgba(255,77,87,0.4)' : verdict === 'evaluating' ? 'rgba(94,179,255,0.45)' : 'var(--line)',
                background:  verdict === 'blocked' ? 'rgba(255,77,87,0.08)'  : 'linear-gradient(160deg, rgba(20,46,95,0.2), rgba(8,20,45,0.45))',
                transition: 'all 0.4s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, flexShrink: 0, display: 'grid', placeItems: 'center',
                    background: verdict === 'blocked' ? 'rgba(255,77,87,0.14)' : 'rgba(94,179,255,0.1)',
                    border: `1px solid ${verdict === 'blocked' ? 'rgba(255,77,87,0.3)' : 'var(--line)'}`,
                    color: verdict === 'blocked' ? 'var(--red)' : 'var(--ink-3)',
                    transition: 'all 0.4s ease',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7l-9-5z"/>
                      {verdict === 'blocked' && <path d="M9 12l2 2 4-4" strokeWidth="2.5"/>}
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 5 }}>Verdict</div>
                    <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 13, lineHeight: 1.4, color: verdict === 'blocked' ? 'var(--red)' : 'var(--ink-2)', transition: 'color 0.4s ease' }}>
                      {verdict === 'blocked'   ? 'Threat confirmed · enforcement active'
                      : verdict === 'evaluating' ? 'High-risk pattern detected · escalating'
                      :                           'Correlating signals · evaluating policy...'}
                    </div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: verdict === 'blocked' ? 'var(--red)' : 'var(--ink-4)', flexShrink: 0, transition: 'color 0.4s ease' }}>
                    {verdict}
                  </div>
                </div>
              </div>

              {/* Live Log Feed */}
              <div style={{ ...subCard, marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Live Log Feed</span>
                  <span style={{ fontFamily: mono, fontSize: 10, padding: '2px 8px', border: '1px solid rgba(94,179,255,0.5)', borderRadius: 4, color: 'var(--blue)', letterSpacing: '0.1em', boxShadow: '0 0 10px rgba(94,179,255,0.18)' }}>STREAMING</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, height: 200, overflow: 'hidden' }}>
                  {LOGS.map((log, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: mono, fontSize: 11.5, lineHeight: 1.5, flexShrink: 0, ...vis(i + 1) }}>
                      <span style={{ color: 'var(--ink-4)', flexShrink: 0 }}>[{log.t}]</span>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 5, background: log.lvl === 'crit' ? 'var(--red)' : log.lvl === 'warn' ? 'var(--blue)' : 'var(--green)' }} />
                      <span style={{ color: log.lvl === 'crit' ? 'var(--red)' : log.lvl === 'warn' ? 'var(--blue)' : 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.text}</span>
                    </div>
                  ))}
                  <div style={{
                    marginTop: 10, padding: '9px 12px', flexShrink: 0,
                    background: 'rgba(255,77,87,0.09)', border: '1px solid rgba(255,77,87,0.3)',
                    borderRadius: 6, fontFamily: mono, fontSize: 11, color: 'var(--red)', letterSpacing: '0.05em',
                    ...vis(5),
                    transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
                  }}>
                    ● THREAT NEUTRALIZED · 3 enforcement actions · 0 bytes exfiltrated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)', marginTop: 48, marginBottom: 48 }}>
          {STATS.map((s, i) => (
            <div key={i} className="glass" style={{ padding: '32px 36px', textAlign: 'center' }}>
              <div style={{ fontFamily: sg, fontWeight: 700, fontSize: 44, color: 'var(--blue)', textShadow: '0 0 24px rgba(94,179,255,0.5)', lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 15, color: 'var(--ink-2)', marginBottom: 20 }}>
            Run this simulation on your own agent.
          </p>
          <a className="btn-primary" href="#cta">Request Early Access</a>
        </div>
      </div>
    </section>
  )
}
