export function StatusStrip() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 32px',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'rgba(13,13,16,.6)',
        backdropFilter: 'blur(6px)',
        fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
        fontSize: 11,
        color: 'var(--ink-mute)',
        letterSpacing: '.05em',
      }}
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span>
          <span className="status-dot" />
          SYSTEM ONLINE
        </span>
        <span>NODE 04 / SEC.PATROL</span>
        <span>UPTIME 99.998%</span>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span>v2.4.1</span>
        <span>BUILD 26.05.05</span>
        <span style={{ color: 'var(--amber)' }}>2,481 AGENTS ACTIVE</span>
      </div>
    </div>
  )
}
