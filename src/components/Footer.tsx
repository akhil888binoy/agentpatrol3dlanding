const monoFont = 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace'

export function Footer() {
  return (
    <footer
      style={{
        padding: '48px 32px',
        borderTop: '1px solid var(--line)',
        fontFamily: monoFont,
        fontSize: 12,
        color: 'var(--ink-mute)',
        letterSpacing: '.06em',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div>
        {['Features', 'Pricing', 'Docs', 'Status', 'Security'].map((link) => (
          <a key={link} href="#" className="footer-link">{link}</a>
        ))}
      </div>
      <div>© 2026 AGENTPATROL · ALL UNITS RESERVED</div>
    </footer>
  )
}
