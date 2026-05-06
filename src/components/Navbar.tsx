'use client'

export function Navbar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 32px',
        background: 'linear-gradient(180deg, rgba(8,8,10,.85), rgba(8,8,10,0))',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, letterSpacing: '.18em', fontSize: 14 }}>
        <span
          className="brand-dot"
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--amber)',
            boxShadow: '0 0 12px var(--amber)',
            display: 'inline-block',
          }}
        />
        <b style={{ color: 'var(--ink)', fontWeight: 700, fontFamily: 'inherit' }}>
          Agent<span style={{ color: 'var(--amber)' }}>Patrol</span>
        </b>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href="#features"
          className="nav-links"
          style={{
            color: 'var(--ink-dim)',
            textDecoration: 'none',
            fontSize: 12,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            padding: '10px 14px',
            borderRadius: 6,
            transition: 'color .2s, background .2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-dim)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
        >
          Features
        </a>
        <a
          href="#pricing"
          className="nav-links"
          style={{
            color: 'var(--ink-dim)',
            textDecoration: 'none',
            fontSize: 12,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            padding: '10px 14px',
            borderRadius: 6,
            transition: 'color .2s, background .2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-dim)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
        >
          Pricing
        </a>
        <a
          href="#docs"
          className="nav-links"
          style={{
            color: 'var(--ink-dim)',
            textDecoration: 'none',
            fontSize: 12,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            padding: '10px 14px',
            borderRadius: 6,
            transition: 'color .2s, background .2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-dim)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
        >
          Docs
        </a>
        <a
          href="#"
          style={{
            color: 'var(--bg)',
            background: 'var(--amber)',
            fontWeight: 700,
            padding: '10px 16px',
            border: '1px solid var(--amber)',
            boxShadow: '0 0 0 1px rgba(255,176,32,.2), 0 0 24px rgba(255,176,32,.18)',
            textDecoration: 'none',
            fontSize: 12,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            borderRadius: 6,
            transition: 'background .2s, color .2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--amber-2)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--amber)'; }}
        >
          Deploy →
        </a>
      </nav>
    </header>
  )
}
