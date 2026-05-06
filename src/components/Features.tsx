const features = [
  {
    id: 'F.01',
    num: '01 / PERIMETER',
    title: 'Continuous patrol',
    desc: 'Agents sweep every endpoint, port, and request — 240 scans a second across your full perimeter, with no human in the loop.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
      </svg>
    ),
  },
  {
    id: 'F.02',
    num: '02 / DETECT',
    title: 'Anomaly lock-on',
    desc: 'Behavioral models flag drift the instant traffic deviates from baseline. False positive rate under 0.04% on real-world workloads.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    ),
  },
  {
    id: 'F.03',
    num: '03 / RESPOND',
    title: '12ms response',
    desc: 'Quarantine, rate-limit, rotate keys, page on-call — agents act on their own playbooks before a human even sees the alert.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m12 2 7 4v6c0 4-3 8-7 10-4-2-7-6-7-10V6l7-4z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'F.04',
    num: '04 / AUDIT',
    title: 'Full chain of custody',
    desc: 'Every action signed, timestamped, replay-able. SOC 2 / ISO 27001 / HIPAA evidence ships with every incident report.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 14h8" />
      </svg>
    ),
  },
  {
    id: 'F.05',
    num: '05 / DEPLOY',
    title: 'Drop-in agents',
    desc: 'One binary. One token. Patrol your fleet from a laptop, a Raspberry Pi, or 50,000 nodes across three clouds.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 4h16v6H4zM4 14h16v6H4z" />
        <circle cx="8" cy="7" r="1" fill="currentColor" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'F.06',
    num: '06 / SWARM',
    title: 'Coordinated swarm',
    desc: 'Agents share signal across the mesh. A breach detected in Frankfurt hardens São Paulo before the next request lands.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <section id="features" style={{ padding: '140px 0 80px', position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="sec-eyebrow">// CAPABILITIES</div>
            <h2
              className="sec-title-lg"
              style={{
                fontFamily: 'var(--font-orbitron), "Orbitron", sans-serif',
                fontWeight: 800,
                fontSize: 56,
                letterSpacing: '.02em',
                margin: '8px 0 0',
                lineHeight: 1,
                color: 'var(--ink)',
              }}
            >
              Field-tested<br />defense protocols.
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
              color: 'var(--ink-dim)',
              maxWidth: 480,
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            Each agent is autonomous, hardened, and trained on a decade of red-team telemetry. Drop one in — it learns your perimeter in minutes.
          </p>
        </div>

        {/* Feature grid */}
        <div
          className="feat-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {features.map((f) => (
            <div key={f.id} className="feat-card">
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10,
                  color: 'var(--ink-mute)',
                  letterSpacing: '.16em',
                }}
              >
                {f.id}
              </span>
              <div
                style={{
                  width: 48,
                  height: 48,
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid var(--line-2)',
                  color: 'var(--amber)',
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
                  fontSize: 11,
                  color: 'var(--amber)',
                  letterSpacing: '.2em',
                }}
              >
                {f.num}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-orbitron), "Orbitron", sans-serif',
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '.04em',
                  margin: 0,
                  lineHeight: 1.2,
                  color: 'var(--ink)',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
                  color: 'var(--ink-dim)',
                  fontSize: 13,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
