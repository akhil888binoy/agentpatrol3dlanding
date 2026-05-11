const timeline = [
  { t: '17:42:09.001', label: 'Detection', desc: 'Credential reuse flagged — 185.220.x.x (TOR exit node)', cls: 'crit' },
  { t: '17:42:09.004', label: 'Classification', desc: 'Pattern matched: MITRE T1078 — Valid Accounts abuse', cls: 'warn' },
  { t: '17:42:09.009', label: 'Response', desc: 'Session revoked, API keys rotated, token blacklisted', cls: 'ok' },
  { t: '17:42:09.012', label: 'Containment', desc: 'Threat neutralized — 12 ms total, 0 bytes exfiltrated', cls: 'ok' },
]

const signals = [
  { label: 'Threat class', value: 'Credential abuse', color: 'var(--red)' },
  { label: 'MITRE ATT&CK', value: 'T1078 / T1110', color: 'var(--amber)' },
  { label: 'Severity',      value: 'CRITICAL',      color: 'var(--red)' },
  { label: 'Response time', value: '12 ms',          color: 'var(--green)' },
  { label: 'Data exfil',    value: '0 bytes',        color: 'var(--green)' },
  { label: 'Compliance',    value: 'SOC 2 logged',   color: 'var(--ink-2)' },
]

export function Incident() {
  return (
    <section id="incident" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot red" />// Incident report</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Anatomy of a<br />
              <span className="strike">breach</span> neutralization.
            </h2>
          </div>
          <p className="lede">
            Every incident generates a full chain-of-custody report with signed evidence, replay capability, and compliance artifacts ready to download.
          </p>
        </div>

        <div className="incident-grid glass" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
          {/* Left: incident report */}
          <div className="incident-left">
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px',
                background: 'rgba(255,77,87,0.12)', border: '1px solid rgba(255,77,87,0.35)',
                fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--red)',
                marginBottom: 18,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px var(--red)', animation: 'blip 1.2s ease infinite', display: 'inline-block' }} />
                INCIDENT · INC-2481
              </div>
              <h3 style={{
                fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif',
                fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em',
                color: 'var(--ink)', margin: 0,
              }}>
                Credential reuse via TOR exit node
              </h3>
              <p style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace', fontSize: 12.5, color: 'var(--ink-3)', marginTop: 8, letterSpacing: '0.04em' }}>
                2026-05-06 · 17:42:09 UTC · Node EU-WEST-04
              </p>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < timeline.length - 1 ? 20 : 0, position: 'relative' }}>
                  {/* Connector line */}
                  {i < timeline.length - 1 && (
                    <div style={{ position: 'absolute', left: 6, top: 16, bottom: 0, width: 1, background: 'var(--line-2)' }} />
                  )}
                  <div style={{
                    width: 13, height: 13, borderRadius: '50%', flexShrink: 0, marginTop: 3,
                    background: step.cls === 'crit' ? 'var(--red)' : step.cls === 'warn' ? 'var(--amber)' : 'var(--green)',
                    boxShadow: `0 0 8px ${step.cls === 'crit' ? 'var(--red)' : step.cls === 'warn' ? 'var(--amber)' : 'var(--green)'}`,
                    position: 'relative', zIndex: 1,
                  }} />
                  <div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>{step.t}</span>
                      <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{step.label}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace', fontSize: 12.5, color: 'var(--ink-2)', margin: 0, lineHeight: 1.55 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: signals */}
          <div style={{ padding: '44px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 20 }}>
              // Incident signals
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {signals.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 0', borderBottom: '1px solid var(--line)',
                }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace', fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>
                    {s.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace', fontSize: 12.5, color: s.color, letterSpacing: '0.06em', fontWeight: 500 }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
              <a href="#" className="btn-ghost" style={{ fontSize: 11, padding: '10px 16px', letterSpacing: '0.12em' }}>
                Download report
              </a>
              <a href="#" className="btn-ghost" style={{ fontSize: 11, padding: '10px 16px', letterSpacing: '0.12em' }}>
                Replay incident
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
