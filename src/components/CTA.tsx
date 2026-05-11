export function CTA() {
  return (
    <section id="cta" className="hero-theme-section" style={{ padding: '80px 0 100px', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="glass cta-band" style={{
          padding: '80px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          background: [
            'radial-gradient(700px 300px at 20% 50%, rgba(94,179,255,0.10), transparent 65%)',
            'radial-gradient(600px 300px at 80% 50%, rgba(94,179,255,0.07), transparent 65%)',
            'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01) 30%, rgba(255,255,255,0.005))',
            'rgba(11,14,22,0.7)',
          ].join(', '),
        }}>
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
          }} />

          <div className="eyebrow" style={{ justifyContent: 'center', position: 'relative' }}>
            <span className="dot" />// Get Started
          </div>

          <h2 className="section-title" style={{ margin: '20px 0 12px', position: 'relative' }}>
            Your agents are running right now.
          </h2>
          <p className="section-title" style={{
            fontSize: 'clamp(20px, 2.4vw, 36px)', color: 'var(--ink-2)', margin: '0 0 20px', position: 'relative',
            fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 400,
          }}>
            Do you know what they are doing?
          </p>

          <p className="lede" style={{ margin: '0 auto 36px', textAlign: 'center', position: 'relative', maxWidth: '52ch' }}>
            AgentPatrol deploys in 90 seconds. Zero code changes to your agent. First session report in under five minutes. See exactly what your agent has been doing since the moment it first ran.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', position: 'relative' }}>
            <a className="btn-primary" href="#">
              Request Early Access
              <span style={{ display: 'inline-block', width: 14, height: 1, background: '#051225', position: 'relative' }}>
                <span style={{ position: 'absolute', right: 0, top: -3, width: 7, height: 7, borderTop: '1.5px solid #051225', borderRight: '1.5px solid #051225', transform: 'rotate(45deg)', display: 'block' }} />
              </span>
            </a>
            <a className="btn-ghost" href="#">Talk to a Founder</a>
          </div>

          {/* Trust signals */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap',
            marginTop: 28, position: 'relative',
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em',
          }}>
            {['No credit card required', '90-second install', 'Works on any Python agent'].map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', display: 'inline-block' }} />
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
