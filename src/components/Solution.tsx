const cols = [
  {
    title: 'Runtime Enforcement',
    body: 'Kernel-level seccomp-bpf and Tetragon eBPF block threats before the syscall completes. Not after. Before. An agent cannot bypass what it cannot see.',
    tag: 'OWASP ASI04',
  },
  {
    title: 'AI Detection Engine',
    body: 'Claude Haiku triages every event in real time. Claude Sonnet analyzes high-risk chains. Two streams correlated: what the agent did and what it was thinking. Unified threat verdict.',
    tag: 'Dual-stream analysis',
  },
  {
    title: 'Zero Code Change',
    body: 'Wraps any LangGraph, CrewAI, or LangChain agent with one command. Works on agents you built yourself or agents someone else built for you. No SDK. No framework hooks.',
    tag: 'Any Python agent',
  },
]

export function Solution() {
  return (
    <section id="solution" className="hero-theme-section" style={{ padding: '130px 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />// Introducing AgentPatrol</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>
              The security layer your<br />AI agents have been missing.
            </h2>
          </div>
          <p className="lede">
            AgentPatrol wraps any Python-based AI agent at the Linux kernel level. It monitors everything the agent does and enforces policy before damage can occur. Works on agents your team built, agents built by contractors, and agents delivered by agencies.
          </p>
        </div>

        {/* Code block */}
        <div className="glass" style={{ padding: '28px 32px', marginBottom: 48, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
            background: 'var(--green)', boxShadow: '0 0 16px rgba(94,179,255,0.5)',
          }} />
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 13, color: 'var(--ink-3)', marginBottom: 10, letterSpacing: '0.1em',
          }}>
            $ one command. full coverage.
          </div>
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 18, color: 'var(--green)', letterSpacing: '0.02em',
            textShadow: '0 0 20px rgba(94,179,255,0.4)',
          }}>
            agentpatrol run python your_agent.py
          </div>
          <div style={{
            marginTop: 14,
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 13, color: 'var(--ink-3)',
          }}>
            Your agent runs exactly as built. AgentPatrol wraps it externally.
          </div>
        </div>

        {/* Three columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}>
          {cols.map((col, i) => (
            <div key={i} className="glass" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontWeight: 600, fontSize: 19, color: 'var(--ink)', margin: 0, lineHeight: 1.25,
              }}>
                {col.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0, flex: 1,
              }}>
                {col.body}
              </p>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--green)', paddingTop: 16, borderTop: '1px solid var(--line)',
              }}>
                // {col.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
