'use client'

const links = [
  ['#solution', 'Product'],
  ['#how-it-works', 'How It Works'],
  ['#features', 'Features'],
  ['#demo', 'Demo'],
] as const

export function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 76,
        borderBottom: '1px solid rgba(92,122,185,0.22)',
        background:
          'linear-gradient(180deg, rgba(5,10,26,0.92) 0%, rgba(4,8,22,0.85) 78%, rgba(4,8,22,0.52) 100%)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(40% 140% at 50% 100%, rgba(39,112,255,0.2), rgba(39,112,255,0.03) 36%, rgba(39,112,255,0) 70%)',
        }}
      />

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
            color: 'rgba(64,138,255,0.8)',
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          +
        </span>

        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: 'rgba(64,138,255,0.8)',
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          +
        </span>

        <a
          href="#top"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            fontSize: 13,
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 8px)',
              gridTemplateRows: 'repeat(3, 8px)',
              gap: 2,
            }}
            aria-hidden
          >
            {[1, 1, 1, 1, 0, 1, 1, 1, 1].map((on, i) => (
              <span
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  background: on ? 'rgba(233,240,251,0.95)' : 'transparent',
                  border: on ? 'none' : '1px solid rgba(160,180,225,0.35)',
                }}
              />
            ))}
          </span>
          AGENTPATROL
        </a>

        <div
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(224,233,248,0.92)',
            fontWeight: 600,
          }}
        >
          {links.map(([href, label], i) => (
            <a
              key={label}
              href={href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                color: 'inherit',
                transition: 'color 0.18s ease, text-shadow 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#6bb4ff'
                e.currentTarget.style.textShadow = '0 0 18px rgba(92,173,255,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = ''
                e.currentTarget.style.textShadow = ''
              }}
            >
              {label}
              {i < links.length - 1 ? (
                <span aria-hidden style={{ color: 'rgba(85,141,231,0.72)' }}>
                  /
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
