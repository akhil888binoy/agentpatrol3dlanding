const items = [
  'Credential exfiltration · BLOCKED · 11ms',
  'Prompt injection · QUARANTINED · 7ms',
  'Lateral movement · SEVERED · 13ms',
  'Unsigned binary · TERMINATED · 4ms',
  'Outbound C2 · DROPPED · 9ms',
  'Privilege escalation · DENIED · 6ms',
  'Replay attack · REJECTED · 3ms',
  'Data exfil attempt · INTERCEPTED · 8ms',
]

const doubled = [...items, ...items]

export function Marquee() {
  return (
    <div style={{
      borderBlock: '1px solid var(--line)',
      height: 52,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(94,179,255,0.03)',
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{
        display: 'flex',
        gap: 0,
        whiteSpace: 'nowrap',
        animation: 'marquee 56s linear infinite',
        willChange: 'transform',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 40px',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-3)',
            borderRight: '1px solid var(--line)',
          }}>
            <span style={{ color: 'var(--green)', fontWeight: 600 }}>//</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
