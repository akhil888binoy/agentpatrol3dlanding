const monoFont = 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace'
const orbFont = 'var(--font-orbitron), "Orbitron", sans-serif'

export function CTA() {
  return (
    <section id="docs" style={{ padding: '120px 0 100px', position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div
          className="cta-card"
          style={{
            border: '1px solid var(--line-2)',
            padding: '80px 48px',
            textAlign: 'center',
            background:
              'radial-gradient(600px 200px at 50% 0%, rgba(255,176,32,.12), transparent 70%), linear-gradient(180deg, #0c0c10, #08080a)',
          }}
        >
          <div className="sec-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            // READY?
          </div>
          <h2
            className="cta-h2"
            style={{
              fontFamily: orbFont,
              fontWeight: 800,
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: '.04em',
              margin: '16px 0 16px',
              color: 'var(--ink)',
            }}
          >
            STAND UP YOUR<br />
            <span
              style={{
                background: 'linear-gradient(180deg, var(--amber-2), var(--amber))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              FIRST PATROL
            </span>
          </h2>
          <p
            style={{
              fontFamily: monoFont,
              color: 'var(--ink-dim)',
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            Install in 90 seconds. No credit card. Your first agent will be sweeping production before your coffee&apos;s cold.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <a href="#" className="btn btn-primary">
              Deploy now{' '}
              <span style={{ fontFamily: monoFont, fontWeight: 400 }}>→</span>
            </a>
            <a href="#" className="btn btn-ghost" style={{ fontFamily: monoFont, letterSpacing: '.05em', textTransform: 'none', fontWeight: 400, fontSize: 13 }}>
              curl -fsSL agentpatrol.dev/install
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
