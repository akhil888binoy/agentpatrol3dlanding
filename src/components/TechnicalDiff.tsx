export function TechnicalDiff() {
  return (
    <section id="technical-diff" className="hero-theme-section" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// Why Kernel Level</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              Application-layer monitoring<br />sees what the agent <span className="strike">reports</span>.<br />
              Kernel-level sees what<br />the agent <span className="accent">does</span>.
            </h2>
          </div>
          <p className="lede">
            Every tool that requires an SDK monitors what the agent chooses to report. A compromised agent simply does not report the bad things it is doing.
          </p>
        </div>

        {/* Comparison grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', marginBottom: 24 }}>
          {/* Left — App layer (bad) */}
          <div className="glass" style={{ padding: '40px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px var(--red)', display: 'inline-block' }} />
              SDK / Framework hooks
            </div>
            <h3 style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontWeight: 600, fontSize: 20, color: 'var(--ink-2)',
              margin: '0 0 16px', lineHeight: 1.3,
            }}>
              Monitors what the agent reports
            </h3>
            <p style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0,
            }}>
              Every tool that requires an SDK or framework hooks monitors at the application layer. The agent code reports its own activity. A compromised agent simply does not report the bad things it is doing. The monitoring tool is blind to what the application layer does not surface.
            </p>
            {/* Limitation tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {['Requires SDK', 'Agent self-reports', 'Bypassable', 'No syscall visibility'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                  fontSize: 10, padding: '4px 10px',
                  border: '1px solid rgba(255,77,87,0.3)',
                  color: 'var(--red)', letterSpacing: '0.08em',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — Kernel level (good) */}
          <div className="glass" style={{ padding: '40px', boxShadow: '0 0 40px rgba(94,179,255,0.08), inset 0 0 30px rgba(94,179,255,0.03)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', display: 'inline-block', animation: 'pulse 1.6s ease infinite' }} />
              AgentPatrol · Tetragon eBPF
            </div>
            <h3 style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontWeight: 600, fontSize: 20, color: 'var(--ink)',
              margin: '0 0 16px', lineHeight: 1.3,
            }}>
              Monitors what the agent does
            </h3>
            <p style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0,
            }}>
              AgentPatrol monitors at the Linux kernel layer using Tetragon eBPF. The agent cannot hide syscalls. It cannot hide file access. It cannot hide network connections. The kernel sees everything regardless of what the agent code reports.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {['Zero code changes', 'Kernel-level visibility', 'Unbypassable', 'Full syscall trace'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                  fontSize: 10, padding: '4px 10px',
                  border: '1px solid rgba(94,179,255,0.3)',
                  color: 'var(--green)', letterSpacing: '0.08em',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical callout */}
        <div style={{
          padding: '28px 36px',
          border: '1px solid rgba(255,77,87,0.4)',
          background: 'rgba(255,77,87,0.06)',
          display: 'flex', alignItems: 'flex-start', gap: 20,
        }}>
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 18, color: 'var(--red)', flexShrink: 0, lineHeight: 1,
          }}>!</span>
          <p style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 13.5, color: 'var(--ink)', margin: 0, lineHeight: 1.6,
            letterSpacing: '0.02em',
          }}>
            An agent reading <code style={{ color: 'var(--red)', background: 'rgba(255,77,87,0.15)', padding: '1px 6px' }}>/etc/passwd</code> gets SIGKILL before the syscall completes. Not flagged. Not alerted. <strong style={{ color: 'var(--red)' }}>Killed. Before.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
