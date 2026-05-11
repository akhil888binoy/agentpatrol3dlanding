'use client'

const mono = "var(--font-jetbrains-mono), ui-monospace, monospace"

const cols = [
  {
    head: 'Sections',
    links: [
      { label: 'Top', href: '#top' },
      { label: 'Problem', href: '#problem' },
      { label: 'Solution', href: '#solution' },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    head: 'Platform',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#technical-diff' },
      { label: 'Live Demo', href: '#demo' },
      { label: 'Get Access', href: '#cta' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="hero-theme-section" style={{
      borderTop: '1px solid var(--line)', position: 'relative', zIndex: 5,
      padding: '64px 0 48px',
    }}>
      <div className="container">
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48 }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{
                width: 18, height: 18, border: '1px solid var(--green)',
                display: 'grid', placeItems: 'center',
                boxShadow: '0 0 10px rgba(94,179,255,0.35)',
              }}>
                <span style={{ width: 6, height: 6, background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
              </span>
              <span style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                AgentPatrol
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: '32ch', margin: '0 0 20px' }}>
              The missing security layer between AI agents and enterprise infrastructure.
            </p>
            <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.06em', margin: 0, lineHeight: 1.6 }}>
              © 2026 AgentPatrol<br />
              All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.head}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16 }}>
                {col.head}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 13, color: 'var(--ink-2)', transition: 'color .15s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                      onMouseLeave={e => (e.currentTarget.style.color = '')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
